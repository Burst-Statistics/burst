<?php /** @noinspection ALL */
if ( ! defined( 'ABSPATH' ) ) {
	return;
}

use function burst\UserAgent\parse_user_agent;

if ( ! function_exists( 'burst_register_track_hit_route' ) ) {
	function burst_register_track_hit_route() {
		register_rest_route(
			'burst/v1',
			'track',
			array(
				'methods'             => 'POST',
				'callback'            => 'burst_rest_track_hit',
				'permission_callback' => '__return_true',
			) );
	}

	add_action( 'rest_api_init', 'burst_register_track_hit_route' );
}

if ( ! function_exists( 'burst_track_hit' ) ) {
	/**
	 * Burst Statistics endpoint for collecting hits
	 *
	 * @param $data
	 *
	 * @return string
	 */
	function burst_track_hit( $data ): string {
		global $wpdb;
		$user_agent_data = isset( $data['user_agent'] ) ? burst_get_user_agent_data( $data['user_agent'] ) : array(
			'browser'  => '',
			'browser_version'  => '',
			'platform' => '',
			'device'   => '',
		);
		$defaults        = array(
			'url'               => null,
			'page_id'           => null,
			'time'              => null,
			'uid'               => null,
			'fingerprint'       => null,
			'referrer_url'      => null,
			'user_agent'        => null,
			'device_resolution' => null,
			'time_on_page'      => null,
			'completed_goals'   => null,
		);
		$data            = wp_parse_args( $data, $defaults );
		$data['completed_goals']   = burst_sanitize_completed_goal_ids( $data['completed_goals'] );

		// update array
		$arr                      = array();
		$arr['entire_page_url']   = burst_sanitize_entire_page_url( $data['url'] ); // required
		$arr['page_url']          = burst_sanitize_page_url( $data['url'] ); // required
		$arr['page_id']           = burst_sanitize_page_id( $data['page_id'] ); // required
		$arr['uid']               = burst_sanitize_uid( $data['uid'] ); // required
		$arr['fingerprint']       = burst_sanitize_fingerprint( $data['fingerprint'] );
		$arr['referrer']          = burst_sanitize_referrer( $data['referrer_url'] );
		$arr['browser']           = $user_agent_data['browser']; // already sanitized
		$arr['browser_version']   = $user_agent_data['browser_version']; // already sanitized
		$arr['platform']          = $user_agent_data['platform']; // already sanitized
		$arr['device']            = $user_agent_data['device']; // already sanitized
		$arr['device_resolution'] = burst_sanitize_device_resolution( $data['device_resolution'] );
		$arr['time_on_page']      = burst_sanitize_time_on_page( $data['time_on_page'] );
		$arr['bounce']            = 1;


		// if user agent is not set then this is an update hit
		$is_update_hit = empty( $data['user_agent'] );
		$arr = apply_filters( 'burst_before_track_hit', $arr );

		$session_arr = array(
			'last_visited_url' => $arr['page_url'],
			'goal_id'          => false,
			'country_code'     => $arr['country_code'] ?? '',
		);
		unset( $arr['country_code'] );
		// update burst_sessions table
		// Get the last record with the same uid within 30 minutes. If it exists, use session_id. If not, create a new session.
		if ($is_update_hit) { // if update hit, make sure that the URL matches.
			$last_statistic = burst_get_last_user_statistic( $arr['uid'], $arr['fingerprint'], $arr['page_url'] );
		} else {
			$last_statistic = burst_get_last_user_statistic( $arr['uid'], $arr['fingerprint'] );
		}

		// Determine if hit is a bounce
		// - check if previous page was not a bounce, then this is also not a bounce
		// - check if last_statistic page_url is different, then more than two pages are visited
		// - check if last_statistic time_on_page + current time_on_page is more than 5 seconds, then it is not a bounce
		if ( (int) $last_statistic['bounce'] !== 1 || ( $last_statistic['page_url'] !== null && $last_statistic['page_url'] !== $arr['page_url'] ) || $last_statistic['time_on_page'] + $arr['time_on_page'] > 5000 ) {
			$arr['bounce'] = 0;
			// if previous page was a bounce and curretn page is not, then this should be updated to a non-bounce
			if ( $last_statistic['page_url'] !== null && $last_statistic['page_url'] !== $arr['page_url'] ) {
				burst_update_statistic( array( 'ID' => $last_statistic['ID'], 'bounce' => 0 ) );
			}
		}

		if ( $last_statistic['session_id'] > 0 ) {
			$arr['session_id'] = $last_statistic['session_id'];
			burst_update_session( $arr['session_id'], $session_arr );
		} else if ( $last_statistic ) {
			$session_arr['first_visited_url'] = $arr['page_url'];
			$arr['session_id'] = burst_create_session( $session_arr );
		}

		// if there is a fingerprint use that instead of uid
		if ( $arr['fingerprint'] && ! $arr['uid'] ) {
			$arr['uid'] = $arr['fingerprint'];
		}
		unset( $arr['fingerprint'] );

		// update burst_statistics table
		// Get the last record with the same uid and page_url. If it exists update it. If not, create a new record and add time() to $arr['time']
		if ( $is_update_hit && ( $last_statistic['page_url'] === $arr['page_url'] || $last_statistic['session_id'] === '' ) ) { // if update hit, make sure that the URL matches.
			// add up time_on_page to the existing record
			if ( $last_statistic ) {
				$arr['time_on_page'] += $last_statistic['time_on_page'];
			}
			$arr['ID'] = $last_statistic['ID'];
			burst_update_statistic( $arr );
		} else if ( ! $is_update_hit ) {
			$arr['time']             = time();
			$arr['first_time_visit'] = burst_get_first_time_visit( $arr['uid'] );

			$insert_id = burst_create_statistic( $arr );

			// if postmeta burst_total_pageviews_count does not exist, create it with sql and set it to 1
			// if it exists, add 1 to it via sql
			$meta_key = 'burst_total_pageviews_count';
			// get post meta via sql
			$sql        = $wpdb->prepare( "SELECT meta_value FROM $wpdb->postmeta WHERE post_id = %d AND meta_key = %s", $arr['page_id'], $meta_key );
			$meta_value = $wpdb->get_var( $sql );

			if ( (int) $meta_value > 0 ) {
				$meta_value = (int) $meta_value + 1;
				$sql        = $wpdb->prepare( "UPDATE $wpdb->postmeta SET meta_value = %d WHERE post_id = %d AND meta_key = %s", $meta_value, $arr['page_id'], $meta_key );
				$wpdb->query( $sql );
			} else {
				$meta_value = 1;
				$sql        = $wpdb->prepare( "INSERT INTO $wpdb->postmeta (post_id, meta_key, meta_value) VALUES (%d, %s, %d)", $arr['page_id'], $meta_key, $meta_value );
				$wpdb->query( $sql );
			}
		}

		if ( array_key_exists( 'ID', $arr ) && $arr['ID'] > 0 ) {
			$statistic_id = $arr['ID'];
		} else  {
			$statistic_id = $insert_id ?? 0;
		}

		if ( $statistic_id > 0 ) {
			$completed_goals = burst_get_completed_goals( $data['completed_goals'], $arr['page_url'] );
			// if $arr['completed_goals'] is not an empty array, update burst_goals table
			if ( ! empty( $completed_goals ) ) {
				foreach ( $completed_goals as $goal_id ) {
					$goal_arr = array(
						'goal_id'      => $goal_id,
						'statistic_id' => $statistic_id,
					);
					burst_create_goal_statistic( $goal_arr );
				}
			}
		}

		return 'success';
	}
}

