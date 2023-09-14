<?php
defined( 'ABSPATH' ) or die( "you do not have access to this page!" );

if ( ! class_exists( "burst_goal_statistics" ) ) {
	class burst_goal_statistics {
		function __construct() {
			add_action( 'init', array( $this, 'init' ), 10, 3 );
		}

		public function init() {
		}

		public function get_goal_id( $goal_id ) {
			global $wpdb;
			$goal_id = (int) $goal_id ?: 0;
			if ( ! $goal_id ) {
				// get first active goal from db
				$goal_id = $wpdb->get_var( "SELECT ID FROM {$wpdb->prefix}burst_goals WHERE status = 'active' ORDER BY ID LIMIT 1" );
			}
			if ( ! $goal_id ) {
				return 0;
			}

			return $goal_id;
		}

		public function get_live_goals_data( $args = [] ): int {
			global $wpdb;

			$goal_id      = $this->get_goal_id( $args['goal_id'] );
			$today        = strtotime( 'today midnight' );
			$goal         = BURST()->goals->get_goal_setup( $goal_id );
			$goal_url     = $goal['url'] ?? '';
			$goal_url_sql = $goal_url === '' || $goal_url === '*' ? '' : $wpdb->prepare( 'AND statistics.page_url = %s', $goal_url );

			$sql = "SELECT COUNT(*)
					FROM {$wpdb->prefix}burst_statistics as statistics 
					    INNER JOIN {$wpdb->prefix}burst_goal_statistics as goals 
					        ON statistics.ID = goals.statistic_id
					WHERE statistics.bounce = 0 AND goals.goal_id = {$goal_id} AND statistics.time > {$today} {$goal_url_sql}";
			$val = $wpdb->get_var( $sql );

			return (int) $val ?: 0;
		}

		public function get_goals_data( $args = array() ): array {
			global $wpdb;

			// Define default arguments
			$defaults = array(
				'date_start' => 0,
				'date_end'   => 0,
				'url'        => '',
				'goal_id'    => 0,
			);
			$args     = wp_parse_args( $args, $defaults );

			// Sanitize input
			$goal_id    = (int) $this->get_goal_id( $args['goal_id'] );
			$goal       = BURST()->goals->get_goal_setup( $goal_id );
			$goal_url   = $goal['url'] ?? '';
			$goal_start = (int) $goal['date_start'] ?? 0;
			$goal_end   = (int) $goal['date_end'] ?? 0;
			$goal_created = (int) $goal['date_created'] ?? 0;
			$status = $goal['status'] ?? 'inactive';

			// Initialize data array
			$data = array(
				'today'                => array( 'value' => 0, 'tooltip' => '' ),
				'total'                => array( 'value' => 0, 'tooltip' => '' ),
				'topPerformer'         => array(
					'title'   => '-',
					'value'   => 0,
					'tooltip' => __( 'Most goals reached on this page', 'burst-statistics' ),
				),
				'pageviews'            => array(
					'title'   => __( 'Pageviews', 'burst-statistics' ),
					'value'   => 0,
					'tooltip' => '',
				),
				'conversionPercentage' => array(
					'title'   => __( 'Conversion rate', 'burst-statistics' ),
					'value'   => 0,
					'tooltip' => '',
				),
				'bestDevice'           => array(
					'title'   => __( 'Not enough data', 'burst-statistics' ),
					'value'   => 0,
					'tooltip' => __('Best performing device', 'burst-statistics'),
					'icon'   => 'desktop',
				),
				'dateCreated'          => $goal_created,
				'dateStart'            => $goal_start,
				'dateEnd'              => $goal_end,
				'status'               => $status,
				'goalId'               => $goal_id,
			);

			if ( $goal_id !== 0 ) {
				// Query to get total number of goal completions
				$goal_end_sql = $goal_end > 0 ? "AND statistics.time < {$goal_end}" : '';
				$goal_url_sql = $goal_url === '' || $goal_url === '*' ? '' : $wpdb->prepare( 'AND statistics.page_url = %s', $goal_url );
				$total_sql    = "SELECT COUNT(*) FROM {$wpdb->prefix}burst_statistics AS statistics
								INNER JOIN {$wpdb->prefix}burst_goal_statistics AS goals
								ON statistics.ID = goals.statistic_id
								WHERE statistics.bounce = 0 AND goals.goal_id = {$goal_id} AND statistics.time > {$goal_start} {$goal_end_sql} {$goal_url_sql}";

				$data['total']['value'] = $wpdb->get_var( $total_sql );

				// Query to get top performing page
				$top_performer_sql    = "SELECT COUNT(*) AS value, statistics.page_url AS title FROM {$wpdb->prefix}burst_statistics AS statistics
											INNER JOIN {$wpdb->prefix}burst_goal_statistics AS goals
											ON statistics.ID = goals.statistic_id
											WHERE statistics.bounce = 0 AND goals.goal_id = {$goal_id} AND statistics.time > {$goal_start} {$goal_end_sql} {$goal_url_sql}
											GROUP BY statistics.page_url ORDER BY COUNT(*) DESC LIMIT 1";
				$top_performer_result = $wpdb->get_row( $top_performer_sql );
				if ( $top_performer_result ) {
					$data['topPerformer']['title'] = $top_performer_result->title;
					$data['topPerformer']['value'] = $top_performer_result->value;
				}

				// Query to get total number of pageviews
				$visitors_sql               = "SELECT COUNT(*) FROM {$wpdb->prefix}burst_statistics as statistics
												WHERE statistics.time > {$goal_start} {$goal_end_sql} AND statistics.bounce = 0 {$goal_url_sql}";
				$data['pageviews']['value'] = $wpdb->get_var( $visitors_sql );

				// Query to get best performing device
				$device_sql    = "SELECT COUNT(*) AS value, statistics.device AS title FROM {$wpdb->prefix}burst_statistics AS statistics
											INNER JOIN {$wpdb->prefix}burst_goal_statistics AS goals
											ON statistics.ID = goals.statistic_id
											WHERE statistics.bounce = 0 AND goals.goal_id = {$goal_id} AND statistics.time > {$goal_start} {$goal_end_sql} {$goal_url_sql}
											GROUP BY statistics.device ORDER BY value DESC LIMIT 4";
				$device_result = $wpdb->get_results( $device_sql );

				$pageviews_per_device = "SELECT COUNT(*) AS value, device FROM {$wpdb->prefix}burst_statistics as statistics
											WHERE statistics.bounce = 0 AND statistics.time > {$goal_start} {$goal_end_sql} {$goal_url_sql}
											GROUP BY statistics.device ORDER BY value DESC LIMIT 4";
				$pageviews_per_device_result = $wpdb->get_results($pageviews_per_device);

				// calculate conversion rate and select the highest percentage
				$highest_percentage = 0;
				foreach ( $device_result as $device ) {
					foreach ( $pageviews_per_device_result as $pageviews_per_device ) {
						if ( $device->title === $pageviews_per_device->device ) {
							$percentage = round( ( $device->value / $pageviews_per_device->value ) * 100, 2 );
							if ( $percentage > $highest_percentage ) {
								$highest_percentage = $percentage;
								$data['bestDevice']['title'] = BURST()->statistics->get_device_name($device->title);
								$data['bestDevice']['icon'] = $device->title;
								$data['bestDevice']['value'] = $percentage;
							}
						}
					}
				}
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
