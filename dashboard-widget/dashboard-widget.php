<?php
defined( 'ABSPATH' ) or die( 'you do not have access to this page!' );
if ( ! class_exists( 'burst_dashboard_widget' ) ) {
	class burst_dashboard_widget {
		private static $_this;
		public $error_message = '';

		function __construct() {
			if ( isset( self::$_this ) ) {
				wp_die(
					burst_sprintf(
						'%s is a singleton class and you cannot create a second instance.',
						get_class( $this )
					)
				);
			}

			self::$_this = $this;
			add_action( 'wp_dashboard_setup', [ $this, 'add_burst_dashboard_widget' ] );
			add_action( 'admin_enqueue_scripts', [ $this, 'enqueue' ] );
		}

		static function this() {
			return self::$_this;
		}

		/**
		 *
		 * Add a dashboard widget
		 *
		 * @since 1.1
		 */
		public function add_burst_dashboard_widget() {
			if ( ! burst_user_can_view() ) {
				return;
			}
			wp_add_dashboard_widget(
				'dashboard_widget_burst',
				'Burst Statistics',
				[
					$this,
					'render_dashboard_widget',
				]
			);
		}

		public function enqueue( $hook ) {

			if ( $hook !== 'index.php' ) {
				return;
			}

			if ( ! burst_user_can_view() ) {
				return;
			}

			$js_data = burst_get_chunk_translations( 'dashboard-widget/build' );
			if ( empty( $js_data ) ) {
				return;
			}

			wp_enqueue_style( 'wp-components' );
			$handle = 'burst-settings';
			wp_enqueue_script(
				$handle,
				plugins_url( 'build/' . $js_data['js_file'], __FILE__ ),
				$js_data['dependencies'],
				$js_data['version'],
				true
			);
			wp_enqueue_style(
				$handle,
				plugins_url( 'build/index.css', __FILE__ ),
				array(),
				$js_data['version']
			);
			wp_set_script_translations( $handle, 'burst-statistics' );
			wp_localize_script(
				$handle,
				'burst_settings',
				burst_localized_settings( $js_data )
			);
		}

		/**
		 *
		 * Renders the dashboard widget
		 */
		public function render_dashboard_widget() {
			echo '<div id="burst-widget-root"></div>';
		}
	}
} //class closure
