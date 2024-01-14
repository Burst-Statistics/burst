<?php
// If uninstall is not called from WordPress, exit
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit();
}

//don't uninstall when upgrading
if ( get_option( 'burst_run_premium_upgrade' )  ) {
	exit();
}

$post_meta = [
	'burst_total_pageviews_count',
];

if ( ! function_exists( 'delete_post_meta_by_key' ) ) {
	require_once ABSPATH . WPINC . '/post.php';
}
foreach ( $post_meta as $post_meta_key ) {
	delete_post_meta_by_key( $post_meta_key );
}

$options = array(
	'burst_activation_time',
	'burst_set_defaults',
	'burst_review_notice_shown',
	'burst_run_premium_upgrade',
	'burst_tracking_status',
	'burst_goals_db_version',
	'burst_table_size',
	'burst_import_geo_ip_on_activation',
	'burst_geo_ip_import_error',
	'burst_archive_dir',
	'burst_geo_ip_file',
	'burst_last_update_geo_ip',
	'burst_license_attempts',
	'burst_ajax_fallback_active',
	'burst_tour_shown_once',
	'burst_options_settings',
	'burst-current-version',
);


foreach ( $options as $option_name ) {
	delete_option( $option_name );
	delete_site_option( $option_name );
}

global $wpdb;
$table_names = array(
	$wpdb->prefix . 'burst_statistics',
	$wpdb->prefix . 'burst_sessions',
	$wpdb->prefix . 'burst_goals',
	$wpdb->prefix . 'burst_archived_months',
	$wpdb->prefix . 'burst_goal_statistics',
);

foreach ( $table_names as $table_name ) {
	$sql = "DROP TABLE IF EXISTS $table_name";
	$wpdb->query( $sql );
}

// get all burst transients
$results = $wpdb->get_results(
	"SELECT `option_name` AS `name`, `option_value` AS `value`
                                FROM  $wpdb->options
                                WHERE `option_name` LIKE '%transient_burst%'
                                ORDER BY `option_name`", 'ARRAY_A'
);
// loop through all burst transients and delete
foreach ($results as $key => $value){
	$transient_name = substr($value['name'], 11);
	delete_transient($transient_name);
}
