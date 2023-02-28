<?php
defined( 'ABSPATH' ) or die( "you do not have access to this page!" );

if ( ! class_exists( "burst_goals" ) ) {
    class burst_goals{
        function __construct( ) {
			// add field value map
        }

		public function get_available_goal_types() {
			return apply_filters( 'burst_goal_types', array(
				'clicks' => array(
					'label' => __( 'Clicks', 'burst-statistics' ),
					'description' => __( 'A click is a single click on an element.', 'burst-statistics' ),
					'server_side' => false,
					'icon' => 'mouse',
				),
				'views' => array(
					'label' => __( 'Views', 'burst-statistics' ),
					'description' => __( 'A view is a view of an element on your website', 'burst-statistics' ),
					'server_side' => false,
					'icon' => 'eye',
				),
				'visits' => array(
					'label' => __( 'Visits', 'burst-statistics' ),
					'description' => __( 'A visit is a visit to your a page', 'burst-statistics' ),
					'server_side' => true,
					'icon' => 'visitors',
				),
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

	    public function get_goal_field_values($goal_id){
		    // get db values for goal
		    $goal_raw_values = $this->get_goal_setup($goal_id);

		    // initialize array to hold field values
		    $goal_field_values = [];
			$goal_field_values['goal_title'] = $goal_raw_values['title'] ?? '';
			$goal_field_values['goal_status'] = $goal_raw_values['status'] ?? 'inactive';
			$goal_field_values['goal_type'] = $goal_raw_values['type'] ?? 'clicks';
			$goal_field_values['goal_page_or_website'] = $goal_raw_values['url'] !== '' ? 'page' : 'website';
			$goal_field_values['goal_specific_page'] = $goal_raw_values['url'] ?? '';

			$goal_field_values['goal_element'] = $goal_raw_values['setup'] ? json_decode($goal_raw_values['setup']) : [
					'attribute' => '',
					'value'     => '',
				];


		    return $goal_field_values;
	    }

	    public function set_goal_field_values($goal_id, $goal_field_values) {
		    // initialize array to hold raw values
		    $args = [];
			$args['ID'] = $goal_id;

		    $available_goal_types = $this->get_available_goal_types();

		    if ( isset( $goal_field_values['goal_title'] ) ) $args['title'] = $goal_field_values['goal_title'] ?? '';
		    if ( isset( $goal_field_values['goal_status'] ) ) $args['status'] = $goal_field_values['goal_status'] ?? 'inactive';
		    if ( isset( $goal_field_values['goal_type'] ) ) $args['type'] = isset($available_goal_types[$goal_field_values['goal_type']]) ? $goal_field_values['goal_type'] : '';
		    if ( isset( $goal_field_values['goal_type'] ) ) $args['server_side'] = $available_goal_types[$goal_field_values['goal_type']]['server_side'] ?? 0;

		    if ( isset( $goal_field_values['goal_specific_page'] ) ) $args['url'] = $goal_field_values['goal_specific_page'] !== '' ? $goal_field_values['goal_specific_page'] : '';
		    if ( isset( $goal_field_values['goal_page_or_website'] ) ) $args['url'] = $goal_field_values['goal_page_or_website'] === 'website' ? '' : $args['url'] ?? '';

		    if ( isset( $goal_field_values['goal_element'] ) ) $args['setup']['attribute'] = $goal_field_values['goal_element']['attribute'] ?? '';
		    if ( isset( $goal_field_values['goal_element'] ) ) $args['setup']['value'] = $goal_field_values['goal_element']['value'] ?? '';


			// if the only value that is set is the ID, then we don't need to update anything
            if ( count( $args ) === 1 ) {
				return null;
		    }

		    // set db values for goal
		    return $this->set($args);
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
			// if arg exists, then sanitize it
			if ( isset( $args['ID'] ) ) $args['ID']   = (int) $args['ID'];
			if ( isset( $args['ID'] ) ) $args['title'] = sanitize_text_field( $args['title'] );
			if ( isset( $args['type'] ) ) $args['type']  = sanitize_text_field( $args['type'] );
			if ( isset( $args['status'] ) ) $args['status'] = sanitize_text_field( $args['status'] );
			if ( isset( $args['server_side'] ) ) $args['server_side'] =  (int) $args['server_side'];
			if ( isset( $args['url'] ) ) $args['url']   = burst_sanitize_relative_url( $args['url'] );
			if ( isset( $args['setup'] ) ) $args['setup'] = array_map( 'sanitize_text_field', $args['setup']);
			if ( isset( $args['date_start'] ) ) $args['date_start'] = (int) $args['date_start'];
			if ( isset( $args['date_end'] ) ) $args['date_end'] = (int) $args['date_end'];
			if ( isset( $args['date_created'] ) ) $args['date_created'] = (int) $args['date_created'];


			// if setup already has values, then we need to merge the new values with the existing values
			if ( isset( $args['ID'] ) && $args['ID'] > 0 ) {
				$existing_goal = $this->get( $args['ID'] );
				if ( isset( $existing_goal['setup'] ) && $existing_goal['setup'] !== '' && isset( $args['setup'] ) && $args['setup'] !== '' ) {
					$existing_goal['setup'] = json_decode( $existing_goal['setup'], true );
					$existing_goal['setup'] = is_array( $existing_goal['setup'] ) ? $existing_goal['setup'] : [];

					$args['setup'] = array_merge( $existing_goal['setup'], $args['setup'] );
				}
				$args['setup'] = json_encode( $args['setup'] );
				return $wpdb->update( $table_name, $args, array( 'ID' => $args['ID'] ) );
			}

			$args['setup'] = isset( $args['setup'] ) ? json_encode( $args['setup'] ) : '{}';


			// set defaults for new goal
			$defaults = array(
				'title'       => __('New goal', 'burst-statistics'),
				'status'     => 'inactive',
				'date_start' => 0,
				'date_end'   => 0,
			);
			$args['date_created'] = time();
			$args = wp_parse_args( $args, $defaults );

			return $wpdb->insert( $table_name, $args );
		}

		public function delete( $id ) {
			global $wpdb;
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
            `date_created` int(11) NOT NULL,
            `date_start` int(11) NOT NULL,
            `date_end` int(11) NOT NULL,
            `setup` text NOT NULL,
              PRIMARY KEY  (ID)
            ) $charset_collate;";
        dbDelta( $sql );

		// if there is no default goal, then insert one
	    $goals = BURST()->goals->get_goals();
		$count = count( $goals );
		if ( $count === 0 ) {
			BURST()->goals->set( array(
				'title'       => __( 'Default goal', 'burst-statistics' ),
				'type'        => 'clicks',
				'status'      => 'inactive',
				'server_side' => 0,
				'date_created' => time(),
			) );
		}

		// insert default goal
        update_option( 'burst_goals_db_version', burst_version );
    }
}