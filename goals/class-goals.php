<?php
defined( 'ABSPATH' ) or die( "you do not have access to this page!" );

if ( ! class_exists( "burst_goals" ) ) {
    class burst_goals{
        function __construct( ) {

        }

	    /**
	     * @return array
	     */
	    public function get_goals() {
		    return apply_filters("burst_metrics", array(
			    'click' => __('Click', 'burst-statistics'),
			    'visit' => __('Visit', 'burst-statistics'),
			    'view' => __('View', 'burst-statistics'),
		    ) );
	    }

	    public function get_goals_data($args = array()) {
		    $start_time = microtime(true);
		    global $wpdb;
		    $data     = [];
		    $defaults = array(
			    'date_start' => 0,
			    'date_end'   => 0,
		    );
		    $args     = wp_parse_args( $args, $defaults );

		    $start = $args['date_start'];
		    $end   = $args['date_end'];
			// @todo get goals from database

		    // if the live value didn't change we don't update the other stats. This is to avoid unnecessary queries. The transient expires every 60 seconds.
		    $cached_data = $this->get_transient( 'burst_goals_data' );
		    if (  ! $cached_data ){


			    // setup defaults
			    $default_data = [
				    'live'       => [
					    'title'   => __( 'Live visitors', 'burst-statistics' ),
					    'value'   => '0',
					    'tooltip' => __( 'The amount of people using your website right now. The data updates every 5 seconds.', 'burst-statistics' ),
				    ],
				    'goals'      => [
					    'title'   => __( 'Today visitors', 'burst-statistics' ),
					    'value'   => '0',
					    'tooltip' => __( 'This is the total amount of unique visitors for goals.', 'burst-statistics' ),
				    ],
				    'mostViewed' => [
					    'title'   => '-',
					    'value'   => '0',
					    'tooltip' => __( 'This is your most viewed page for goals.', 'burst-statistics' ),
				    ],
				    'referrer'   => [
					    'title'   => '-',
					    'value'   => '0',
					    'tooltip' => __( 'This website referred the most amount of visitors.', 'burst-statistics' ),
				    ],
				    'pageviews'  => [
					    'title'   => __( 'Total pageviews', 'burst-statistics' ),
					    'value'   => '0',
					    'tooltip' => '',
				    ],
				    'timeOnPage' => [
					    'title'   => __( 'Average time on page', 'burst-statistics' ),
					    'value'   => '0',
					    'tooltip' => '',
				    ],
			    ];

			    $data = wp_parse_args( $data, $default_data );
			    foreach ($data as $key => $value) {
				    // wp_parse_args doesn't work with nested arrays
				    $data[$key] = wp_parse_args($value, $default_data[$key]);
			    }

			    $this->set_transient('burst_goals_data', $data, 60);
		    } else {
			    $data = $cached_data;
		    }

		    return $data;
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