<?php defined('ABSPATH') or die("you do not have acces to this page!");

add_action('rest_api_init', 'burst_register_rest_routes');
function burst_register_rest_routes(){
    register_rest_route('burst/v1', 'hit', array(
        'methods' => 'POST',
        'callback' => 'burst_track_hit',
        'permission_callback' => '__return_true',
    ));
    register_rest_route('burst/v1', 'update', array(
        'methods' => 'POST',
        'callback' => 'burst_update_track_hit',
        'permission_callback' => '__return_true',
    ));
}

/**
 * Add a new page visit to the database
 * @param WP_REST_Request $request
 * @return WP_REST_Response $response
 */

function burst_track_hit(WP_REST_Request $request){
	// block list ip
	$ip = burst_get_ip_address();
	$ip_blocklist = apply_filters('burst_ip_blocklist', array() );
	if( in_array($ip, $ip_blocklist)){
		// blocked ip
		return new WP_REST_Response(array('error' => 'ip_blocked'), 403);
	}
	global $wpdb;
	$data = $request->get_json_params();
	$burst_uid = burst_sanitize_uid($data['uid']);
	$first_time_visit = burst_sanitize_uid($data['first_time_visit']);
	if ( $first_time_visit === 'fingerprint') {
		// check if fingerprint is already in the database in the past 30 days
		$after_time = time() - MONTH_IN_SECONDS;
		$sql = $wpdb->prepare( "SELECT ID FROM {$wpdb->prefix}burst_statistics WHERE uid = %s AND time > %s LIMIT 1", $burst_uid, $after_time );
		$fingerprint_exists = $wpdb->get_var( $sql );
		$first_time_visit = ! ( $fingerprint_exists > 0 );
	} else {
		$first_time_visit = $data['first_time_visit'] == '1';
	}

	$time = time();
    $referrer_url = trim( parse_url( $data['referrer_url'], PHP_URL_HOST ), 'www.' );
    $ref_spam_list = file(burst_path . 'helpers/referrer-spam-list/spammers.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if (array_search($referrer_url, $ref_spam_list)){
        $referrer_url = 'spammer';
    } else {
        $referrer_url = esc_url_raw($data['referrer_url']);
    }
    $user_agent_data = burst_get_user_agent_data($data['user_agent']);
	$page_url = trailingslashit(sanitize_text_field( $data['url'] ));
    $update_array = array(
        'page_url'            		=> $page_url,
        'entire_page_url'           => trailingslashit(esc_url_raw( $data['entire_url'] )),
        'page_id'                   => intval($data['page_id']),
        'time'               		=> $time,
        'uid'               		=> $burst_uid,
        'referrer'                  => trailingslashit($referrer_url),
        'user_agent'                => sanitize_text_field( $data['user_agent'] ),
        'browser'                   => $user_agent_data['browser'],
        'browser_version'           => $user_agent_data['version'],
        'platform'                  => $user_agent_data['platform'],
        'device'                    => $user_agent_data['device'],
        'device_resolution'         => sanitize_title($data['device_resolution']),
        'time_on_page'              => intval($data['time_on_page']),
        'first_time_visit'          => intval($first_time_visit),
    );

    //get session id from burst statistic where uid and time < 30 minutes ago
    $time_minus_threshold = strtotime("-30 minutes");
    $prepare = $wpdb->prepare( "select session_id, page_url from {$wpdb->prefix}burst_statistics where uid = %s AND time> %s limit 1", $update_array['uid'], $time_minus_threshold );
    $existing_session = $wpdb->get_row($prepare);
    $update_array['session_id'] = isset($existing_session) ? $existing_session->session_id : false;

    // update data for the sessions table
    $session_array = array(
		'last_visited_url' => $page_url,
        'goal_id' => false,
    );
    //if session id exists update it otherwise create a new session and get id
    if ( intval($update_array['session_id']) ) {
        $session_id = intval($update_array['session_id']);
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

    $prepare = $wpdb->prepare( "select ID from {$wpdb->prefix}burst_statistics where uid = %s AND time> %s limit 1", $burst_uid, strtotime("-1 second") );
    $existing_hit = $wpdb->get_row($prepare);

    if ( !$existing_hit ) {
        $wpdb->insert(
            $wpdb->prefix . 'burst_statistics',
            $update_array
        );
        // Add count to post meta
        $count = get_post_meta( $update_array['page_id'], 'burst_total_pageviews_count', true );
        if ( ! $count ) $count = 0;
        $count++;
        update_post_meta( $update_array['page_id'], 'burst_total_pageviews_count', $count );
        $insert_id = $wpdb->insert_id;
    }

    do_action('burst_track_hit', $data, $burst_uid, $time );

    return new WP_REST_Response(
        array(
            'insert_id' => $insert_id,
        ));
}

/**
 * Add a new page visit to the database
 * @param WP_REST_Request $request
 */

function burst_update_track_hit( WP_REST_Request $request ) {
    $data = $request->get_json_params();
    if ($data['ID'] == 'undefined' || $data['ID'] === 0) return;

	$update_array = array();
	if ( ! empty( $data['uid'] ) ) $update_array['uid'] = sanitize_key($data['uid']);
    if ( $data['time_on_page'] > 0 ) $update_array['time_on_page'] = (int) $data['time_on_page'];

	$id = (int) $data['ID'];
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



