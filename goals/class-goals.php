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

	    public function get_goals( $args = array() ) {
		    global $wpdb;
		    $default_args = [
			    'status'  => 'all',
			    'limit'   => 10,
			    'offset'  => 0,
			    'orderby' => 'ID',
			    'order'   => 'DESC',
		    ];
		    // merge args
		    $args  = wp_parse_args( $args, $default_args );
		    $query = "SELECT * FROM {$wpdb->prefix}burst_goals";
		    $where = [];
		    if ( $args['status'] !== 'all' ) {
			    $where[] = $wpdb->prepare( "status = %s", $args['status'] );
		    }
		    if ( ! empty( $where ) ) {
			    $query .= " WHERE " . implode( " AND ", $where );
		    }
		    $query .= " ORDER BY {$args['orderby']} {$args['order']}";
		    $query .= " LIMIT {$args['offset']}, {$args['limit']}";

		    return $wpdb->get_results( $query, ARRAY_A );
	    }

	    public function get_field_values_per_goal(): array {
		    $goals_and_field_values = [];
		    $goals = $this->get_goals();
		    foreach ( $goals as $goal ) {
			    $goal_field_values = $this->get_goal_field_values( $goal['ID'] );
			    $goals_and_field_values[$goal['ID']] = $goal_field_values;
		    }
		    return $goals_and_field_values;
	    }

	    public function get_goal_field_values($goal_id){
		    // get db values for goal
		    $goal_raw_values = $this->get_goal_setup($goal_id);

		    // map field id values to corresponding values in $goal_raw_values array
		    $field_value_map = [
			    'goal_title' => 'title',
			    'goal_type' => 'type',
			    'goal_page_or_website' => 'url',
			    'goal_specific_page' => 'url',
		    ];

		    // initialize array to hold field values
		    $goal_field_values = [];

		    // loop through field value map and add values to $goal_field_values array
		    foreach ( $field_value_map as $field_id => $value_key ) {
			    $goal_field_values[$field_id] = isset( $goal_raw_values[$value_key] ) ? $goal_raw_values[$value_key] : '';
		    }

		    // handle special case for goal_page_or_website field
		    if ( isset( $goal_field_values['goal_page_or_website'] ) && $goal_field_values['goal_page_or_website'] !== '' ) {
			    $goal_field_values['goal_page_or_website'] = 'page';
		    } else {
			    $goal_field_values['goal_page_or_website'] = 'website';
		    }

		    return $goal_field_values;
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