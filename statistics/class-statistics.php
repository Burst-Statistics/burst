<?php
defined( 'ABSPATH' ) or die( "you do not have access to this page!" );

if ( ! class_exists( "burst_statistics" ) ) {
	class burst_statistics{
		function __construct( ) {
            add_action( 'wp_ajax_burst_get_chart_statistics', array( $this, 'ajax_get_chart_statistics') );
            add_action( 'wp_ajax_burst_get_real_time_visitors', array( $this, 'ajax_get_real_time_visitors') );
            add_action( 'wp_ajax_burst_get_today_statistics_html', array( $this, 'ajax_get_today_statistics_html') );
			add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_burst_time_tracking_script' ), 0 );
			add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_burst_tracking_script' ), 0 );
			add_filter( 'script_loader_tag', array( $this, 'defer_burst_tracking_script' ), 10, 3 );
		}


		/**
		 * Enqueue some assets
		 * @param $hook
		 */

		public function enqueue_burst_time_tracking_script( $hook ) {
			$minified = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';
			if( !$this->exclude_from_tracking() ) {
				wp_enqueue_script( 'burst-timeme',
					burst_url . "helpers/timeme/timeme$minified.js", array(),
					burst_version, false );
			}
		}

		/**
		 * Enqueue some assets
		 * @param $hook
		 */

		public function enqueue_burst_tracking_script( $hook ) {
			$minified = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';
			$cookieless = burst_get_value('enable_cookieless_tracking');
			$cookieless_text = $cookieless == '1' ? '-cookieless' : '';
			$in_footer = burst_get_value('enable_turbo_mode');
			if( !$this->exclude_from_tracking() ) {

				global $post;
				//set some defaults;
				$localize_args = apply_filters( 'burst_tracking_options',
					array(
						'url'                       => get_rest_url() . 'burst/v1/',
						'page_id'                   => isset($post->ID) ? $post->ID : 0,
						'cookie_retention_days'     => 30,
						'options'                   => array(
							'beacon_enabled'         => burst_tracking_status_beacon(),
							'enable_cookieless_tracking' => $cookieless,
							'enable_turbo_mode'           => burst_get_value('enable_turbo_mode'),
						),
					)
				);
				wp_enqueue_script( 'burst',
					burst_url . "assets/js/build/burst$cookieless_text$minified.js", apply_filters( 'burst_script_dependencies', array('burst-timeme') ),
					burst_version, $in_footer );
				wp_localize_script(
					'burst',
					'burst',
					$localize_args
				);
			}
		}

		public function defer_burst_tracking_script( $tag, $handle, $src ) {
			// time me load asap but async to avoid blocking the page load
			if ( 'burst-timeme' === $handle ) {
				return str_replace( ' src', ' async src', $tag );
			}

			$turbo = burst_get_value('enable_turbo_mode');
			if ( $turbo ) {
				if ( 'burst' == $handle ) {
					return str_replace( ' src', ' defer src', $tag );
				}
			}

			if ( 'burst' === $handle ) {
				return str_replace( ' src', ' async src', $tag );
			}
			return $tag;
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
                'sessions' => __('Sessions', 'burst-statistics'),
				'bounces' => __('Bounces', 'burst-statistics'),
			) );
		}

		public function sanitize_interval($metric){
			$array = [
				'hour',
				'day',
				'week',
				'month',
			];
			if ( in_array($metric, $array) ) {
				return $metric;
			}
			return 'day';
		}

		public function get_today_data($args = array()) {
			$start_time = microtime(true);
			global $wpdb;
			$data     = [];
			$defaults = array(
				'date_start' => 0,
				'date_end'   => 0,
			);
			$args     = wp_parse_args( $args, $defaults );

			$start = $args['date_start'];
			$end   = $args['date_end'];
			$table = $this->get_sql_table();

			// get real time visitors
			$db_name               = $wpdb->prefix . 'burst_statistics';
			$time_start            = strtotime( '10 minutes ago' );
			$now                   = time();
			$on_page_offset        = apply_filters( "burst_on_page_offset", 60 );
			$sql                   = "SELECT count(*) FROM (
						SELECT DISTINCT(uid) AS uid
                     	FROM $db_name
                     		WHERE time > $time_start
                       		AND ( (time + time_on_page / 1000  + $on_page_offset) > $now)
                     		
                 	) AS active_visitors";
			$live_value            = $wpdb->get_var( $sql );
			$live_value            = (int) $live_value > 0 ? $live_value : 0;
			$data['live']['value'] = $live_value;

			// if the live value didn't change we don't update the other stats. This is to avoid unnecessary queries. The transient expires every 60 seconds.
			$cached_data = get_transient( 'burst_today_data' );
			if (  ! $cached_data || (int) get_transient('burst_live_value') !== (int) $live_value){
				set_transient('burst_live_value', $live_value);

				$select                      = $this->get_sql_select_for_metrics( [
					'visitors',
					'pageviews',
					'avg_time_on_page',
				] );
				$sql                         = "SELECT $select
						FROM $table as t
						WHERE t.time > $start
						  AND t.time < $end";
				$results                     = $wpdb->get_results( $sql );
				$data['today']['value']      = $results[0]->visitors;
				$data['pageviews']['value']  = $results[0]->pageviews;
				$data['timeOnPage']['value'] = $results[0]->avg_time_on_page;


				// get most visited page
				$sql                = "SELECT page_url as title, count(*) as value
						FROM $table as t
						WHERE t.time > $start
						  AND t.time < $end
						GROUP BY title
						ORDER BY value DESC
					";
				$data['mostViewed'] = $wpdb->get_row( $sql, ARRAY_A );

				$direct_text = "'" . __( "Direct", "burst-statistics" ) . "'";
				$remove      = array( "http://www.", "https://www.", "http://", "https://" );
				$site_url    = str_replace( $remove, "", site_url() );


				// get top referrer
				$sql = "SELECT count(referrer) as value,
							 CASE
	                            WHEN referrer = '/' THEN $direct_text
							     WHEN referrer = '' THEN $direct_text
	                            ELSE trim( 'www.' from substring(referrer, locate('://', referrer) + 3)) 
	                        END as title
						FROM $table as t
						WHERE t.time > $start
						  AND t.time < $end
						GROUP BY title
						ORDER BY value DESC
					";


				$data['referrer'] = $wpdb->get_row( $sql, ARRAY_A );

				// setup defaults
				$default_data = [
					'live'       => [
						'title'   => __( 'Live visitors', 'burst-statistics' ),
						'value'   => '0',
						'tooltip' => __( 'The amount of people using your website right now. The data updates every 5 seconds.', 'burst-statistics' ),
					],
					'today'      => [
						'title'   => __( 'Today visitors', 'burst-statistics' ),
						'value'   => '0',
						'tooltip' => __( 'This is the total amount of unique visitors for today', 'burst-statistics' ),
					],
					'mostViewed' => [
						'title'   => '-',
						'value'   => '0',
						'tooltip' => __( 'This is your most viewed page for today', 'burst-statistics' ),
					],
					'pageviews'  => [
						'title'   => __( 'Total pageviews', 'burst-statistics' ),
						'value'   => '0',
						'tooltip' => '',
					],
					'referrer'   => [
						'title'   => '-',
						'value'   => '0',
						'tooltip' => '',
					],
					'timeOnPage' => [
						'title'   => __( 'Average time on page', 'burst-statistics' ),
						'value'   => '0',
						'tooltip' => '',
					],
				];

				$data = wp_parse_args( $data, $default_data );
				foreach ($data as $key => $value) {
					// wp_parse_args doesn't work with nested arrays
					$data[$key] = wp_parse_args($value, $default_data[$key]);
				}

				set_transient('burst_today_data', $data, 60);
			} else {
				$data = $cached_data;
			}

			return $data;
		}

		public function get_insights_data($args = array()){
			$defaults = array(
				'date_start' => 0,
				'date_end' => 0,
				'interval' => 'day',
				'metrics' => array('visitors', 'pageviews'),
			);
			$args = wp_parse_args($args, $defaults);

			$metrics = $this->sanitize_metrics( $args['metrics'] );
			$metric_labels = $this->get_metrics();

			// generate labels for dataset
			$labels = array();
			$interval = $args['interval'];
			$date_start = $args['date_start'];
			$date_end = $args['date_end'];
			$nr_of_periods = $this->get_nr_of_periods($interval, $date_start, $date_end );
            $interval_args = [ 
                'hour' => [
                    'format' => 'H:i',
                    'in_seconds' => HOUR_IN_SECONDS,
                ],
                'day' => [
                    'format' => 'd M',
                    'in_seconds' => DAY_IN_SECONDS,
                ]
                ];


            for ( $i = 0; $i < $nr_of_periods; $i++ ) {
                $date = $date_start + $i * $interval_args[$interval]['in_seconds'] + get_option( 'gmt_offset' ) * HOUR_IN_SECONDS;
                $labels[] = date_i18n( $interval_args[$interval]['format'], $date );
            }

			// get data for each metric
			$datasets = array();
			foreach ( $metrics as $metric ) {
				$title = $metric_labels[$metric];
				//get hits grouped per timeslot. default day
				$args = array(
					'metric' => $metric,
					'date_start' => $date_start,
					'date_end' => $date_end,
					'interval' => $interval,
				);
				$hits = $this->get_chart_data_by_metric( $args );
				$datasets[] = array(
					'data' => $hits,
					'backgroundColor' => $this->get_graph_color($metric, 'background'),
					'borderColor' => $this->get_graph_color($metric, 'border'),
					'label' => $title,
					'fill' => 'false',
				);
			}
			$data = array(
				'labels' => $labels,
				'datasets' => $datasets,
			);
			return $data;
		}

        public function get_compare_data($args = array()){
            global $wpdb;
			$defaults = array(
				'date_start' => 0,
				'date_end' => 0,
			);
			$args = wp_parse_args($args, $defaults);

			$start = $args['date_start'];
			$end = $args['date_end'];
            $diff = $end - $start;
            $start_diff = $start - $diff;
            $end_diff = $end - $diff;

			// get current data for each metric
            $select = $this->get_sql_select_for_metrics([   
                    'visitors',
                    'pageviews',
                    'sessions',
                    'first_time_visitors',
                    'avg_time_on_page',
            ]);
			$from = $this->get_sql_table();
			$sql = "SELECT $select
								FROM $from as stats
								WHERE time > $start AND time < $end";
			$current = $wpdb->get_results($sql, 'ARRAY_A');
	        $current = $current[0];

			// get current data for bounces
	        $from = $this->get_sql_table_bounces();
	        $sql = "SELECT count(*) as bounced_sessions
								FROM $from as stats
								WHERE time > $start AND time < $end";
	        $curr_bounces = $wpdb->get_var($sql);

			// get previous data for each metric
	        $select = $this->get_sql_select_for_metrics([
		        'visitors',
		        'pageviews',
		        'sessions',
	        ]);
	        $from = $this->get_sql_table();
	        $sql = "SELECT $select
								FROM $from as stats
								WHERE time > $start_diff AND time < $end_diff";
	        $previous = $wpdb->get_results($sql, 'ARRAY_A');
			$previous = $previous[0];

			// get previous data for bounces
	        $from = $this->get_sql_table_bounces();
	        $sql = "SELECT count(*) as bounced_sessions
								FROM $from as stats
								WHERE time > $start_diff AND time < $end_diff";
	        $prev_bounces = $wpdb->get_var($sql);

			// setup defaults
	        $default_data = [
		        'current' => [
			        'pageviews' => 0,
			        'sessions' => 0,
			        'visitors' => 0,
			        'first_time_visitors' => 0,
			        'avg_time_on_page' => 0, // in seconds
		        ],
		        'previous' => [
			        'pageviews' => 0,
			        'sessions' => 0,
			        'visitors' => 0,
		        ],
	        ];

	        $data = [
		        'current' => $current,
		        'previous' => $previous,
	        ];
	        // add bounces
	        $data['current']['bounced_sessions'] = $curr_bounces;
	        $data['previous']['bounced_sessions'] = $prev_bounces;

            $data = wp_parse_args($data, $default_data);

			return $data;
		}

		public function get_devices_data($args = array()){
			global $wpdb;
			$defaults = array(
				'date_start' => 0,
				'date_end' => 0,
			);
			$args = wp_parse_args($args, $defaults);
			$start = $args['date_start'];
			$end = $args['date_end'];
			$devices = [];

			$from = $this->get_sql_table();
			$sql ="SELECT device,
                    COUNT(device) AS count
                    FROM $from as stats
					WHERE time > $start AND time < $end AND device IS NOT NULL AND device <> ''
                    GROUP BY device";
			$devicesResult = $wpdb->get_results( $sql, ARRAY_A );

			$total = 0;
			// loop through results and add count to array
			foreach ($devicesResult as $key => $data){
				$name = $data['device'];
				//
				$device_sql = " device='$name' ";
				$sql = "SELECT browser from (SELECT browser, COUNT(*) as count, device
                        FROM ($from) as without_bounces where (time > $start AND time < $end) OR device IS NOT NULL AND device <> '' AND browser is not null
                        GROUP BY browser, device ) as grouped_devices where $device_sql order by count desc limit 1";
				$browser = $wpdb->get_var( $sql );

				$sql = "SELECT platform from (SELECT platform, COUNT(*) as count, device
                        FROM ($from) as without_bounces where (time > $start AND time < $end) OR device IS NOT NULL AND device <> '' AND platform is not null
                        GROUP BY platform, device ) as grouped_devices where $device_sql order by count desc limit 1";
				$os = $wpdb->get_var( $sql );

				$devices[$name] = [
					'count' => $data['count'],
					'browser' => $browser,
					'os' => $os
				];
				$total += $data['count'];
			}
			$devices['all'] = [
					'count' => $total
			];

			// setup defaults
			$default_data = [
				'all' => [
					'count' => 0,
					'os' => '',
					'browser' => '',
				],
				'desktop' => [
					'count' => 0,
					'os' => '',
					'browser' => '',
				],
				'tablet' => [
					'count' => 0,
					'os' => '',
					'browser' => '',
				],
				'mobile' => [
					'count' => 0,
					'os' => '',
					'browser' => '',
				],
				'other' => [
					'count' => 0,
					'os' => '',
					'browser' => '',
				],
			];

			$data = wp_parse_args($devices, $default_data);

			return $data;
		}

		public function get_pages_data($args = array()){
			$defaults = array(
				'date_start' => 0,
				'date_end' => 0,
				'metrics' => ['pageviews'], // only one metric should be passed at the moment. @todo add support for multiple metrics
			);
			$args = wp_parse_args($args, $defaults);

			$metrics = $this->sanitize_metrics( $args['metrics'] );
			$metric_labels = $this->get_metrics();

			$date_start = $args['date_start'];
			$date_end = $args['date_end'];

			// generate columns for each metric
			$columns = array();
			$columns[] = array(
				'name' => __('Page', 'burst-statistics'),
				'sortable' => true,
				'grow' => 10,
			);
			foreach ( $metrics as $metric ) {
				$title = $metric_labels[$metric];
				$columns[] = array(
					'name' => $title,
					'sortable' => true,
					"right" => true,
					'grow' => 3,
				);
			}

			//  @todo add metrics
			// - page views
			// - visitors
			// - entrances
			// - exits
			// - avg.time on page
			// - bounces

			// get data for each metric
			foreach ( $metrics as $metric ) {
				$args = array(
					'metric' => $metric,
					'date_start' => $date_start,
					'date_end' => $date_end,
				);
				$data = $this->get_pages_by_metric( $args );
			}

			$pages = [
				"columns" => $columns,
				"data" => $data,
			];

			return $pages;
		}

		public function get_pages_by_metric($args = array()){
            global $wpdb;
			// Set up the base query arguments.
			$defaults = array(
				'metric' => ['pageviews'],
				'date_start' => '0',
				'date_end' => '0',
			);
			$args 			= wp_parse_args( $args, $defaults );
			$start      	= (int) $args['date_start'];
            $end        	= (int) $args['date_end'];
			$metric     	= $this->sanitize_metric($args['metric']);

	
			$select 	    = $this->get_sql_select_for_metric($metric);
			$from 			= $this->get_sql_table();
			$sql 			= "SELECT $select as $metric,
								page_url as page
								FROM $from as stats
								WHERE time > $start AND time < $end 
								GROUP BY page order by $metric desc";
			$results = $wpdb->get_results($sql);
			return $results;
		}

		public function get_referrers_data($args = array()){
            global $wpdb;
			$defaults = array(
				'date_start' => 0,
				'date_end' => 0,
				'metrics' => array('count'),
			);
			$args = wp_parse_args($args, $defaults);

			$metrics = $this->sanitize_metrics( $args['metrics'] );
			$metric_labels = $this->get_metrics();
			// generate columns for each metric
			$columns = [
                [
                    'name' => __('Referrer', 'burst-statistics'),
                    'sortable' => true,
                    'grow' => 10,
                ],
                [
                    'name' => __('Count', 'burst-statistics'),
                    'sortable' => true,
                    'right' => true,
                    'grow' => 3,
                ],
            ];

			// Set up the base query arguments.
			$start      	= (int) $args['date_start'];
            $end        	= (int) $args['date_end'];

            $direct_text =  "'". __("Direct", "burst-statistics" )."'";
            $remove = array("http://www.", "https://www.", "http://", "https://");
            $site_url = str_replace( $remove, "", site_url());

			$table = $this->get_sql_table();
			$sql 			= "SELECT count(referrer) as count,
								 CASE
                                    WHEN referrer = '/' THEN $direct_text
                                    ELSE trim( 'www.' from substring(referrer, locate('://', referrer) + 3)) 
                                END as referrer
								FROM $table as stats
								WHERE time > $start AND time < $end AND referrer NOT LIKE '%$site_url%' AND referrer NOT LIKE ''
								GROUP BY referrer order by count desc";
			$data = $wpdb->get_results($sql);
			$pages = [
				"columns" => $columns,
				"data" => $data,
			];

			return $pages;
		}


		public function convert_date_to_utc( $timestamp ): int {
			$time = DateTime::createFromFormat('Y-m-d H:i:s',$timestamp);
			$utc_time           = $time->format('U');
			$gmt_offset_seconds = (int) ( get_option( 'gmt_offset' ) * HOUR_IN_SECONDS );
			return $utc_time - $gmt_offset_seconds;
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

			if ( ! burst_user_can_view() ) {
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
                        'date_range' => $date_range, // @todp date range nodig? of gewoon rest api
                    );
					$hits = $this->get_chart_data_by_metric( $args );
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
         * Get chart data by metric
         * @param array $args
         * @return array
         */

		public function get_chart_data_by_metric( $args = array()) {
            global $wpdb;
			$default_args = array(
				'metric' => 'visitors',
				'date_start' => 0,
				'date_end' => 0,
				'interval' => 'day',
			);
			$args       = wp_parse_args( $args, $default_args );
			$metric     = $this->sanitize_metric($args['metric']);
            $interval   = $this->sanitize_interval($args['interval']);
            $start      = (int) $args['date_start'];
            $end        = (int) $args['date_end'];
			
            // first we get the data from the db
            if ( $interval === 'hour') {
                $sqlformat = '%Y-%m-%d %H:00';
                $format = 'Y-m-d H:00';
            } else {
                $sqlformat = '%Y-%m-%d';
                $format = 'Y-m-d';
            }
            $sqlperiod = "DATE_FORMAT(FROM_UNIXTIME(time), '" . $sqlformat . "')";
            if ( $metric === 'bounces' ) {
                $select = 'count(*)';
			    $from = $this->get_sql_table_bounces();
            } else {
                $select= $this->get_sql_select_for_metric($metric);
			    $from = $this->get_sql_table();
            }
            
            $sql = "SELECT $select as hit_count,
                        $sqlperiod as period
                        FROM $from as stats
                        WHERE time > $start AND time < $end 
                        GROUP BY period order by period asc";
			$results = $wpdb->get_results($sql);
            
            // match results to periods
			$nr_of_periods = $this->get_nr_of_periods($interval, $start, $end );
			$data = array();

			//count back from end until zero periods. eg hours or days
			for ($i = $nr_of_periods-1; $i >= 0; --$i) {
                $period = strtotime("-$i $interval", $end + get_option( 'gmt_offset' ) * HOUR_IN_SECONDS);
                $period = date($format, $period);
                $found = false;
                foreach ($results as $result) {
                    if ($result->period == $period) {
                        $data[] = $result->hit_count;
                        $found = true;
                        break;
                    }
                }
                if (!$found) {
                    $data[] = 0;
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
		 * @param string $type 'background' or 'border'
		 *
		 * @return string
		 */

		private function get_graph_color( $metric = 'visitors', $type = 'default' ) {
			// @todo add colors
			$colors = array(
				'visitors' => array(
					'background' => 'rgba(41, 182, 246, 0.2)',
					'border'     => 'rgba(41, 182, 246, 1)',
					'default'    => 'rgba(41, 182, 246, 1)',
				),
				'pageviews' => array(
					'background' => 'rgba(244, 191, 62, 0.2)',
					'border'     => 'rgba(244, 191, 62, 1)',
					'default'    => 'rgba(244, 191, 62, 1)',
				),
				'bounces' => array(
					'background' => 'rgba(215, 38, 61, 0.2)',
					'border'     => 'rgba(215, 38, 61, 1)',
					'default'    => 'rgba(215, 38, 61, 1)',
				),
				'sessions' => array(
					'background' => 'rgba(46, 138, 55, 0.2)',
					'border'     => 'rgba(46, 138, 55, 1)',
					'default'    => 'rgba(46, 138, 55, 1)',
				),
			);
			if ( ! isset( $colors[ $metric ] ) ) {
				$metric = 'visitors';
			}
			if ( ! isset( $colors[ $metric ][ $type ] ) ) {
				$type = 'default';
			}

			return $colors[ $metric ][ $type ];
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
            $statistics_without_bounces = $this->get_sql_table();
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
            $statistics_without_bounces = $this->get_sql_table();
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
                        $response = false;
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
	                    $response = false;
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
		 * @todo redo after react
		 */

		public function generate_cached_data(){
            $date = date('j-n-Y', time() );
            $last_generated_date = get_option('burst_last_generated');
            if ( $last_generated_date !== $date ) {
                update_option('burst_last_generated', $date, false);
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
                        $this->get_chart_data_by_metric( $args, true );
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
                if ( !$result['top_referrer'] ) $result['top_referrer'] = __('No referrers', 'burst-statistics');
                if( $result['top_referrer'] === __("Direct", "burst-statistics") ) {
                    $result['top_referrer_pageviews'] = $this->get_single_statistic('pageviews', $date_start, $date_end, 'referrer', '/');
                } else {
                    $result['top_referrer_pageviews'] = $this->get_single_statistic('pageviews', $date_start, $date_end, 'referrer', $result['top_referrer']);
                }

                $result['most_visited'] = $this->get_single_statistic('page_url', $date_start, $date_end);
                if ( !$result['most_visited'] ) $result['most_visited'] = __('No pageviews', 'burst-statistics');
                if ( $result['most_visited'] === __("Homepage", "burst-statistics") ) {
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
            $statistics_without_bounces = $this->get_sql_table();
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
                $percentage = burst_format_number($count / $total_count * 100, 1);
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
            $statistics_without_bounces = $this->get_sql_table();
			$bounces_query = $this->get_sql_table_bounces();

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
		        $sql = "SELECT COUNT(*) as bounces
                    FROM ($bounces_query) as bounces
                    WHERE time > $date_start AND time < $date_end";
	            $bounce_count = $wpdb->get_var( $sql );
		        if ($date_range!=='custom') set_transient('burst_bounce_count_'.$date_range, $bounce_count, DAY_IN_SECONDS);
	        }

	        $bounce_count_prev = $clear_cache || $date_range === 'custom' ? false: get_transient('burst_bounce_count_prev_'.$date_range );
	        if ( !$bounce_count_prev ) {
		        $sql = "SELECT COUNT(*) as bounces
                    FROM ($bounces_query) as bounces
                    WHERE time > $date_start_diff AND time < $date_end_diff";
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
                    'subtitle' => burst_format_number($this->calculate_ratio($sql_results['new_visitors'] , $sql_results['visitors'], '%' ), 0) . '%' . ' ' . __('are new visitors', 'burst-statistics'),
                    'tooltip' => '',
                    'number' => burst_format_number($sql_results['visitors'], 0),
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
        function get_sql_table() {
            global $wpdb;
            $table_name = $wpdb->prefix . 'burst_statistics';
            $time_bounce = apply_filters('burst_bounce_time', 5000);
	        $bounce = "select session_id
						from $table_name
						GROUP BY session_id
						having count(*) = 1
						   and sum(time_on_page) < $time_bounce";
            $statistics_without_bounces = "(SELECT * FROM $table_name WHERE session_id NOT IN ($bounce))";
            return $statistics_without_bounces;
        }

		/**
		 * Function to get the SQL query to include bounces from query's
		 *
		 * @return string
		 */
		function get_sql_table_bounces() {
            global $wpdb;
            $table_name = $wpdb->prefix . 'burst_statistics';
			$time_bounce = apply_filters('burst_bounce_time', 5000);
			$bounce = "select session_id
						from $table_name
						GROUP BY session_id
						having count(*) = 1
						   and sum(time_on_page) < $time_bounce";
			$statistics_without_bounces = "(SELECT * FROM $table_name WHERE session_id IN ($bounce))";
			return $statistics_without_bounces;
		}
        
        function get_sql_select_for_metric($metric){
            switch ($metric) {
                case 'pageviews':
                    $sql = "count(*)";
                    break;
                case 'sessions':
                    $sql = "COUNT( DISTINCT( session_id ) )";
                    break;
                case 'avg_time_on_page':
                    $sql = "AVG( time_on_page )";
                    break;
                case 'first_time_visitors':
                    $sql = "sum(case when first_time_visit = 1 then 1 else 0 end)";
                    break;
                case 'visitors':
                default:
                    $sql = "COUNT(DISTINCT(uid))";
                    break;
            }
            return $sql;
        }

        function get_sql_select_for_metrics($metrics){
            $select = '';
            $count = count($metrics);
            $i = 1;
            foreach ($metrics as $metric) {

                $sql = $this->get_sql_select_for_metric($metric);
                $select .= $sql . ' as '.$metric;
                if ($count !== $i) {
                    $select .= ', ';
                }
                $i++;
            }
            
            return $select;
        }

        /**
         * Function to format uplift
         * @param $original_value
         * @param $new_value
         * @return string
         */
        public function format_uplift($original_value, $new_value){
            $uplift = burst_format_number($this->calculate_uplift($new_value, $original_value), 0);
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
            $increase = burst_format_number($original_value - $new_value, 1);
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