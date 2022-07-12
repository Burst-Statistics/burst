<?php defined( 'ABSPATH' ) or die( "you do not have access to this page!" );
/**
 * Register rest routes
 * @return void
 */
function burst_register_rest_routes() {
	register_rest_route( 'burst/v1', 'hit', array(
		'methods'             => 'POST',
		'callback'            => 'burst_track_hit',
		'permission_callback' => '__return_true',
	) );
	register_rest_route( 'burst/v1', 'update', array(
		'methods'             => 'POST',
		'callback'            => 'burst_update_track_hit',
		'permission_callback' => '__return_true',
	) );
}
add_action( 'rest_api_init', 'burst_register_rest_routes' );

/**
 * Track a hit from burst
 *
 * @param WP_REST_Request $request
 *
 * @return WP_REST_Response
 */

function burst_track_hit( WP_REST_Request $request ) {
	if ( burst_is_ip_blocked() ) {
		return new WP_REST_Response( array( 'error' => 'ip_blocked' ), 403 );
	}

	global $wpdb;
	$data            = $request->get_json_params();
	$user_agent_data = burst_get_user_agent_data( $data['user_agent'] );
	$burst_uid       = burst_sanitize_uid( $data['uid'] );

	$default_array = [
		'time_on_page' => 0,
		'page_id'      => 0,
	];
	$update_array  = [
		'page_url'          => trailingslashit( sanitize_text_field( $data['url'] ) ),
		'entire_page_url'   => trailingslashit( esc_url_raw( $data['entire_url'] ) ),
		'page_id'           => intval( $data['page_id'] ),
		'time'              => time(),
		'uid'               => $burst_uid,
		'referrer'          => burst_get_referrer_url( $data['referrer_url'] ),
		'user_agent'        => sanitize_text_field( $data['user_agent'] ),
		'browser'           => $user_agent_data['browser'],
		'browser_version'   => $user_agent_data['version'],
		'platform'          => $user_agent_data['platform'],
		'device'            => $user_agent_data['device'],
		'device_resolution' => sanitize_title( $data['device_resolution'] ),
		'time_on_page'      => intval( $data['time_on_page'] ),
		'first_time_visit'  => burst_get_first_time_visit( $data['first_time_visit'], $burst_uid ),
	];
	$update_array  = array_merge( $default_array, $update_array );

	if ( empty( $update_array['uid'] ) ) {
		if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
			error_log( 'Burst Statistics: Empty UID detected' );
			error_log( 'Information that could be useful for debugging' );
			error_log( print_r( $update_array, true ) );
		}

		return new WP_REST_Response( array( 'error' => 'uid_empty' ), 403 );
	}

	//get session id from burst statistic where uid and time < 30 minutes ago
	$existing_session           = $wpdb->get_row(
		$wpdb->prepare(
			"select session_id, page_url 
					from {$wpdb->prefix}burst_statistics 
                    where uid = %s AND time> %s limit 1",
			$update_array['uid'],
			strtotime( "-30 minutes" )
		)
	);
	$update_array['session_id'] = isset( $existing_session ) ? $existing_session->session_id : false;

	// update data for the sessions table
	$session_array = array(
		'last_visited_url' => $update_array['page_url'],
		'goal_id'          => false,
	);

	//if session id exists update it otherwise create a new session and get id
	if ( intval( $update_array['session_id'] ) ) {
		$session_id = intval( $update_array['session_id'] );
		$wpdb->update(
			$wpdb->prefix . 'burst_sessions',
			$session_array,
			array( 'ID' => $session_id )
		);
	} else {
		$wpdb->insert(
			$wpdb->prefix . 'burst_sessions',
			$session_array
		);
		$update_array['session_id'] = $wpdb->insert_id;
	}

	$existing_hit = $wpdb->get_row( $wpdb->prepare( "select ID from {$wpdb->prefix}burst_statistics where uid = %s AND time> %s limit 1", $update_array['uid'], strtotime( "-1 second" ) ) );

	if ( ! $existing_hit ) {
		$wpdb->insert(
			$wpdb->prefix . 'burst_statistics',
			$update_array
		);
		// Add count to post meta
		$count = get_post_meta( $update_array['page_id'], 'burst_total_pageviews_count', true );
		if ( ! $count ) {
			$count = 0;
		}
		$count ++;
		update_post_meta( $update_array['page_id'], 'burst_total_pageviews_count', $count );
		$insert_id = $wpdb->insert_id;
	}

	do_action( 'burst_after_track_hit', $data, $update_array['uid'] );

	return new WP_REST_Response(
		array(
			'insert_id' => $insert_id,
		)
	);
}

/**
 * Add a new page visit to the database
 *
 * @param WP_REST_Request $request
 */

function burst_update_track_hit( WP_REST_Request $request ) {
	$data = $request->get_json_params();
	if ( $data['ID'] == 'undefined' || $data['ID'] === 0 ) {
		return;
	}

	$update_array = array();
	if ( ! empty( $data['uid'] ) ) {
		$update_array['uid'] = burst_sanitize_uid( $data['uid'] );
	}
	if ( $data['time_on_page'] > 0 ) {
		$update_array['time_on_page'] = (int) $data['time_on_page'];
	}

	$id    = (int) $data['ID'];
	$where = array(
		'ID' => $id,
	);

	global $wpdb;
	$wpdb->update(
		$wpdb->prefix . 'burst_statistics',
		$update_array,
		$where
	);
}



