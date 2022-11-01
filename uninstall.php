<?php
// If uninstall is not called from WordPress, exit
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit();
}


$options = array(
	'burst_activation_time',
);


foreach ( $options as $option_name ) {
	delete_option( $option_name );
	delete_site_option( $option_name );
}

global $wpdb;
$table_names = array(
	//$wpdb->prefix . 'burst_statistics',
);

foreach ( $table_names as $table_name ) {
	$sql = "DROP TABLE IF EXISTS $table_name";
	$wpdb->query( $sql );
}

if ( file_exists( ABSPATH . '/burst-statistics-endpoint.php' ) ) {
	unlink( ABSPATH . '/burst-statistics-endpoint.php' );
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
