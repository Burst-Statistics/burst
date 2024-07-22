<?php
// If uninstall is not called from WordPress, exit
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit();
}

global $wpdb;

// get all burst transients
$results = $wpdb->get_results(
	"SELECT `option_name` AS `name`, `option_value` AS `value`
                                FROM  $wpdb->options
                                WHERE `option_name` LIKE '%transient_burst%'
                                ORDER BY `option_name`",
	'ARRAY_A'
);
// loop through all burst transients and delete
foreach ( $results as $key => $value ) {
	$transient_name = substr( $value['name'], 11 );
	delete_transient( $transient_name );
}

$mu_plugin = trailingslashit( WPMU_PLUGIN_DIR ) . 'burst_rest_api_optimizer.php';
if ( file_exists($mu_plugin ) ) {
	unlink( $mu_plugin );
}
