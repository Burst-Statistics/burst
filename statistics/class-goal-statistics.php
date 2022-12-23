<?php
defined( 'ABSPATH' ) or die( "you do not have access to this page!" );

if ( ! class_exists( "burst_goal_statistics" ) ) {
	class burst_goal_statistics {
		function __construct() {
			add_action( 'init', array( $this, 'init' ), 10, 3 );
		}

		public function init() {
		}
	}
}

/**
 * Install goal statistic table
 * */

add_action( 'plugins_loaded', 'burst_install_goal_statistics_table', 10 );
function burst_install_goal_statistics_table() {
	if ( get_option( 'burst_goal_stats_db_version' ) !== burst_version ) {
		require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );

		global $wpdb;
		$charset_collate = $wpdb->get_charset_collate();

		$table_name = $wpdb->prefix . 'burst_goal_statistics';
		$sql        = "CREATE TABLE $table_name (
			`ID` int(11) NOT NULL AUTO_INCREMENT,
			`statistic_id` int(11) NOT NULL,
            `goal_id` int(11) NOT NULL,
              PRIMARY KEY  (ID)                
            ) $charset_collate;";
		/**
		 * We use b-tree index as it can be used for < or > operations, which is not possible for HASH
		 */
		dbDelta( $sql );
		update_option( 'burst_goal_stats_db_version', burst_version );
	}
}
