<?php
if ( ! defined( 'ABSPATH' ) ) exit;

if ( !class_exists('burst_email_block') ) {
	class burst_email_block {
		public $title = '';
		public $message = '';
		public $url = '';
		public function __construct() {

		}

		/**
		 * @return array
		 */
		public function get(): array {
			return [
				'title' => $this->title,
				'message' => $this->message,
				'url' => $this->url,
			];
		}
	}
}