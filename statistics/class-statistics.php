<?php
defined( 'ABSPATH' ) or die( 'you do not have access to this page!' );

if ( ! class_exists( 'burst_statistics' ) ) {
	class burst_statistics {
		function __construct() {
			add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_burst_time_tracking_script' ), 0 );
			add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_burst_tracking_script' ), 0 );
			add_filter( 'script_loader_tag', array( $this, 'defer_burst_tracking_script' ), 10, 3 );
		}


		/**
		 * Enqueue some assets
		 *
		 * @param $hook
		 */

		public function enqueue_burst_time_tracking_script( $hook ) {
			$minified = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';
			if ( ! $this->exclude_from_tracking() ) {
				wp_enqueue_script(
					'burst-timeme',
					burst_url . "helpers/timeme/timeme$minified.js",
					array(),
					burst_version,
					false
				);
			}
		}

		/**
		 * Enqueue some assets
		 *
		 * @param $hook
		 */

		public function enqueue_burst_tracking_script( $hook ) {
			$minified        = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';
			$cookieless      = burst_get_option( 'enable_cookieless_tracking' );
			$cookieless_text = $cookieless == '1' ? '-cookieless' : '';
			$in_footer       = burst_get_option( 'enable_turbo_mode' );
			$beacon_enabled = (int) burst_tracking_status_beacon();

			if ( ! $this->exclude_from_tracking() ) {
				$localize_args = apply_filters(
					'burst_tracking_options',
					array(
						'url'                   => get_rest_url(),
						'page_id'               => get_queried_object_id(),
						'cookie_retention_days' => 30,
						'beacon_url'            => burst_get_beacon_url(),
						'options'               => array(
							'beacon_enabled'             => $beacon_enabled,
							'enable_cookieless_tracking' => (int) $cookieless,
							'enable_turbo_mode'          => (int) burst_get_option( 'enable_turbo_mode' ),
							'do_not_track'               => (int) burst_get_option( 'enable_do_not_track' ),
						),
						'goals'                 => burst_get_active_goals(),
						'goals_script_url'      => burst_get_goals_script_url(),
					)
				);

				$deps = $beacon_enabled ? ['burst-timeme' ] : ['burst-timeme', 'wp-api-fetch'];

				wp_enqueue_script(
					'burst',
					burst_url . "assets/js/build/burst$cookieless_text$minified.js",
					apply_filters( 'burst_script_dependencies', $deps ),
					burst_version,
					$in_footer
				);
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

			$turbo = burst_get_option( 'enable_turbo_mode' );
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

		function exclude_from_tracking() {
			if ( is_user_logged_in() ) {
				$user                = wp_get_current_user();
				$user_role_blocklist = burst_get_option( 'user_role_blocklist' );
				$get_excluded_roles  = is_array( $user_role_blocklist ) ? $user_role_blocklist : array( 'adminstrator' );
				$excluded_roles      = apply_filters( 'burst_roles_excluded_from_tracking', $get_excluded_roles );
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

		public function sanitize_metric( $metric ) {
			$defaults = $this->get_metrics();

			if ( isset( $defaults[ $metric ] ) ) {
				return $metric;
			}

			return 'visitors';
		}

		/**
		 * @param array $metrics
		 *
		 * Compare provided a metric with our defined list, remove if not exists
		 */
		public function sanitize_metrics( $metrics ) {
			$defaults = $this->get_metrics();
			foreach ( $metrics as $metric => $value ) {
				if ( ! isset( $defaults[ $value ] ) ) {
					unset( $metrics[ $metric ] );
				}
			}

			return $metrics;
		}

		public function get_metrics() {
			return apply_filters(
				'burst_metrics',
				array(
					'pageviews'           => __( 'Pageviews', 'burst-statistics' ),
					'sessions'            => __( 'Sessions', 'burst-statistics' ),
					'visitors'            => __( 'Visitors', 'burst-statistics' ),
					'avg_time_on_page'    => __( 'Time on page', 'burst-statistics' ),
					'first_time_visitors' => __( 'New visitors', 'burst-statistics' ),
					'bounces'             => __( 'Bounces', 'burst-statistics' ),
					'bounce_rate'         => __( 'Bounce rate', 'burst-statistics' ),
					'conversions'         => __( 'Conversions', 'burst-statistics' ),
				)
			);
		}

		public function sanitize_interval( $metric ) {
			$array = [
				'hour',
				'day',
				'week',
				'month',
			];
			if ( in_array( $metric, $array ) ) {
				return $metric;
			}

			return 'day';
		}

		public function get_live_visitors_data() {
			global $wpdb;
			$data = [];

			// get real time visitors
			$db_name        = $wpdb->prefix . 'burst_statistics';
			$time_start     = strtotime( '10 minutes ago' );
			$now            = time();
			$on_page_offset = apply_filters( 'burst_on_page_offset', 60 );
			$sql            = "SELECT count(DISTINCT(uid))
                     	FROM $db_name
                     		WHERE time > $time_start
                       		AND ( (time + time_on_page / 1000  + $on_page_offset) > $now)";
			$live_value     = $wpdb->get_var( $sql );

			return (int) $live_value > 0 ? $live_value : 0;
		}

		public function get_today_data( $args = array() ) {
			global $wpdb;
			$data     = [];
			$defaults = array(
				'date_start' => 0,
				'date_end'   => 0,
			);
			$args     = wp_parse_args( $args, $defaults );
			$start    = (int) $args['date_start'];
			$end      = (int) $args['date_end'];
			$sql      = $this->get_sql_table(
				$start,
				$end,
				array(
					'visitors',
					'pageviews',
					'avg_time_on_page',
				),
				array(
					'bounce' => 0,
				)
			);
			$table    = $this->get_sql_table( $start, $end );

			$results                     = $wpdb->get_results( $sql );
			$data['today']['value']      = $results[0]->visitors > 0 ? $results[0]->visitors : 0;
			$data['pageviews']['value']  = $results[0]->pageviews > 0 ? $results[0]->pageviews : 0;
			$data['timeOnPage']['value'] = $results[0]->avg_time_on_page > 0 ? $results[0]->avg_time_on_page : 0;

			// get most visited page
			$sql = "SELECT page_url as title, count(*) as value
						FROM ( $table ) as t 
						WHERE page_url IS NOT NULL 
						  AND page_url <> ''
						  AND bounce = 0
						GROUP BY title
						ORDER BY value DESC
					";

			$data['mostViewed'] = $wpdb->get_row( $sql, ARRAY_A );

			$remove   = array( 'http://www.', 'https://www.', 'http://', 'https://' );
			$site_url = str_replace( $remove, '', site_url() );
			// get top referrer
			$sql = "SELECT count(referrer) as value,
                            CASE
                                WHEN referrer = '' THEN 'Direct'
                                ELSE REPLACE(REPLACE(REPLACE(referrer, 'https://', ''), 'http://', ''), 'www.', '')
                            END as title
                        FROM ( $table ) as t
                        WHERE referrer IS NOT NULL 
                          AND referrer NOT LIKE '%$site_url%'
                          AND bounce = 0
                        GROUP BY referrer
                        ORDER BY value DESC
                        LIMIT 1";

			$data['referrer'] = $wpdb->get_row( $sql, ARRAY_A );

			if ( isset( $data['referrer']['title'] ) && $data['referrer']['title'] == '' ) {
				$data['referrer']['title'] = __( 'Direct', 'burst-statistics' );
			}

			// setup defaults
			$default_data = array(
				'live'       => array(
					'value'   => '0',
					'tooltip' => __( 'The amount of people using your website right now. The data updates every 5 seconds.', 'burst-statistics' ),
				),
				'today'      => array(
					'value'   => '0',
					'tooltip' => __( 'This is the total amount of unique visitors for today.', 'burst-statistics' ),
				),
				'mostViewed' => array(
					'title'   => '-',
					'value'   => '0',
					'tooltip' => __( 'This is your most viewed page for today.', 'burst-statistics' ),
				),
				'referrer'   => array(
					'title'   => '-',
					'value'   => '0',
					'tooltip' => __( 'This website referred the most visitors.', 'burst-statistics' ),
				),
				'pageviews'  => array(
					'title'   => __( 'Total pageviews', 'burst-statistics' ),
					'value'   => '0',
					'tooltip' => '',
				),
				'timeOnPage' => array(
					'title'   => __( 'Average time on page', 'burst-statistics' ),
					'value'   => '0',
					'tooltip' => '',
				),
			);

			$data = wp_parse_args( $data, $default_data );
			foreach ( $data as $key => $value ) {
				// wp_parse_args doesn't work with nested arrays
				$data[ $key ] = wp_parse_args( $value, $default_data[ $key ] );
			}

			return $data;
		}

		public function get_insights_data( $args = array() ) {
			$defaults      = array(
				'date_start' => 0,
				'date_end'   => 0,
				'metrics'    => array( 'pageviews', 'visitors' ),
			);
			$args          = wp_parse_args( $args, $defaults );
			$metrics       = $this->sanitize_metrics( $args['metrics'] );
			$metric_labels = $this->get_metrics();

			// generate labels for dataset
			$labels = array();
			// if not interval is a string and string is not ''
			$date_start = (int) $args['date_start'];
			$date_end   = (int) $args['date_end'];
			$nr_of_days = $this->get_nr_of_periods( 'day', $date_start, $date_end );

			$interval = 'hour';

			// if $nr_of_days > 3 then interval is day
			// if $nr_of_days > 30 then interval is week
			// if $nr_of_days > 365 then interval is month
			if ( $nr_of_days > 3 ) {
				$interval = 'day';
			}

			$nr_of_periods = $this->get_nr_of_periods( $interval, $date_start, $date_end );

			$interval_args = array(
				'hour' => array(
					'format'     => 'H:i',
					'in_seconds' => HOUR_IN_SECONDS,
				),
				'day'  => array(
					'format'     => 'd M',
					'in_seconds' => DAY_IN_SECONDS,
				),
			);

			for ( $i = 0; $i < $nr_of_periods; $i++ ) {
				$date     = $date_start + $i * $interval_args[ $interval ]['in_seconds'] + get_option( 'gmt_offset' ) * HOUR_IN_SECONDS;
				$labels[] = date_i18n( $interval_args[ $interval ]['format'], $date );
			}

			// get data for each metric
			$datasets = array();
			foreach ( $metrics as $metric ) {
				$title = $metric_labels[ $metric ];
				// get hits grouped per timeslot. default day
				$args       = array(
					'metric'     => $metric,
					'date_start' => $date_start,
					'date_end'   => $date_end,
					'interval'   => $interval,
					'filters'    => burst_sanitize_filters( $args['filters'] ),
				);
				$hits       = $this->get_chart_data_by_metric( $args );
				$datasets[] = array(
					'data'            => $hits,
					'backgroundColor' => $this->get_metric_color( $metric, 'background' ),
					'borderColor'     => $this->get_metric_color( $metric, 'border' ),
					'label'           => $title,
					'fill'            => 'false',
				);
			}

			return array(
				'labels'   => $labels,
				'datasets' => $datasets,
			);
		}

		public function get_compare_data( $args = array() ) {
			$defaults                  = array(
				'date_start' => 0,
				'date_end'   => 0,
				'page_id'    => false,
				'filters'    => array(),
			);
			$args                      = wp_parse_args( $args, $defaults );
			$args['filters']['bounce'] = 0;

			$start      = (int) $args['date_start'];
			$end        = (int) $args['date_end'];
			$diff       = $end - $start;
			$start_diff = $start - $diff;
			$end_diff   = $end - $diff;

			$filters = burst_sanitize_filters( $args['filters'] );
			$select  = array( 'visitors', 'pageviews', 'sessions', 'first_time_visitors', 'avg_time_on_page' );

			// current data
			$current = $this->get_data( $select, $start, $end, $filters );

			// previous data
			$previous = $this->get_data( $select, $start_diff, $end_diff, $filters );

			// bounces

			$curr_bounces = $this->get_bounces( $start, $end, $filters );
			$prev_bounces = $this->get_bounces( $start_diff, $end_diff, $filters );

			// combine data
			$data = array(
				'current'  => array(
					'pageviews'           => (int) $current['pageviews'],
					'sessions'            => (int) $current['sessions'],
					'visitors'            => (int) $current['visitors'],
					'first_time_visitors' => (int) $current['first_time_visitors'],
					'avg_time_on_page'    => (int) $current['avg_time_on_page'],
					'bounced_sessions'    => $curr_bounces,
				),
				'previous' => array(
					'pageviews'        => (int) $previous['pageviews'],
					'sessions'         => (int) $previous['sessions'],
					'visitors'         => (int) $previous['visitors'],
					'bounced_sessions' => $prev_bounces,
				),
			);

			return $data;
		}

		public function get_compare_goals_data( $args = array() ) {
			$defaults                  = array(
				'date_start' => 0,
				'date_end'   => 0,
				'page_id'    => false,
				'filters'    => array(),
			);
			$args                      = wp_parse_args( $args, $defaults );
			$args['filters']['bounce'] = 0;

			$start      = (int) $args['date_start'];
			$end        = (int) $args['date_end'];
			$diff       = $end - $start;
			$start_diff = $start - $diff;
			$end_diff   = $end - $diff;
			$filters    = burst_sanitize_filters( $args['filters'] );

			$filters_without_goal = $filters;
			unset( $filters_without_goal['goal_id'] );

			$select = array( 'pageviews', 'visitors', 'sessions', 'first_time_visitors' );
			// current data
			$current = $this->get_data( $select, $start, $end, $filters_without_goal );

			$select = array( 'pageviews', 'sessions', 'visitors' );
			// previous data
			$previous = $this->get_data( $select, $start_diff, $end_diff, $filters_without_goal );

			// get amount of conversions for current period
			$current_conversions  = $this->get_conversions( $start, $end, $filters );
			$previous_conversions = $this->get_conversions( $start_diff, $end_diff, $filters );

			$current_conversion_rate  = $this->calculate_conversion_rate( $current_conversions, (int) $current['pageviews'] );
			$previous_conversion_rate = $this->calculate_conversion_rate( $previous_conversions, (int) $previous['pageviews'] );

			// combine data
			$data = array(
				'view'     => 'goals',
				'current'  => array(
					'pageviews'           => (int) $current['pageviews'],
					'visitors'            => (int) $current['visitors'],
					'sessions'            => (int) $current['sessions'],
					'first_time_visitors' => (int) $current['first_time_visitors'],
					'conversions'         => $current_conversions,
					'conversion_rate'     => $current_conversion_rate,
				),
				'previous' => array(
					'pageviews'       => (int) $previous['pageviews'],
					'visitors'        => (int) $previous['visitors'],
					'sessions'        => (int) $previous['sessions'],
					'conversions'     => $previous_conversions,
					'conversion_rate' => $previous_conversion_rate,
				),
			);

			return $data;
		}

		private function get_data( $select, $start, $end, $filters ) {
			global $wpdb;
			$sql    = $this->get_sql_table( $start, $end, $select, $filters );
			$result = $wpdb->get_results( $sql, 'ARRAY_A' );

			return $result[0];
		}

		private function get_bounces( $start, $end, $filters ) {
			global $wpdb;
			$filters['bounce'] = 1;
			$sql               = $this->get_sql_table( $start, $end, array( 'count' ), $filters );

			return (int) $wpdb->get_var( $sql );
		}

		private function get_conversions( $start, $end, $filters ) {
			global $wpdb;

			// filter is goal id so pageviews returned are the conversions
			$sql = $this->get_sql_table( $start, $end, array( 'pageviews' ), $filters );

			return (int) $wpdb->get_var( $sql );
		}


		public function get_devices_title_and_value_data( $args = array() ) {
			global $wpdb;
			$defaults          = array(
				'date_start' => 0,
				'date_end'   => 0,
				'filters'    => array(),
			);
			$args              = wp_parse_args( $args, $defaults );
			$start             = (int) $args['date_start'];
			$end               = (int) $args['date_end'];
			$filters           = burst_sanitize_filters( $args['filters'] );
			$filters['bounce'] = 0;
			$goal_id           = $filters['goal_id'] ?? null;
			$country_code	  = $filters['country_code'] ?? null;

			$from = $this->get_sql_table( $start, $end, array( '*' ), $filters );

			// Conditional JOIN and WHERE based on the presence of goal_id
			$join_clause  = '';
			// if string is not '' then add 'AND' to the string
			$where_clause = $this->get_where_clause_for_filters($filters);
			if ( $goal_id !== null ) {
				$join_clause  = "INNER JOIN {$wpdb->prefix}burst_goal_statistics AS goals ON stats.ID = goals.statistic_id";
				// append to where clause
				$where_clause .= $wpdb->prepare( " AND goals.goal_id = %d ", $goal_id );
			}
			if ($country_code !== null) {
				$join_clause .= " INNER JOIN {$wpdb->prefix}burst_sessions AS sessions ON stats.session_id = sessions.ID ";
				$where_clause .= $wpdb->prepare( " AND sessions.country_code = %s ", $country_code );
			}

			$sql           = $wpdb->prepare(
				"SELECT device, COUNT(device) AS count
				        FROM (
				            SELECT stats.device 
				            FROM {$wpdb->prefix}burst_statistics AS stats
				            $join_clause
				            WHERE time > %s
				            AND time < %s 
				            AND device IS NOT NULL 
				            AND device <> ''
				            $where_clause
				        ) AS stats
				        GROUP BY device;",
				$start,
				$end,
				$goal_id
			);
			$devicesResult = $wpdb->get_results( $sql, ARRAY_A );

			$total         = 0;
			$devices           = [];
			foreach ( $devicesResult as $key => $data ) {
				$name             = $data['device'];
				$devices[ $name ] = array(
					'count' => $data['count'],
				);
				$total           += $data['count'];
			}
			$devices['all'] = array(
				'count' => $total,
			);

			// setup defaults
			$default_data = array(
				'all'     => array(
					'count' => 0,
				),
				'desktop' => array(
					'count' => 0,
				),
				'tablet'  => array(
					'count' => 0,
				),
				'mobile'  => array(
					'count' => 0,
				),
				'other'   => array(
					'count' => 0,
				),
			);

			return wp_parse_args( $devices, $default_data );
		}

		public function get_devices_subtitle_data( $args = array() ) {
			global $wpdb;
			$defaults = array(
				'date_start' => 0,
				'date_end'   => 0,
				'filters'    => [],
			);
			$args = wp_parse_args( $args, $defaults );
			$start = (int) $args['date_start'];
			$end = (int) $args['date_end'];
			$devices = ['desktop', 'tablet', 'mobile', 'other'];
			$filters = burst_sanitize_filters($args['filters']);
			$goal_id = $filters['goal_id'] ?? null;
			$country_code = $filters['country_code'] ?? null;
			$filters['bounce'] = 0;

			// if string is not '' then add 'AND' to the string
			$where_clause = $this->get_where_clause_for_filters($filters);
			$results = [];

			// Loop through results and add count to array
			foreach ( $devices as $device ) {
				$device_sql = $wpdb->prepare( " device=%s ", $device );

				$common_sql = " FROM {$wpdb->prefix}burst_statistics AS stats ";
				$where_sql = $wpdb->prepare( " WHERE time > %d AND time < %d AND device IS NOT NULL AND device <> '' $where_clause", $start, $end, $filters['bounce'] );

				// Conditional JOIN and WHERE based on the presence of goal_id
				if ($goal_id !== null) {
					$common_sql .= " INNER JOIN {$wpdb->prefix}burst_goal_statistics AS goals ON stats.ID = goals.statistic_id ";
					$where_sql .= $wpdb->prepare( " AND goals.goal_id = %d ", $goal_id );
				}

				if ($country_code) {
					$common_sql .= " INNER JOIN {$wpdb->prefix}burst_sessions AS sessions ON stats.session_id = sessions.ID ";
					$where_sql .= $wpdb->prepare( " AND sessions.country_code = %s ", $country_code );
				}



				// Query for browser
				$sql = $wpdb->prepare( "SELECT browser FROM (SELECT browser, COUNT(*) AS count, device $common_sql $where_sql AND browser IS NOT NULL GROUP BY browser, device ) AS grouped_devices WHERE $device_sql ORDER BY count DESC LIMIT 1", '' );
				$browser = $wpdb->get_var( $sql );

				// Query for OS
				$sql = $wpdb->prepare( "SELECT platform FROM (SELECT platform, COUNT(*) AS count, device $common_sql $where_sql AND platform IS NOT NULL GROUP BY platform, device ) AS grouped_devices WHERE $device_sql ORDER BY count DESC LIMIT 1", '' );
				$os = $wpdb->get_var( $sql );

				$results[$device] = [
					'browser' => $browser,
					'os'      => $os,
				];

			}

			// setup defaults
			$default_data = array(
				'desktop' => array(
					'os'      => '',
					'browser' => '',
				),
				'tablet'  => array(
					'os'      => '',
					'browser' => '',
				),
				'mobile'  => array(
					'os'      => '',
					'browser' => '',
				),
				'other'   => array(
					'os'      => '',
					'browser' => '',
				),
			);

			return wp_parse_args( $results, $default_data );
		}

		/**
		 * Get data per page for the data table. Possible metrics are:
		 * pageviews, sessions, visitors, avg_time_on_page, bounces, bounce_rate
		 *
		 * @param $args
		 *
		 * @return array
		 * @todo add support for exit rate, entrances, actual pagespeed, returning visitors, interactions per visit
		 */

		public function get_pages_data(
			$args = array()
		) {
			global $wpdb;
			$defaults      = array(
				'date_start' => 0,
				'date_end'   => 0,
				'metrics'    => array( 'pageviews' ),
			);
			$args = wp_parse_args( $args, $defaults );
$filters       = burst_sanitize_filters( $args['filters'] );
			$metrics       = $this->sanitize_metrics( $args['metrics'] );
			$sql_metrics   = wp_parse_args( array( 'page_url' ), $metrics );
			$metric_labels = $this->get_metrics();
			$start         = (int) $args['date_start'];
			$end           = (int) $args['date_end'];

			// generate columns for each metric
			$columns   = array();
			$columns[] = array(
				'name'     => __( 'Page', 'burst-statistics' ),
				'id'       => 'page',
				'sortable' => true,
				'grow'     => 10,
			);

			foreach ( $metrics as $metric ) {
				$metric = $this->sanitize_metric( $metric );

				// if goal_id isset then metric is a conversion
				$title = $metric_labels[ $metric ];

				$columns[] = array(
					'name'     => $title,
					'id'       => $metric,
					'sortable' => true,
					'right'    => true,
					'grow'     => 3,
				);
			}

			// if one of the metrics is a bounce remove and do a separate query
			if ( in_array( 'bounces', $metrics ) ) {
				$filters['bounce'] = 1;
				$sql               = $this->get_sql_table(
					$start,
					$end,
					array(
						'page_url',
						'bounces',
					),
					$filters,
					'page_url'
				);
				$data_bounces      = $wpdb->get_results( $sql, ARRAY_A );
				$sql_metrics       = array_diff( $sql_metrics, array( 'bounces' ) );
			}

			if ( in_array( 'bounce_rate', $metrics ) ) {
				unset( $filters['bounce'] );
				$sql              = $this->get_sql_table(
					$start,
					$end,
					array(
						'page_url',
						'bounce_rate',
					),
					$filters,
					'page_url'
				);
				$data_bounce_rate = $wpdb->get_results( $sql, ARRAY_A );
				$sql_metrics      = array_diff( $sql_metrics, array( 'bounces' ) );
			}

			if ( $metrics !== array( 'bounces' ) ) {
				$filters['bounce'] = 0;
				// get data for each metric
				$first_metric = $sql_metrics[0] . ' DESC';

				$sql  = $this->get_sql_table( $start, $end, $sql_metrics, $filters, 'page_url', $first_metric );
				$data = $wpdb->get_results( $sql, ARRAY_A );
			}
			if ( ( isset( $data_bounces, $data ) && in_array( 'bounces', $metrics ) ) || ( isset( $data_bounce_rate, $data ) && in_array( 'bounce_rate', $metrics ) ) ) {
				// Initialize an associative array to hold the merged data
				$merged_data = array();

				// Prepare a template row with all metrics set to 0
				$template_row = array();
				foreach ( $metrics as $metric ) {
					$template_row[ $metric ] = 0;
				}

				// First, populate $merged_data with the rows from $data
				foreach ( $data as $row ) {
					$key = $row['page_url'];
					// Initialize with a template row and then update the metrics from $data
					$merged_data[ $key ] = array_merge( $template_row, $row );
				}

				if ( isset( $data_bounces ) ) {

					// Now, update the $merged_data with the rows from $data_bounces
					foreach ( $data_bounces as $bounce_row ) {
						$key = $bounce_row['page_url'];

						// If the key already exists in $merged_data, update it
						if ( isset( $merged_data[ $key ] ) ) {
							$merged_data[ $key ]['bounces'] = (int) $bounce_row['bounces'];
						} else {
							// If the key doesn't exist in $merged_data, add a new entry based on the template row
							$new_row             = $template_row;
							$new_row['page_url'] = $key;
							$new_row['bounces']  = (int) $bounce_row['bounces'];
							$merged_data[ $key ] = $new_row;
						}
					}
				}
				if ( isset( $data_bounce_rate ) ) {
					foreach ( $data_bounce_rate as $bounce_rate_row ) {
						$key = $bounce_rate_row['page_url'];

						// If the key already exists in $merged_data, update it
						if ( isset( $merged_data[ $key ] ) ) {
							$merged_data[ $key ]['bounce_rate'] = (float) $bounce_rate_row['bounce_rate'];
						} else {
							// If the key doesn't exist in $merged_data, add a new entry based on the template row
							$new_row                = $template_row;
							$new_row['page_url']    = $key;
							$new_row['bounce_rate'] = (float) $bounce_rate_row['bounce_rate'];
							$merged_data[ $key ]    = $new_row;
						}
					}
				}

				// Convert the merged associative array back to a zero-indexed array
				$data = array_values( $merged_data );

			}

			if ( isset( $args['filters']['goal_id'] ) && $args['filters']['goal_id'] > 0 ) {
				$metrics = array( 1 => 'conversions' );
			}

			return array(
				'columns' => $columns,
				'data'    => $data,
				'metrics' => $metrics,
			);
		}

		public function get_referrers_data(
			$args = array()
		) {
			global $wpdb;
			$defaults          = array(
				'date_start' => 0,
				'date_end'   => 0,
				'metrics'    => array( 'count' ),
				'page_id'    => false,
				'filters'    => array(),
			);
			$args              = wp_parse_args( $args, $defaults );
			$filters           = burst_sanitize_filters( $args['filters'] );
			$filters['bounce'] = 0;

			$columns = array(
				array(
					'name'     => __( 'Referrer', 'burst-statistics' ),
					'sortable' => true,
					'grow'     => 10,
				),
				array(
					'name'     => __( 'Count', 'burst-statistics' ),
					'sortable' => true,
					'right'    => true,
					'grow'     => 3,
				),
			);

			// Set up the base query arguments.
			$start = (int) $args['date_start'];
			$end   = (int) $args['date_end'];

			$remove   = array( 'http://www.', 'https://www.', 'http://', 'https://' );
			$site_url = str_replace( $remove, '', site_url() );
			$sql      = $this->get_sql_table( $start, $end, array( 'count', 'referrer' ), $filters );
			$sql     .= "AND referrer NOT LIKE '%$site_url%' GROUP BY referrer";

			$data = $wpdb->get_results( $sql, ARRAY_A );

			$direct_text = __( 'Direct', 'burst-statistics' );

			// Create a new array to hold the updated data
			$updated_data = array();

			foreach ( $data as $row ) {
				if ( $row['referrer'] == 'Direct' ) {
					$row['referrer'] = $direct_text;
				}

				// Change the 'referrer' key to 'value'
				$row['value'] = $row['referrer'];
				$row['count'] = (int) $row['count'];
				unset( $row['referrer'] );

				// Add the updated row to the new data array
				$updated_data[] = $row;
			}

			// Replace the original data array with the updated one
			$data = $updated_data;

			return array(
				'columns' => $columns,
				'data'    => $data,
			);
		}

		/**
		 * convert date string to utc offset by gmt offset
		 *
		 * @param $time_string      string
		 *                          date string in format Y-m-d H:i:s
		 *
		 * @return int
		 */

		public function convert_date_to_utc(
			$time_string
		): int {
			$time               = DateTime::createFromFormat( 'Y-m-d H:i:s', $time_string );
			$utc_time           = $time ? $time->format( 'U' ) : strtotime( $time_string );
			$gmt_offset_seconds = (int) ( get_option( 'gmt_offset' ) * HOUR_IN_SECONDS );

			return $utc_time - $gmt_offset_seconds;
		}

		/**
		 * Get chart data by metric
		 *
		 * @param array $args
		 *
		 * @return array
		 */

		public function get_chart_data_by_metric(
			$args = array()
		) {
			global $wpdb;
			$default_args = array(
				'metric'     => 'visitors',
				'date_start' => 0,
				'date_end'   => 0,
				'interval'   => 'day',
			);
			$args         = wp_parse_args( $args, $default_args );
			$metric       = $this->sanitize_metric( $args['metric'] );
			$interval     = $this->sanitize_interval( $args['interval'] );
			$start        = (int) $args['date_start'];
			$end          = (int) $args['date_end'];
			$filters      = burst_sanitize_filters( $args['filters'] ) ?? array();

			// first we get the data from the db
			if ( $interval === 'hour' ) {
				$sqlformat = '%Y-%m-%d %H:00';
				$format    = 'Y-m-d H:00';
			} else {
				$sqlformat = '%Y-%m-%d';
				$format    = 'Y-m-d';
			}

			$offset = (float) get_option( 'gmt_offset' );

			// Calculate the number of hours and minutes
			$hours   = floor( $offset );
			$minutes = ( $offset - $hours ) * 60;

			// Format the offset as a string
			$timezone = sprintf( '%+03d:%02d', $hours, $minutes );

			$sql_time     = $wpdb->get_var( 'SELECT NOW()' );
			$sql_time_utc = $wpdb->get_var( 'SELECT UTC_TIMESTAMP()' );

			$time_diff = strtotime( $sql_time ) - strtotime( $sql_time_utc );
			$hours     = floor( $time_diff / 3600 );
			$minutes   = floor( ( $time_diff / 60 ) % 60 );

			$server_timezone = sprintf( '%s%02d:%02d', ( $time_diff >= 0 ? '+' : '-' ), abs( $hours ), abs( $minutes ) );

			$sqlperiod         = "DATE_FORMAT(CONVERT_TZ(FROM_UNIXTIME(time), '$server_timezone', '" . $timezone . "'), '" . $sqlformat . "')"; // this is the sql format for the period
			$filters['bounce'] = 0;

			switch ( $metric ) {
				case 'bounces':
					$select            = 'count(*)';
					$filters['bounce'] = 1;
					unset( $filters['goal_id'] );
					$table = $this->get_sql_table( $start, $end, array( '*' ), $filters );
					$sql   = "SELECT $select as hit_count,
                        $sqlperiod as period
                        FROM ($table) as stats
                        GROUP BY period order by period";
					break;
				case 'conversions':
					$join              = array(
						'table' => 'burst_goal_statistics AS goals',
						'on'    => 'stats.ID = goals.statistic_id',
						'type'  => 'INNER',
					);
					$filters['bounce'] = 0;
					$sql               = $this->get_sql_table( $start, $end, array( '*' ), $filters, 'period', 'period', '', $join );
					$select            = $wpdb->prepare(
						'COUNT(*) AS hit_count, DATE_FORMAT(CONVERT_TZ(FROM_UNIXTIME(time), %s, %s), %s) AS period',
						$server_timezone,
						$timezone,
						$sqlformat
					);
					$sql               = str_replace( '*', $select, $sql );
					break;
				default:
					unset( $filters['goal_id'] );
					$filters['bounce'] = 0;
					$select            = $this->get_sql_select_for_metric( $metric );
					$table             = $this->get_sql_table( $start, $end, array( '*' ), $filters );
					$sql               = "SELECT $select as hit_count,
                        $sqlperiod as period
                        FROM ($table) as stats
                        GROUP BY period order by period";
					break;

			}

			$results = $wpdb->get_results( $sql );

			// match results to periods
			$nr_of_periods = $this->get_nr_of_periods( $interval, $start, $end );
			$data          = array();

			// count back from end until zero periods. eg hours or days
			for ( $i = $nr_of_periods - 1; $i >= 0; --$i ) {
				$period = strtotime( "-$i $interval", $end + get_option( 'gmt_offset' ) * HOUR_IN_SECONDS );
				$period = date( $format, $period );
				$found  = false;
				foreach ( $results as $result ) {
					if ( $result->period == $period ) {
						$data[] = $result->hit_count;
						$found  = true;
						break;
					}
				}
				if ( ! $found ) {
					$data[] = 0;
				}
			}

			return $data;
		}

		/**
		 * @param string $period
		 * @param int    $date_start
		 * @param int    $date_end
		 *
		 * @return float
		 */

		private function get_nr_of_periods(
			string $period,
			int $date_start,
			int $date_end
		): float {
			$range_in_seconds  = $date_end - $date_start;
			$period_in_seconds = defined( strtoupper( $period ) . '_IN_SECONDS' ) ? constant( strtoupper( $period ) . '_IN_SECONDS' ) : DAY_IN_SECONDS;

			return ROUND( $range_in_seconds / $period_in_seconds );
		}

		/**
		 * Get color for a graph
		 *
		 * @param string $metric
		 * @param string $type 'background' or 'border'
		 *
		 * @return string
		 */

		private function get_metric_color(
			string $metric = 'visitors',
			string $type = 'default'
		): string {
			$colors = array(
				'visitors'    => array(
					'background' => 'rgba(41, 182, 246, 0.2)',
					'border'     => 'rgba(41, 182, 246, 1)',
				),
				'pageviews'   => array(
					'background' => 'rgba(244, 191, 62, 0.2)',
					'border'     => 'rgba(244, 191, 62, 1)',
				),
				'bounces'     => array(
					'background' => 'rgba(215, 38, 61, 0.2)',
					'border'     => 'rgba(215, 38, 61, 1)',
				),
				'sessions'    => array(
					'background' => 'rgba(128, 0, 128, 0.2)',
					'border'     => 'rgba(128, 0, 128, 1)',
				),
				'conversions' => array(
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

		public function get_dashboard_widget_statistics(
			$date_start = 0,
			$date_end = 0
		) {
			global $wpdb;
			$time_diff       = $date_end - $date_start;
			$date_start_diff = $date_start - $time_diff;
			$date_end_diff   = $date_end - $time_diff;

			$curr_data = $wpdb->get_results(
				$this->get_sql_table(
					$date_start,
					$date_end,
					array(
						'visitors',
						'sessions',
						'pageviews',
						'avg_time_on_page',
					),
					array( 'bounce' => 0 )
				)
			);
			$prev_data = $wpdb->get_results(
				$this->get_sql_table(
					$date_start_diff,
					$date_end_diff,
					array(
						'visitors',
						'sessions',
						'pageviews',
						'avg_time_on_page',
					),
					array( 'bounce' => 0 )
				)
			);

			// calculate uplift for visitors
			$visitors               = $curr_data[0]->visitors;
			$visitors_uplift        = $this->format_uplift( $prev_data[0]->visitors, $visitors );
			$visitors_uplift_status = $this->calculate_uplift_status( $prev_data[0]->visitors, $visitors );

			// time per session = avg time_on_page / avg pageviews per session
			$average_pageviews_per_session = ( (int) $curr_data[0]->sessions != 0 ) ? ( $curr_data[0]->pageviews / $curr_data[0]->sessions ) : 0;
			$time_per_session              = $curr_data[0]->avg_time_on_page / max( 1, $average_pageviews_per_session );

			// prev time per session
			$prev_average_pageviews_per_session = ( (int) $prev_data[0]->sessions != 0 ) ? ( $prev_data[0]->pageviews / $prev_data[0]->sessions ) : 0;
			$prev_time_per_session              = $prev_data[0]->avg_time_on_page / max( 1, $prev_average_pageviews_per_session );

			// calculate uplift for time per session
			$time_per_session_uplift        = $this->format_uplift( $prev_time_per_session, $time_per_session );
			$time_per_session_uplift_status = $this->calculate_uplift_status( $prev_time_per_session, $time_per_session );

			// get top referrer
			$top_referrer = $wpdb->get_results(
				$this->get_sql_table(
					$date_start,
					$date_end,
					array(
						'pageviews',
						'referrer',
					),
					array( 'bounce' => 0 ),
					'referrer',
					'pageviews DESC',
					1
				)
			);
			if ( isset( $top_referrer[0] ) ) {
				if ( $top_referrer[0]->referrer == 'Direct' ) {
					$top_referrer[0]->referrer = __( 'Direct', 'burst-statistics' );
				} elseif ( $top_referrer[0]->pageviews === 0 ) {
					$top_referrer[0]->referrer = __( 'No referrers', 'burst-statistics' );
				}
			}

			// get most visited page

			$most_visited = $wpdb->get_results(
				$this->get_sql_table(
					$date_start,
					$date_end,
					array(
						'pageviews',
						'page_url',
					),
					array( 'bounce' => 0 ),
					'page_url',
					'pageviews DESC',
					1
				)
			);
			if ( isset( $most_visited[0] ) ) {
				if ( $most_visited[0]->page_url === '/' ) {
					$most_visited[0]->page_url = __( 'Homepage', 'burst-statistics' );
				} elseif ( ! $most_visited[0]->pageviews === 0 ) {
					$most_visited[0]->page_url = __( 'No pageviews', 'burst-statistics' );
				}
			}
			// Create the result array

			$result['visitors']                       = $visitors;
			$result['visitors_uplift']                = $visitors_uplift;
			$result['visitors_uplift_status']         = $visitors_uplift_status;
			$result['time_per_session']               = $time_per_session;
			$result['time_per_session_uplift']        = $time_per_session_uplift;
			$result['time_per_session_uplift_status'] = $time_per_session_uplift_status;
			$result['top_referrer']                   = isset( $top_referrer[0]->referrer ) ? $top_referrer[0]->referrer : __( 'No referrers', 'burst-statistics' );
			$result['top_referrer_pageviews']         = isset( $top_referrer[0]->pageviews ) ? $top_referrer[0]->pageviews : 0;
			$result['most_visited']                   = isset( $most_visited[0]->page_url ) ? $most_visited[0]->page_url : __( 'No pageviews', 'burst-statistics' );
			$result['most_visited_pageviews']         = isset( $top_referrer[0]->pageviews ) ? $top_referrer[0]->pageviews : 0;

			return $result;
		}

		/**
		 * Helper function to get percentage, allow for zero division
		 *
		 * @param int    $value
		 * @param int    $total
		 * @param string $type
		 *
		 * @return float
		 */

		private function calculate_ratio(
			$value,
			$total,
			string $type = '%'
		) {
			$value    = (int) $value;
			$total    = (int) $total;
			$multiply = 1;
			if ( $type === '%' ) {
				$multiply = 100;
			}

			return $total == 0 ? 0 : round( $value / $total * $multiply, 1 );
		}

		private function calculate_conversion_rate(
			$value,
			$total
		) {
			return $this->calculate_ratio( $value, $total, '%' );
		}

		/**
		 *
		* @param $filters
		* @return string
		 */
		function get_where_clause_for_filters($filters = []){
			$filters = burst_sanitize_filters($filters);
			$where            = '';
			$possible_filters = apply_filters('burst_possible_filters', array( 'bounce', 'page_id', 'page_url', 'referrer', 'device', 'browser', 'platform'));
			foreach ( $possible_filters as $filter ) {
				// if filter is set and not empty
				if ( isset( $filters[ $filter ] ) ) {
					if ( is_numeric( $filters[ $filter ] ) ) {
						$where .= "AND {$filter} = {$filters[$filter]} ";
					} else {
						$filters[ $filter ] = sanitize_text_field( $filters[ $filter ] );
						if ( $filter === 'referrer' ) {
							if ( $filters[ $filter ] === __( 'Direct', 'burst-statistics' ) ) {
								$where .= "AND {$filter} = '' ";
							} else {
								$where .= "AND {$filter} LIKE '%{$filters[$filter]}' ";
							}
						} else {
							$where .= "AND {$filter} = '{$filters[$filter]}' ";
						}
					}
				}
			}
			return $where;
		}

		/**
		 * Function to get the SQL query to exclude bounces from query's
		 *
		 * @return string
		 */
		function get_sql_table( $start, $end, $select = array( '*' ), $filters = array(), $group_by = '', $order_by = '', $limit = '', $joins = [] ) {
			global $wpdb;
			$select     = $this->get_sql_select_for_metrics( $select );
			$table_name = $wpdb->prefix . 'burst_statistics';

			$where = $this->get_where_clause_for_filters($filters);


			$joined_tables = [];
			// loop through joins and add 'table' to joined tables array
			foreach($joins as $join){
				$joined_tables[] = $join['table'];
			}

			// if goal id use join, make sure we don't join the same table twice, but do add the where clause
			if ( isset( $filters['goal_id'] ) ) {
				if ( ! in_array( 'burst_goal_statistics AS goals', $joined_tables, true )  ) {
					$joins[] = array(
						'table' => 'burst_goal_statistics AS goals',
						'on'    => 'stats.ID = goals.statistic_id',
						'type'  => 'INNER', // Optional, default is INNER JOIN
					);
				}
				$where .= $wpdb->prepare( 'AND goals.goal_id = %s ', (int) $filters['goal_id'] );
			}

			if ( isset( $filters['country_code'] ) ) {
				if ( ! in_array( 'burst_sessions AS sessions', $joined_tables, true )  ) {
					$joins[] = array(
						'table' => 'burst_sessions AS sessions',
						'on'    => 'stats.session_id = sessions.ID',
						'type'  => 'INNER', // Optional, default is INNER JOIN
					);
				}
				$where .= $wpdb->prepare( 'AND sessions.country_code = %s ', $filters['country_code'] );
			}

			$join_sql = '';
			foreach ( $joins as $join ) {
				$join_table = $wpdb->prefix . $join['table'];
				$join_on    = $join['on'];
				$join_type  = $join['type'] ?? 'INNER';
				$join_sql   .= " {$join_type} JOIN {$join_table} ON {$join_on}";
			}

			$table_name .= ' AS stats';

			$group_by = $group_by ? "GROUP BY $group_by" : '';
			$order_by = $order_by ? "ORDER BY $order_by" : '';
			$limit    = $limit ? 'LIMIT ' . (int) $limit : '';

			return $wpdb->prepare(
				"SELECT $select FROM $table_name $join_sql WHERE time > %d AND time < %d $where $group_by $order_by $limit",
				$start,
				$end
			);
		}


		function get_sql_select_for_metric( $metric ) {
			global $wpdb;
			// if metric starts with  'count(' and ends with ')', then it's a custom metric
			// so we sanitize it and return it
			if ( substr( $metric, 0, 6 ) === 'count(' && substr( $metric, - 1 ) === ')' ) {
				// delete the 'count(' and ')' from the metric
				// sanitize_title and wrap it in count()
				return 'count(' . sanitize_title( substr( $metric, 6, - 1 ) ) . ')';
			}
			switch ( $metric ) {
				case 'pageviews':
				case 'count':
				case 'bounces':
					$sql = 'COUNT(*)';
					break;
				case 'bounce_rate':
					$sql = 'SUM(CASE WHEN stats.bounce = 1 THEN 1 ELSE 0 END) / COUNT( DISTINCT( stats.session_id ) ) * 100';
					break;
				case 'sessions':
					$sql = 'COUNT( DISTINCT( stats.session_id ) )';
					break;
				case 'avg_time_on_page':
					$sql = 'AVG( stats.time_on_page )';
					break;
				case 'first_time_visitors':
					$sql = 'SUM(CASE WHEN stats.first_time_visit = 1 THEN 1 ELSE 0 END)';
					break;
				case 'visitors':
					$sql = 'COUNT(DISTINCT(stats.uid))';
					break;
				case 'page_url':
					$sql = 'stats.page_url';
					break;
				case 'page_id':
					$sql = 'stats.page_id';
					break;
				case 'referrer':
					$direct_text = 'Direct';
					$sql         = $wpdb->prepare(
						"CASE
                            WHEN stats.referrer = '' THEN '%s'
                            ELSE trim( 'www.' from substring(stats.referrer, locate('://', stats.referrer) + 3)) 
                        END",
						$direct_text
					);
					break;
				case '*':
				default:
					$sql = false;
					break;
			}

			return $sql;
		}

		/**
		 * @param $metrics
		 * @param $filters array
		 *
		 * @return string
		 */
		function get_sql_select_for_metrics( $metrics ) {
			$select = '';
			$count  = count( $metrics );
			$i      = 1;
			foreach ( $metrics as $metric ) {
				$sql = $this->get_sql_select_for_metric( $metric );
				if ( $sql !== false ) {
					// if metric starts with  'count(' and ends with ')', then it's a custom metric
					// so we change the $metric name to 'metric'_count
					if ( substr( $metric, 0, 6 ) === 'count(' && substr( $metric, - 1 ) === ')' ) {
						// strip the 'count(' and ')' from the metric
						$metric  = substr( $metric, 6, - 1 );
						$metric .= '_count';
					}

					$select .= $sql . ' as ' . $metric;
				} else { // if it's a wildcard, then we don't need to add the alias
					$select .= $metric;
				}
				if ( $count !== $i ) { // if it's not the last metric, then we need to add a comma
					$select .= ', ';
				}
				++$i;
			}

			return $select;
		}

		/**
		 * Function to format uplift
		 *
		 * @param $original_value
		 * @param $new_value
		 *
		 * @return string
		 */
		public function format_uplift(
			$original_value,
			$new_value
		) {
			$uplift = burst_format_number( $this->calculate_uplift( $new_value, $original_value ), 0 );
			if ( $uplift === 0 ) {
				return '';
			}

			return $uplift > 0 ? '+' . $uplift . '%' : $uplift . '%';
		}

		/**
		 * Function to calculate uplift
		 *
		 * @param $original_value
		 * @param $new_value
		 *
		 * @return int
		 */
		public function calculate_uplift(
			$original_value,
			$new_value
		) {
			$increase = $original_value - $new_value;

			return $this->calculate_ratio( $increase, $new_value );
		}

		/**
		 * Function to calculate uplift
		 *
		 * @param $original_value
		 * @param $new_value
		 *
		 * @return int
		 */

		public function calculate_percentage_uplift(
			$original_value,
			$new_value
		) {
			$increase = burst_format_number( $original_value - $new_value, 1 );

			return $increase > 0 ? '+' . $increase . '%' : $increase . '%';
		}

		/**
		 * Function to calculate uplift status
		 *
		 * @param $original_value
		 * @param $new_value
		 *
		 * @return string
		 */

		public function calculate_uplift_status(
			$original_value,
			$new_value
		) {
			$status = '';
			$uplift = $this->calculate_uplift( $new_value, $original_value );

			if ( $uplift > 0 ) {
				$status = 'positive';
			} elseif ( $uplift < 0 ) {
				$status = 'negative';
			}

			return $status;
		}

		/**
		 * Function to calculate time per session
		 *
		 * @param $original_value
		 * @param $new_value
		 *
		 * @return string
		 */
		public function calculate_time_per_session(
			$pageviews,
			$sessions,
			$time_per_page
		) {
			$pageviews_per_session = $sessions == 0 ? 0 : $pageviews / $sessions;

			return $pageviews_per_session * $time_per_page;
		}

		public function get_device_name(
			$device
		): ?string {
			switch ( $device ) {
				case 'desktop':
					$device_name = __( 'Desktop', 'burst-statistics' );
					break;
				case 'mobile':
					$device_name = __( 'Mobile', 'burst-statistics' );
					break;
				case 'tablet':
					$device_name = __( 'Tablet', 'burst-statistics' );
					break;
				case 'other':
				default:
					$device_name = __( 'Other', 'burst-statistics' );
					break;
			}

			return $device_name;
		}
	}
}

/**
 * Install statistic table
 * */

add_action( 'plugins_loaded', 'burst_install_statistics_table', 10 );
function burst_install_statistics_table() {
	if ( get_option( 'burst_stats_db_version' ) !== burst_version ) {
		require_once ABSPATH . 'wp-admin/includes/upgrade.php';

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
            `first_time_visit` int(1),
            `bounce` int(1) DEFAULT 1,
              PRIMARY KEY  (ID),
              KEY `time_index` (time),
              KEY `bounce_index` (bounce)
            ) $charset_collate;";

		// uid or session id also as index?
		/**
		 * We use b-tree index as it can be used for < or > operations, which is not possible for HASH
		 */
		dbDelta( $sql );
		update_option( 'burst_stats_db_version', burst_version );
	}
}
