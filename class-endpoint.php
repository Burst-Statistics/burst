<?php defined( 'ABSPATH' ) or die( "you do not have access to this page!" );
if ( ! class_exists( "burst_endpoint" ) ) {
	class burst_endpoint {
		private static $_this;

		public function __construct() {
			if ( isset( self::$_this ) ) {
				wp_die( burst_sprintf( '%s is a singleton class and you cannot create a second instance.',
					get_class( $this ) ) );
			}

			self::$_this = $this;
			// actions and filters
			add_action( 'plugins_loaded', array( $this, 'install' ) );

		}

		/**
		 * Install the endpoint
		 *
		 * @return void
		 */
		public function install(): void {
			if ( is_admin() || wp_doing_cron() ) {
				$endpoint_installed = (bool) get_transient( 'burst_install_endpoint' ); // casts strings 'true' & 'false' to bool true
				if ( ! $endpoint_installed ) {
					$endpoint_status = $this->install_endpoint_file();
					update_option( 'burst_endpoint_status', $endpoint_status, false );

					$endpoint_transient_status = $endpoint_status ? 'true' : 'false';
					set_transient( 'burst_install_endpoint', $endpoint_transient_status, HOUR_IN_SECONDS );
				}
			}
		}

		/**
		 * @return burst_endpoint
		 */
		public static function this(): burst_endpoint {
			return self::$_this;
		}

		/**
		 * Install the endpoint file
		 *
		 * @return bool
		 */
		public function install_endpoint_file(): bool {
			$file = ABSPATH . '/burst-statistics-endpoint.php';
			if ( ! file_exists( $file ) ) {
				$success = @file_put_contents( $file, $this->get_endpoint_file_contents() );
				if ( $success === false ) {
					return false;
				}
				return $this->endpoint_test_request();
			}
			return true;
		}

		/**
		 * Get the endpoint file contents
		 *
		 * @return string
		 */
		public function get_endpoint_file_contents(): string {
			$tracking_filename  = burst_path . 'tracking/tracking.php';
			$ua_parser_filename = burst_path . '/helpers/php-user-agent/UserAgentParser.php';

			// Indentation is important here for PHP 7.2 compatibility: https://wiki.php.net/rfc/flexible_heredoc_nowdoc_syntaxes
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


		/**
		 * Get tracking status
		 *
		 * @return string
		 */
		public function get_tracking_status(): string {
			$status    = get_option( 'burst_tracking_status' );
			$last_test = (int) get_option( 'burst_tracking_status_last_test' );
			// if last test was more than 24 hours ago, test again or there is an error
			if ( $last_test < 1  || $last_test > strtotime( '-1 day' ) ) {
				return $this->test_tracking_status();
			}
			return $status;
		}

		/**
		 * Test tracking status
		 * Only returns 'error', 'rest', 'beacon'
		 * @return string
		 */
		public function test_tracking_status(): string {
			$endpoint = $this->endpoint_test_request(); // true or false
			if ( $endpoint ) {
				$status = 'beacon';
			} else {
				$rest_api = $this->rest_api_test_request(); // true or false
				$status   = $rest_api ? 'rest' : 'error';
			}

			update_option( 'burst_tracking_status', $status, true );
			update_option( 'burst_tracking_status_last_test', time(), false );

			return $status;
		}

		/**
		 * Test endpoint
		 *
		 * @return bool
		 */
		public function endpoint_test_request(): bool {
			$url  = site_url( 'burst-statistics-endpoint.php' );
			$data = array( 'request' => 'test' );

			// use key 'http' even if you send the request to https://...
			$options = array(
				'http' => array(
					'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
					'method'  => 'POST',
					'content' => http_build_query( $data ),
				),
			);
			$context = stream_context_create( $options );
			$result  = @file_get_contents( $url, false, $context );
			if ( $result === false ) {
				if ( WP_DEBUG ) {
					error_log( 'Error: Endpoint does not respond with 200' );
				}

				return false;
			}
			return true;
		}

		/**
		 * Test REST API
		 *
		 * @return bool
		 */
		public function rest_api_test_request(): bool {
			$url      = get_rest_url( null, 'burst/v1/track' );
			$data     = array( 'request' => 'test' );
			$response = wp_remote_post( $url, array(
				'headers'     => array( 'Content-Type' => 'application/json; charset=utf-8' ),
				'method'      => 'POST',
				'body'        => json_encode( $data ),
				'data_format' => 'body',
				'timeout'     => 5,
			) );
			if ( is_wp_error( $response ) ) {
				return false;
			}
			if ( $response['response']['code'] === 200 ) {
				return true;
			}

			return false;
		}
	}
}