<?php
defined( 'ABSPATH' ) or die( );

if ( ! class_exists( 'burst_summary' ) ) {
	class burst_summary {
		function __construct() {
			add_action( 'burst_every_hour', array( $this, 'update_summary_table_today' ) );
			add_filter( 'burst_do_action', array( $this, 'refresh_data' ), 10, 3 );

			if ( defined('BURST_RESTART_SUMMARY_UPGRADE') && BURST_RESTART_SUMMARY_UPGRADE ) {
				$this->restart_update_summary_table_alltime();
			}
		}

		/**
		 * @param array           $data
		 * @param string          $action
		 * @param WP_REST_Request $request
		 *
		 * @return array
		 */
		public function refresh_data( array $output, string $action, $data ): array {
			if ( !burst_user_can_manage() ) {
				return $output;
			}

			if ( $action==='refresh_data' ) {
				$this->update_summary_table();
				$output['success'] = true;
			}

			return $output;
		}

		/**
		 * Check if all items are summary data
		 *
		 * @param array $items
		 *
		 * @return bool
		 */
		public function is_summary_data( array $items, array $filters): bool {
			if ( !empty($filters) ) {
				return false;
			}

			$summary_items = [
				'page_url',
			    'sessions',
			    'pageviews',
				'bounce_rate',
			    'visitors',
			    'first_time_visitors',
			    'bounces',
			    'avg_time_on_page',
//			    '*',
				];
			foreach ($items as $item){
				if (! in_array( $item, $summary_items, true ) ){
					return false;
				}
			}
			return true;
		}

		/**
		 * Restart the summary table update
		 * @return void
		 */
		public function restart_update_summary_table_alltime(){
			update_option('burst_db_upgrade_summary_table', true, false);
			delete_option('burst_summary_table_upgrade_days_offset');
		}

		/**
		 * Check if the summary upgrade has been completed
		 * @return bool
		 */
		public function upgrade_completed(){
			//if option set to never use summary tables, return false for upgrade completed.
			if ( get_option('burst_dont_use_summary_tables') ) {
				return false;
			}
			return !get_option('burst_db_upgrade_summary_table');
		}

		/**
		 * Upgrade the data to summary table, progressing over all days until the last one is completed
		 *
		 * @return void
		 */
		public function upgrade_summary_table_alltime(){

			global $wpdb;
			$first_statistics_date_unix = $wpdb->get_var("select min(time) from {$wpdb->prefix}burst_statistics");
			//convert unix to date and back to unix, to ensure that the date is at the start of the day, for comparison purposes
			$first_statistics_date = date('Y-m-d', $first_statistics_date_unix);
			//calculate days offset from first_statistics_date to today
			$first_statistics_date = date('Y-m-d', strtotime($first_statistics_date));
			$today = date('Y-m-d');
			$max_days_offset = (strtotime($today) - $first_statistics_date_unix) / DAY_IN_SECONDS;
			//round to integer
			$max_days_offset = round($max_days_offset, 0);
			//if the offset is negative, set it to 0
			$max_days_offset = $max_days_offset < 0 ? 0 : $max_days_offset;
			$current_days_offset = get_option('burst_summary_table_upgrade_days_offset', 0);

			//check if the oldest summary date is more recent than the oldest statistics date
			if ( $max_days_offset > $current_days_offset ){
				if ( !get_option('burst_summary_table_upgrade_days_offset')) {
					update_option('burst_summary_table_upgrade_days_offset', 0, false);
				}

				$days_offset = ( (int) get_option('burst_summary_table_upgrade_days_offset') ) + 1;
				for ( $i = 0; $i < 30; $i++ ) {
					$days_offset++;
					$success = $this->update_summary_table( $days_offset );
					//if failed, set days_offset to one lower, and exit to try later.
					if ( !$success ) {
						update_option('burst_summary_table_upgrade_days_offset', $days_offset-1, false);
						return;
					}
				}

				update_option('burst_summary_table_upgrade_days_offset', $days_offset, false);
			} else {
				//completed
				update_option('burst_summary_table_upgrade_days_offset', $max_days_offset, false);
				delete_option('burst_db_upgrade_summary_table');
			}
		}

		/**
		 * Run scheduled to update today's summary data
		 *
		 * @return void
		 */
		public function update_summary_table_today(){
			//we want to update for yesterday at least once on the next day, to ensure completeness. If completed, continue with normal update process
			if ( !$this->summary_table_updated_yesterday() ) {
				$this->update_summary_table( 1 );
			} else {
				//update for today
				$this->update_summary_table();
			}
		}

		/**
		 * Check if yesterday's summary was marked as completed
		 *
		 * @return bool
		 */
		private function summary_table_updated_yesterday(): bool {
			global $wpdb;
			$yesterday = date( 'Y-m-d', strtotime( 'yesterday' ) );
			$completed = $wpdb->get_var( $wpdb->prepare( "select completed from {$wpdb->prefix}burst_summary where date = %s", $yesterday ) );
			return (bool) $completed;
		}


		public function summary_sql($date_start, $date_end, $select_array, $group_by='', $order_by='', $limit='', $date_modifiers=false ) {
			$date_start = date( 'Y-m-d', $date_start );
			$date_end = date( 'Y-m-d', $date_end );
			global $wpdb;

			$sql_array = [
				'bounce_rate'         => 'bounces / sessions * 100 as bounce_rate',
				'pageviews'           => 'sum(pageviews) as pageviews',
				'visitors'            => 'sum(visitors) as visitors',
				'sessions'            => 'sum(sessions) as sessions',
				'first_time_visitors' => 'sum(first_time_visitors) as first_time_visitors',
				'bounces'             => 'sum(bounces) as bounces',
				'avg_time_on_page'    => 'AVG(avg_time_on_page) as avg_time_on_page',
			];
			$select = [];
			foreach ($select_array as $select_item){
				if ( isset($sql_array[$select_item]) ) {
					$select[] = $sql_array[$select_item];
				}
			}

			$select[] = $date_modifiers ? "DATE_FORMAT(date, '{$date_modifiers['sql_date_format']}') as period" : 'page_url';
			$sql = implode(', ', $select);
			$date_start = esc_sql($date_start);
			$date_end = esc_sql($date_end);
			$sql = "select $sql from {$wpdb->prefix}burst_summary where date>='$date_start' AND date<='$date_end'";

			if ( !empty($group_by) ) {
				$sql .= ' group by '.$group_by;
			}

			if ( !empty($order_by) ) {
				$sql .= ' order by '.$order_by;
			}

			if ( !empty($limit) ) {
				$sql .= ' order by '.$limit;
			}

			return $sql;
		}

		/**
		 * Update the summary table for one day.
		 *
		 * @param int $days_offset
		 *
		 */
		public function update_summary_table( int $days_offset = 0 ): bool {
			if ( get_transient('burst_updating_summary_table') ) {
				return false;
			}
			set_transient('burst_updating_summary_table', 5 * MINUTE_IN_SECONDS );
			global $wpdb;
			$today = date( 'Y-m-d' );

			//deduct days offset in days
			if ( $days_offset > 0 ) {
				$today = date( 'Y-m-d', strtotime( $today . ' -' . $days_offset . ' days' ) );
			}

			//get start of today in unix
			$date_start = BURST()->statistics->convert_date_to_utc( $today . ' 00:00:00' );
			//get end of today in unix
			$date_end = BURST()->statistics->convert_date_to_utc( $today . ' 23:59:59' );
			//get today's date
			//get the summary from the statistics table
			$select_sql = BURST()->statistics->get_sql_table_raw(
				$date_start,
				$date_end,
				array(
					'pageviews',
					'visitors',
					'first_time_visitors',
					'page_url',
					'bounces',
					'sessions',
					'avg_time_on_page',
				),
				array(),
				'page_url'
			);
			//if this is the update for yesterday or before, mark it as completed
			$completed = $days_offset!==0 ? 1 : 0;
			$update_sql = $wpdb->prepare(
				"INSERT INTO {$wpdb->prefix}burst_summary (date, page_url, sessions, pageviews, visitors, first_time_visitors, bounces, avg_time_on_page, completed)
							SELECT
							    %s AS date,
							    source.page_url,
							    source.sessions,
							    source.pageviews,
							    source.visitors,
							    source.first_time_visitors,
							    source.bounces,
							    COALESCE(source.avg_time_on_page, 0),
								%s AS completed
							FROM (
							    $select_sql
							) AS source
							ON DUPLICATE KEY UPDATE
							    date = date,
							    page_url = source.page_url,
							    sessions = source.sessions,
							    pageviews = source.pageviews,
							    visitors = source.visitors,
							    first_time_visitors = source.first_time_visitors,
							    bounces = source.bounces,
							    avg_time_on_page = COALESCE(source.avg_time_on_page, 0),
							    completed = completed;", $today, $completed);

			$start = microtime( true );

			$wpdb->query( $update_sql );
			$end = microtime( true );
			$passed = $end - $start;
			delete_transient('burst_updating_summary_table');
			return true;
		}
	}
}