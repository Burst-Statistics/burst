<?php
defined( 'ABSPATH' ) or die();
if ( ! class_exists( "burst_notices" ) ) {
	class burst_notices {
		private static $_this;

		public $notices;

		function __construct( $args = array() ) {
			if ( isset( self::$_this ) ) {
				wp_die( burst_sprintf( '%s is a singleton class and you cannot create a second instance.',
					get_class( $this ) ) );
			}
			add_action( 'wp_ajax_burst_dismiss_notice', array( $this, 'dismiss_notice' ) );

		}
		static function this() {
			return self::$_this;
		}

		public function get() {
			return [
				'notices' => $this->notices(),
			];
		}

		public function notices(){
			$notices = BURST()->notices->get_notices_list(array( 'status' => 'all' ));
			$out = [];
			foreach ($notices as $id => $notice ) {
				$notice['id'] = $id;
				$out[] =  $notice;
			}
			return $out;
		}

		/**
		 * Process the react dismissal of a task
		 *
		 * Since 3.1
		 *
		 * @access public
		 *
		 */

		public function dismiss_notice($id)
		{
			if ( !empty($id) ) {

				$id = sanitize_title( $id );
				update_option( "burst_".$id."_dismissed", true, false );
				delete_transient( 'burst_plusone_count' );
			}

			return true;
		}

		/**
		 * Get array of notices
		 * - condition: function returning boolean, if notice should be shown or not
		 * - callback: function, returning boolean or string, with multiple possible answers, and resulting messages and icons
		 * @param array $args
		 * @return array
		 */

		public function get_notices_list( $args = array() )
		{
			$icon_labels = [
				'completed' => __( "Completed", "burst-statistics" ),
				'new'     => __( "New!", "burst-statistics" ),
				'warning' => __( "Warning", "burst-statistics" ),
				'error' => __( "Error", "burst-statistics" ),
				'open'    => __( "Open", "burst-statistics" ),
				'premium' => __( "Premium", "burst-statistics" ),
			];

			$defaults = array(
				'admin_notices'      => false,
				'premium_only'       => false,
				'dismiss_on_upgrade' => false,
				'status'             => 'open', //status can be "all" (all tasks, regardless of dismissed or open), "open" (not success/completed) or "completed"
			);
			$args = wp_parse_args($args, $defaults);

			$cache_admin_notices = !$this->is_burst_page() && $args['admin_notices'];

			//if we're on the settings page, we need to clear the admin notices transient, because this list never gets requested on the settings page, and won'd get cleared otherwise
			if ( $this->is_burst_page() ) {
				delete_transient('burst_admin_notices');
			}
			if ( $cache_admin_notices) {
				$cached_notices = get_transient('burst_admin_notices');
				if ( $cached_notices ) {
					return $cached_notices;
				}
			}

			$notice_defaults = array(
				'condition' => array(),
				'callback' => false,
			);

			$notices = [
				'tracking-error' => [
					'callback' => 'burst_tracking_status_error',
					'score' => 0,
					'output' => array(
						'true' => array(
							'msg' => __( "Due to your server or website configuration it is not possible to track statistics.", 'burst-statistics' ),
							'url' => 'https://burst-statistics.com/troubleshoot-tracking/',
							'icon' => 'error',
							'dismissible' => false,
						),
					),
				],
				'bf_notice2022' => [
					'condition'  => [
						'BURST()->admin->is_bf'
					],
					'callback' => '_true_',
					'output' => [
						'true' => [
							'msg' => __( "Black Friday sale! Get 40% Off Burst Pro.", 'burst-statistics' ),
							'icon' => 'premium',
							'url' => burst_premium_url,
							'dismissible' => true,
							'plusone' => true,
						],
					],
				],
				'leave-feedback' => [
					'callback' => '_true_',
					'score' => 0,
					'status' => 'all',
					'output' => array(
						'true' => array(
							'msg' => burst_sprintf(
								__( 'If you have any suggestions to improve our plugin, feel free to %sopen a support thread%s.', 'burst-statistics' ),
								'<a href="https://wordpress.org/support/plugin/burst-statistics/" target="_blank">',
								'</a>'),
							'icon' => 'completed',
							'dismissible' => false,
						),
					),
				],
			];

			//on multisite, don't show the notice on subsites.
			if ( is_multisite() && !is_network_admin() ) {
				unset($notices['secure_cookies_set']);
			}

			$notices = apply_filters('burst_notices', $notices);
			foreach ($notices as $id => $notice) {
				$notices[$id] = wp_parse_args($notice, $notice_defaults);
			}

			/**
			 * If a list of notices that should be dismissed on upgrade is requested
			 */
			if ( $args['dismiss_on_upgrade'] ) {
				$output = array();
				foreach( $notices as $key => $notice ) {
					if ( isset($notice['dismiss_on_upgrade']) && $notice['dismiss_on_upgrade'] ) {
						$output[] = $key;
					}
				}
				return $output;
			}

			/**
			 * Filter out notice that do not apply, or are dismissed
			 */

			foreach ( $notices as $id => $notice ) {
				$func   = $notice['callback'];
				$output = $this->validate_function($func);

				//check if all notices should be dismissed
				if ( isset( $notice['output'][$output]['dismissible'] )
				     && $notice['output'][$output]['dismissible']
				     && burst_get_option('dismiss_all_notices')
				) {
					unset($notices[$id]);
					continue;
				}

				if ( !isset($notice['output'][ $output ]) ) {
					unset($notices[$id]);
					continue;
				} else {
					$notices[$id]['output'] = $notice['output'][ $output ];
				}

				$notices[$id]['output']['status'] = ( $notices[$id]['output']['icon'] !== 'success') ? 'open' : 'completed';
				if ( $args['status'] === 'open' && ($notices[$id]['output']['status'] === 'completed' ) ){
					unset($notices[$id]);
					continue;
				}
				$condition_functions = $notice['condition'];
				foreach ( $condition_functions as $func ) {
					$condition = $this->validate_function($func, true);
					if ( ! $condition ) {
						unset($notices[$id]);
					}
				}

				if ( isset($notices[$id]) ) {
					$notices[$id]['output']['label'] = $icon_labels[ $notices[$id]['output']['icon'] ];
				}

				//only remove this option if it's both dismissed AND not completed. This way we keep completed notices in the list.
				if ( isset($notices[$id]) && get_option( "burst_" . $id . "_dismissed" ) && $notices[$id]['output']['status'] !== 'completed') {
					unset($notices[$id]);
				}
			}

			//if only admin_notices are required, filter out the rest.
			if ( $args['admin_notices'] ) {
				foreach ( $notices as $id => $notice ) {
					if (!isset($notice['output']['admin_notice']) || !$notice['output']['admin_notice']){
						unset( $notices[$id]);
					}
				}
				//ensure an empty list is also cached
				$cache_notices = empty($notices) ? 'empty' : $notices;
				set_transient('burst_admin_notices', $cache_notices, WEEK_IN_SECONDS );
			}

			//sort so warnings are on top
			$warnings = array();
			$open = array();
			$other = array();
			foreach ($notices as $key => $notice){
				if (!isset($notice['output']['icon'])) continue;

				if ($notice['output']['icon']==='warning') {
					$warnings[$key] = $notice;
				} else if ($notice['output']['icon']==='open') {
					$open[$key] = $notice;
				} else {
					$other[$key] = $notice;
				}
			}
			$notices = $warnings + $open + $other;

			//if we only want a list of premium notices
			if ( $args['premium_only'] ) {
				foreach ($notices as $key => $notice){
					if ( !isset($notice['output']['icon']) || $notice['output']['icon'] !== 'premium' ) {
						unset($notices[$key]);
					}
				}
			}
			return $notices;
		}

		/**
		 * Count number of premium notices we have in the list.
		 * @return int
		 */
		public function get_lowest_possible_task_count() {
			$premium_notices = $this->get_notices_list(array('premium_only'=>true));
			return count($premium_notices) ;
		}

		/**
		 * Count the plusones
		 *
		 * @return int
		 *
		 * @since 3.2
		 */

		public function count_plusones() {
			if ( ! burst_user_can_manage() ) {
				return 0;
			}

			$cache = $this->is_burst_page() ? false : true;
			$count = get_transient( 'burst_plusone_count' );
			if ( !$cache || ($count === false) ) {
				$count = 0;
				$notices = $this->get_notices_list();
				foreach ( $notices as $id => $notice ) {
					$success = ( isset( $notice['output']['icon'] ) && ( $notice['output']['icon'] === 'success' ) ) ? true : false;
					if ( ! $success
					     && isset( $notice['output']['plusone'] )
					     && $notice['output']['plusone']
					) {
						$count++;
					}
				}
				if ( $count==0) {
					$count = 'empty';
				}
				set_transient( 'burst_plusone_count', $count, DAY_IN_SECONDS );
			}

			if ( $count==='empty' ) {
				return 0;
			}
			return $count;
		}

		public function is_burst_page()
		{
			if ( burst_is_logged_in_rest() ) {
				return true;
			}

			if ( !isset($_SERVER['QUERY_STRING']) ) {
				return false;
			}

			parse_str($_SERVER['QUERY_STRING'], $params);
			if ( array_key_exists("page", $params) && ($params["page"] == "burst") ) {
				return true;
			}

			return false;
		}

		/**
		 * Get output of function, in format 'function', or 'class()->sub()->function'
		 * @param string $func
		 * @param bool $is_condition // if the check is a condition, which should return a boolean
		 * @return string|bool
		 */

		private function validate_function($func, $is_condition = false ){
			$invert = false;
			if (strpos($func, 'NOT ') !== FALSE ) {
				$func = str_replace('NOT ', '', $func);
				$invert = true;
			}

			if ( $func === '_true_') {
				$output = true;
			} else if ( $func === '_false_' ) {
				$output = false;
			} else {
				if ( preg_match( '/(.*)\(\)\-\>(.*)->(.*)/i', $func, $matches)) {
					$base = $matches[1];
					$class = $matches[2];
					$function = $matches[3];
					$output = call_user_func( array( $base()->{$class}, $function ) );
				} else {
					$output = $func();
				}

				if ( $invert ) {
					$output = !$output;
				}
			}

			//stringyfy booleans
			if (!$is_condition) {
				if ( $output === false || $output === 0 ) {
					$output = 'false';
				}
				if ( $output === true || $output === 1 ) {
					$output = 'true';
				}
			}
			return sanitize_text_field($output);
		}

	}
}
