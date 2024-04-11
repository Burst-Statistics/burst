<?php /** @noinspection ALL */
if ( ! defined( 'ABSPATH' ) ) {
	return;
}

use function burst\UserAgent\parse_user_agent;

if ( ! function_exists( 'burst_error_log' ) ) {
	/**
	 * Log error to error_log
	 *
	 * @param $message
	 */
	function burst_error_log( $message ) {

		if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
			$logging_enabled = apply_filters( 'burst_enable_logging', true );
			if ( $logging_enabled ) {
				if ( is_array( $message ) || is_object( $message ) ) {
					error_log( 'Burst Statistics: ' . print_r( $message, true ) );
				} else {
					error_log( 'Burst Statistics: ' . $message );
				}
			}
		}
	}
}

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

		// validate & sanitize all data
		$sanitized_data = burst_prepare_tracking_data( $data );
		$sanitized_data = apply_filters( 'before_burst_track_hit', $sanitized_data );

		if ( $sanitized_data['referrer'] === 'spammer' ) {
			burst_error_log( 'Referrer spam prevented.' );
			return 'referrer is spam';
		}

		// If new hit, get the last row
		$result = burst_get_hit_type($sanitized_data);

		if ($result === false) {
			burst_error_log('Failed to determine hit type.');
			return 'failed to determine hit type';
		}

		$hit_type = $result['hit_type']; // create or update
		$previous_hit = $result['last_row']; // last row. create can also have a last row from the previous hit.

		if ($previous_hit !== null) {
			// Determine non-bounce conditions
			$isDifferentPage = $previous_hit['entire_page_url'] !== $sanitized_data['entire_page_url'];
			$isTimeOverThreshold = ($previous_hit['time_on_page'] + $sanitized_data['time_on_page']) > 5000;
			$isPreviousHitNotBounce = (int) $previous_hit['bounce'] === 0;

			if ($isPreviousHitNotBounce || $isDifferentPage || $isTimeOverThreshold) {
				$sanitized_data['bounce'] = 0; // Not a bounce

				// If the user visited more than one page, update all previous hits to not be a bounce
				if ($isDifferentPage) {
					burst_set_bounce_for_session($previous_hit['session_id']);
				}
			}
		}

		$sanitized_data           = apply_filters( 'burst_before_track_hit', $sanitized_data );
		$session_arr   = array(
			'last_visited_url' => $sanitized_data['entire_page_url'],
			'goal_id'          => false,
			'country_code'     => $sanitized_data['country_code'] ?? '',
		);
		unset( $sanitized_data['country_code'] );
		// update burst_sessions table
		// Get the last record with the same uid within 30 minutes. If it exists, use session_id. If not, create a new session.

		// Improved clarity and error handling for session management
		if (isset($previous_hit) && $previous_hit['session_id'] > 0) {
			// Existing session found, reuse the session ID
			$sanitized_data['session_id'] = $previous_hit['session_id'];

			// Update existing session with new data
			if (!burst_update_session($sanitized_data['session_id'], $session_arr)) {
				// Handle error if session update fails
				burst_error_log("Failed to update session for session ID: " . $sanitized_data['session_id']);
			}
		} elseif ($previous_hit === null) {
			// No previous hit, indicating a new session
			$session_arr['first_visited_url'] = $sanitized_data['entire_page_url'];

			// Attempt to create a new session and assign its ID
			$sanitized_data['session_id'] = burst_create_session($session_arr);

			// Verify session creation was successful
			if (!$sanitized_data['session_id']) {
				// Handle error if session creation fails
				burst_error_log("Failed to create a new session.");
			}
		}


		// if there is a fingerprint use that instead of uid
		if ( $sanitized_data['fingerprint'] && ! $sanitized_data['uid'] ) {
			$sanitized_data['uid'] = $sanitized_data['fingerprint'];
		}
		unset( $sanitized_data['fingerprint'] );

		// update burst_statistics table
		// Get the last record with the same uid and page_url. If it exists update it. If not, create a new record and add time() to $sanitized_data['time']
		if ( $hit_type === 'update' && ( $previous_hit['entire_page_url'] === $sanitized_data['entire_page_url'] || $previous_hit['session_id'] === '' ) ) { // if update hit, make sure that the URL matches.
			// add up time_on_page to the existing record
			if ( $previous_hit ) {
				$sanitized_data['time_on_page'] += $previous_hit['time_on_page'];
			}
			$sanitized_data['ID'] = $previous_hit['ID'];
			burst_update_statistic( $sanitized_data );
		} else if ( $hit_type === 'create') {
			do_action('burst_before_create_statistic', $sanitized_data);
			// if it is not an update hit, create a new record
			$sanitized_data['time']             = time();
			$sanitized_data['first_time_visit'] = burst_get_first_time_visit( $sanitized_data['uid'] );

			$insert_id = burst_create_statistic( $sanitized_data );

			do_action('burst_after_create_statistic', $insert_id, $sanitized_data);

			// if postmeta burst_total_pageviews_count does not exist, create it with sql and set it to 1
			// if it exists, add 1 to it via sql
			$meta_key = 'burst_total_pageviews_count';
			// get post meta via sql
			$sql        = $wpdb->prepare( "SELECT meta_value FROM $wpdb->postmeta WHERE post_id = %d AND meta_key = %s", $sanitized_data['page_id'], $meta_key );
			$meta_value = $wpdb->get_var( $sql );

			if ( (int) $meta_value > 0 ) {
				$meta_value = (int) $meta_value + 1;
				$sql        = $wpdb->prepare( "UPDATE $wpdb->postmeta SET meta_value = %d WHERE post_id = %d AND meta_key = %s", $meta_value, $sanitized_data['page_id'], $meta_key );
				$wpdb->query( $sql );
			} else {
				$meta_value = 1;
				$sql        = $wpdb->prepare( "INSERT INTO $wpdb->postmeta (post_id, meta_key, meta_value) VALUES (%d, %s, %d)", $sanitized_data['page_id'], $meta_key, $meta_value );
				$wpdb->query( $sql );
			}
		}

		if ( array_key_exists( 'ID', $sanitized_data ) && $sanitized_data['ID'] > 0 ) {
			$statistic_id = $sanitized_data['ID'];
		} else {
			$statistic_id = $insert_id ?? 0;
		}
		if ( $statistic_id > 0 ) {
			$completed_goals = burst_get_completed_goals( $data['completed_goals'], $sanitized_data['page_url'] );
			// if $sanitized_data['completed_goals'] is not an empty array, update burst_goals table
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

if ( ! function_exists( 'burst_prepare_tracking_data' ) ) {
	function burst_prepare_tracking_data( $data ) {
		$user_agent_data         = isset( $data['user_agent'] ) ? burst_get_user_agent_data( $data['user_agent'] ) : array(
			'browser'         => '',
			'browser_version' => '',
			'platform'        => '',
			'device'          => '',
		);
		$defaults                = array(
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
		$data                    = wp_parse_args( $data, $defaults );
		$data['completed_goals'] = burst_sanitize_completed_goal_ids( $data['completed_goals'] );

		// update array
		$sanitized_data                      = array();
		$destructured_url         = burst_sanitize_url( $data['url'] );
		$sanitized_data['entire_page_url']   = $destructured_url['path'] . $destructured_url['parameters'] . $destructured_url['fragment']; // required
		$sanitized_data['page_url']          = $destructured_url['path']; // required
		$sanitized_data['parameters']        = $destructured_url['parameters'];
		$sanitized_data['fragment']          = $destructured_url['fragment'];
		$sanitized_data['page_id']           = burst_sanitize_page_id( $data['page_id'] ); // required
		$sanitized_data['uid']               = burst_sanitize_uid( $data['uid'] ); // required
		$sanitized_data['fingerprint']       = burst_sanitize_fingerprint( $data['fingerprint'] );
		$sanitized_data['referrer']          = burst_sanitize_referrer( $data['referrer_url'] );
		$sanitized_data['browser']           = $user_agent_data['browser']; // already sanitized
		$sanitized_data['browser_version']   = $user_agent_data['browser_version']; // already sanitized
		$sanitized_data['platform']          = $user_agent_data['platform']; // already sanitized
		$sanitized_data['device']            = $user_agent_data['device']; // already sanitized
		$sanitized_data['device_resolution'] = burst_sanitize_device_resolution( $data['device_resolution'] );
		$sanitized_data['time_on_page']      = burst_sanitize_time_on_page( $data['time_on_page'] );
		$sanitized_data['bounce']            = 1;

		return $sanitized_data;
	}
}
if (!function_exists('burst_get_hit_type')) {
	/**
	 * Determines if the current hit is an update or a create operation and retrieves the last row if applicable.
	 *
	 * @param array $data Data for the current hit.
	 * @return array|false Returns an array with 'hit_type' and 'last_row' if applicable, or false if conditions are not met.
	 */
	function burst_get_hit_type($data) {
		// Determine if it is an update hit based on the absence of certain data points
		$is_update_hit = empty($data['browser']) && empty($data['browser_version']) && empty($data['platform']) && empty($data['device']);

		// Attempt to get the last user statistic based on the presence or absence of certain conditions
		if ($is_update_hit) {
			// For an update hit, require matching uid, fingerprint, and entire_page_url
			$last_row = burst_get_last_user_statistic($data['uid'], $data['fingerprint'], $data['entire_page_url']);
		} else {
			// For a potential create hit, uid and fingerprint are sufficient
			$last_row = burst_get_last_user_statistic($data['uid'], $data['fingerprint']);
		}

		// Determine the appropriate action based on the result
		if ($last_row) {
			// A matching row exists, classify as update and return the last row
			$hit_type = $is_update_hit ? 'update' : 'create';
			return ['hit_type' => $hit_type, 'last_row' => $last_row];
		} elseif ($is_update_hit) {
			// No matching row exists for an update hit, indicating a data inconsistency or error
			return false; // Indicate failure to find a matching row for an update
		} else {
			// No row exists and it's not an update hit, classify as create with no last row
			return ['hit_type' => 'create', 'last_row' => null];
		}
	}
}


if ( ! function_exists( 'burst_sanitize_url' ) ) {
	/**
	 * @param $url
	 *
	 * @return array
	 */
	function burst_sanitize_url( $url ): array {
		$url_destructured = [
			'path'       => '',
			'parameters' => '',
			'fragment'   => '',
		];
		if ( ! function_exists( 'wp_kses_bad_protocol' ) ) {
			require_once( ABSPATH . '/wp-includes/kses.php' );
		}
		$sanitized_url = filter_var( $url, FILTER_SANITIZE_URL );
		// Validate the URL
		if ( ! filter_var( $sanitized_url, FILTER_VALIDATE_URL ) ) {
			return '';
		}
		if ( !function_exists('wp_parse_url')) {
			require_once( ABSPATH . '/wp-includes/http.php' );
		}
		$url = parse_url( esc_url_raw( $sanitized_url ) );

		// log if path, parameters or fragment are too long
		if ( strlen( $url['path'] ) > 255 ) {
			burst_error_log( 'URL path is too long: ' . $url['path']  . ' - Please report this to the plugin author.' );
		}
		if ( isset ( $url['query'] ) && strlen( $url['query'] ) > 255 ) {
			burst_error_log( 'URL parameters are too long: ' . $url['query'] .  ' - Please report this to the plugin author.' ) ;
		}
		if ( isset( $url['fragment'] ) && strlen( $url['fragment'] ) > 255 ) {
			burst_error_log( 'URL fragment is too long: ' . $url['fragment']  . ' - Please report this to the plugin author.' );
		}
		if ( isset( $url['host'] ) ) {
			$url_destructured['path']       = substr( trailingslashit( $url['path'] ), 0, 255 );
			$url_destructured['parameters'] = isset( $url['query'] ) ? substr( '?' . $url['query'], 0, 255 ) : '';
			$url_destructured['fragment']   = isset( $url['fragment'] ) ? substr( '#' . $url['fragment'], 0, 255 ) : '';
		}

		return $url_destructured;
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
		$referrer_host = parse_url( $referrer, PHP_URL_HOST );
		$current_host  = $_SERVER['HTTP_HOST'] ?? $_SERVER['SERVER_NAME'];
		// don't track if referrer is the same as current host
		// if referrer_url starts with current_host, then it is not a referrer
		if ( empty( $referrer_host ) || strpos( $referrer_host, $current_host ) === 0 ) {
			return null;
		}

		$ref_spam_list = file( burst_path . 'helpers/referrer-spam-list/spammers.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES );
		$ref_spam_list = apply_filters( 'burst_referrer_spam_list', $ref_spam_list );
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
		$server_side  = $server_side ? "AND server_side = 1" : "AND server_side = 0";
		$goals        = $wpdb->get_results( "SELECT * FROM {$wpdb->prefix}burst_goals WHERE status = 'active' {$server_side}", ARRAY_A );
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
		return wp_list_pluck($active_goals, 'ID' );
	}
}

if ( ! function_exists( 'burst_goal_is_completed' ) ) {
	/**
	 * Checks if a specified goal is completed based on the provided page URL.
	 *
	 * @param int $goal_id The ID of the goal to check.
	 * @param string $page_url The current page URL.
	 * @return bool Returns true if the goal is completed, false otherwise.
	 */
	function burst_goal_is_completed( $goal_id, $page_url ) {
		require_once burst_path . 'goals/class-goal.php';

		$goal = new burst_goal( $goal_id );

		// Check if the goal and page URL are properly set.
		if ( empty( $goal->type ) || empty( $goal->url ) || empty( $page_url ) ) {
			return false;
		}

		switch ( $goal->type ) {
			case 'visits':
				// Improved URL comparison logic could go here.
				// @TODO: Maybe add support for * and ? wildcards?
				if ( rtrim($page_url, '/') === rtrim($goal->url, '/') ) {
					return true;
				}
				break;
			// @todo Add more case statements for other types of goals.

			default:
				return false;
		}

		return false;
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
				if ( burst_goal_is_completed( $goal['ID'], $page_url ) ) {
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
			'browser'         => '',
			'browser_version' => '',
			'platform'        => '',
			'device'          => '',
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
		unset( $ua['version'] );

		return wp_parse_args( $ua, $defaults );
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
	function burst_get_last_user_statistic( $uid, $fingerprint, $page_url = false ) {
		global $wpdb;
		// if fingerprint is send get the last user statistic with the same fingerprint
		$search_uid = $fingerprint ?: $uid;
		if ( ! $search_uid ) {
			return null;
		}
		$where = $page_url ? $wpdb->prepare( " AND entire_page_url = %s", $page_url ) : '';
		$data  = $wpdb->get_row(
			$wpdb->prepare(
				"select ID, session_id, entire_page_url, time_on_page, bounce
      from {$wpdb->prefix}burst_statistics
                     where uid = %s AND time > %s {$where} ORDER BY ID DESC limit 1",
				$search_uid,
				strtotime( "-30 minutes" )
			)
		);
		return $data ? (array) $data : null;
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

if (!function_exists('burst_update_session')) {
	/**
	 * Update session in {prefix}_burst_sessions
	 *
	 * @param int|string $session_id The session ID to update.
	 * @param array $data Data to update in the session.
	 *
	 * @return bool|int False if the operation failed, or the number of rows affected.
	 */
	function burst_update_session($session_id, $data) {
		global $wpdb;

		// Remove empty values from the data array
		$data = burst_remove_empty_values($data);

		// Perform the update operation
		$result = $wpdb->update(
			$wpdb->prefix . 'burst_sessions',
			$data,
			['ID' => (int)$session_id]
		);

		// Return the number of rows affected
		return $result !== false;
	}
}

if (!function_exists('burst_create_statistic')) {
	/**
	 * Create a statistic in {prefix}_burst_statistics
	 *
	 * @param array $data Data to insert.
	 * @return int|false The newly created statistic ID on success, or false on failure.
	 */
	function burst_create_statistic($data) {
		global $wpdb;
		$data = burst_remove_empty_values($data);

		if (!burst_required_values_set($data)) {
			burst_error_log('Missing required values for statistic creation. Data: ' . print_r($data, true));
			return false;
		}

		$inserted = $wpdb->insert($wpdb->prefix . 'burst_statistics', $data);

		if ($inserted) {
			return $wpdb->insert_id;
		} else {
			burst_error_log('Failed to create statistic. Error: ' . $wpdb->last_error);
			return false;
		}
	}
}
if (!function_exists('burst_update_statistic')) {
	/**
	 * Update a statistic in {prefix}_burst_statistics
	 *
	 * @param array $data Data to update, must include 'ID' for the statistic.
	 * @return bool|int The number of rows updated, or false on failure.
	 */
	function burst_update_statistic($data) {
		global $wpdb;
		$data = burst_remove_empty_values($data);

		// Ensure 'ID' is present for update
		if (!isset($data['ID'])) {
			burst_error_log('Missing ID for statistic update. Data: ' . print_r($data, true));
			return false;
		}

		// 'page_id' should not be updated; ensure it's not included in $data
		unset($data['page_id']);

		$updated = $wpdb->update($wpdb->prefix . 'burst_statistics', $data, ['ID' => (int) $data['ID']]);

		if ($updated === false) {
			burst_error_log('Failed to update statistic. Error: ' . $wpdb->last_error);
			return false;
		}

		return $updated; // Number of rows affected
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
		// check if goals already exists
		$goal_exists = $wpdb->get_var(
			$wpdb->prepare(
				"SELECT 1 FROM {$wpdb->prefix}burst_goal_statistics WHERE statistic_id = %d AND goal_id = %d LIMIT 1",
				$data['statistic_id'],
				$data['goal_id']
			)
		);

		// goal already exists
		if ( $goal_exists ) {
			return;
		}
		$wpdb->insert(
			$wpdb->prefix . 'burst_goal_statistics',
			$data
		);
	}
}

if ( ! function_exists('burst_set_bounce_for_session') ) {
	/**
	 * Sets the bounce flag to 0 for all hits within a session.
	 *
	 * @param string|int $session_id The ID of the session.
	 * @return bool True on success, false on failure.
	 */
	function burst_set_bounce_for_session($session_id){
		global $wpdb;

		// Prepare table name to ensure it's properly quoted
		$table_name = $wpdb->prefix . 'burst_statistics';

		// Update query
		$result = $wpdb->update(
			$table_name,
			['bounce' => 0], // data
			['session_id' => $session_id] // where
		);

		// Check for errors
		if ($result === false) {
			// Handle error, log it or take other actions
			burst_error_log('Error setting bounce to 0 for session ' . $session_id);
			return false;
		}

		return true;
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
			foreach ($ip_blocklist as $ip_range) {
				if (burst_ip_in_range($ip, $ip_range)) {
					burst_error_log( 'IP ' . $ip . ' is blocked for tracking' );

					return true;
				}
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

/**
 * Checks if a given IP address is within a specified IP range.
 *
 * This function supports both IPv4 and IPv6 addresses, and can handle ranges in
 * both standard notation (e.g. "192.0.2.0") and CIDR notation (e.g. "192.0.2.0/24").
 *
 * In CIDR notation, the function uses a bitmask to check if the IP address falls within
 * the range. For IPv4 addresses, it uses the `ip2long()` function to convert the IP
 * address and subnet to their integer representations, and then uses the bitmask to
 * compare them. For IPv6 addresses, it uses the `inet_pton()` function to convert the IP
 * address and subnet to their binary representations, and uses a similar bitmask approach.
 *
 * If the range is not in CIDR notation, it simply checks if the IP equals the range.
 *
 * @param  string $ip  The IP address to check.
 * @param  string $range  The range to check the IP address against.
 *
 * @return bool True if the IP address is within the range, false otherwise.
 */
function burst_ip_in_range( string $ip, string $range ): bool {
	// Check if the IP address is properly formatted.
	if ( ! filter_var( $ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4 | FILTER_FLAG_IPV6 ) ) {
		return false;
	}
	// Check if the range is in CIDR notation.
	if ( strpos( $range, '/' ) !== false ) {
		// The range is in CIDR notation, so we split it into the subnet and the bit count.
		[ $subnet, $bits ] = explode( '/', $range );

		if ( ! is_numeric( $bits ) || $bits < 0 || $bits > 128 ) {
			return false;
		}

		// Check if the subnet is a valid IPv4 address.
		if ( filter_var( $subnet, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4 ) ) {
			// Convert the IP address and subnet to their integer representations.
			$ip     = ip2long( $ip );
			$subnet = ip2long( $subnet );

			// Create a mask based on the number of bits.
			$mask = - 1 << ( 32 - $bits );

			// Apply the mask to the subnet.
			$subnet &= $mask;

			// Compare the masked IP address and subnet.
			return ( $ip & $mask ) === $subnet;
		}

		// Check if the subnet is a valid IPv6 address.
		if ( filter_var( $subnet, FILTER_VALIDATE_IP, FILTER_FLAG_IPV6 ) ) {
			// Convert the IP address and subnet to their binary representations.
			$ip     = inet_pton( $ip );
			$subnet = inet_pton( $subnet );
			// Divide the number of bits by 8 to find the number of full bytes.
			$full_bytes = floor( $bits / 8 );
			// Find the number of remaining bits after the full bytes.
			$partial_byte = $bits % 8;
			// Initialize the mask.
			$mask = '';
			// Add the full bytes to the mask, each byte being "\xff" (255 in binary).
			$mask .= str_repeat( "\xff", $full_bytes );
			// If there are any remaining bits...
			if ( 0 !== $partial_byte ) {
				// Add a byte to the mask with the correct number of 1 bits.
				// First, create a string with the correct number of 1s.
				// Then, pad the string to 8 bits with 0s.
				// Convert the binary string to a decimal number.
				// Convert the decimal number to a character and add it to the mask.
				$mask .= chr( bindec( str_pad( str_repeat( '1', $partial_byte ), 8, '0' ) ) );
			}

			// Fill in the rest of the mask with "\x00" (0 in binary).
			// The total length of the mask should be 16 bytes, so subtract the number of bytes already added.
			// If we added a partial byte, we need to subtract 1 more from the number of bytes to add.
			$mask .= str_repeat( "\x00", 16 - $full_bytes - ( 0 !== $partial_byte ? 1 : 0 ) );

			// Compare the masked IP address and subnet.
			return ( $ip & $mask ) === $subnet;
		}

		// The subnet was not a valid IP address.
		return false;
	}

	if ( ! filter_var( $range, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4 | FILTER_FLAG_IPV6 ) ) {
		// The range was not in CIDR notation and was not a valid IP address.
		return false;
	}

	// The range is not in CIDR notation, so we simply check if the IP equals the range.
	return $ip === $range;
}
