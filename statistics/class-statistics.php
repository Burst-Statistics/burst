<?php
defined( 'ABSPATH' ) or die( "you do not have acces to this page!" );

if ( ! class_exists( "burst_statistics" ) ) {
	class burst_statistics{
		function __construct( ) {
            add_action( 'wp_ajax_burst_get_chart_statistics', array( $this, 'ajax_get_chart_statistics') );
            add_action( 'wp_ajax_burst_get_real_time_visitors', array( $this, 'ajax_get_real_time_visitors') );
            add_action( 'wp_ajax_burst_get_today_statistics_html', array( $this, 'ajax_get_today_statistics_html') );
            add_action( 'wp_enqueue_scripts', array($this,'enqueue_burst_tracking_script'), 1);
		}

        /**
         * Enqueue some assets
         * @param $hook
         */
        public function enqueue_burst_tracking_script( $hook ) {
            $minified = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';
            if( !$this->exclude_from_tracking() ) {
                global $post;
                //set some defaults
                $localize_args = apply_filters( 'burst_tracking_localized_args',
                    array(
                        'url'                       => get_rest_url() . 'burst/v1/',
                        'page_id'                   => isset($post->ID) ? $post->ID : 0,
                        'cookie_retention_days'     => 30,
                    )
                );
                wp_enqueue_script( 'burst-timeme',
                    burst_url . "helpers/timeme/timeme$minified.js", array(),
                    burst_version, false );
                wp_enqueue_script( 'burst',
                    burst_url . "assets/js/burst$minified.js", apply_filters( 'burst_script_dependencies', array('burst-timeme') ),
                    burst_version, false );
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
                }
                if ( is_preview() || burst_is_pagebuilder_preview() ) {
                    return true;
                }
            }
            return false;
        }

		/**
		 * @param string $metric
		 *
		 * Compare provided a metric with our defined list, return default count if not existing
		 */

		public function sanitize_metric($metric){
			$defaults = $this->get_metrics();

			if ( isset($defaults[$metric]) ) {
				return $metric;
			}

			return 'visitors';
		}
		/**
		 * @param array $metrics
		 *
		 * Compare provided a metric with our defined list, remove if not exists
		 */
		public function sanitize_metrics($metrics){
			$defaults = $this->get_metrics();
			foreach ( $metrics as $metric => $value ) {
				if ( !isset($defaults[$value]) ) {
					unset($metrics[$metric]);
				}
			}
			return $metrics;
		}

		public function get_metrics(){
			return apply_filters("burst_metrics", array(
				'visitors' => __('Unique visitors', 'burst-statistics'),
				'pageviews' => __('Pageviews', 'burst-statistics'),
			) );
		}

		/**
		 * Function for getting statistics for display with Chart JS
		 * @return json                     Returns a JSON that is compatible with Chart JS
		 *
		 */
		public function ajax_get_chart_statistics(){
			$options = array();
			$error = false;
			$period = 'day';

			if ( ! burst_user_can_manage() ) {
				$error = true;
			}

			if ( !isset($_GET['metrics']) || !isset($_GET['date_start']) || !isset($_GET['date_end']) || !isset($_GET['date_range']) ) {
				$error = true;
			}
			if ( !$error ) {
                $metrics = $this->sanitize_metrics( $_GET['metrics'] );
				$metric_labels = $this->get_metrics();
				$date_range = burst_sanitize_date_range( $_GET['date_range'] );
                $date_start = burst_offset_utc_time_to_gtm_offset( $_GET['date_start'] );
                $date_end = burst_offset_utc_time_to_gtm_offset( $_GET['date_end'] );

				if ( $date_end==0 ) $date_end = strtotime('today') - 1;
				//for each day, counting back from "now" to the first day, get the date.
				$nr_of_periods = $this->get_nr_of_periods($period, $date_start, $date_end);
				$data = array();
				for ($i = $nr_of_periods-1; $i >= 0; $i--) {
					$days = $i;
					$unix_day = strtotime("-$days days", $date_end);
					$date = date( 'l - ' . get_option( 'date_format' ), $unix_day);
					$data['dates'][] = $date;
                    $date_label = date('M j', $unix_day);
                    $data['labels'][] = $date_label;
                }

				//generate a dataset for each category
                $i = 0;
				foreach ($metrics as $metric ) {
					$title = $metric_labels[$metric];
					//get hits grouped per timeslot. default day
                    $args = array(
                        'metric' => $metric,
                        'date_start' => $date_start,
                        'date_end' => $date_end,
                        'date_range' => $date_range,
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

			if ( !isset($data['datasets']) ) {
				$data['datasets'][] = array(
					'data' => array(0),
					'backgroundColor' => $this->get_graph_color(0, 'background'),
					'borderColor' => $this->get_graph_color(0),
					'label' => __("No data for this selection", "burst-statistics" ),
					'fill' => 'false',
				);
			}

			if (!$error) {
				$data['date_start'] = $date_start;
				$data['date_end'] = $date_end;
			}

			$return  = array(
				'success' => !$error,
				'data'    => $data,
				'options' => $options,
			);
			echo json_encode( $return );
			die;
		}

		/**
		 * @param int $experiment_id
		 * @param string $test_version
		 * @param int $start
		 * @param int $end
		 * @param bool $clear_cache
		 *
		 * @return array
		 */

		public function get_grouped_statistics_array( $args = array(), $clear_cache = false ) {
            global $wpdb;
            $table_name = $wpdb->prefix . 'burst_statistics';
            $statistics_without_bounces = $this->get_sql_query_to_exclude_bounces($table_name);
			$default_args = array(
                'metric' => 'visitors', //conversion_percentages, visits, conversions
                'date_start' => 0,
                'date_end' => 0,
                'experiment_id' => '',
                'date_range' => 'custom',
            );
            $args = wp_parse_args( $args, $default_args );
			$metric = $this->sanitize_metric($args['metric']);
            $start = intval($args['date_start']);
            $end = intval($args['date_end']);
            $date_range = burst_sanitize_date_range($args['date_range']);

            switch ($metric) {
                case 'pageviews':
                    $sql = $wpdb->prepare("SELECT 
                        COUNT( ID ) as hit_count,
                        CONCAT(YEAR(from_unixtime(time)),'-',DAYOFYEAR(from_unixtime(time)) ) as period
                        FROM ($statistics_without_bounces) as without_bounces
                        WHERE time>%s AND time<%s 
                        GROUP BY CONCAT(YEAR(from_unixtime(time)),'-',DAYOFYEAR(from_unixtime(time)) ) order by period asc", $start, $end);
                    break;
                case 'visitors':
	            default:
                    $sql = $wpdb->prepare("SELECT 
                        COUNT(DISTINCT(uid)) as hit_count,
                        CONCAT(YEAR(from_unixtime(time)),'-',DAYOFYEAR(from_unixtime(time)) ) as period
                        FROM ($statistics_without_bounces) as without_bounces
                        WHERE time>%s AND time<%s 
                        GROUP BY CONCAT(YEAR(from_unixtime(time)),'-',DAYOFYEAR(from_unixtime(time)) ) order by period asc", $start, $end);
                    break;
            }

			$results = $clear_cache || $date_range === 'custom' ? false: get_transient('burst_'.$metric.'_'.$date_range );
			if ( !$results ) {
				$results = $wpdb->get_results($sql);
				if ($date_range!=='custom') set_transient('burst_'.$metric.'_'.$date_range, $results, DAY_IN_SECONDS);
			}

			$nr_of_periods = $this->get_nr_of_periods('DAY', $start, $end );

			$data = array();
			//count back from end until zero days.
			for ($i = $nr_of_periods-1; $i >= 0; --$i) {
				$days = $i;
                $unix_day = strtotime("-$days days", $end);
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
            $range_in_seconds = burst_offset_utc_time_to_gtm_offset(strtotime('tomorrow') - 1) - $time;
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
         * This is used for datatables
         * @param array $args
         * @param bool $clear_cache
         *
         * @return array|int pages
         */

        public function get_hits_single($args=array(), $clear_cache=false){
            $defaults = array(
                'order' => 'DESC',
                'order_by' => 'hit_count',
                'group_by' => 'referrer',
                'date_range' => 'previous-7-days',
                'offset' => false,
                'date_from' => false,
                'date_to' => false,
	            'page' => 1,
            );

            $args = wp_parse_args( $args, $defaults);
			$page = intval($args['page']);
			$date_range = burst_sanitize_date_range($args['date_range']);
	        $offset = BURST::$admin->rows_batch * ($page-1);
	        $number = BURST::$admin->rows_batch;

            global $wpdb;
            $table_name = $wpdb->prefix . 'burst_statistics';
            $statistics_without_bounces = $this->get_sql_query_to_exclude_bounces($table_name);
            $count = intval($number);
            $limit = "LIMIT $count";
			$limit .= ' OFFSET '.intval($offset);

            $order = $args['order']=='ASC' ? 'ASC' : 'DESC';
            $order_by = sanitize_title($args['order_by']);
            $group_by = sanitize_title($args['group_by']);
            $where = '';
            if ($args['date_from']){
                $from = intval($args['date_from']);
                $where .=" AND time > $from ";
            }

            if ($args['date_to']){
                $to = intval($args['date_to']);
                $where .=" AND time < $to ";
            }

            if ($group_by === 'referrer'){
                $direct_text =  "'". __("Direct", "burst-statistics" )."'";
                $remove = array("http://www.", "https://www.", "http://", "https://");
                $site_url = str_replace( $remove, "", site_url());
                $where .="AND $group_by NOT LIKE '%$site_url%'";
                $select = "COUNT($group_by) AS hit_count,
                CASE
                    WHEN referrer = '/' THEN $direct_text
                    ELSE trim( 'www.' from substring($group_by, locate('://', $group_by) + 3)) 
                END as val_grouped"; //Strip http:// and https://
                //substring_index(substring($group_by, locate('://', $group_by) + 3), '.', -2) as $group_by"; //Strip only subdomains and https
                //substring_index(substring_index(substring($group_by, locate('://', $group_by) + 3), '/', 1), '.', -2) as $group_by"; STRIP FULL URL
            } else {
                $homepage_text =  "'". __("Homepage", "burst-statistics" )."'";
                $select = "COUNT($group_by) AS hit_count,
                CASE 
                    WHEN $group_by = '/' THEN $homepage_text
                    ELSE $group_by
                END as val_grouped";
            }

            $search_sql ="SELECT 
                            $select
                            FROM ($statistics_without_bounces) as without_bounces
                            WHERE 1=1 $where AND $group_by IS NOT NULL AND $group_by <> ''
                            GROUP BY val_grouped 
                            ORDER BY $order_by $order $limit ";
	        $searches = $clear_cache || $date_range === 'custom' ? false: get_transient("burst_hits_single_{$group_by}_{$page}_{$date_range}");
            if ( !$searches ) {
	            $searches =$wpdb->get_results( $search_sql );
	            if ($date_range!=='custom') set_transient("burst_hits_single_{$group_by}_{$page}_{$date_range}", $searches, DAY_IN_SECONDS);
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
        public function get_single_statistic($statistic = 'pageviews' , $date_start = 0, $date_end = 0, $column = false, $column_value = false){
            global $wpdb;
            $table_name = $wpdb->prefix . 'burst_statistics';
            $statistics_without_bounces = $this->get_sql_query_to_exclude_bounces($table_name);
            $table_name = "($statistics_without_bounces) as without_bounces";
            $where_page_url = $column && $column_value ? "and " . $column . " = '" . $column_value . "'" : "";
            if ($column == 'referrer' && $column_value && $column_value !== '/'){
                $where_page_url = "and " . $column . " like '%" . $column_value . "%'";
            }
            $response = [ 'val' => 0 ];
	        $date_start = intval($date_start);
			$date_end = intval($date_end);
            switch ($statistic) {
                case 'visitors':
                    $sql = "SELECT COUNT( DISTINCT( uid ) ) AS visitors  
                            FROM $table_name
                            WHERE time > $date_start AND time < $date_end $where_page_url";
                    $response = $wpdb->get_var( $sql );
                    break;
                case 'time_total':
                    $sql = "SELECT SUM( time_on_page ) AS time_on_page
                            FROM $table_name
                            WHERE time > $date_start AND time < $date_end $where_page_url";
                    $response = $wpdb->get_var( $sql );
                    break;
                case 'time_per_session':
                    $sql = "SELECT COUNT( DISTINCT( session_id ) ) AS sessions,
                            COUNT( ID ) as pageviews,
                            AVG( time_on_page ) AS time_on_page
                            FROM $table_name
                            WHERE time > $date_start AND time < $date_end";
                    $response = $wpdb->get_row( $sql, ARRAY_A );
                    $response = is_array($response) ? $this->calculate_time_per_session($response['pageviews'], $response['sessions'], $response['time_on_page']) : 0;
                    break;
                case 'referrer':
                    $direct_text =  "'". __("Direct", "burst-statistics")."'";
                    $sql = $wpdb->prepare("SELECT 
                                CASE
                                    WHEN referrer = '/' THEN $direct_text
                                    ELSE trim( 'www.' from substring(referrer, locate('://', referrer) + 3))
                                END as val,
                                COUNT(referrer) AS referrer_count
                            FROM $table_name
                            WHERE time>%s AND time<%s AND referrer IS NOT NULL AND referrer <> '' $where_page_url
                            GROUP BY referrer
                            ORDER BY referrer_count DESC
                            LIMIT 1
                            ", $date_start, $date_end);

                    $response = $wpdb->get_var( $sql );
                    if (!$response) {
                        $response = __('No referrers today', 'burst-statistics');
                    }
                    break;
                case 'page_url':
                    $homepage_text =  "'". __("Homepage", "burst-statistics")."'";
                    $sql = $wpdb->prepare("SELECT 
                                 CASE 
                                    WHEN page_url = '/' THEN $homepage_text
                                    ELSE page_url
                                END as val,
                                COUNT(page_url) AS page_url_count
                            FROM $table_name
                            WHERE time>%s AND time<%s AND page_url IS NOT NULL AND page_url <> ''
                            GROUP BY page_url
                            ORDER BY page_url_count DESC
                            LIMIT 1
                            ", $date_start, $date_end);

                    $response = $wpdb->get_var( $sql );
                    if (!$response) {
	                    $response = __('No pages visited today', 'burst-statistics');
                    }
                    break;
                case 'pageviews':
                    $sql = "SELECT
                            COUNT( ID ) as pageviews
                            FROM $table_name
                            WHERE time > $date_start AND time < $date_end $where_page_url";
                    $response = $wpdb->get_var( $sql );
                    break;
            } // switch closure

            return $response;
        }

		/**
		 * @return void
		 */

		public function generate_cached_data(){
            $date = date('j-n-Y', time() );
            $last_generated_date = get_option('burst_last_generated');
            if ( $last_generated_date !== $date ) {
                update_option('burst_last_generated', $date);
                $date_ranges = burst_get_date_ranges();
                foreach ( $date_ranges  as $date_range ) {
                    if ($date_range === 'custom' ) continue;
                    $time_stamp = $this->get_time_stamp_for_date_range($date_range);
                    $this->get_platform_and_device_statistics($time_stamp['start'], $time_stamp['end'], $date_range, true);
                    $this->get_compare_statistics( $time_stamp['start'], $time_stamp['end'], $date_range , true);
                    if ($date_range === 'last-7-days') $this->get_dashboard_widget_statistics( $time_stamp['start'], $time_stamp['end'], $date_range , true);
                    $metrics = $this->get_metrics();
                    foreach ( $metrics as $metric => $metric_name ) {
                        $args = array(
                            'metric' => $metric,
                            'date_start' => $time_stamp['start'],
                            'date_end' => $time_stamp['end'],
                            'date_range' => $date_range,
                        );
                        $this->get_grouped_statistics_array( $args, true );
                    }
                    for ($page = 1; $page <= 3; $page++) {
                        $args = array(
                            'date_from' => $time_stamp['start'],
                            'date_to' => $time_stamp['end'],
                            'group_by' => 'referrer',
                            'date_range' => $date_range,//for caching purposes
                            'page' => $page, //for caching purposes
                        );
                        $this->get_hits_single($args, true);
                        $args = array(
                            'date_from' => $time_stamp['start'],
                            'date_to' => $time_stamp['end'],
                            'group_by' => 'page_url',
                            'date_range' => $date_range,//for caching purposes
                            'page' => $page, //for caching purposes
                        );
                        $this->get_hits_single($args, true);
                    }
				}
			}
		}

		public function get_time_stamp_for_date_range( $date_range ){
			$end = strtotime("today", time()) - 1;
			switch ($date_range){
				case 'yesterday':
					$start = $end - DAY_IN_SECONDS + 1; // Plus 1 because we want the start of the day
					break;
				case 'last-30-days':
					$start = $end - 30*DAY_IN_SECONDS + 1;
					break;
                case 'last-90-days':
                    $start = $end - 90*DAY_IN_SECONDS + 1;
                    break;
				case 'last-month':
					$current_month = date('n');
					$previous_month = $current_month-1;
					if ($current_month==1) $previous_month = 12;
					$start = mktime(0, 0, 0, $previous_month, 1);
					$end = mktime(23, 59, 59, $previous_month, date('t', $start));
					break;
				case 'last-7-days':
				default:
					$start = $end - 7*DAY_IN_SECONDS + 1;
					break;
			}
			return ['start'=> $start, 'end'=> $end];
		}

		/**
		 * @param int $date_start
		 * @param int $date_end
		 * @param string $date_range
		 *
		 * @return array
		 */

        public function get_dashboard_widget_statistics($date_start = 0, $date_end = 0, $date_range = 'last-7-days', $clear_cache = false ){
	        $date_start = burst_offset_utc_time_to_gtm_offset($date_start);
			$date_end = burst_offset_utc_time_to_gtm_offset($date_end);
            $time_diff = $date_end - $date_start;
            $date_start_diff = $date_start - $time_diff;
            $date_end_diff = $date_end - $time_diff;
            $result = array(
                'visitors' => '',
                'visitors_uplift' => '',
                'visitors_uplift_status' => '',
                'time_per_session' => '',
                'time_per_session_uplift' => '',
                'time_per_session_uplift_status' => '',
                'top_referrer' => '',
                'top_referrer_pageviews' => '',
                'most_visited' => '',
                'most_visited_pageviews' => '',
            );
			$dashboard_widget = $clear_cache || $date_range === 'custom' ? false : get_transient('burst_dashboard_widget_'.$date_range);
	        if ( !$dashboard_widget ) {
                $result['visitors'] = $this->get_single_statistic('visitors', $date_start, $date_end);
                $visitors_prev = $this->get_single_statistic('visitors', $date_start_diff, $date_end_diff);
                $result['visitors_uplift'] = $this->format_uplift($visitors_prev, $result['visitors']);
                $result['visitors_uplift_status'] = $this->calculate_uplift_status($visitors_prev, $result['visitors']);

                $result['time_per_session'] = $this->get_single_statistic('time_per_session', $date_start, $date_end);
                $time_per_session_prev = $this->get_single_statistic('time_per_session', $date_start_diff, $date_end_diff);
                $result['time_per_session_uplift'] = $this->format_uplift($time_per_session_prev, $result['time_per_session']);
                $result['time_per_session_uplift_status'] = $this->calculate_uplift_status($time_per_session_prev, $result['time_per_session']);

                $result['top_referrer'] = $this->get_single_statistic('referrer', $date_start, $date_end);
                $direct_text =  __("Direct", "burst-statistics");
                if( $result['top_referrer'] === $direct_text ) {
                    $result['top_referrer_pageviews'] = $this->get_single_statistic('pageviews', $date_start, $date_end, 'referrer', '/');
                } else {
                    $result['top_referrer_pageviews'] = $this->get_single_statistic('pageviews', $date_start, $date_end, 'referrer', $result['top_referrer']);
                }
                $result['most_visited'] = $this->get_single_statistic('page_url', $date_start, $date_end);
                $homepage_text =  __("Homepage", "burst-statistics");
                if ( $result['most_visited'] === $homepage_text ) {
                    $result['most_visited_pageviews'] = $this->get_single_statistic('pageviews', $date_start, $date_end, 'page_url', '/');
                } else {
                    $result['most_visited_pageviews'] = $this->get_single_statistic('pageviews', $date_start, $date_end, 'page_url', $result['most_visited']);
                }
		        set_transient('burst_dashboard_widget_'.$date_range, $result, DAY_IN_SECONDS);

                $dashboard_widget = $result;
	        }
            return $dashboard_widget;
        }

        /**
         * @param int $date_start
         * @param int $date_end
         * @param string $date_range
         *
         * @return array
         */

        public function get_platform_and_device_statistics($date_start = 0, $date_end = 0, $date_range = 'previous-7-days', $clear_cache = false ){
            $date_start = burst_offset_utc_time_to_gtm_offset($date_start);
            $date_end = burst_offset_utc_time_to_gtm_offset($date_end);
            $result = array(
                'desktop' => array(
                    'percentage' => 0,
                    'total' => 0,
                    'platform' => '',
                    'browser' => '',
                ),
                'tablet' => array(
                    'percentage' => 0,
                    'total' => 0,
                    'platform' => '',
                    'browser' => '',
                ),
                'mobile' => array(
                    'percentage' => 0,
                    'total' => 0,
                    'platform' => '',
                    'browser' => '',
                ),
                'other' => array(
                    'percentage' => 0,
                    'total' => 0,
                    'platform' => '',
                    'browser' => '',
                ),
            );
            global $wpdb;
            $table_name = $wpdb->prefix . 'burst_statistics';
            $statistics_without_bounces = $this->get_sql_query_to_exclude_bounces($table_name);
            $devices = $clear_cache || $date_range === 'custom' ? false: get_transient('burst_devices_'.$date_range);
            if ( !$devices ) {
                $sql = $wpdb->prepare("SELECT 
                            device as val,
                            COUNT(device) AS count
                        FROM ($statistics_without_bounces) as without_bounces
                        WHERE   time>%s AND time<%s AND device IS NOT NULL AND device <> ''
                        GROUP BY device
                        ORDER BY count DESC
                        ", $date_start, $date_end );
                $devices = $wpdb->get_results( $sql, ARRAY_A );
                set_transient('burst_devices_'.$date_range, $devices, DAY_IN_SECONDS);
            }

            $total_count = 0;
            $devices_count = array();
            foreach ( $devices as $device ){
                $total_count = $total_count + $device['count'];
                $devices_count[$device['val']] = $device['count'];
            }
            foreach ($devices_count as $device => $count){
                $percentage = round($count / $total_count * 100, 1);
                $result[$device]['percentage'] = $percentage;
                $result[$device]['total'] = $count;
            }

            foreach ($result as $device => $device_data ) {
                $device_sql = " device='$device' ";
                if ($device==='other') {
                    $device_sql = " device!='tablet' AND device !='mobile' AND device !='desktop' ";
                }
                $most_popular_browser = $clear_cache ||  $date_range === 'custom' ? false: get_transient('burst_devices_browser_'.$device.'_'.$date_range );
                if ( !$most_popular_browser ) {
                    $sql = $wpdb->prepare("SELECT browser from (SELECT browser, COUNT(*) as count, device
                        FROM ($statistics_without_bounces) as without_bounces where (time>%s AND time<%s) OR device IS NOT NULL AND device <> '' AND browser is not null
                        GROUP BY browser, device ) as grouped_devices where $device_sql order by count desc limit 1
                        ", $date_start, $date_end );
                    $most_popular_browser = $wpdb->get_var( $sql );
                    if (empty($most_popular_browser)) $most_popular_browser = ' - ';
                    if ($date_range!=='custom') set_transient('burst_devices_browser_'.$device.'_'.$date_range, $most_popular_browser, DAY_IN_SECONDS);
                }
                $result[$device]['browser'] = $most_popular_browser;
                $most_popular_platform = $clear_cache || $date_range === 'custom' ? false: get_transient('burst_devices_platform_'.$device.'_'.$date_range);
                if ( !$most_popular_platform ) {
                    $sql = $wpdb->prepare("SELECT platform from (SELECT platform, COUNT(*) as count, device
                        FROM ($statistics_without_bounces) as without_bounces where time>%s AND time<%s AND device IS NOT NULL AND device <> '' AND platform is not null
                        GROUP BY platform, device ) as grouped_devices where $device_sql order by count desc limit 1
                        ", $date_start, $date_end );
                    $most_popular_platform = $wpdb->get_var( $sql );
                    if (empty($most_popular_platform)) $most_popular_platform = ' - ';
                    if ($date_range!=='custom') set_transient('burst_devices_platform_'.$device.'_'.$date_range, $most_popular_platform, DAY_IN_SECONDS);
                }
                $result[$device]['platform'] = $most_popular_platform;
            }
            return $result;
        }

        /**
         * @param int $date_start
         * @param int $date_end
         * @param string $date_range
         * @param bool $clear_cache
         *
         * @return array
         */

        public function get_compare_statistics($date_start = 0, $date_end = 0, $date_range = 'previous-7-days', $clear_cache =false ){
            $date_start = burst_offset_utc_time_to_gtm_offset($date_start);
            $date_end = burst_offset_utc_time_to_gtm_offset($date_end);
            $time_diff = $date_end - $date_start;
            $date_start_diff = $date_start - $time_diff;
            $date_end_diff = $date_end - $time_diff;

            global $wpdb;
            $table_name = $wpdb->prefix . 'burst_statistics';
            $statistics_without_bounces = $this->get_sql_query_to_exclude_bounces($table_name);

	        /**
	         * current stats
             * */
	        $current_stats = $clear_cache || $date_range === 'custom' ? false: get_transient('burst_current_stats_'.$date_range );
			if ( !$current_stats ) {
				$sql           = "SELECT  COUNT( ID ) as pageviews,
                            COUNT( DISTINCT( session_id ) ) AS sessions,
                            COUNT( DISTINCT( uid ) ) AS visitors,
                            AVG( time_on_page ) AS time_on_page,
                            SUM( first_time_visit ) as new_visitors
                    FROM ($statistics_without_bounces) as no_bounce
                    WHERE time > $date_start AND time < $date_end";
				$current_stats = $wpdb->get_row( $sql, ARRAY_A );
				if ($date_range!=='custom') set_transient('burst_current_stats_'.$date_range, $current_stats, DAY_IN_SECONDS);
			}

	        /**
	         * previous stats
	         * */

	        $previous_stats = $clear_cache || $date_range === 'custom' ? false: get_transient('burst_previous_stats_'.$date_range );
	        if ( !$previous_stats ) {
		        $sql = "SELECT  COUNT( ID ) as pageviews_prev,
                            COUNT( DISTINCT( session_id ) ) AS sessions_prev,
                            COUNT( DISTINCT( uid ) ) AS visitors_prev
                    FROM ($statistics_without_bounces) as no_bounce
                    WHERE time > $date_start_diff AND time < $date_end_diff";

		        $previous_stats = $wpdb->get_row( $sql, ARRAY_A );
		        if ($date_range!=='custom') set_transient('burst_previous_stats_'.$date_range, $previous_stats, DAY_IN_SECONDS);
	        }

            $sql_results = array_merge($current_stats, $previous_stats);
            $bounce_time =  apply_filters('burst_bounce_time', 5000);
	        $bounce_count = $clear_cache || $date_range === 'custom' ? false: get_transient('burst_bounce_count_'.$date_range );
	        if ( !$bounce_count ) {
	            $sql = "SELECT COUNT(*) as bounces FROM ( SELECT session_id as bounces from $table_name WHERE time > $date_start AND time < $date_end AND time_on_page < $bounce_time GROUP BY session_id having COUNT(*) = 1) as bounces_table";
	            $bounce_count = $wpdb->get_var( $sql );
		        if ($date_range!=='custom') set_transient('burst_bounce_count_'.$date_range, $bounce_count, DAY_IN_SECONDS);
	        }

	        $bounce_count_prev = $clear_cache || $date_range === 'custom' ? false: get_transient('burst_bounce_count_prev_'.$date_range );
	        if ( !$bounce_count_prev ) {
	            $sql = "SELECT COUNT(*) as bounces FROM ( SELECT session_id as bounces from $table_name WHERE time > $date_start_diff AND time < $date_end_diff AND time_on_page < $bounce_time GROUP BY session_id having COUNT(*) = 1) as bounces_table";
	            $bounce_count_prev = $wpdb->get_var( $sql );
		        if ($date_range!=='custom') set_transient('burst_bounce_count_prev_'.$date_range, $bounce_count_prev, DAY_IN_SECONDS);
	        }

            $bounce_rate = $this->calculate_bounce_percentage($bounce_count, $sql_results['sessions']);
            $bounce_rate_prev = $this->calculate_bounce_percentage($bounce_count_prev, $sql_results['sessions_prev']);
            $pageviews_per_session = $sql_results['sessions'] > 0 ? $sql_results['pageviews'] / $sql_results['sessions'] : 0;
            // text for the compare block
            $results = array(
                'pageviews' => array(
                    'title' => __('Pageviews', 'burst-statistics'),
                    'subtitle' => burst_format_number( $pageviews_per_session, 1) . ' ' . __('pageviews per session', 'burst-statistics'),
                    'tooltip' => '',
                    'number' => burst_format_number($sql_results['pageviews']),
                    'uplift_status' => $this->calculate_uplift_status($sql_results['pageviews_prev'], $sql_results['pageviews']),
                    'uplift' => $this->format_uplift($sql_results['pageviews_prev'], $sql_results['pageviews']),
                ),
                'sessions' => array(
                    'title' => __('Sessions', 'burst-statistics'),
                    'subtitle' => burst_format_milliseconds_to_readable_time($this->calculate_time_per_session($sql_results['pageviews'], $sql_results['sessions'], $sql_results['time_on_page'])) . ' ' . __('per session', 'burst-statistics'),
                    'tooltip' => '',
                    'number' => burst_format_number($sql_results['sessions']),
                    'uplift_status' => $this->calculate_uplift_status($sql_results['sessions_prev'], $sql_results['sessions']),
                    'uplift' => $this->format_uplift($sql_results['sessions_prev'], $sql_results['sessions']),
                ),
                'visitors' => array(
                    'title' => __('Unique visitors', 'burst-statistics'),
                    'subtitle' => $this->calculate_ratio($sql_results['new_visitors'] , $sql_results['visitors'], '%' ) . '%' . ' ' . __('are new visitors', 'burst-statistics'),
                    'tooltip' => '',
                    'number' => burst_format_number($sql_results['visitors']),
                    'uplift_status' => $this->calculate_uplift_status($sql_results['visitors_prev'], $sql_results['visitors']),
                    'uplift' => $this->format_uplift($sql_results['visitors_prev'], $sql_results['visitors']),
                ),
//                'time_on_page' => array(
//                    'title' => __('Avg. time on page', 'burst-statistics'),
//                    'tooltip' => '',
//                    'number' => burst_format_milliseconds_to_readable_time($sql_results['time_on_page']),
//                ),
                'bounces' => array(
                    'title' => __('Bounce rate', 'burst-statistics'),
                    'subtitle' => burst_format_number($bounce_count) . ' ' .__('visitors bounced', 'burst-statistics'),
                    'tooltip' => '',
                    'number' => burst_format_number($bounce_rate, 1) . '%',
                    'uplift_status' => $this->calculate_uplift_status($bounce_rate, $bounce_rate_prev),
                    'uplift' => $this->calculate_percentage_uplift($bounce_rate, $bounce_rate_prev),
                ),
            );

            return $results;
        }

		/**
		 * Helper function to get percentage, allow for zero division
		 *
		 * @param int $value
		 * @param int $total
		 * @param string $type
		 *
		 * @return float
		 */

		private function calculate_ratio($value, $total, $type='%'){
			$value = intval($value);
			$total = intval($total);
			$multiply = 1;
			if ( $type === '%' ) {
				$multiply = 100;
			}
			return $total == 0 ? 0 : round( $value / $total * $multiply, 1);
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


        public function get_real_time_visitors(){
            $time_start = strtotime('3 minutes ago');
            $now = time();
            global $wpdb;
            $table_name = $wpdb->prefix . 'burst_statistics';
            $on_page_offset = apply_filters("burst_on_page_offset", 60);
            $sql = $wpdb->prepare("select count(*) from (SELECT DISTINCT(uid) as uid
                     FROM $table_name
                     WHERE time>%s 
                       AND ( (time + time_on_page / 1000  + $on_page_offset) > %s)
                 ) as p", $time_start, $now );
            return $wpdb->get_var( $sql );
        }

        /**
         * Ajax function to get count for real time visitors
         * @echo json
         */
        public function ajax_get_real_time_visitors(){
            $return  = array(
                'success' => true,
                'count'    => $this->get_real_time_visitors(),
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

        /**
         * Function to get the SQL query to exclude bounces from query's
         *
         * @return string
         */
        function get_sql_query_to_exclude_bounces($table_name) {
            $time_bounce = apply_filters('burst_bounce_time', 5000);
            $bounce = "select session_id from $table_name where time_on_page < $time_bounce group by session_id having count(*) = 1";
            $statistics_without_bounces = "SELECT * FROM $table_name WHERE session_id NOT IN ($bounce)";
            return $statistics_without_bounces;
        }

        /**
         * Function to format uplift
         * @param $original_value
         * @param $new_value
         * @return string
         */
        public function format_uplift($original_value, $new_value){
            $uplift = burst_format_number($this->calculate_uplift($new_value, $original_value));
            if ($uplift === 0) {
                return '';
            }
            return $uplift > 0 ? '+' . $uplift . '%' : $uplift . '%';
        }

        /**
         * Function to calculate uplift
         * @param $original_value
         * @param $new_value
         * @return int
         */
        public function calculate_uplift($original_value, $new_value){
            $increase = $original_value - $new_value;

            return $this->calculate_ratio($increase, $new_value);
        }

        /**
         * Function to calculate uplift
         * @param $original_value
         * @param $new_value
         * @return int
         */

        public function calculate_percentage_uplift($original_value, $new_value){
            $increase = round($original_value - $new_value, 1);
            return $increase > 0 ? '+' . $increase . '%' : $increase . '%';
        }

        /**
         * Function to calculate uplift status
         * @param $original_value
         * @param $new_value
         * @return string
         */

        public function calculate_uplift_status($original_value, $new_value){
            $status = '';
            $uplift = $this->calculate_uplift($new_value, $original_value);

            if ( $uplift > 0 ){
                $status = 'positive';
            } elseif ($uplift < 0){
                $status = 'negative';
            }
            return $status;
        }

        /**
         * Function to calculate time per session
         * @param $original_value
         * @param $new_value
         * @return string
         */
        public function calculate_time_per_session($pageviews, $sessions, $time_per_page){
            $pageviews_per_session = $sessions==0 ? 0 : $pageviews / $sessions;
            $time_per_session = $pageviews_per_session * $time_per_page;
            return $time_per_session;
        }

        /**
         * Function to calculate bounce rate
         * @param int $bounces
         * @param int $sessions
         * @return float
         */
        public function calculate_bounce_percentage($bounces, $sessions){
            return $this->calculate_ratio($bounces, $sessions + $bounces);
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
            `browser` varchar(255),
            `browser_version` varchar(255),
            `platform` varchar(255),
            `device` varchar(255),
            `device_resolution` varchar(255),
            `user_agent` varchar(255),
            `session_id` int(11),
            `first_time_visit` int(11),
              PRIMARY KEY  (ID),
              KEY `time_index` (time)
            ) $charset_collate;";
        /**
         * We use b-tree index as it can be used for < or > operations, which is not possible for HASH
         */
		dbDelta( $sql );
		update_option( 'burst_stats_db_version', burst_version );
	}
}