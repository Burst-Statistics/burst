<?php
defined( 'ABSPATH' ) or die( "you do not have access to this page!" );

if ( ! class_exists( "burst_sessions" ) ) {
	class burst_sessions{
		function __construct( ) {

		}


	} // class closure

} // class exists closure

/**
 * Install session table
 * */

add_action( 'plugins_loaded', 'burst_install_sessions_table', 10 );
function burst_install_sessions_table() {
	if ( get_option( 'burst_sessions_db_version' ) !== burst_version ) {
		require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );

		global $wpdb;
		$charset_collate = $wpdb->get_charset_collate();
		$table_name = $wpdb->prefix . 'burst_sessions';
		$sql        = "CREATE TABLE $table_name (
			`ID` int(11) NOT NULL AUTO_INCREMENT,
			`last_visited_url` varchar(255) NOT NULL,
            `goal_id` int(11),
            `experiment_id` int(11),
            `experiment_version` int(11),    
              PRIMARY KEY  (ID)
            ) $charset_collate;";
		dbDelta( $sql );
		update_option( 'burst_sessions_db_version', burst_version );
	}
}