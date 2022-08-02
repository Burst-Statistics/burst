<?php if ( ! defined( 'ABSPATH' ) ) {
	return;
}
use burst\UserAgent\UserAgentParser;

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
	add_action('rest_api_init', 'burst_register_track_hit_route');
}

if ( ! function_exists( 'burst_track_hit' ) ) {
	/**
	 * Burst Statistics endpoint for collecting hits
	 * @return string
	 */
	function burst_track_hit( $data ) {
		$user_agent_data = isset( $data['user_agent'] ) ? burst_get_user_agent_data( $data['user_agent'] ) : array(
			'browser'  => '',
			'version'  => '',
			'platform' => '',
			'device'   => '',
		);
		$data            = apply_filters( 'burst_require_indexes', $data );

		// update array
		$arr                      = array();
		$arr['entire_page_url']   = apply_filters( 'burst_sanitize_entire_page_url', $data['url'] ); // required
		$arr['page_url']          = apply_filters( 'burst_sanitize_page_url', $arr['entire_page_url'] ); // required
		$arr['page_id']           = apply_filters( 'burst_sanitize_page_id', $data['page_id'] ); // required
		$arr['uid']               = apply_filters( 'burst_sanitize_uid', $data['uid'] ); // required
		$arr['fingerprint']       = apply_filters( 'burst_sanitize_fingerprint', $data['fingerprint'] );
		$arr['referrer']          = apply_filters( 'burst_sanitize_referrer', $data['referrer_url'] );
		$arr['user_agent']        = apply_filters( 'burst_sanitize_user_agent', $data['user_agent'] );
		$arr['browser']           = apply_filters( 'burst_sanitize_browser', $user_agent_data['browser'] );
		$arr['browser_version']   = apply_filters( 'burst_sanitize_browser_version', $user_agent_data['version'] );
		$arr['platform']          = apply_filters( 'burst_sanitize_platform', $user_agent_data['platform'] );
		$arr['device']            = apply_filters( 'burst_sanitize_device', $user_agent_data['device'] );
		$arr['device_resolution'] = apply_filters( 'burst_sanitize_device_resolution', $data['device_resolution'] );
		$arr['time_on_page']      = apply_filters( 'burst_sanitize_time_on_page', $data['time_on_page'] );

		$session_arr = array(
			'last_visited_url' => $arr['page_url'],
			'goal_id'          => false,
		);
		// update burst_sessions table
		// Get the last record with the same uid within 30 minutes. If it exists, use session_id. If not, create a new session.
		$last_statistic = burst_get_last_user_statistic( $arr['uid'], $arr['fingerprint'] );

		if ( $last_statistic['session_id'] > 0 ) {
			$arr['session_id'] = $last_statistic['session_id'];
			burst_update_session( $arr['session_id'], $session_arr );
		} elseif ( $last_statistic ) {
			$arr['session_id'] = burst_create_session( $session_arr );
		}

		// if there is a fingerprint use that instead of uid
		if ( $arr['fingerprint'] && ! $arr['uid']) {
			$arr['uid'] = $arr['fingerprint'];
		}
		unset( $arr['fingerprint'] );

		// update burst_statistics table
		// Get the last record with the same uid and page_url. If it exists update it. If not, create a new record and add time() to $arr['time']
		if ( $last_statistic['page_url'] === $arr['page_url'] || $last_statistic['session_id'] === '' ) {
			// add up time_on_page to the existing record
			if ( $last_statistic ) {
				$arr['time_on_page'] += $last_statistic['time_on_page'];
			}
			$arr['ID'] = $last_statistic['ID'];
			burst_update_statistic( $arr );
		} else {
			$arr['time'] = time();
			$arr['first_time_visit'] = burst_get_first_time_visit( $arr['uid'] );

			burst_create_statistic( $arr );
		}
		return 'success';
	}
}
if ( ! function_exists( 'burst_beacon_track_hit' ) ) {
	/**
	 * Burst Statistics beacon endpoint for collecting hits
	 */
	function burst_beacon_track_hit() {
		if ( burst_is_ip_blocked() ) {
			return false;
		}

		$request = (string) file_get_contents( 'php://input' );
		if ( $request === 'request=test' ) {
			return 'success';
		}

		$data = json_decode( json_decode( $request, true ), true ); // The data is encoded in JSON and decoded twice to get the array.
		burst_track_hit( $data );
	}
}

