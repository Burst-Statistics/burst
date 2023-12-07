<?php
defined( 'ABSPATH' ) or die( "you do not have access to this page!" );

if ( ! class_exists( "burst_goals" ) ) {
    class burst_goals{
        function __construct( ) {
	        add_action('burst_before_insert_goal', array($this, 'check_existing_goals'));
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
		    $goal       = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM $table_name WHERE ID = %d", (int) $goal_id ), ARRAY_A );
		    return $goal;
	    }

	    public function sanitize_orderby($orderby) {
		    global $wpdb;

		    // Get all columns from {$wpdb->prefix}burst_goals table
		    $table_name = $wpdb->prefix . 'burst_goals';
		    $cols = $wpdb->get_results("SHOW COLUMNS FROM $table_name", ARRAY_A);

		    // Extract the 'Field' values into an array
		    $col_names = array_column($cols, 'Field');

		    // If $orderby is not in $col_names, set it to 'ID'
		    if (!in_array($orderby, $col_names)) {
			    $orderby = 'ID';
		    }

		    return $orderby;
	    }


	    public function get_goals( $args = array() ) {
			if ( !burst_user_can_view() ) {
				return;
			}

		    global $wpdb;
		    $default_args = [
			    'status'  => 'all',
			    'limit'   => 9999,
			    'offset'  => 0,
			    'orderby' => 'ID',
			    'order'   => 'DESC',
		    ];
		    // merge args
		    $args  = wp_parse_args( $args, $default_args );
			
			// sanitize args
		    $args['order'] = $args['order'] === 'DESC' ? 'DESC' : 'ASC';
		    $args['orderby'] = $this->sanitize_orderby($args['orderby']);
		    $args['status'] = $this->sanitize_status($args['status']);
			$args['limit'] = (int) $args['limit'];
			$args['offset'] = (int) $args['offset'];

		    $query = "SELECT * FROM {$wpdb->prefix}burst_goals";
		    $where = [];
		    if ( $args['status'] !== 'all' ) {
			    $where[] = $wpdb->prepare( "status = %s", $args['status']);
		    }
		    if ( ! empty( $where ) ) {
			    $query .= " WHERE " . implode( " AND ", $where );
		    }

		    $query .= " ORDER BY {$args['orderby']} {$args['order']}";//can only be columns or DESC/ASC because of sanitizing
		    $query .= " LIMIT {$args['offset']}, {$args['limit']}"; //can only be integer because of sanitizing

			$results = $wpdb->get_results($query, ARRAY_A);

		    $goals = array_reduce($results, function($accumulator, $currentValue) {
			    $id = $currentValue['ID'];
			    unset($currentValue['ID']);
			    $accumulator[$id] = $currentValue;
			    return $accumulator;
		    }, array());

			return $goals;

	    }

	    /**
	     * Sanitize status
	     * @param string $status
	     *
	     * @return string
	     */
		public function sanitize_status($status) {
			$statuses = [
				'all',
				'active',
				'inactive',
				'archived',
			];
			return in_array($status, $statuses) ? $status : 'inactive';
		}

	    public function get_goal_field_values($goal_id){
		    // get db values for goal
		    $goal_raw_values = $this->get_goal_setup($goal_id);

		    // initialize array to hold field values
		    $goal_field_values = [];
			$goal_field_values['goal_title'] = $goal_raw_values['title'] ?? '';
			$goal_field_values['goal_status'] = $goal_raw_values['status'] ?? 'inactive';
			$goal_field_values['goal_type'] = $goal_raw_values['type'] ?? 'clicks';
			$goal_field_values['goal_page_or_website'] = $goal_raw_values['url'] !== '*' ? 'page' : 'website';
			$goal_field_values['goal_specific_page'] = $goal_raw_values['url'] !== '*' ? $goal_raw_values['url'] : '';
			$goal_field_values['goal_conversion_metric'] = $goal_raw_values['conversion_metric'] ?? 'visitors';
			$goal_field_values['goal_element'] = $goal_raw_values['setup'] ? json_decode($goal_raw_values['setup']) : [
					'attribute' => '',
					'value'     => '',
				];


		    return $goal_field_values;
	    }

	    public function set_goal_field_values($goal_id, $goal_field_values) {
		    // initialize array to hold raw values
		    $args = [];
			$args['ID'] = (int) $goal_id;

		    $available_goal_types = $this->get_available_goal_types();

		    if ( isset( $goal_field_values['goal_title'] ) ) $args['title'] = $goal_field_values['goal_title'] ?? '';
		    if ( isset( $goal_field_values['goal_status'] ) ) $args['status'] = $goal_field_values['goal_status'] ?? 'inactive';
			if ( isset( $goal_field_values['goal_status'] ) ) $args['date_start'] = $goal_field_values['goal_status'] === 'active' ? time() : '';
			if ( isset( $goal_field_values['goal_status'] ) ) $args['date_end'] = $goal_field_values['goal_status'] === 'active' ? 0 : time();


		    if ( isset( $goal_field_values['goal_type'] ) ) $args['type'] = isset($available_goal_types[$goal_field_values['goal_type']]) ? $goal_field_values['goal_type'] : '';
		    if ( isset( $goal_field_values['goal_type'] ) ) $args['server_side'] = $available_goal_types[$goal_field_values['goal_type']]['server_side'] ?? 0;

		    if ( isset( $goal_field_values['goal_specific_page'] ) ) $args['url'] = $goal_field_values['goal_specific_page'];
		    if ( isset( $goal_field_values['goal_page_or_website'] ) ) $args['url'] = $goal_field_values['goal_page_or_website'] === 'website' ? '' : $args['url'] ?? '';

		    if ( isset( $goal_field_values['goal_conversion_metric'] ) ) $args['conversion_metric'] = $goal_field_values['goal_conversion_metric'] ?? 'visitors';

		    if ( isset( $goal_field_values['goal_element'] ) ) $args['setup']['attribute'] = $goal_field_values['goal_element']['attribute'] ?? '';
		    if ( isset( $goal_field_values['goal_element'] ) ) $args['setup']['value'] = $goal_field_values['goal_element']['value'] ?? '';

		    // set db values for goal
		    return $this->set($args);
	    }

	    /**
	     * @param int $id
	     *
	     * @return array
	     */
		public function get( int $id ): array {
			global $wpdb;
			$table_name = $wpdb->prefix . 'burst_goals';
			$goal       = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM $table_name WHERE ID = %d", $id ), ARRAY_A );
			if ( !$goal || is_wp_error( $goal ) ) {
				return [];
			}

			$id = $goal['ID'];
			unset( $goal['ID'] );
			return [ $id => $goal ];
		}

		public function set( $args = array(), $action = 'update' ) {
			global $wpdb;

			// do_action to add a check if a goal is already set, because only one goal is allowed.
			if ($action === 'insert') {
				do_action('burst_before_insert_goal');
			} else {
				do_action('burst_before_set_goals');
			}

			$table_name = $wpdb->prefix . 'burst_goals';
			// sanitize data
			// if arg exists, then sanitize it
			if ( isset( $args['ID'] ) ) $args['ID']   = (int) $args['ID'];
			if ( isset( $args['title'] ) ) $args['title'] = sanitize_text_field( $args['title'] );
			if ( isset( $args['type'] ) ) $args['type']  = sanitize_text_field( $args['type'] );
			if ( isset( $args['status'] ) ) $args['status'] = sanitize_text_field( $args['status'] );
			if ( isset( $args['server_side'] ) ) $args['server_side'] =  (int) $args['server_side'];
			if ( isset( $args['url'] ) ) $args['url']  = burst_sanitize_relative_url( $args['url'] );
			if ( isset( $args['conversion_metric'] ) ) $args['conversion_metric']  = sanitize_text_field( $args['conversion_metric'] );
			if ( isset( $args['date_start'] ) ) $args['date_start'] = (int) $args['date_start'];
			if ( isset( $args['date_end'] ) ) $args['date_end'] = (int) $args['date_end'];
			if ( isset( $args['date_created'] ) ) $args['date_created'] = (int) $args['date_created'];

			// if setup already has values, then we need to merge the new values with the existing values
			if ( isset( $args['ID'] ) && $args['ID'] > 0 ) {
				$existing_goal = $this->get( $args['ID'] );
				if ( isset( $args['setup'], $existing_goal['setup'] ) && $args['setup'] !== '' && $existing_goal['setup'] !== '' ) {
					$existing_goal['setup'] = json_decode( $existing_goal['setup'], true );
					$existing_goal['setup'] = is_array( $existing_goal['setup'] ) ? $existing_goal['setup'] : [];
					$args['setup'] = wp_parse_args( $args['setup'], $existing_goal['setup'] );
				}
				if ( isset($args['setup'] ) ) $args['setup'] = json_encode( $args['setup'] );
				return $wpdb->update( $table_name, $args, array( 'ID' => $args['ID'] ) );
			}
			// insert new goal
			$args['setup'] = isset( $args['setup'] ) ? json_encode( $args['setup'] ) : '{}';

			// set defaults for new goal
			$defaults = array(
				'title'       => __('New goal', 'burst-statistics'),
				'type'        => 'clicks',
				'status'     => 'inactive',
				'conversion_metric' => 'visitors',
				'date_start' => 0,
				'date_end'   => 0,
			);
			$args['date_created'] = time();
			$args = wp_parse_args( $args, $defaults );

			$wpdb->insert( $table_name, $args );

			// return array id => data
			return $this->get( $wpdb->insert_id);
		}

	    public function delete( $id ) {
		    global $wpdb;
		    $table_name = $wpdb->prefix . 'burst_goals';
		    $result1 = $wpdb->delete( $table_name, array( 'ID' => $id ) );

		    $table_name_statistics = $wpdb->prefix . 'burst_goals_statistics';
		    $result2 = $wpdb->delete( $table_name_statistics, array( 'goal_id' => $id ) );

		    // Check if both delete queries were successful
		    return $result1 !== false && $result2 !== false;
	    }


	    public function archive( $id ) {
			global $wpdb;
			$table_name = $wpdb->prefix . 'burst_goals';
			$wpdb->update( $table_name, array( 'status' => 'archived' ), array( 'ID' => $id ) );
		}

	    public function check_existing_goals() {

		    if (burst_is_pro()) {
				// @todo add licensing
			    return; // Allow unlimited goals in the pro version
		    }

		    global $wpdb;
		    $table_name = $wpdb->prefix . 'burst_goals';

		    // Check for existing active goals in the database
		    $existing_goals = $wpdb->get_results("SELECT * FROM {$table_name}", ARRAY_A);

		    // If there's an active goal, display a warning message and prevent the new goal creation
		    if (count($existing_goals) > 0) {
			    wp_die(__('Only one active goal is allowed at a time. Please deactivate the existing goal before creating a new one.', 'burst-statistics'));
		    }
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
            `conversion_metric` varchar(255) NOT NULL,
            `date_created` int(11) NOT NULL,
            `date_start` int(11) NOT NULL,
            `date_end` int(11) NOT NULL,
            `setup` text NOT NULL,
              PRIMARY KEY  (ID)
            ) $charset_collate;";
        dbDelta( $sql );

		// insert default goal
        update_option( 'burst_goals_db_version', burst_version );
    }
}