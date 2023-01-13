<?php
defined( 'ABSPATH' ) or die( "you do not have access to this page!" );

if ( ! class_exists( "burst_goal_statistics" ) ) {
	class burst_goal_statistics {
		function __construct() {
			add_action( 'init', array( $this, 'init' ), 10, 3 );
		}

		public function init() {
		}

		public function get_live_goals_data(){
			global $wpdb;

			$goal_id      = 2; // @todo remove
			$today_start  = strtotime( 'today midnight' );
			$goal         = BURST()->goals->get_goal_setup( $goal_id );
			$goal_url     = $goal['url'];
			$goal_url_sql = $goal_url != '' ? " AND statistics.page_url = {$goal_url}" : "";

			$sql = "SELECT count(*)
					FROM {$wpdb->prefix}burst_statistics as statistics 
					    INNER JOIN {$wpdb->prefix}burst_goal_statistics as goals 
					        ON statistics.ID = goals.statistic_id
					WHERE goals.goal_id = {$goal_id} AND statistics.time > {$today_start} {$goal_url_sql}";
			$val = $wpdb->get_var($sql);
			return (int) $val ?: 0;
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