if ( ! function_exists( 'burst_rest_track_hit' ) ) {
	/**
	 * Burst Statistics rest_api endpoint for collecting hits
	 *
	 * @param  array $data
	 *
	 * @return WP_REST_Response
	 */
	function burst_rest_track_hit( WP_REST_Request $request ) {
		if ( burst_is_ip_blocked() ) {
			return new WP_REST_Response( array( 'error' => 'ip_blocked' ), 403 );
		}
		$data = $request->get_json_params();
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
	function burst_sanitize_entire_page_url( $url ) {
		return filter_var( $url, FILTER_SANITIZE_URL );
	}

	add_filter( 'burst_sanitize_entire_page_url', 'burst_sanitize_entire_page_url' );
}

if ( ! function_exists( 'burst_sanitize_page_url' ) ) {
	/**
	 * Sanitize page_url
	 *
	 * @param string $page_url
	 *
	 * @return string
	 */
	function burst_sanitize_page_url( $url ) {
		$url = parse_url( $url );
		if ( isset( $url['host'] ) ) {
			return trailingslashit( $url['path'] );
		} else {
			return '';
		}
	}

	add_filter( 'burst_sanitize_page_url', 'burst_sanitize_page_url' );
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
		if ( ! is_numeric( $page_id ) ) {
			return '';
		}

		return (int) $page_id;
	}

	add_filter( 'burst_sanitize_page_id', 'burst_sanitize_page_id' );
}

if ( ! function_exists( 'burst_sanitize_time' ) ) {
	/**
	 * Sanitize time
	 *
	 * @param $time
	 *
	 * @return int
	 */
	function burst_sanitize_time( $time ) {
		return intval( $time );
	}

	add_filter( 'burst_sanitize_time', 'burst_sanitize_time' );
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
		if ( ! preg_match( '/^[a-z0-9-]*/', $uid ) ) {
			if ( WP_DEBUG ) {
			}

			return false;
		}

		return $uid;
	}

	add_filter( 'burst_sanitize_uid', 'burst_sanitize_uid' );
}

if ( ! function_exists( 'burst_sanitize_fingerprint' ) ) {
	/**
	 * Sanitize fingerprint
	 *
	 * @param $fingerprint
	 *
	 * @return string|false
	 */
	function burst_sanitize_fingerprint( $fingerprint ) {
		if ( ! preg_match( '/^[a-z0-9-]*/', $fingerprint ) || ! $fingerprint ) {
			return false;
		}

		return 'f-'. $fingerprint;
	}

	add_filter( 'burst_sanitize_fingerprint', 'burst_sanitize_fingerprint' );
}

if ( ! function_exists( 'burst_sanitize_referrer' ) ) {
	/**
	 * Sanitize referrer
	 *
	 * @param $referrer
	 *
	 * @return string
	 */
	function burst_sanitize_referrer( $referrer ) {
		return filter_var( $referrer, FILTER_SANITIZE_URL );
	}

	add_filter( 'burst_sanitize_referrer', 'burst_sanitize_referrer' );
}

if ( ! function_exists( 'burst_sanitize_device_resolution' ) ) {
	/**
	 * Sanitize device resolution
	 *
	 * @param $device_resolution
	 *
	 * @return string
	 */
	function burst_sanitize_device_resolution( $device_resolution ) {
		return filter_var( $device_resolution, FILTER_SANITIZE_STRING );
	}

	add_filter( 'burst_sanitize_device_resolution', 'burst_sanitize_device_resolution' );
}

if ( ! function_exists( 'burst_sanitize_time_on_page' ) ) {
	/**
	 * Sanitize time on page
	 *
	 * @param $time_on_page
	 *
	 * @return int
	 */
	function burst_sanitize_time_on_page( $time_on_page ) {

		return intval( $time_on_page );
	}

	add_filter( 'burst_sanitize_time_on_page', 'burst_sanitize_time_on_page' );
}
if ( ! function_exists( 'burst_sanitize_first_time_visit' ) ) {
	/**
	 * Sanitize first time visit
	 *
	 * @param $first_time_visit
	 *
	 * @return int
	 */
	function burst_sanitize_first_time_visit( $first_time_visit ) {
		if ( $first_time_visit === 1 ) {
			return 1;
		}

		return false;
	}

	add_filter( 'burst_sanitize_first_time_visit', 'burst_sanitize_first_time_visit' );
}

if ( ! function_exists( 'burst_get_user_agent_data' ) ) {
	/**
	 * Get user agent data
	 *
	 * @param $user_agent
	 *
	 * @return null[]|string[]
	 */
	function burst_get_user_agent_data( $user_agent ) {
		$ua = \burst\UserAgent\parse_user_agent( $user_agent );

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
		$ua = array_merge( array(
			'browser' => '',
			'version' => '',
			'platform' => '',
			'device'   => '',
		), $ua );
		return $ua;
	}
}

