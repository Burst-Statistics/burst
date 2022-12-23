<?php
defined( 'ABSPATH' ) or die( "you do not have access to this page!" );

if ( ! class_exists( "burst_goals" ) ) {
    class burst_goals{
        function __construct( ) {

        }

	    /**
	     * @return array
	     */
	    public function get_goals_names() {
		    return apply_filters( "burst_metrics", array(
			    'click' => __( 'Click', 'burst-statistics' ),
			    'visit' => __( 'Visit', 'burst-statistics' ),
			    'view'  => __( 'View', 'burst-statistics' ),
		    ) );
	    }

	    public function get_goal_setup( $goal_id ) {
		    global $wpdb;
		    $table_name = $wpdb->prefix . 'burst_goals';
		    $goal       = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM $table_name WHERE ID = %d", $goal_id ), ARRAY_A );

		    return $goal;
	    }

	    public function get_goals_data( $args = array() ) {
		    global $wpdb;
		    $data     = [];
		    $defaults = array(
			    'date_start' => 0,
			    'date_end'   => 0,
		    );
		    $args     = wp_parse_args( $args, $defaults );

		    $start = $args['date_start'];
		    $end   = $args['date_end'];

		    $goal_id      = $args['goal_id'];
		    $goal_id      = 2; // @todo remove
		    $today_start  = strtotime( 'today midnight' );
		    $goal         = $this->get_goal_setup( $goal_id );
		    $goal_url     = $goal['url'];
		    $goal_url_sql = $goal_url != '' ? " AND statistics.page_url = {$goal_url}" : "";

		    $sql = "SELECT count(*)
					FROM {$wpdb->prefix}burst_statistics as statistics 
					    INNER JOIN {$wpdb->prefix}burst_goal_statistics as goals 
					        ON statistics.ID = goals.statistic_id
					WHERE goals.goal_id = {$goal_id} AND statistics.time > {$today_start} {$goal_url_sql}";
		    $data['today']['value'] = $wpdb->get_var($sql);

		    // get total data
		    $goal_start             = (int) $goal['start_date'];
		    $goal_end               = (int) $goal['end_date'];
		    $goal_end_sql           = $goal_end > 0 ? " AND statistics.time < {$goal_end}" : '';

		    $sql = "SELECT count(*)
					FROM {$wpdb->prefix}burst_statistics as statistics 
					    INNER JOIN {$wpdb->prefix}burst_goal_statistics as goals 
					        ON statistics.ID = goals.statistic_id
					WHERE goals.goal_id = {$goal_id} AND statistics.time > {$goal_start} {$goal_end_sql} {$goal_url_sql}";
		    $data['total']['value'] = $wpdb->get_var( $sql );



			// $cached_data = BURST::$statistics->get_transient( 'burst_goals_data');
		    $cached_data = false;
		    if (  ! $cached_data ){
			    // setup defaults
			    $default_data = [
				    'today'       => [
					    'value'   => '0',
					    'tooltip' => '',
				    ],
				    'total'      => [
					    'value'   => '0',
					    'tooltip' => '',
				    ],
				    'topPerformer' => [
					    'title'   => '-',
					    'value'   => '0',
					    'tooltip' => '',
				    ],
				    'visitors'   => [
					    'title'   => '-',
					    'value'   => '0',
					    'tooltip' => '',
				    ],
				    'conversionPercentage'  => [
					    'title'   => __( 'Conversion percentage', 'burst-statistics' ),
					    'value'   => '0',
					    'tooltip' => '',
				    ],
				    'timeToGoal' => [
					    'title'   => __( 'Average time to goal', 'burst-statistics' ),
					    'value'   => '0',
					    'tooltip' => '',
				    ],
				    'dateStart' => $goal_start,
			    ];

			    $data = wp_parse_args( $data, $default_data );
			    foreach ($data as $key => $value) {
				    // wp_parse_args doesn't work with nested arrays
				    $data[$key] = wp_parse_args($value, $default_data[$key]);
			    }

			    // $this->set_transient('burst_goals_data', $data, 60);
		    } else {
			    $data = $cached_data;
		    }

		    return $data;
	    }
		public function get( $id ) {
			global $wpdb;
			$table_name = $wpdb->prefix . 'burst_goals';
			$goal       = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM $table_name WHERE ID = %d", $id ), ARRAY_A );
			return $goal;
		}

		public function set( $args = array() ) {
			global $wpdb;
			$table_name = $wpdb->prefix . 'burst_goals';
			// sanitize data
			$defaults = array(
				'name'       => '',
				'url'        => '',
				'status'     => 'inactive',
				'start_date' => 0,
				'end_date'   => 0,
			);
			$args = wp_parse_args( $args, $defaults );
			// @todo sanitize data
			// update if ID exists
			if ( isset( $args['ID'] ) && $args['ID'] > 0 ) {
				$wpdb->update( $table_name, $args, array( 'ID' => $args['ID'] ) );
			} else {
				$wpdb->insert( $table_name, $args );
			}
		}

		public function delete( $id ) {
			global $wpdb;
			$table_name = $wpdb->prefix . 'burst_goals';
			$wpdb->delete( $table_name, array( 'ID' => $id ) );
		}

		public function archive( $id ) {
			global $wpdb;
			$table_name = $wpdb->prefix . 'burst_goals';
			$wpdb->update( $table_name, array( 'status' => 'archived' ), array( 'ID' => $id ) );
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
            `type` varchar(30) NOT NULL,
            `status` varchar(30) NOT NULL,
            `server_side` tinyint NOT NULL,
            `url` varchar(255) NOT NULL,
            `start_date` int(11) NOT NULL,
            `end_date` int(11) NOT NULL,
            `setup` text NOT NULL,
              PRIMARY KEY  (ID)
            ) $charset_collate;";
        dbDelta( $sql );
        update_option( 'burst_goals_db_version', burst_version );
    }
}