<?php
/**
 * @param array $data
 * @param string $burst_uid
 * @param int $time
 */
function burst_track_experiment_hit( $data, $burst_uid, $time ) {
    $default_data = array(
        'test_version' => false,
        'experiment_id' => false,
        'conversion' => false,
        'url' => '',
        'referrer_url' => ''
    );
    $data = wp_parse_args($data, $default_data);

    $time_minus_threshold = strtotime("-30 minutes");
    $experiment_id = intval($data['experiment_id']);
    global $wpdb;

    $update_array = array(
        'page_url'            		=> sanitize_text_field( $data['url'] ),
        'page_id'                   =>  intval($data['page_id']),
        'time'               		=> $time,
        'uid'               		=> sanitize_title($burst_uid),
        'referrer'                  => esc_url_raw($data['referrer_url']),
        'anon_ip'                   => filter_var( $data['anon_ip'], FILTER_VALIDATE_IP),
        'user_agent'                => sanitize_text_field( $data['user_agent'] ),
    );
    $update_array['test_version']				= burst_sanitize_test_version($data['test_version']);
    $update_array['experiment_id']				= $experiment_id;

    // Only update conversion when it is true. Otherwise conversions will be deleted when the page has been revisited.
    if ($data['conversion'] == true){
        $update_array['conversion'] = intval($data['conversion']);
    }

    //check if the current users' uid/experiment id combination is already in the database.
    $prepare = $wpdb->prepare( "select `time` from {$wpdb->prefix}burst_statistics where uid = %s AND time > %s order by time desc limit 1", sanitize_title($burst_uid), $time_minus_threshold );
    $last_visit_time = $wpdb->get_var($prepare);

    // check if the last entry is smaller than the time_minus_threshold so that multiple visits will result in multiple entries and not just one.
    if ( $last_visit_time > 0 ) {
        error_log('already in db in the last second, so we update');
        $wpdb->update(
            $wpdb->prefix . 'burst_statistics',
            $update_array,
            array('time' => $last_visit_time)
        );
    } else {
        $wpdb->insert(
            $wpdb->prefix . 'burst_statistics',
            $update_array
        );
    }

	//check if we can stop this experiment.
	$experiment = new BURST_EXPERIMENT($experiment_id);
	if ( $time > $experiment->date_end ) {
		$experiment->stop();
	}

}
//add_action('burst_track_hit', 'burst_track_experiment_hit', 10, 3 );


add_action('rest_api_init', 'burst_register_pro_rest_routes');
function burst_register_pro_rest_routes(){
    register_rest_route('burst/v1', 'conversion', array(
        'methods' => 'POST',
        'callback' => 'burst_track_conversion',
        'permission_callback' => '__return_true',
    ));
}


function burst_track_conversion(WP_REST_Request $request){
    $data = $request->get_json_params();
    $burst_uid  = burst_get_uid();
    do_action('burst_track_hit', $data, $burst_uid, time() );

}