if ( ! function_exists( 'burst_beacon_track_hit' ) ) {
	/**
	 * Burst Statistics beacon endpoint for collecting hits
	 */
	function burst_beacon_track_hit() {
		$request = (string) file_get_contents( 'php://input' );
		if ( empty( $request ) ) {
			wp_die( 'not a valid request' );
		}
		if ( $request === 'request=test' ) {
			http_response_code( 200 );

			return 'success';
		}

		if ( burst_is_ip_blocked() ) {
			http_response_code( 200 );

			return 'ip blocked';
		}

		$data = json_decode( json_decode( $request, true ), true ); // The data is encoded in JSON and decoded twice to get the array.
		burst_track_hit( $data );
		http_response_code( 200 );

		return 'success';
	}
}

if ( ! function_exists( 'burst_rest_track_hit' ) ) {
	/**
	 * Burst Statistics rest_api endpoint for collecting hits
	 *
	 * @param WP_REST_Request $request
	 *
	 * @return WP_REST_Response
	 */
	function burst_rest_track_hit( WP_REST_Request $request ): WP_REST_Response {
		if ( burst_is_ip_blocked() ) {
			$status_code = WP_DEBUG ? 202 : 200;

			return new WP_REST_Response( 'Burst Statistics: Your IP is blocked from tracking.', $status_code );
		}
		$data = json_decode( $request->get_json_params(), true );
		if ( isset( $data['request'] ) && $data['request'] === 'test' ) {
			return new WP_REST_Response( array( 'success' => 'test' ), 200 );
		}
		burst_track_hit( $data );

		return new WP_REST_Response( array( 'success' => 'hit_tracked' ), 200 );
	}
}

