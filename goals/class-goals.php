<?php
defined( 'ABSPATH' ) or die( "you do not have access to this page!" );

if ( ! class_exists( "burst_goals" ) ) {
    class burst_goals{
        function __construct( ) {

        }


    } // class closure

} // class exists closure

/**
 * Install goal table
 * */

add_action( 'plugins_loaded', 'burst_install_goals_table', 10 );
function burst_install_goals_table() {
    if ( get_option( 'burst_goals_db_version' ) !== burst_version ) {
        require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );

        global $wpdb;
        $charset_collate = $wpdb->get_charset_collate();

        $table_name = $wpdb->prefix . 'burst_goals';
        $sql        = "CREATE TABLE $table_name (
			`ID` int(11) NOT NULL AUTO_INCREMENT,
            `title` varchar(255) NOT NULL,
            `event` varchar(255),
            `action` varchar(255),    
              PRIMARY KEY  (ID)
            ) $charset_collate;";
        dbDelta( $sql );
        update_option( 'burst_goals_db_version', burst_version );
    }
}