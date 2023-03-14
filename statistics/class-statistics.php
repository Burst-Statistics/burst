<?php
defined( 'ABSPATH' ) or die( "you do not have access to this page!" );

if ( ! class_exists( "burst_statistics" ) ) {
	class burst_statistics{
		function __construct( ) {
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
			$cookieless = burst_get_option('enable_cookieless_tracking');
			$cookieless_text = $cookieless == '1' ? '-cookieless' : '';
			$in_footer = burst_get_option('enable_turbo_mode');
			if( !$this->exclude_from_tracking() ) {

				global $post;
				//set some defaults;
				$localize_args = apply_filters( 'burst_tracking_options',
					array(
						'url'                   => get_rest_url(),
						'page_id'               => isset( $post->ID ) ? (int) $post->ID : 0,
						'cookie_retention_days' => 30,
						'beacon_url'            => burst_get_beacon_url(),
						'options'               => array(
							'beacon_enabled'             => (int) burst_tracking_status_beacon(),
							'enable_cookieless_tracking' => (int) $cookieless,
							'enable_turbo_mode'          => (int) burst_get_option( 'enable_turbo_mode' ),
							'do_not_track'               => (int) burst_get_option( 'enable_do_not_track' ),
						),
					)
				);
				wp_enqueue_script( 'burst',
					burst_url . "assets/js/build/burst$cookieless_text$minified.js", apply_filters( 'burst_script_dependencies', array('burst-timeme', 'wp-api-fetch') ),
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

			$turbo = burst_get_option('enable_turbo_mode');
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
				$user_role_blocklist = burst_get_option('user_role_blocklist');
				$get_excluded_roles = is_array($user_role_blocklist) ? $user_role_blocklist : array('adminstrator');
                $excluded_roles = apply_filters('burst_roles_excluded_from_tracking', $get_excluded_roles);
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
			$table = $this->get_sql_table($start, $end);

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
			$cached_data = $this->get_transient( 'burst_today_data' );
			if (  ! $cached_data || (int) $this->get_transient('burst_live_value') !== (int) $live_value){
				$this->set_transient('burst_live_value', $live_value, 60);

				$select                      = $this->get_sql_select_for_metrics( [
					'visitors',
					'pageviews',
					'avg_time_on_page',
				] );
				$sql                         = "SELECT $select
						FROM $table as t";
				$results                     = $wpdb->get_results( $sql );
				$data['today']['value']      = $results[0]->visitors > 0 ? $results[0]->visitors : 0;
				$data['pageviews']['value']  = $results[0]->pageviews > 0 ? $results[0]->pageviews : 0;
				$data['timeOnPage']['value'] = $results[0]->avg_time_on_page > 0 ? $results[0]->avg_time_on_page : 0;


				// get most visited page
				$sql                = "SELECT page_url as title, count(*) as value
						FROM $table as t
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
                                ELSE REPLACE(REPLACE(REPLACE(referrer, 'https://', ''), 'http://', ''), 'www.', '')
                            END as title
                        FROM $table as t
                        WHERE referrer IS NOT NULL 
                          AND referrer <> ''
                          AND referrer NOT LIKE '%$site_url%'
                        GROUP BY referrer
                        ORDER BY value DESC
                        LIMIT 1";

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
						'tooltip' => __( 'This is the total amount of unique visitors for today.', 'burst-statistics' ),
					],
					'mostViewed' => [
						'title'   => '-',
						'value'   => '0',
						'tooltip' => __( 'This is your most viewed page for today.', 'burst-statistics' ),
					],
					'referrer'   => [
						'title'   => '-',
						'value'   => '0',
						'tooltip' => __( 'This website referred the most visitors.', 'burst-statistics' ),
					],
					'pageviews'  => [
						'title'   => __( 'Total pageviews', 'burst-statistics' ),
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

				$this->set_transient('burst_today_data', $data, 60);
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
				'date_range' => 'custom',
			);
			$args = wp_parse_args($args, $defaults);

			$metrics = $this->sanitize_metrics( $args['metrics'] );
			$metric_labels = $this->get_metrics();

			// generate labels for dataset
			$labels = array();
			$interval = $args['interval'];
			$date_start = $args['date_start'];
			$date_end = $args['date_end'];
			$date_range = $args['date_range'];
			$nr_of_periods = $this->get_nr_of_periods($interval, $date_start, $date_end );
            $interval_args = [
                'hour' => [
                    'format' => 'H:i',
                    'in_seconds' => HOUR_IN_SECONDS,
                ],
                'day' => [
                    'format' => 'd M',
                    'in_seconds' => DAY_IN_SECONDS,
                ],
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
					'date_range' => $date_range,
				);
				$hits = $this->get_chart_data_by_metric( $args );
				$datasets[] = array(
					'data' => $hits,
					'backgroundColor' => $this->get_metric_color($metric, 'background'),
					'borderColor' => $this->get_metric_color($metric, 'border'),
					'label' => $title,
					'fill' => 'false',
				);
			}

			return array(
				'labels' => $labels,
				'datasets' => $datasets,
			);
		}

        public function get_compare_data($args = array(), $clear_cache = false) {
	        global $wpdb;
	        $defaults = array(
		        'date_start' => 0,
		        'date_end'   => 0,
		        'date_range' => 'custom',
	        );
	        $args     = wp_parse_args( $args, $defaults );

	        $start      = (int) $args['date_start'];
	        $end        = (int) $args['date_end'];
	        $diff       = $end - $start;
	        $start_diff = $start - $diff;
	        $end_diff   = $end - $diff;
	        // get current data for each metric
	        $select  = $this->get_sql_select_for_metrics( [
		        'visitors',
		        'pageviews',
		        'sessions',
		        'first_time_visitors',
		        'avg_time_on_page',
	        ] );
	        $from    = $this->get_sql_table($start, $end);
	        $sql     = "SELECT $select
								FROM $from as stats";
	        $current = $wpdb->get_results( $sql, 'ARRAY_A' );
	        $current = $current[0];
	        // loop through array and convert to ints
	        foreach ( $current as $key => $value ) {
		        $current[ $key ] = (int) $value;
	        }

	        // get current data for bounces
	        $from         = $this->get_sql_table_bounces($start, $end);
	        $sql          = "SELECT count(*) as bounced_sessions
								FROM $from as stats";
	        $curr_bounces = (int) $wpdb->get_var( $sql );

	        // get previous data for each metric
	        $select   = $this->get_sql_select_for_metrics( [
		        'visitors',
		        'pageviews',
		        'sessions',
	        ] );
	        $from     = $this->get_sql_table($start_diff, $end_diff);
	        $sql      = "SELECT $select
								FROM $from as stats";
	        $previous = $wpdb->get_results( $sql, 'ARRAY_A' );
	        $previous = $previous[0];

	        foreach ( $previous as $key => $value ) {
		        $previous[ $key ] = (int) $value;
	        }

	        // get previous data for bounces
	        $from         = $this->get_sql_table_bounces($start_diff, $end_diff);
	        $sql          = "SELECT count(*) as bounced_sessions
								FROM $from as stats";
	        $prev_bounces = (int) $wpdb->get_var( $sql );

	        // setup defaults
	        $default_data = [
		        'current'  => [
			        'pageviews'           => 0,
			        'sessions'            => 0,
			        'visitors'            => 0,
			        'first_time_visitors' => 0,
			        'avg_time_on_page'    => 0, // in seconds
		        ],
		        'previous' => [
			        'pageviews' => 0,
			        'sessions'  => 0,
			        'visitors'  => 0,
		        ],
	        ];

	        $data = [
		        'current'  => $current,
		        'previous' => $previous,
	        ];
	        // add bounces
	        $data['current']['bounced_sessions']  = $curr_bounces;
	        $data['previous']['bounced_sessions'] = $prev_bounces;

			return wp_parse_args($data, $default_data);
		}

		public function get_devices_data($args = array(), $clear_cache = false) {
			global $wpdb;
			$defaults = array(
				'date_start' => 0,
				'date_end' => 0,
			);
			$args = wp_parse_args($args, $defaults);
			$start = (int) $args['date_start'];
			$end = (int) $args['date_end'];
			$devices = [];

				$from          = $this->get_sql_table($start, $end);
				$sql           = "SELECT device,
	                    COUNT(device) AS count
	                    FROM $from as stats
						WHERE device IS NOT NULL AND device <> ''
	                    GROUP BY device";
				$devicesResult = $wpdb->get_results( $sql, ARRAY_A );

				$total = 0;
				// loop through results and add count to array
				foreach ( $devicesResult as $key => $data ) {
					$name = $data['device'];
					$device_sql = " device='$name' ";
					$sql        = "SELECT browser from (SELECT browser, COUNT(*) as count, device
	                        FROM ($from) as without_bounces WHERE device IS NOT NULL AND device <> '' AND browser is not null
	                        GROUP BY browser, device ) as grouped_devices where $device_sql order by count desc limit 1";
					$browser    = $wpdb->get_var( $sql );

					$sql = "SELECT platform from (SELECT platform, COUNT(*) as count, device
	                        FROM ($from) as without_bounces where device IS NOT NULL AND device <> '' AND platform is not null
	                        GROUP BY platform, device ) as grouped_devices where $device_sql order by count desc limit 1";
					$os  = $wpdb->get_var( $sql );

					$devices[ $name ] = [
						'count'   => $data['count'],
						'browser' => $browser,
						'os'      => $os
					];
					$total            += $data['count'];
				}
				$devices['all'] = [
					'count' => $total
				];

				// setup defaults
				$default_data = [
					'all'     => [
						'count'   => 0,
						'os'      => '',
						'browser' => '',
					],
					'desktop' => [
						'count'   => 0,
						'os'      => '',
						'browser' => '',
					],
					'tablet'  => [
						'count'   => 0,
						'os'      => '',
						'browser' => '',
					],
					'mobile'  => [
						'count'   => 0,
						'os'      => '',
						'browser' => '',
					],
					'other'   => [
						'count'   => 0,
						'os'      => '',
						'browser' => '',
					],
				];

				return wp_parse_args($devices, $default_data);

		}

		public function get_pages_data($args = array(), $clear_cache = false) {
			$defaults = array(
				'date_start' => 0,
				'date_end' => 0,
				'metrics' => ['pageviews'], // only one metric should be passed at the moment. @todo add support for multiple metrics
			);
			$args = wp_parse_args($args, $defaults);

			$metrics = $this->sanitize_metrics( $args['metrics'] );
			$metric_labels = $this->get_metrics();

			$date_start = (int) $args['date_start'];
			$date_end = (int) $args['date_end'];

			// generate columns for each metric
			$columns   = array();
			$columns[] = array(
				'name'     => __( 'Page', 'burst-statistics' ),
				'sortable' => true,
				'grow'     => 10,
			);
			foreach ( $metrics as $metric ) {
				$title     = $metric_labels[ $metric ];
				$columns[] = array(
					'name'     => $title,
					'sortable' => true,
					"right"    => true,
					'grow'     => 3,
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
				$data = [];
				foreach ( $metrics as $metric ) {
					$args = array(
						'metric'     => $metric,
						'date_start' => $date_start,
						'date_end'   => $date_end,
					);
					$data = $this->get_pages_by_metric( $args );
				}

			return [
				"columns" => $columns,
				"data"    => $data,
			];
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
			$from 			= $this->get_sql_table($start, $end);
			$sql 			= "SELECT $select as $metric,
								page_url as page
								FROM $from as stats
								GROUP BY page order by $metric desc";

			return $wpdb->get_results($sql);
		}

		public function get_referrers_data($args = array(), $clear_cache = false) {
            global $wpdb;
			$defaults = array(
				'date_start' => 0,
				'date_end' => 0,
				'metrics' => array('count'),
			);
			$args = wp_parse_args($args, $defaults);
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


				$direct_text = "'" . __( "Direct", "burst-statistics" ) . "'";
				$remove      = array( "http://www.", "https://www.", "http://", "https://" );
				$site_url    = str_replace( $remove, "", site_url() );

				$table = $this->get_sql_table($start, $end);
				$sql   = "SELECT count(referrer) as count,
									 CASE
	                                    WHEN referrer = '/' THEN $direct_text
	                                    ELSE REPLACE(REPLACE(REPLACE(referrer, 'https://', ''), 'http://', ''), 'www.', '')
	                                END as referrer
									FROM $table as stats
									WHERE referrer NOT LIKE '%$site_url%' AND referrer NOT LIKE ''
									GROUP BY referrer order by count desc";
				$data  = $wpdb->get_results( $sql );
				$results = [
					"columns" => $columns,
					"data"    => $data,
				];

			return $results;
		}


		public function convert_date_to_utc( $time_string ): int {
			$time = DateTime::createFromFormat('Y-m-d H:i:s', $time_string);
			$utc_time = $time ? $time->format('U') : strtotime($time_string);
			$gmt_offset_seconds = (int) ( get_option( 'gmt_offset' ) * HOUR_IN_SECONDS );
			return $utc_time - $gmt_offset_seconds;
		}

        /**
         * Get chart data by metric
         * @param array $args
         * @return array
         */

		public function get_chart_data_by_metric( $args = array(), $clear_cache = false ) {
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
			$date_range = burst_sanitize_date_range($args['date_range']);

            // first we get the data from the db
            if ( $interval === 'hour') {
                $sqlformat = '%Y-%m-%d %H:00';
                $format = 'Y-m-d H:00';
            } else {
                $sqlformat = '%Y-%m-%d';
                $format = 'Y-m-d';
            }

			$offset = (float) get_option( 'gmt_offset' );

			// Calculate the number of hours and minutes
			$hours = floor($offset);
			$minutes = ($offset - $hours) * 60;

			// Format the offset as a string
			$timezone = sprintf("%+03d:%02d", $hours, $minutes);

			$sql_time = $wpdb->get_var('SELECT NOW()');
			$sql_time_utc = $wpdb->get_var('SELECT UTC_TIMESTAMP()');

			$time_diff = strtotime($sql_time) - strtotime($sql_time_utc);
			$hours = floor($time_diff / 3600);
			$minutes = floor(($time_diff / 60) % 60);

			$server_timezone = sprintf("%s%02d:%02d", ($time_diff >= 0 ? '+' : '-'), abs($hours), abs($minutes));

            $sqlperiod = "DATE_FORMAT(CONVERT_TZ(FROM_UNIXTIME(time), '$server_timezone', '".$timezone."'), '" . $sqlformat . "')"; // this is the sql format for the period
            if ( $metric === 'bounces' ) {
                $select = 'count(*)';
			    $from = $this->get_sql_table_bounces($start, $end);
            } else {
                $select= $this->get_sql_select_for_metric($metric);
			    $from = $this->get_sql_table($start, $end);
			}
            $sql = "SELECT $select as hit_count,
                        $sqlperiod as period
                        FROM $from as stats
                        GROUP BY period order by period";

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
		 * @param int    $start_time
		 * @param int    $end_time
		 *
		 * @return float
		 */

		private function get_nr_of_periods( string $period, int $start_time, int $end_time ): float {
			$range_in_seconds = $end_time - $start_time;
			$period_in_seconds = defined(strtoupper($period).'_IN_SECONDS') ? constant(strtoupper($period).'_IN_SECONDS' ) : DAY_IN_SECONDS;
			return ROUND($range_in_seconds/$period_in_seconds);
		}

        /**
		 * Get color for a graph
		 *
		 * @param string $metric
		 * @param string $type 'background' or 'border'
		 *
		 * @return string
		 */

		private function get_metric_color( string $metric = 'visitors', string $type = 'default' ): string {
			$colors = array(
				'visitors' => array(
					'background' => 'rgba(0,159,255, 0.2)',
					'border'     => 'rgba(0,159,255, 1)',
				),
				'pageviews' => array(
					'background' => 'rgba(244, 191, 62, 0.2)',
					'border'     => 'rgba(244, 191, 62, 1)',
				),
				'bounces' => array(
					'background' => 'rgba(215, 38, 61, 0.2)',
					'border'     => 'rgba(215, 38, 61, 1)',
				),
				'sessions' => array(
					'background' => 'rgba(46, 138, 55, 0.2)',
					'border'     => 'rgba(46, 138, 55, 1)',
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
         * Get value, previous value and difference for single statistics
         * @param string $statistic
         * @param int $date_start
         * @param int $date_end
         * @return array
         */
        public function get_single_statistic($statistic = 'pageviews' , $date_start = 0, $date_end = 0, $column = false, $column_value = false){
            global $wpdb;
            $table_name = $wpdb->prefix . 'burst_statistics';
	        $start = (int) $date_start;
	        $end = (int )$date_end;
            $statistics_without_bounces = $this->get_sql_table($start, $end);
            $table_name = "($statistics_without_bounces) as without_bounces";
            $where_page_url = $column && $column_value ? "WHERE " . $column . " = '" . $column_value . "'" : "";
            if ($column == 'referrer' && $column_value && $column_value !== '/'){
                $where_page_url = "WHERE " . $column . " like '%" . $column_value . "%'";
            }
            $response = [ 'val' => 0 ];
            switch ($statistic) {
                case 'visitors':
                    $sql = "SELECT COUNT( DISTINCT( uid ) ) AS visitors  
                            FROM $table_name
                            $where_page_url";
                    $response = $wpdb->get_var( $sql );
                    break;
                case 'time_total':
                    $sql = "SELECT SUM( time_on_page ) AS time_on_page
                            FROM $table_name
                          	$where_page_url";
                    $response = $wpdb->get_var( $sql );
                    break;
                case 'time_per_session':
                    $sql = "SELECT COUNT( DISTINCT( session_id ) ) AS sessions,
                            COUNT( ID ) as pageviews,
                            AVG( time_on_page ) AS time_on_page
                            FROM $table_name";
                    $response = $wpdb->get_row( $sql, ARRAY_A );
                    $response = is_array($response) ? $this->calculate_time_per_session($response['pageviews'], $response['sessions'], $response['time_on_page']) : 0;
                    break;
                case 'referrer':
                    $direct_text =  "'". __("Direct", "burst-statistics")."'";
                    $sql = "SELECT 
                                CASE
                                    WHEN referrer = '/' THEN $direct_text
                                    ELSE REPLACE(REPLACE(REPLACE(referrer, 'https://', ''), 'http://', ''), 'www.', '')
                                END as val,
                                COUNT(referrer) AS referrer_count
                            FROM $table_name
                            WHERE referrer IS NOT NULL AND referrer <> '' $where_page_url
                            GROUP BY referrer
                            ORDER BY referrer_count DESC
                            LIMIT 1
                            ";

                    $response = $wpdb->get_var( $sql );
                    if (!$response) {
                        $response = false;
                    }
                    break;
                case 'page_url':
                    $homepage_text =  "'". __("Homepage", "burst-statistics")."'";
                    $sql = "SELECT 
                                 CASE 
                                    WHEN page_url = '/' THEN $homepage_text
                                    ELSE page_url
                                END as val,
                                COUNT(page_url) AS page_url_count
                            FROM $table_name
                            WHERE page_url IS NOT NULL AND page_url <> ''
                            GROUP BY page_url
                            ORDER BY page_url_count DESC
                            LIMIT 1";

                    $response = $wpdb->get_var( $sql );
                    if (!$response) {
	                    $response = false;
                    }
                    break;
                case 'pageviews':
                    $sql = "SELECT
                            COUNT( ID ) as pageviews
                            FROM $table_name
                         	$where_page_url";
                    $response = $wpdb->get_var( $sql );
                    break;
            } // switch closure

            return $response;
        }

		/**
		 * Generate cache for statistics.
		 * Only run this function for 1 date range, so we don't ruin the performance
		 * Save the cached date ranges and wait for cron to run function again.
		 * @return void
		 */

		public function generate_cached_data() {
			$date                = date( 'j-n-Y', time() );
			$last_generated_date = get_option( 'burst_last_generated' );
			if ( $last_generated_date !== $date ) {
				$cached_date_ranges     = get_option( 'burst_cached_date_ranges' ) ? get_option( 'burst_cached_date_ranges' ) : [];
				$date_ranges            = burst_get_date_ranges();
				$not_cached_date_ranges = [];
				$time                   = microtime( true );

				// remove today from date ranges
				unset( $date_ranges[0] );

				// get not cached date ranges
				foreach ( $date_ranges as $date_range ) {
					if ( ! in_array( $date_range, $cached_date_ranges ) ) {
						$not_cached_date_ranges[] = $date_range;
					}
				}

				if ( $not_cached_date_ranges !== [] ) {
					// cache only the first date range in the array
					$date_range = $not_cached_date_ranges[0];
					$time_stamp = $this->get_time_stamp_for_date_range( $date_range );
					$args       = [
						'date_start' => $time_stamp['start'],
						'date_end'   => $time_stamp['end'],
						'date_range' => $date_range,
					];
					// cache block data
					$this->get_compare_data( $args, true );
					$this->get_devices_data( $args, true );
					$this->get_pages_data( $args, true );
					$this->get_referrers_data( $args, true );

					// cache insights chart data
					$metrics = $this->get_metrics();
					foreach ( $metrics as $metric => $metric_name ) {
						$args = array(
							'metric'     => $metric,
							'date_start' => $time_stamp['start'],
							'date_end'   => $time_stamp['end'],
							'date_range' => $date_range,
						);
						$this->get_chart_data_by_metric( $args, true );
					}
					// add date range to cached date ranges
					$cached_date_ranges[] = $date_range;
					update_option( 'burst_cached_date_ranges', $cached_date_ranges, false );

				} else {
					// if everything all uncached date ranges are cached, clear option and save last generated date
					if ( WP_DEBUG ) {
						error_log( 'Burst Statistics:  All date ranges are cached' );
					}

					update_option( 'burst_cached_date_ranges', [], false );
					update_option( 'burst_last_generated', $date, false );
				}
				if ( WP_DEBUG ) {
					error_log( 'Burst Statistics: Cached data for ' . $date_range . ' in ' . ( microtime( true ) - $time ) . ' seconds' );
				}
			}
		}

		public function get_time_stamp_for_date_range( $date_range ){
			$end = strtotime("today") - 1;
			switch ($date_range){
				case 'today':
					$start = $end - DAY_IN_SECONDS * 2 + 1; // Plus 1 because we want the start of the day
					$end -= DAY_IN_SECONDS;
					break;
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
				case 'year-to-date':
					$start = mktime(0, 0, 0, 1, 1);
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
            $dashboard_widget = $clear_cache || $date_range === 'custom' || $date_range === 'today' ? false : $this->get_transient('burst_dashboard_widget_'.$date_range);
            $empty_data = isset($dashboard_widget['visitors']) && $dashboard_widget['visitors'] ===0;
			if ( !$dashboard_widget || $empty_data ) {
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
                if( $result['top_referrer'] === __("Direct", "burst-statistics") || $result['top_referrer'] === __('No referrers', 'burst-statistics') ) {
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

                $this->set_transient('burst_dashboard_widget_'.$date_range, $result, DAY_IN_SECONDS);

                $dashboard_widget = $result;
            }
            return $dashboard_widget;
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
         * Function to get the SQL query to exclude bounces from query's
         *
         * @return string
         */
        function get_sql_table($start, $end) {
            global $wpdb;
            $table_name = $wpdb->prefix . 'burst_statistics';
            $time_bounce = apply_filters('burst_bounce_time', 5000);
	        $bounce = "select session_id
						from $table_name
						WHERE time > $start AND time < $end
						GROUP BY session_id
						having count(*) = 1
						   and sum(time_on_page) < $time_bounce";
            $statistics_without_bounces = "(SELECT * FROM $table_name WHERE session_id NOT IN ($bounce) and time > $start AND time < $end)";
            return $statistics_without_bounces;
        }

		/**
		 * Function to get the SQL query to include bounces from query's
		 *
		 * @return string
		 */
		function get_sql_table_bounces($start, $end) {
            global $wpdb;
            $table_name = $wpdb->prefix . 'burst_statistics';
			$time_bounce = apply_filters('burst_bounce_time', 5000);
			$bounce = "select session_id
						from $table_name
						WHERE time > $start AND time < $end
						GROUP BY session_id
						having count(*) = 1
						   and sum(time_on_page) < $time_bounce";
			$statistics_without_bounces = "(SELECT * FROM $table_name WHERE session_id IN ($bounce) and time > $start AND time < $end)";
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
			return $pageviews_per_session * $time_per_page;
		}

		/**
		 * We user our own transient, as the wp transient is not always persistent
		 * Specifically made for license transients, as it stores on network level if multisite.
		 *
		 * @param string $name
		 *
		 * @return mixed
		 */
		private function get_transient( $name ){
			$value = false;
			$now = time();
			$transients = get_option('burst_transients', array());
			if (isset($transients[$name])) {
				$data = $transients[$name];
				$expires = isset($data['expires']) ? $data['expires'] : 0;
				$value = isset($data['value']) ? $data['value'] : false;
				if ( $expires < $now ) {
					unset($transients[$name]);
					update_option('burst_transients', $transients, false);
					$value = false;
				}
			}
			return $value;
		}

		/**
		 * We user our own transient, as the wp transient is not always persistent
		 * Specifically made for license transients, as it stores on network level if multisite.
		 *
		 * @param string $name
		 * @param mixed $value
		 * @param int $expiration
		 *
		 * @return void
		 */
		private function set_transient( $name, $value, $expiration ){
			$transients = get_option('burst_transients', array());
			$transients[$name] = array(
				'value' => $value,
				'expires' => time() + (int) $expiration,
			);
			update_option('burst_transients', $transients, false);
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