if ( ! function_exists( 'burst_sanitize_entire_page_url' ) ) {
	/**
	 * Sanitize entire page URL
	 *
	 * @param string $url
	 *
	 * @return string
	 */
	function burst_sanitize_entire_page_url( $url ): string {
		if ( ! function_exists( 'wp_kses_bad_protocol' ) ) {
			require_once( ABSPATH . '/wp-includes/kses.php' );
		}
		$sanitized_url = filter_var( $url, FILTER_SANITIZE_URL );
		// Validate the URL
		if ( ! filter_var( $sanitized_url, FILTER_VALIDATE_URL ) ) {
			return '';
		}

		$url = parse_url( esc_url_raw( $sanitized_url ) );
		if ( isset( $url['host'] ) ) {
			return trailingslashit( $url['path'] ) ;
		}

		return false;
	}
}

if ( ! function_exists( 'burst_sanitize_page_url' ) ) {
	/**
	 * Sanitize page_url
	 *
	 * @param string $page_url
	 *
	 * @return string
	 */
	function burst_sanitize_page_url( $url ): string {
		if ( ! function_exists( 'wp_kses_bad_protocol' ) ) {
			require_once( ABSPATH . '/wp-includes/kses.php' );
		}
		$sanitized_url = filter_var( $url, FILTER_SANITIZE_URL );
		if ( ! filter_var( $sanitized_url, FILTER_VALIDATE_URL ) ) {
			return '';
		}

		$url = parse_url( esc_url_raw( $sanitized_url ) );
		if ( isset( $url['host'] ) ) { //
			return trailingslashit( $url['path'] );
		}

		return '';
	}
}

if ( ! function_exists( 'burst_sanitize_page_id' ) ) {
	/**
	 * Sanitize page_id
	 *
	 * @param string $page_id
	 *
	 * @return int
	 */
	function burst_sanitize_page_id( $page_id ) {

		return (int) $page_id > 0 ? (int) $page_id : 0;
	}
}

if ( ! function_exists( 'burst_sanitize_time' ) ) {
	/**
	 * Sanitize time
	 *
	 * @param $time
	 *
	 * @return int
	 */
	function burst_sanitize_time( $time ): int {
		return (int) $time;
	}
}

if ( ! function_exists( 'burst_sanitize_uid' ) ) {
	/**
	 * Sanitize uid
	 *
	 * @param $uid
	 *
	 * @return string|false
	 */
	function burst_sanitize_uid( $uid ) {
		if ( ! $uid || ! preg_match( '/^[a-z0-9-]*/', $uid ) ) {
			return false;
		}

		return $uid;
	}
}

if ( ! function_exists( 'burst_sanitize_fingerprint' ) ) {
	/**
	 * Sanitize fingerprint
	 *
	 * @param $fingerprint
	 *
	 * @return false|string
	 */
	function burst_sanitize_fingerprint( $fingerprint ) {
		if ( ! $fingerprint || ! preg_match( '/^[a-z0-9-]*/', $fingerprint ) ) {
			return false;
		}

		return 'f-' . $fingerprint;
	}
}

