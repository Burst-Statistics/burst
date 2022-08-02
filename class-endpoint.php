<?php defined( 'ABSPATH' ) or die( "you do not have access to this page!" );
if ( ! class_exists( "burst_endpoint" ) ) {
	class burst_endpoint {
		private static $_this;

		function __construct() {
			if ( isset( self::$_this ) ) {
				wp_die( burst_sprintf( '%s is a singleton class and you cannot create a second instance.',
					get_class( $this ) ) );
			}

			self::$_this = $this;
			// actions and filters
			add_action('plugins_loaded', array( $this, 'install' ) );

		}

		public function install() {
			if ( get_option('burst_endpoint_installed') ) {
				return;
			}
			update_option( 'burst_endpoint_status', $this->install_endpoint_file(), false );
		}

		static function this() {
			return self::$_this;
		}

		// install endpoint file
		public function install_endpoint_file() {
			$file = ABSPATH . '/burst-statistics-endpoint.php';
			if ( ! file_exists( $file ) ){
				$success = file_put_contents( $file, $this->get_endpoint_file_contents() );
				if ( $success === false ) {
					return false;
				}
			}
			// test if the file gives the right response

			return burst_endpoint_test_request();
		}

		// get_endpoint_file_contents()
		public function get_endpoint_file_contents() {
			$tracking_filename = burst_path . 'tracking/tracking.php';
			$ua_parser_filename =  burst_path . '/helpers/php-user-agent/UserAgentParser.php';
			return <<<EOT
				<?php
				/**
				 * Burst Statistics endpoint for collecting hits
				 */
				define( 'SHORTINIT', true );
				require_once __DIR__ . '/wp-load.php';
				require_once '$ua_parser_filename';
				require_once '$tracking_filename';

				burst_beacon_track_hit();
				EOT;
		}
	}
}