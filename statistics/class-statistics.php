<?php
defined( 'ABSPATH' ) or die( "you do not have acces to this page!" );

if ( ! class_exists( "burst_statistics" ) ) {
	class burst_statistics{
		function __construct( ) {
			add_action( 'wp_ajax_burst_get_experiment_statistics', array( $this, 'ajax_get_experiment_statistics') );
		}

		/**
		 * Function for getting statistics for display with Chart JS
		 * @return json                     Returns a JSON that is compatible with Chart JS
		 *
		 */
		public function ajax_get_experiment_statistics(){
			$error = false;
			if ( ! burst_user_can_manage() ) {
				$error = true;
			}

			if ( !isset($_GET['experiment_id'])) {
				$error = true;
			}

			if ( !$error ) {
				$experiment_id = intval( $_GET['experiment_id'] );
			}

			if ( !$error ) {
				$date_start = intval( $_GET['date_start'] );
				$date_end = intval( $_GET['date_end'] );
                $args = array(
                    'metric' => sanitize_text_field($_GET['metric']),
                );
				$experiment = new BURST_EXPERIMENT($experiment_id);
				$experiment_start = empty($experiment->date_started) ? time() : $experiment->date_started;
				$experiment_end = empty($experiment->date_end) ? time() : $experiment->date_end;
				$date_start = empty($date_start) ? $experiment_start : $date_start;
				$date_end = empty($date_end) ? $experiment_end : $date_end;

				if ( $date_end==0 ) $date_end = time()-24*HOUR_IN_SECONDS;
				//for each day, counting back from "now" to the first day, get the date.
				$nr_of_periods = $this->get_nr_of_periods('DAY', $date_start , $date_end);
				$end_date_days_ago = $this->nr_of_periods_ago('DAY', $date_end);

				$data = array();
				for ($i = $nr_of_periods-1; $i >= 0; $i--) {
					$days = $i + $end_date_days_ago;
					$unix_day = strtotime("-$days days");
					$date = date( get_option( 'date_format' ), $unix_day);
					$data['labels'][] = $date;
				}
				//generate a dataset for each category
				$i=0;
				$test_versions = array(
					'control',
					'variant',
				);
				foreach ($test_versions as $test_version ) {
					$title = ucfirst($test_version);
					//get hits grouped per timeslot. default day
					$hits = $this->get_grouped_statistics_array($experiment_id, $test_version, $date_start, $date_end, $args);
					$data['datasets'][] = array(
						'data' => $hits,
						'backgroundColor' => $this->get_graph_color($i, 'background'),
						'borderColor' => $this->get_graph_color($i),
						'label' => $title,
						'fill' => 'false',
					);
					$i++;
				}
			}

			if ( isset($data['datasets']) ) {
				$max = 5;
				if (isset($data['datasets'][0]['data']) && count($data['datasets'][0]['data'])>0){
					//get highest hit count for max value
					$max = max(array_map('max', array_column( $data['datasets'], 'data' )));
				}
				if (isset($data['datasets'][1]['data']) && count($data['datasets'][1]['data'])>0){
					//get highest hit count for max value
					$max2 = max(array_map('max', array_column( $data['datasets'], 'data' )));
					$max = $max2>$max ? $max2 : $max;
                    $max++;
				}

				$data['max'] = $max > 5 ? $max : 5;
			} else {
				$data['datasets'][] = array(
					'data' => array(0),
					'backgroundColor' => $this->get_graph_color(0, 'background'),
					'borderColor' => $this->get_graph_color(0),
					'label' => __("No data for this selection", "burst"),
					'fill' => 'false',
				);
				$data['max'] = 5;
			}

			if (!$error) {
				$data['date_start'] = $date_start;
				$data['date_end'] = $date_end;
                //@todo add filter so we can add metrics with integrations
                $metrics = array(
                    'conversion_percentages' => __('Conversion percentages', 'burst'),
                    'conversions' => __('Conversions', 'burst'),
                    'visits' => __('Visits', 'burst'),
                );

                $options = array();

                $options['scales']['yAxes'][0]['scaleLabel'] = isset($metrics[$_GET['metric']]) ? $metrics[$_GET['metric']] : 'Count';
			}


			$return  = array(
				'success' => !$error,
				'data'    => $data,
				'options' => $options,
				'title'    => __('Experiment', "burst"),
			);
			echo json_encode( $return );
			die;
		}

		/**
		 * @param int $experiment_id
		 * @param string $test_version
		 * @param int $start
		 * @param int $end
		 *
		 * @return array
		 */

		public function get_grouped_statistics_array($experiment_id, $test_version, $start, $end, $args = array() ) {
			global $wpdb;
			$default_args = array(
			    'metric' => 'conversions', //conversion_percentages, visits
            );
            $args = wp_parse_args( $args, $default_args );
			$test_version = ( $test_version === 'variant') ? 'variant' : 'control';
            $sql_args = ' ';
			if ($args['metric'] === 'conversions'){
                $sql_args = 'AND conversion = 1';
            }
            if( $args['metric'] === 'conversion_percentages' ){

                $sql =  "SELECT COUNT(*) as hit_count,
                                sum(case when conversion = 1 then 1 else 0 end) AS conversion_count,
                                CONCAT(YEAR(from_unixtime(time)),'-',DAYOFYEAR(from_unixtime(time)) ) as period
                                FROM {$wpdb->prefix}burst_statistics WHERE experiment_id = $experiment_id AND test_version='$test_version' AND time>$start AND time<$end 
                                GROUP BY CONCAT(YEAR(from_unixtime(time)),'-',DAYOFYEAR(from_unixtime(time)) ) order by period asc";
                $results = $wpdb->get_results($sql);
            } else {
                $sql = "SELECT COUNT(*) as hit_count, CONCAT(YEAR(from_unixtime(time)),'-',DAYOFYEAR(from_unixtime(time)) ) as period
					FROM {$wpdb->prefix}burst_statistics WHERE experiment_id = $experiment_id AND test_version='$test_version' AND time>$start AND time<$end $sql_args
					GROUP BY CONCAT(YEAR(from_unixtime(time)),'-',DAYOFYEAR(from_unixtime(time)) ) order by period asc";
                $results = $wpdb->get_results($sql);
            }

			$nr_of_periods = $this->get_nr_of_periods('DAY', $start, $end );
			$end_date_days_ago = $this->nr_of_periods_ago('DAY', $end );
			$data = array();

			//count back from end until zero days.
			for ($i = $nr_of_periods-1; $i >= 0; --$i) {
				$days = $i + $end_date_days_ago;
				$unix_day = strtotime("-$days days");
				$day_of_year = date("z", $unix_day ) + 1;
				$year = date('Y', $unix_day);
				$index = array_search( $year.'-'.$day_of_year, array_column( $results, 'period' ) );
				if ( $index === false ) {
					$data[$nr_of_periods-$i-1] = 0;
				} else {
                    if( $args['metric'] === 'conversion_percentages' ){
                        $data[$nr_of_periods-$i-1] = round($results[$index]->conversion_count / $results[$index]->hit_count * 100, 2);
                    } else {
                        $data[$nr_of_periods-$i-1] = $results[$index]->hit_count;
                    }

				}
			}

			return $data;
		}

		/**
		 * @param string $period
		 * @param int $start_time
		 * @param int $end_time
		 *
		 * @return float
		 */

		private function get_nr_of_periods($period, $start_time, $end_time ){
			$range_in_seconds = $end_time - $start_time;
			$period_in_seconds = constant(strtoupper($period).'_IN_SECONDS' );
			return ROUND($range_in_seconds/$period_in_seconds);
		}

		/**
		 * @param string $period
		 * @param int $time
		 *
		 * @return float
		 */
		private function nr_of_periods_ago($period, $time ){
			$range_in_seconds = time() - $time;
			$period_in_seconds = constant(strtoupper($period).'_IN_SECONDS' );
			return ROUND($range_in_seconds/$period_in_seconds);
		}

		/**
		 * Get color for a graph
		 * @param int     $index
		 * @param string $type
		 *
		 * @return string
		 */

		private function get_graph_color( $index , $type = 'default' ) {
			$o = $type = 'background' ? '1' : '1';
			switch ($index) {
				case 0:
					return "rgba(41, 182, 246, $o)";
				case 1:
					return "rgba(244, 191, 62, $o)";
				case 2:
					return "rgba(255, 205, 86, $o)";
				case 3:
					return "rgba(75, 192, 192, $o)";
				case 4:
					return "rgba(54, 162, 235, $o)";
				case 5:
					return "rgba(153, 102, 255, $o)";
				case 6:
					return "rgba(201, 203, 207, $o)";
				default:
					return "rgba(238, 126, 35, $o)";

			}
		}

		/**
		 * Get the latest visit for a UID for a specific page.
		 * Specify a data_variable if you just want the result for a specific parameter
		 *
		 * @param  integer $burst_uid     The Burst UID which is saved in a cookie
		 *                                (and in the user meta if the user is logged in)
		 * @param  string  $page_url      The page URL you want the latest visit from
		 * @param  string  $data_variable Specify which data you want, if left empty you'll
		 *                                get an object with everything
		 * @return object|bool                 Returns the latest visit data
		 */
		public function get_latest_visit_data($burst_uid = false, $page_url = false, $data_variable = false){
			if (!$burst_uid && !$page_url) {
				return false;
			}
			$sql = "";
			if ($page_url) {
				$sql = " AND page_url ='" . esc_attr($page_url) . "' ";
			}

			global $wpdb;
			$statistics = false;
			if ($burst_uid) {
				$statistics
					= $wpdb->get_row( $wpdb->prepare( "select * from {$wpdb->prefix}burst_statistics where uid = %s". $sql ." ORDER BY time DESC LIMIT 1 ",
					esc_attr( $burst_uid) ) );
			}
			if (empty($statistics)){
				return false;
			} else {
				if ($data_variable) {
					return $statistics->$data_variable;
				} else {
					return $statistics;
				}

			}

		}

	}

}

/**
 * Install statistic table
 * */

add_action( 'plugins_loaded', 'burst_install_statistics_table', 10 );
function burst_install_statistics_table() {
	if ( get_option( 'burst_stats_db_version' ) !== burst_version ) {
		require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );

		global $wpdb;
		$charset_collate = $wpdb->get_charset_collate();

		$table_name = $wpdb->prefix . 'burst_statistics';
		$sql        = "CREATE TABLE $table_name (
			`ID` int(11) NOT NULL AUTO_INCREMENT ,
            `experiment_id` int(11) NOT NULL,
            `test_version` varchar(255) NOT NULL,
            `page_url` varchar(255) NOT NULL,
            `time` varchar(255) NOT NULL,
            `uid` varchar(255) NOT NULL,
            `conversion` int(11) NOT NULL,
              PRIMARY KEY  (ID)
            ) $charset_collate;";
		dbDelta( $sql );
		update_option( 'burst_stats_db_version', burst_version );
	}
}