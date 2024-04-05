<?php defined( 'ABSPATH' ) or die( 'you do not have access to this page!' );
if ( ! class_exists( 'burst_endpoint' ) ) {
	class burst_endpoint {
		private static $_this;

		public function __construct() {
			if ( isset( self::$_this ) ) {
				wp_die(
					burst_sprintf(
						'%s is a singleton class and you cannot create a second instance.',
						get_class( $this )
					)
				);
			}

			self::$_this = $this;
		}

		/**
		 * @return burst_endpoint
		 */
		public static function this(): burst_endpoint {
			return self::$_this;
		}

		/**
		 * Get tracking status
		 *
		 * @return array
		 */
		public function get_tracking_status_and_time(): array {
			$status    = get_option( 'burst_tracking_status' );
			$last_test = get_transient( 'burst_ran_test' ); // casts strings 'true' & 'false' to bool true
			if ( $last_test < 1 || $last_test === false ) {
				$status    = $this->test_tracking_status();
				$last_test = time();
				set_transient( 'burst_ran_test', $last_test, HOUR_IN_SECONDS );
			}
			return [
				'status'    => $status,
				'last_test' => $last_test,
			];
		}

		/**
		 * Get tracking status
		 *
		 * @return string
		 */
		public function get_tracking_status(): string {
			$tracking = $this->get_tracking_status_and_time();
			return $tracking['status'];
		}

		/**
		 * Test tracking status
		 * Only returns 'error', 'rest', 'beacon'
		 *
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

			return $status;
		}

		/**
		 * Test endpoint
		 *
		 * @return bool
		 */
		public function endpoint_test_request(): bool {
			$url  = burst_get_beacon_url();
			$data = [ 'request' => 'test' ];

			$response = wp_remote_post(
				$url,
				array(
					'method'    => 'POST',
					'headers'   => [ 'Content-type' => 'application/x-www-form-urlencoded' ],
					'body'      => $data,
					'sslverify' => false,
				)
			);
			$status   = false;
			if ( ! is_wp_error( $response ) && ! empty( $response['response']['code'] ) ) {
				$status = $response['response']['code'];
			}
			if ( $status === 200 ) {
				return true;
			}
			// otherwise try with file_get_contents

			// use key 'http' even if you send the request to https://...
			$options = [
				'http' => [
					'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
					'method'  => 'POST',
					'content' => http_build_query( $data ),
				],
				'ssl'  => [
					'verify_peer'      => false,
					'verify_peer_name' => false,
				],
			];
			$context = stream_context_create( $options );
			@file_get_contents( $url, false, $context );
			$status_line = $http_response_header[0] ?? '';

			$status = false;
			if ( preg_match( '{HTTP\/\S*\s(\d{3})}', $status_line, $matches ) ) {
				$status = $matches[1];
			}

			return $status === 200;
		}

		/**
		 * Test REST API
		 *
		 * @return bool
		 */
		public function rest_api_test_request(): bool {
			$url      = get_rest_url( null, 'burst/v1/track' );
			$data     = '{"request":"test"}';
			$response = wp_remote_post(
				$url,
				array(
					'headers'     => [ 'Content-Type' => 'application/json; charset=utf-8' ],
					'method'      => 'POST',
					'body'        => json_encode( $data ),
					'data_format' => 'body',
					'timeout'     => 5,
				)
			);
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
