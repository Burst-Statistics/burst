<?php
defined( 'ABSPATH' ) or die( "you do not have acces to this page!" );

if ( ! class_exists( "burst_statistics" ) ) {
	class burst_statistics{
		function __construct( ) {
            add_action( 'wp_ajax_burst_get_chart_statistics', array( $this, 'ajax_get_chart_statistics') );
            add_action( 'wp_ajax_burst_get_real_time_visitors', array( $this, 'ajax_get_real_time_visitors') );
            add_action( 'wp_ajax_burst_get_today_statistics_html', array( $this, 'ajax_get_today_statistics_html') );
            add_action( 'wp_enqueue_scripts', array($this,'enqueue_assets'), 1);
		}

        /**
         * Enqueue some assets
         * @param $hook
         */
        public function enqueue_assets( $hook ) {
            $minified = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';


            if( !$this->exclude_from_tracking() ) {
                global $post;
                //set some defaults
                $localize_args = array(
                    'url'                       => get_rest_url() . 'burst/v1/',
                    'goal'                      => 'visit',
                    'goal_identifier'           => '',
                    'page_id'                   => isset($post->ID) ? $post->ID : 0,
                    'cookie_retention_days'     => 30,
                    'anon_ip'                   => burst_get_anon_ip_address(),
                );

                wp_enqueue_script( 'burst',
                    burst_url . "assets/js/burst$minified.js", array(),
                    burst_version, true );
                wp_localize_script(
                    'burst',
                    'burst',
                    $localize_args
                );
            }
        }

        function exclude_from_tracking(){
            if( is_user_logged_in() ){
                $user = wp_get_current_user();
                $excluded_roles = apply_filters('burst_roles_excluded_from_tracking', array( 'administrator' ));
                if ( array_intersect( $excluded_roles, $user->roles ) ) {
                    return true;
                } else {
                    return false;
                }
            }
            return false;
        }

		/**
		 * Function for getting statistics for display with Chart JS
		 * @return json                     Returns a JSON that is compatible with Chart JS
		 *
		 */
		public function ajax_get_chart_statistics(){
			$error = false;
			if ( ! burst_user_can_manage() ) {
				$error = true;
			}
            $experiment_id = 0;
			$metrics = $_GET['metrics'];
			error_log("### get chart stats");
error_log(print_r($_GET, true));
			$period = 'day';

			if ( !$error ) {
				$date_start = intval( $_GET['date_start'] );
				$date_end = intval( $_GET['date_end'] );
				$date_start = empty($date_start) ? false : $date_start;
				$date_end = empty($date_end) ? false : $date_end;

				if ( $date_end==0 ) $date_end = time()-24*HOUR_IN_SECONDS;
				//for each day, counting back from "now" to the first day, get the date.
				$nr_of_periods = $this->get_nr_of_periods($period, $date_start , $date_end);
				$end_date_days_ago = $this->nr_of_periods_ago($period, $date_end);

				$data = array();
                if( $nr_of_periods % 2 == 0 ){
                    $skip = round($nr_of_periods / 6);
                } else{
                    $skip = round($nr_of_periods / 7);
                }



				for ($i = $nr_of_periods-1; $i >= 0; $i--) {
					$days = $i + $end_date_days_ago;
					$unix_day = strtotime("-$days days");
					$date = date( get_option( 'date_format' ), $unix_day);
					$data['dates'][] = $date;

                    $date = '';
                    $unix_day = strtotime("-$days days");
                    if ($n == 0){
                        // add month for first day of the month and first day of dataset
                        if ($i == $nr_of_periods - 1 || $previous_day > date('j', $unix_day)) {
                            $date = date('M j', $unix_day);
                        } else {
                            $date = date('j', $unix_day);
                        }
                        $previous_day = date('j', $unix_day);
                    }
                    error_log($n);
                    $n++;
                    $n = $n == $skip ? 0 : $n;

                    $data['labels'][] = $date;
                }

				//generate a dataset for each category
				$i=0;
				foreach ($metrics as $metric ) {
					$title = ucfirst($metric);
					//get hits grouped per timeslot. default day
                    $args = array(
                        'metric' => $metric,
                        'date_start' => $date_start,
                        'date_end' => $date_end,
                        'experiment_id' => $experiment_id,
                    );
					$hits = $this->get_grouped_statistics_array( $args );
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
                //@todo add filter so we can add metrics nicenames with integrations
                $metrics = array(
                    'visitors' => __('Unique visitors', 'burst'),
                    'pageviews' => __('Pageviews', 'burst'),
                    'conversion_percentages' => __('Conversion percentages', 'burst'),
                    'conversions' => __('Conversions', 'burst'),
                );

                $options = array();
                if ( count($metrics) === 1 ){
                    $options['scales']['yAxes'][0]['scaleLabel'] = isset($metrics[$_GET['metric']]) ? $metrics[$_GET['metric']] : __('Count', 'burst');
                } else {
                    $options['scales']['yAxes'][0]['scaleLabel'] = __('Count', 'burst');
                }

			}


			$return  = array(
				'success' => !$error,
				'data'    => $data,
				'options' => $options,
				//'title'    => __('Experiment', "burst"),
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

		public function get_grouped_statistics_array( $args = array() ) {

			if (!isset($args['metric'])) {
				return array();
			}

			global $wpdb;
			$default_args = array(
                'metric' => 'visitors', //conversion_percentages, visits, conversions
                'date_start' => 0,
                'date_end' => 0,
                'experiment_id' => '',
            );
            $args = wp_parse_args( $args, $default_args );
            $start = intval($args['date_start']);
            $end = intval($args['date_end']);

            switch ($args['metric']) {
                case 'pageviews':
                    $sql = $wpdb->prepare("SELECT 
                        COUNT(*) as hit_count,
                        CONCAT(YEAR(from_unixtime(time)),'-',DAYOFYEAR(from_unixtime(time)) ) as period
                        FROM {$wpdb->prefix}burst_statistics 
                        WHERE time>%s AND time<%s 
                        GROUP BY CONCAT(YEAR(from_unixtime(time)),'-',DAYOFYEAR(from_unixtime(time)) ) order by period asc", $start, $end);
                    break;
                case 'visitors':
                    $sql = $wpdb->prepare("SELECT 
                        COUNT(DISTINCT(uid)) as hit_count,
                        CONCAT(YEAR(from_unixtime(time)),'-',DAYOFYEAR(from_unixtime(time)) ) as period
                        FROM {$wpdb->prefix}burst_statistics 
                        WHERE time>%s AND time<%s 
                        GROUP BY CONCAT(YEAR(from_unixtime(time)),'-',DAYOFYEAR(from_unixtime(time)) ) order by period asc", $start, $end);
                    break;
            }


            $results = $wpdb->get_results($sql);
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
				    $data[$nr_of_periods-$i-1] = $results[$index]->hit_count;
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

        /**
         * Get popular pages
         * @param array $args
         *
         * @return array|int pages
         */

        public function get_hits_single($args=array()){
            $defaults = array(
                'number' => -1,
                'order' => 'DESC',
                'order_by' => 'hit_count',
                'group_by' => 'referrer',
                'page_url'=> false,
                'compare' => ">",
                'range' => false,
                'result_count' => false,
                'offset' => false,
                'count' => false,
                'date_from' => false,
                'date_to' => false,
            );
            $args = wp_parse_args( $args, $defaults);
            if ($args['range'] && $args['range']!=='all'){
                switch ($args['range']){
                    case 'day':
                        $range = time() - DAY_IN_SECONDS;
                        break;
                    case 'week':
                        $range = time() - WEEK_IN_SECONDS;
                        break;
                    case 'year':
                        $range = time() - YEAR_IN_SECONDS;
                        break;
                    case 'month':
                        $range = time() - MONTH_IN_SECONDS;
                        break;
                    default:
                        $range = time() - MONTH_IN_SECONDS;
                }
                $args['date_from'] = $range;
                $args['date_to'] = time();
            }

            global $wpdb;
            $table_name = $wpdb->prefix . 'burst_statistics';
            $limit = '';
            if ($args['number']!=-1){
                $count = intval($args['number']);
                $limit = "LIMIT $count";
                if ($args['offset']){
                    $limit .= ' OFFSET '.intval($args['offset']);
                }
            }
            $order = $args['order']=='ASC' ? 'ASC' : 'DESC';
            $order_by = sanitize_title($args['order_by']);
            $group_by = sanitize_title($args['group_by']);
            $where = '';
            if ($args['page_url']){
                $where .= $wpdb->prepare(' AND page_url = %s ', sanitize_text_field($args['page_url']));
            }

            if ($args['date_from']){
                $from = intval($args['date_from']);
                $where .=" AND time > $from ";
            }

            if ($args['date_to']){
                $to = intval($args['date_to']);
                $where .=" AND time < $to ";
            }

            $search_sql ="SELECT 
                            COUNT($group_by) AS hit_count,
                                if(
                                    SUBSTRING($group_by, -1, 1)='/',
                                    SUBSTRING($group_by, 1, LENGTH($group_by)-1),
                                     $group_by
                                ) as $group_by 
                            FROM $table_name 
                            WHERE 1=1 $where AND $group_by IS NOT NULL AND $group_by <> ''
                            GROUP BY $group_by 
                            ORDER BY $order_by $order $limit ";

            if ($args['count']) {
                $search_sql = str_replace(" * ", " count(*) as count ",  $search_sql);
                $searches =$wpdb->get_var( $search_sql );
            } else {
                $searches =$wpdb->get_results( $search_sql );
            }

            return $searches;
        }

        /**
         * Get value, previous value and difference for single statistics
         * @param string $statistic
         * @param int $date_start
         * @param int $date_end
         * @return array
         */
        public function get_single_statistic($statistic = 'pageviews' , $date_start = 0, $date_end = 0){
            global $wpdb;
            $table_name = $wpdb->prefix . 'burst_statistics';
            $response = [ 'val' => 0 ];
	        $date_start = intval($date_start);
			$date_end = intval($date_end);
            $time_diff = $date_end - $date_start;
            $date_start_diff = intval($date_start - $time_diff);
            $date_end_diff = intval($date_end - $time_diff);

            switch ($statistic) {
                case 'visitors':
                    $sql = $wpdb->prepare("SELECT uid as $statistic, COUNT(uid) as count
                            FROM $table_name
                            WHERE time>%s AND time<%s
                            GROUP BY uid", $date_start, $date_end);
                    $query = $wpdb->get_results( $sql, ARRAY_A );
	                $response['val'] = count($query);
                    $sql = $wpdb->prepare("SELECT uid as $statistic, COUNT(uid) as count
                            FROM $table_name
                            WHERE time>%s AND time<%s
                            GROUP BY uid", $date_start_diff, $date_end_diff);
                    $query = $wpdb->get_results( $sql, ARRAY_A );
	                $response['prev_val'] = count($query); //@todo prev_val query-en
                    break;
                case 'sessions':
                    // a sequence of page visits. A session is over when a user does not interact with the website for 30 minutes or a new day has started.
                    $sql = $wpdb->prepare("SELECT COUNT( DISTINCT( CASE WHEN time > %s AND time < %s THEN session_id  END ) ) AS val,
                                    COUNT( DISTINCT( CASE WHEN time > %s AND time < %s THEN session_id  END ) ) AS prev_val
                            FROM $table_name", $date_start, $date_end, $date_start_diff, $date_end_diff);

                    $results = $wpdb->get_results( $sql, ARRAY_A );
	                $response = isset($results[0]) ? $results[0] : array();
                    break;

                case 'bounce':
                    // a bounce is when a user only visits one page and leaves within 5 seconds
                    $sql = $wpdb->prepare("SELECT COUNT(id) as val, time_on_page
                            FROM $table_name 
                            WHERE session_id in
                                (SELECT session_id FROM $table_name WHERE time>%s AND time<%s GROUP BY session_id HAVING COUNT(session_id)=1)
                            HAVING time_on_page < 5000
                            ", $date_start, $date_end);
                    $bounce = $wpdb->get_results( $sql, ARRAY_A );
                    $sql = $wpdb->prepare("SELECT COUNT(id) as prev_val, time_on_page
                            FROM $table_name 
                            WHERE session_id in
                                (SELECT session_id FROM $table_name WHERE time>%s AND time<%s GROUP BY session_id HAVING COUNT(session_id)=1)
                            HAVING time_on_page < 5000
                            ", $date_start_diff, $date_end_diff);;

                    $bounce_prev = $wpdb->get_results( $sql, ARRAY_A);
	                $response['val'] = intval($bounce[0]['val']) ? $bounce[0]['val'] : 0;
	                $response['prev_val'] = $bounce_prev[0]['prev_val'];
                    break;
                case 'time':
                    $sql = $wpdb->prepare("SELECT
                                AVG(CASE WHEN time>%s AND time<%s THEN time_on_page END) as val,
                                AVG(CASE WHEN time>%s AND time<%s THEN time_on_page END) as prev_val
                            FROM $table_name", $date_start, $date_end, $date_start_diff, $date_end_diff);

                    $results = $wpdb->get_results( $sql, ARRAY_A );
	                $response = isset($results[0]) ? $results[0] : array();
                    break;
                case 'time_total':
                    $sql = $wpdb->prepare("SELECT
                                sum(CASE WHEN time>%s AND time<%s THEN time_on_page END) as val,
                                sum(CASE WHEN time>%s AND time<%s THEN time_on_page END) as prev_val
                            FROM $table_name", $date_start, $date_end, $date_start_diff, $date_end_diff);

                    $results = $wpdb->get_results( $sql, ARRAY_A );
	                $response = isset($results[0]) ? $results[0] : array();
                    break;
                case 'referrer':
                    $sql = $wpdb->prepare("SELECT 
                                referrer as val,
                                COUNT(referrer) AS referrer_count
                            FROM $table_name
                            WHERE time>%s AND time<%s AND referrer IS NOT NULL AND referrer <> ''
                            GROUP BY referrer
                            ORDER BY referrer_count DESC
                            LIMIT 1
                            ", $date_start, $date_end);

                    $results = $wpdb->get_results( $sql, ARRAY_A );
                    if (count($results)) {
	                    $response = isset($results[0]) ? $results[0] : array();
                    } else {
	                    $response['val'] = __('No referrers today', 'burst');
                    }
                    break;
                case 'page_url':
                    $sql = $wpdb->prepare("SELECT 
                                page_url as val,
                                COUNT(page_url) AS page_url_count
                            FROM $table_name
                            WHERE time>%s AND time<%s AND page_url IS NOT NULL AND page_url <> ''
                            GROUP BY page_url
                            ORDER BY page_url_count DESC
                            LIMIT 1
                            ", $date_start, $date_end);

                    $results = $wpdb->get_results( $sql, ARRAY_A );
                    if (count($results)) {
	                    $response = isset($results[0]) ? $results[0] : array();
                    } else {
	                    $response['val'] = __('No pages visited today', 'burst');
                    }
                    break;

                case 'pageviews':
                    $sql = $wpdb->prepare("SELECT
                                COUNT(CASE WHEN time>%s AND time<%s THEN 1 END) as val,
                                COUNT(CASE WHEN time>%s AND time<%s THEN 1 END) as prev_val
                            FROM $table_name", $date_start, $date_end, $date_start_diff, $date_end_diff);

                    $results = $wpdb->get_results( $sql, ARRAY_A );
	                $response = isset($results[0]) ? $results[0] : array();

                    break;
            } // switch closure

            // calculate difference in percentage
            if ( intval( $response['val'] ) && intval( $response['prev_val'] ) ){
	            $response['uplift_val'] = round(($response['val'] - $response['prev_val']) / $response['val'] * 100);
	            $response['uplift_status'] = $response['uplift_val'] >= 0 ? 'positive' : 'negative';
	            $response['uplift_val'] .= '%';
	            $response['uplift_val'] = $response['uplift_val'] >= 0 ? '+' . $response['uplift_val'] : $response['uplift_val'];
            }

			$defaults = array(
				'uplift_val' =>'',
				'uplift_status' => '',
				'val' => 0,
			);
            return wp_parse_args($response, $defaults);
        }

		/**
		 * @param $date_start
		 * @param $date_end
		 *
		 * @return int[][]
		 */
        public function get_platform_and_device_statistics($date_start = 0, $date_end = 0){
	        $date_start = intval($date_start);
			$date_end = intval($date_end);
            $result = array(
                'desktop' => array(
                    'percentage' => 0,
                    'total' => 0,
                ),
                'tablet' => array(
                    'percentage' => 0,
                    'total' => 0,
                ),
                'mobile' => array(
                    'percentage' => 0,
                    'total' => 0,
                ),
                'other' => array(
                    'percentage' => 0,
                    'total' => 0,
                ),
            );
            global $wpdb;
            $table_name = $wpdb->prefix . 'burst_statistics';

            $sql = $wpdb->prepare("SELECT 
                        device as val,
                        COUNT(device) AS count
                    FROM    $table_name
                    WHERE   time>%s AND time<%s AND device IS NOT NULL AND device <> ''
                    GROUP BY device
                    ORDER BY count DESC
                    ", $date_start, $date_end );
            $devices = $wpdb->get_results( $sql, ARRAY_A );
            $total_count = 0;
            $devices_count = array();
            foreach ($devices as $device){
                $total_count = $total_count + $device['count'];
                $devices_count[$device['val']] = $device['count'];
            }
            foreach ($devices_count as $device => $count){

                $percentage = round($count / $total_count * 100, 1);
                $result[$device] = array(
                    'percentage' => $percentage,
                    'total' => $count,
                );
            }

            return $result;
        }

        /**
         * get_real_time_visitors
         * @param int $date_start
         * @param int $date_end
         * @return int
         *
         *  WHERE explanation:
         *  time_on_page(milliseconds) + time(seconds) + 3(seconds) is necessary because when a user goes from one page
         *  to another there is no entry in between. So the counter would go to 0 and than back to 1 everytime a user switches pages
         */


        public function get_real_time_visitors($date_start = 0, $date_end = 0){
            if ($date_start === 0) { $date_start = strtotime('3 minutes ago'); }
            if ($date_end === 0) { $date_end = strtotime('now'); }
            $time = time();

            global $wpdb;
            $table_name = $wpdb->prefix . 'burst_statistics';
            $sql = $wpdb->prepare(" SELECT COUNT(DISTINCT(uid)) as uid
                     FROM $table_name
                     WHERE time>%s 
                       AND time<%s 
                       AND (time_on_page / 1000 + time + 30 + 3 > %s)
                    GROUP BY uid 
                    ORDER BY time desc
                         ", $date_start, $date_end, $time);

            $query = $wpdb->get_results( $sql, ARRAY_A );
            return count($query);
        }

        /**
         * Ajax function to get count for real time visitors
         * @echo json
         */
        public function ajax_get_real_time_visitors(){
            $return  = array(
                'success' => true,
                'count'    => BURST::$statistics->get_real_time_visitors(),
            );
            echo json_encode( $return );
            die;
        }

        public function ajax_get_today_statistics_html(){
            $return  = array(
                'success' => true,
                'html'    => burst_get_template('dashboard/real-time.php', array()),
            );
            echo json_encode( $return );
            die;
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
            `page_url` varchar(255) NOT NULL,
            `time` int(11) NOT NULL,
            `uid` varchar(255) NOT NULL,
            `time_on_page` int(11),
            `entire_page_url` varchar(255) NOT NULL,
            `page_id` int(11) NOT NULL,
            `referrer` varchar(255),
            `anon_ip` varchar(255),
            `browser` varchar(255),
            `browser_version` varchar(255),
            `platform` varchar(255),
            `device` varchar(255),
            `device_resolution` varchar(255),
            `user_agent` varchar(255),
            `scroll_percentage` int(11),
            `session_id` int(11),
              PRIMARY KEY  (ID)
            ) $charset_collate;";
		dbDelta( $sql );
		update_option( 'burst_stats_db_version', burst_version );
	}
}