if ( ! function_exists( 'burst_sanitize_referrer' ) ) {
	/**
	 * Sanitize referrer
	 *
	 * @param $referrer
	 *
	 * @return string|null
	 */
	function burst_sanitize_referrer( $referrer ): ?string {
		if ( ! defined( 'burst_path' ) ) {
			define( 'burst_path', plugin_dir_path( __FILE__ ) . '../' );
		}
		$referrer      = filter_var( $referrer, FILTER_SANITIZE_URL );
		$referrer_host  = parse_url( $referrer, PHP_URL_HOST );
		$current_host = $_SERVER['HTTP_HOST'] ?? $_SERVER['SERVER_NAME'];
		// don't track if referrer is the same as current host
		// if referrer_url starts with current_host, then it is not a referrer
		if ( empty($referrer_host) || strpos( $referrer_host, $current_host ) === 0 ) {
			return null;
		}

		$ref_spam_list = file( burst_path . 'helpers/referrer-spam-list/spammers.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES );
		if ( array_search( $referrer_host, $ref_spam_list ) ) {
			return 'spammer';
		}
		if ( ! function_exists( 'wp_kses_bad_protocol' ) ) {
			require_once( ABSPATH . '/wp-includes/kses.php' );
		}

		return $referrer ? trailingslashit( esc_url_raw( $referrer ) ) : null;
	}
}

if ( ! function_exists( 'burst_sanitize_device_resolution' ) ) {
	/**
	 * Sanitize device resolution
	 *
	 * @param $device_resolution
	 *
	 * @return string
	 */
	function burst_sanitize_device_resolution( $device_resolution ): string {
		return sanitize_text_field( filter_var( $device_resolution, FILTER_UNSAFE_RAW, FILTER_FLAG_STRIP_LOW ) );
	}
}

if ( ! function_exists( 'burst_sanitize_time_on_page' ) ) {
	/**
	 * Sanitize time on page
	 *
	 * @param $time_on_page
	 *
	 * @return int
	 */
	function burst_sanitize_time_on_page( $time_on_page ): int {

		return (int) $time_on_page;
	}
}
if ( ! function_exists( 'burst_sanitize_first_time_visit' ) ) {
	/**
	 * Sanitize first time visit
	 *
	 * @param $first_time_visit
	 *
	 * @return bool
	 */
	function burst_sanitize_first_time_visit( $first_time_visit ): bool {
		return $first_time_visit === 1;
	}
}

if ( ! function_exists( 'burst_sanitize_completed_goal_ids' ) ) {
	/**
	 * Sanitize completed goals
	 *
	 * @param $completed_goals
	 *
	 * @return string
	 */
	function burst_sanitize_completed_goal_ids( $completed_goals ) {
		if ( ! is_array( $completed_goals ) ) {
			return [];
		}
		$completed_goals = array_intersect( $completed_goals, burst_get_active_goals_ids() ); // only keep active goals ids
		$completed_goals = array_unique( $completed_goals ); // remove duplicates
		$completed_goals = array_map( 'absint', $completed_goals ); // make sure all values are integers

		return $completed_goals;
	}
}

if ( ! function_exists( 'burst_get_active_goals' ) ) {
	/**
	 * @param $server_side
	 *
	 * @return array[]
	 */
	function burst_get_active_goals( $server_side = false ) {
		global $wpdb;
		$active_goals = [];
		$server_side  = $server_side ? "AND server_side = 1" : "AND server_side = 0";
		$goals        = $wpdb->get_results( "SELECT * FROM {$wpdb->prefix}burst_goals WHERE status = 'active' {$server_side}", ARRAY_A );
		foreach ( $goals as $key => $goal ) {
			$goals[ $key ]['setup'] = json_decode( $goals[ $key ]['setup'], true );
		}

		return $goals;
	}
}

if ( ! function_exists( 'burst_get_goals_script_url' ) ) {
	/**
	 * @return string
	 */
	function burst_get_goals_script_url() {
		return apply_filters( 'burst_goals_script_url', burst_url . '/assets/js/build/burst-goals.js?v=' . burst_version );
	}
}

if ( ! function_exists( 'burst_get_active_goals_ids' ) ) {
	/**
	 * @param $server_side
	 *
	 * @return array
	 */
	function burst_get_active_goals_ids( $server_side = false ) {
		$active_goals     = burst_get_active_goals( $server_side );
		$active_goals_ids = [];
		foreach ( $active_goals as $goal ) {
			$active_goals_ids[] = $goal['ID'];
		}

		return $active_goals_ids;
	}
}

if ( ! function_exists( 'burst_goal_is_completed' ) ) {
	/**
	 * @param $goal_id
	 * @param $completed_goals
	 *
	 * @return bool
	 */
	function burst_goal_is_completed( $goal, $page_url ) {
		if (
			! isset( $goal['type'] ) ||
			! isset( $goal['setup']['url'] ) ||
			! isset( $page_url )
		) {
			switch ( $goal['type'] ) {
				case 'visits':
					// @todo maybe add support to compare parts of url (e.g. /hello-world/ and /hello-world/?utm_source=google)
					// if url in hit data is equal to goal url
					if ( $page_url === $goal['url'] ) {
						return true;
					}
					break;
				default:
					return false;
			}
		}
	}
}

if ( ! function_exists( 'burst_get_completed_goals' ) ) {
	/**
	 * @param $completed_client_goals
	 * @param $page_url
	 *
	 * @return mixed
	 */
	function burst_get_completed_goals( $completed_client_goals, $page_url ) {
		$completed_server_goals = [];
		$server_goals           = burst_get_active_goals( true );
		// if server side goals exist
		if ( $server_goals ) {
			// loop through server side goals
			foreach ( $server_goals as $goal ) {
				// if goal is completed
				if ( burst_goal_is_completed( $goal, $page_url ) ) {
					// add goal id to completed goals array
					$completed_server_goals[] = $goal['ID'];
				}
			}
		}

		return array_merge( $completed_client_goals, $completed_server_goals ); // merge completed client goals and completed server goals
	}
}

if ( ! function_exists( 'burst_get_user_agent_data' ) ) {
	/**
	 * Get user agent data
	 *
	 * @param $user_agent
	 *
	 * @return null[]|string[]
	 */
	function burst_get_user_agent_data( $user_agent ): array {
		$defaults = array(
			'browser'  => '',
			'browser_version'  => '',
			'platform' => '',
			'device'   => '',
		);
		if ( $user_agent == '' ) {
			return $defaults;
		}

		$ua = parse_user_agent( $user_agent );

		switch ( $ua['platform'] ) {
			case 'Macintosh':
			case 'Chrome OS':
			case 'Linux':
			case 'Windows':
				$ua['device'] = 'desktop';
				break;
			case 'Android':
			case 'BlackBerry':
			case 'iPhone':
			case 'Windows Phone':
			case 'Sailfish':
			case 'Symbian':
			case 'Tizen':
				$ua['device'] = 'mobile';
				break;
			case 'iPad':
				$ua['device'] = 'tablet';
				break;
			case 'PlayStation 3':
			case 'PlayStation 4':
			case 'PlayStation 5':
			case 'PlayStation Vita':
			case 'Xbox':
			case 'Xbox One':
			case 'New Nintendo 3DS':
			case 'Nintendo 3DS':
			case 'Nintendo DS':
			case 'Nintendo Switch':
			case 'Nintendo Wii':
			case 'Nintendo WiiU':
			case 'iPod':
			case 'Kindle':
			case 'Kindle Fire':
			case 'NetBSD':
			case 'OpenBSD':
			case 'PlayBook':
			case 'FreeBSD':
			default:
				$ua['device'] = 'other';
				break;
		}

		// change version to browser_version
		$ua['browser_version'] = $ua['version'];
		unset($ua['version']);

		return wp_parse_args($ua, $defaults);
	}
}

if ( ! function_exists( 'burst_get_first_time_visit' ) ) {
	/**
	 * Get first time visit
	 *
	 * @param $burst_uid
	 *
	 * @return int
	 */
	function burst_get_first_time_visit( $burst_uid ): int {
		global $wpdb;
		// Check if uid is already in the database in the past 30 days for a different sessions_id
		$after_time         = time() - MONTH_IN_SECONDS;
		$sql                = $wpdb->prepare(
			"SELECT EXISTS(SELECT 1 FROM {$wpdb->prefix}burst_statistics WHERE uid = %s AND time > %s LIMIT 1)",
			$burst_uid,
			$after_time
		);
		$fingerprint_exists = $wpdb->get_var( $sql );

		return $fingerprint_exists ? 0 : 1;
	}
}

if ( ! function_exists( 'burst_get_last_user_statistic' ) ) {
	/**
	 * Get last user statistic from {prefix}_burst_statistics
	 *
	 * @param $uid
	 * @param $fingerprint
	 *
	 * @return null[]
	 */
	function burst_get_last_user_statistic( $uid, $fingerprint, $page_url = false ): array {
		global $wpdb;
		// if fingerprint is send get the last user statistic with the same fingerprint
		$search_uid   = $fingerprint ?: $uid;
		$default_data = array(
			'ID'           => null,
			'session_id'   => null,
			'page_url'     => null,
			'time_on_page' => 0,
			'bounce'       => 1,
		);
		if ( ! $search_uid ) {
			return $default_data;
		}
		$where = $page_url ? $wpdb->prepare(" AND page_url = %s", sanitize_text_field($page_url) ) : '';
		$data = $wpdb->get_row(
			$wpdb->prepare(
				"select ID, session_id, page_url, time_on_page, bounce
							from {$wpdb->prefix}burst_statistics
		                    where uid = %s AND time > %s {$where} ORDER BY ID DESC limit 1",
				$search_uid,
				strtotime( "-30 minutes" )
			)
		);
		if ( $data ) {
			return array_merge( $default_data, (array) $data );
		}

		return $default_data;

	}
}

if ( ! function_exists( 'burst_create_session' ) ) {
	/**
	 * Create session in {prefix}_burst_sessions
	 *
	 * @param $user_id
	 *
	 * @return bool
	 */
	function burst_create_session( $data ) {
		global $wpdb;
		$data = burst_remove_empty_values( $data );
		$wpdb->insert(
			$wpdb->prefix . 'burst_sessions',
			$data
		);

		return $wpdb->insert_id;
	}
}

if ( ! function_exists( 'burst_update_session' ) ) {
	/**
	 * Update session in {prefix}_burst_sessions
	 *
	 * @param $session_id
	 * @param $data
	 *
	 * @return void
	 */
	function burst_update_session( $session_id, $data ) {
		global $wpdb;
		$data = burst_remove_empty_values( $data );
		$wpdb->update(
			$wpdb->prefix . 'burst_sessions',
			$data,
			array( 'ID' => (int) $session_id )
		);
	}
}

if ( ! function_exists( 'burst_create_statistic' ) ) {
	/**
	 * Create statistic in {prefix}_burst_statistics
	 *
	 * @param $data
	 *
	 * @return void
	 */
	function burst_create_statistic( $data ) {
		global $wpdb;
		$data = burst_remove_empty_values( $data );
		if ( ! burst_required_values_set( $data ) ) {
			if ( WP_DEBUG ) {
				error_log( 'Burst Statistics: burst_create_statistic->required values are not set. Stats: ' . print_r( $data, true ) );
			}

			return;
		}
		$id = $wpdb->insert(
			$wpdb->prefix . 'burst_statistics',
			$data
		);

		return $wpdb->insert_id;
	}
}

if ( ! function_exists( 'burst_update_statistic' ) ) {
	/**
	 * Update statistics in {prefix}_burst_statistics
	 *
	 * @param array $data
	 *
	 * @return void
	 */
	function burst_update_statistic( $data ) {
		global $wpdb;
		$data = burst_remove_empty_values( $data );
		// if page_id is set, unset it, because it should already be in the db. Otherwise it will be overwritten with 0
		unset( $data['page_id'] );
		$wpdb->update(
			$wpdb->prefix . 'burst_statistics',
			(array) $data,
			array( 'ID' => (int) $data['ID'] )
		);

		return $wpdb->insert_id;
	}
}

if ( ! function_exists( 'burst_create_goal_statistic' ) ) {
	/**
	 * Create goal statistic in {prefix}_burst_goal_statistics
	 *
	 * @param $data
	 *
	 * @return void
	 */
	function burst_create_goal_statistic( $data ) {
		global $wpdb;
		// do not create goal statistic if statistic_id or goal_id is not set
		if ( ! isset( $data['statistic_id'] ) || ! isset( $data['goal_id'] ) ) {
			return;
		}

		// first get row with same statistics_id and goal_id
		$goal_statistic = $wpdb->get_var(
			$wpdb->prepare( "select count(*)
							from {$wpdb->prefix}burst_goal_statistics
		                    where statistic_id = %s AND goal_id = %s" ), intval( $data['statistic_id'] ), intval( $data['goal_id'] ) );
		// goal already exists
		if ( $goal_statistic > 0 ) {
			return;
		}
		$wpdb->insert(
			$wpdb->prefix . 'burst_goal_statistics',
			$data
		);
	}
}

if ( ! function_exists( 'burst_remove_empty_values' ) ) {
	/**
	 * Remove null values from array
	 *
	 * @param array $data
	 *
	 * @return array
	 */
	function burst_remove_empty_values( array $data ): array {
		foreach ( $data as $key => $value ) {
			if ( $value === null || $value === '' ) {
				unset( $data[ $key ] );
			}
		}

		return $data;
	}
}
if ( ! function_exists( 'burst_required_values_set' ) ) {
	/**
	 * Check if required values are set
	 *
	 * @param array $data
	 *
	 * @return bool
	 */
	function burst_required_values_set( array $data ): bool {
		return (
			isset( $data['uid'] ) &&
			isset( $data['page_url'] ) &&
			isset( $data['entire_page_url'] )
		);
	}
}

if ( ! function_exists( 'burst_get_blocked_ips' ) ) {
	/**
	 * Get a Burst option by name
	 *
	 * @param string $name
	 * @param mixed  $default
	 *
	 * @return string
	 */

	function burst_get_blocked_ips() {
		$name    = 'ip_blocklist';
		$options = get_option( 'burst_options_settings', [] );
		$value   = isset( $options[ $name ] ) ? $options[ $name ] : false;
		if ( $value === false ) {
			$value = '';
		}

		return $value;
	}
}

if ( ! function_exists( 'burst_is_ip_blocked' ) ) {
	/**
	 * Check if IP is blocked
	 *
	 * @return bool
	 */
	function burst_is_ip_blocked(): bool {
		$ip          = burst_get_ip_address();
		$blocked_ips = preg_split( '/\r\n|\r|\n/', burst_get_blocked_ips() ); // split by line break
		if ( is_array( $blocked_ips ) ) {
			$blocked_ips_array = array_map( 'trim', $blocked_ips );
			$ip_blocklist      = apply_filters( 'burst_ip_blocklist', $blocked_ips_array );
			if ( in_array( $ip, $ip_blocklist ) ) {
				if ( WP_DEBUG ) {
					error_log( 'Burst Statistics: IP ' . $ip . ' is blocked for tracking' );
				}

				return true;
			}
		}

		return false;
	}
}

if ( ! function_exists( 'burst_get_ip_address' ) ) {
	/**
	 * Get the ip of visiting user
	 * https://stackoverflow.com/questions/11452938/how-to-use-http-x-forwarded-for-properly
	 *
	 * @return string
	 */

	function burst_get_ip_address(): string {
		//least common types first
		$variables = array(
			'HTTP_CF_CONNECTING_IP',
			'CF-IPCountry',
			'HTTP_TRUE_CLIENT_IP',
			'HTTP_X_CLUSTER_CLIENT_IP',
			'HTTP_CLIENT_IP',
			'HTTP_X_FORWARDED_FOR',
			'HTTP_X_FORWARDED',
			'HTTP_X_REAL_IP',
			'HTTP_FORWARDED_FOR',
			'HTTP_FORWARDED',
			'REMOTE_ADDR',
		);

		foreach ( $variables as $variable ) {
			$current_ip = burst_is_real_ip( $variable );
			if ( $current_ip ) {
				break;
			}
		}

		//in some cases, multiple ip's get passed. split it to get just one.
		if ( strpos( $current_ip, ',' ) !== false ) {
			$ips        = explode( ',', $current_ip );
			$current_ip = $ips[0];
		}

		// for testing purposes @todo delete
		//		$current_ip = "128.101.101.101"; //US ip
		//		$current_ip = "94.214.200.105"; //EU ip
		//		$current_ip = '185.86.151.11'; // UK ip
		//		$current_ip = '45.44.129.152'; // CA ip
		//		$current_ip = "189.189.111.174"; //Mexico

		return apply_filters( "burst_visitor_ip", $current_ip );
	}
}

if ( ! function_exists( 'burst_is_real_ip' ) ) {
	/**
	 * Get ip from var, and check if the found ip is a valid one
	 *
	 * @param string $var
	 *
	 * @return false|string
	 */

	function burst_is_real_ip( $var ) {
		$ip = getenv( $var );

		return ! $ip || trim( $ip ) === '127.0.0.1' ? false : $ip;
	}
}
