<?php defined('ABSPATH') or die("you do not have acces to this page!");

add_action('rest_api_init', 'burst_register_rest_routes');
function burst_register_rest_routes(){
	register_rest_route('burst/v1', 'hit', array(
        'methods' => 'POST',
        'callback' => 'burst_track_hit',
        'permission_callback' => '__return_true',
    ));
    register_rest_route('burst/v1', 'time', array(
        'methods' => 'POST',
        'callback' => 'burst_update_time_on_page',
        'permission_callback' => '__return_true',
    ));
}

/**
 * Add a new page visit to the database
 * @param WP_REST_Request $request
 * @return WP_REST_Response $response
 */

function burst_track_hit(WP_REST_Request $request){
	$data = $request->get_json_params();
	$burst_info = burst_get_user_info();
	$burst_uid = $burst_info['uid'];
    $first_time_visit = $burst_info['first_time_visit'];
	$time = time();
    $referrer_url = trim( parse_url( $data['referrer_url'], PHP_URL_HOST ), 'www.' );
    $ref_spam_list = file(burst_path . 'helpers/referrer-spam-list/spammers.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if (array_search($referrer_url, $ref_spam_list)){
        $referrer_url = 'spammer';
    } else {
        $referrer_url = esc_url_raw($data['referrer_url']);
    }
    $user_agent_data = burst_get_user_agent_data($data['user_agent']);
	$update_array = array(
		'page_url'            		=> trailingslashit(sanitize_text_field( $data['url'] )),
        'entire_page_url'           => trailingslashit(esc_url_raw( $data['entire_url'] )),
		'page_id'                   => intval($data['page_id']),
		'time'               		=> $time,
		'uid'               		=> sanitize_title($burst_uid),
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
    global $wpdb;
    $prepare = $wpdb->prepare( "select session_id, page_url from {$wpdb->prefix}burst_statistics where uid = %s AND time> %s limit 1", $update_array['uid'], $time_minus_threshold );
    $existing_session = $wpdb->get_row($prepare);
    $update_array['session_id'] = isset($existing_session) ? $existing_session->session_id : false;

    //if session id exists update it otherwise create a new session and get id
    $session_array = array(
        'goal_id' => false,
    );
    if ( intval($update_array['session_id']) ) {
        $wpdb->update(
            $wpdb->prefix . 'burst_sessions',
            $session_array,
            array('ID' => $update_array['session_id']),
        );
    } else {
         $wpdb->insert(
            $wpdb->prefix . 'burst_sessions',
            $session_array
        );
        $update_array['session_id'] = $wpdb->insert_id;
    }

    $prepare = $wpdb->prepare( "select `time`, `ID` from {$wpdb->prefix}burst_statistics where uid = %s AND time> %s limit 1", sanitize_title($burst_uid), strtotime("-1 second") );
    $existing_hit = $wpdb->get_row($prepare);

	if ( !$existing_hit ) {
        $wpdb->insert(
            $wpdb->prefix . 'burst_statistics',
            $update_array
        );
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

function burst_update_time_on_page(WP_REST_Request $request)
{
    $data = $request->get_json_params();
    if ($data['ID'] == 'undefined') return;
    $id = (int) $data['ID'];
    $update_array = array(
        'time_on_page' => (int) $data['time_on_page'],
    );
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