if ( ! function_exists( 'burst_get_first_time_visit' ) ) {
	/**
	 * Get first time visit
	 *
	 * @param $user_id
	 *
	 * @return bool
	 */
	function burst_get_first_time_visit( $burst_uid ) {
		global $wpdb;
		// check if uid is already in the database in the past 30 days
		$after_time         = time() - MONTH_IN_SECONDS;
		$sql                = $wpdb->prepare( "SELECT ID FROM {$wpdb->prefix}burst_statistics WHERE uid = %s AND time > %s LIMIT 1", $burst_uid, $after_time );
		$fingerprint_exists = $wpdb->get_var( $sql );
		return ! ( $fingerprint_exists > 0 ) ? 1 : 0;
	}
}

if ( ! function_exists( 'burst_require_indexes' ) ) {
	/**
	 * Require indexes for burst_statistics table
	 *
	 * @param $user_id
	 *
	 * @return bool
	 */
	function burst_require_indexes( $data ) {
		$required_indexes = array(
			'url',
			'page_id',
			'time',
			'uid',
			'fingerprint',
			'referrer_url',
			'user_agent',
			'device_resolution',
			'time_on_page',
		);
		// if required indexes are not present, add them
		foreach ( $required_indexes as $index ) {
			if ( ! isset( $data[ $index ] ) ) {
				$data[ $index ] = null;
			}
		}

		return $data;
	}

	add_filter( 'burst_require_indexes', 'burst_require_indexes' );
}

if ( ! function_exists( 'burst_get_last_user_statistic' ) ) {
	/**
	 * Get last user statistic from {prefix}_burst_statistics
	 *
	 * @param $user_id
	 *
	 * @return array
	 */
	function burst_get_last_user_statistic( $uid, $fingerprint ) {
		global $wpdb;
		// if fingerprint is send get the last user statistic with the same fingerprint
		$search_uid =  $fingerprint ?: $uid;
		$default_data = array(
			'ID'         => null,
			'session_id' => null,
			'page_url'   => null,
			'time_on_page'   => null,
		);
		if ( ! $search_uid  ) {
			return $default_data;
		}
		$data = $wpdb->get_row(
			$wpdb->prepare(
				"select ID, session_id, page_url, time_on_page
							from {$wpdb->prefix}burst_statistics
		                    where uid = %s AND time > %s ORDER BY ID DESC limit 1",
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
	 * @param $user_id
	 *
	 * @return bool
	 */
	function burst_update_session( $session_id, $data ) {
		global $wpdb;
		$data = burst_remove_empty_values( $data );
		$wpdb->update(
			$wpdb->prefix . 'burst_sessions',
			$data,
			array( 'ID' => $session_id )
		);
	}
}

if ( ! function_exists( 'burst_create_statistic' ) ) {
	/**
	 * Create statistic in {prefix}_burst_statistics
	 *
	 * @param $user_id
	 *
	 * @return bool
	 */
	function burst_create_statistic( $data ) {
		global $wpdb;
		$data = burst_remove_empty_values( $data );
		$wpdb->insert(
			$wpdb->prefix . 'burst_statistics',
			$data
		);
	}
}

if ( ! function_exists( 'burst_update_statistic' ) ) {
	/**
	 * Update statistics in {prefix}_burst_statistics
	 *
	 * @param $user_id
	 *
	 * @return bool
	 */
	function burst_update_statistic( $data ) {
		global $wpdb;
		$data = burst_remove_empty_values( $data );
		$wpdb->update(
			$wpdb->prefix . 'burst_statistics',
			$data,
			array( 'ID' => $data['ID'] )
		);
	}
}

if ( ! function_exists( 'burst_remove_empty_values' ) ) {
	/**
	 * Remove null values from array
	 *
	 * @param $user_id
	 *
	 * @return bool
	 */
	function burst_remove_empty_values( $data ) {
		foreach ( $data as $key => $value ) {
			if ( $value === null || $value === '' ) {
				unset( $data[ $key ] );
			}
		}
		return $data;
	}
}

if ( ! function_exists( 'burst_is_ip_blocked' ) ) {
	/**
	 * Check if IP is blocked
	 *
	 * @return bool
	 */
	function burst_is_ip_blocked() {
		$ip           = burst_get_ip_address();
		$ip_blocklist = apply_filters( 'burst_ip_blocklist', array() );
		if ( in_array( $ip, $ip_blocklist ) ) {
			if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
				error_log( 'IP ' . $ip . ' is blocked for tracking' );
			}
			return true;
		}
		return false;
	}
}

if ( ! function_exists( 'burst_get_ip_address' ) ) {
	/**
	 * Get IP address
	 *
	 * @return string
	 */
	function burst_get_ip_address()
	{
		if ( !empty( $_SERVER['HTTP_CLIENT_IP'] ) ) {
			$ip = $_SERVER['HTTP_CLIENT_IP'];
		} elseif ( !empty( $_SERVER['HTTP_X_FORWARDED_FOR'] ) ) {
			$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
		} else {
			$ip = $_SERVER['REMOTE_ADDR'];
		}
		return $ip;
	}
}

if ( ! function_exists( 'burst_get_tracking_status' ) ) {
	/**
	 * Get tracking status
	 *
	 * @return string
	 */
	function burst_get_tracking_status() {
		$status = get_option( 'burst_tracking_status' );
		$last_test = get_option( 'burst_tracking_status_last_test' );
		// if last test was more than 24 hours ago, test again or there is an error
		if ( $last_test && $last_test > strtotime( '-1 day' ) ) {
			return $status;
		}

		return burst_test_tracking_status();
	}
}

if ( ! function_exists( 'burst_get_tracking_type' ) ) {
	/**
	 * Get tracking status
	 *
	 * @return string
	 */
	function burst_get_tracking_type() {
		$status = get_option( 'burst_tracking_status' );
		$last_test = get_option( 'burst_tracking_status_last_test' );
		// if last test was more than 24 hours ago, test again or there is an error
		if ( $last_test && $last_test > strtotime( '-1 day' ) ) {
			return $status;
		}

		return 'error';
	}
}

if ( ! function_exists( 'burst_test_tracking_status' ) ) {
	/**
	 * Test tracking status
	 * Only returns 'error', 'rest', 'beacon'
	 * @return string
	 */
	function burst_test_tracking_status() {
		$endpoint = burst_endpoint_test_request(); // true or false
		if ( $endpoint ) {
			$status = 'beacon';
		} else {
			$rest_api = burst_rest_api_test_request(); // true or false
			$status = $rest_api ? 'rest' : 'error';
		}

		update_option( 'burst_tracking_status', $status, true );
		update_option( 'burst_tracking_status_last_test', time(), false );

		return $status;
	}
}

if ( ! function_exists( 'burst_endpoint_test_request' ) ) {
	/**
	 * Test endpoint
	 *
	 * @return bool
	 */
	function burst_endpoint_test_request() {
		$url = site_url( 'burst-statistics-endpoint.php' );
		$data = array('request' => 'test');

		// use key 'http' even if you send the request to https://...
		$options = array(
			'http' => array(
				'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
				'method'  => 'POST',
				'content' => http_build_query($data)
			)
		);
		$context  = stream_context_create($options);
		$result = @file_get_contents($url, false, $context);
		if ($result === FALSE) {
			if ( WP_DEBUG ) {
				error_log( 'Error: Endpoint does not respond with 200' );
			}
			return false;
		}
		return true;
	}
}

if ( ! function_exists( 'burst_rest_api_test_request' ) ) {
	/**
	 * Test REST API
	 *
	 * @return bool
	 */
	function burst_rest_api_test_request() {
		$url = get_rest_url( null, 'burst/v1/track');
		$data = array('request' => 'test');
		$response = wp_remote_post( $url, array(
			'headers' => array('Content-Type' => 'application/json; charset=utf-8'),
			'method' => 'POST',
			'body' => json_encode($data),
			'data_format' => 'body',
			'timeout' => 5,
		) );
		if ( is_wp_error( $response ) ) {
			return false;
		}
		if ( $response['response']['code'] === 200 ) {
			return true;
		}
		return false;
	}
}

if ( ! function_exists( 'burst_tracking_status_error' ) ) {
	/**
	 * Get tracking status message
	 *
	 * @return bool
	 */
	function burst_tracking_status_error() {
		$status = burst_get_tracking_status();
		return $status === 'error';
	}
}

if ( ! function_exists( 'burst_tracking_status_rest_api' ) ) {
	/**
	 * Get tracking status message
	 *
	 * @return bool
	 */
	function burst_tracking_status_rest_api() {
		$status = burst_get_tracking_status();
		return $status === 'rest';
	}
}

if ( ! function_exists( 'burst_tracking_status_beacon' ) ) {
	/**
	 * Get tracking status message
	 *
	 * @return bool
	 */
	function burst_tracking_status_beacon() {
		$status = burst_get_tracking_status();
		return $status === 'beacon';
	}
}