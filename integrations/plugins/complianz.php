<?php
defined( 'ABSPATH' ) or die( "you do not have access to this page!" );
/**
 * Add burst cookies to list of detected cookies during scan
 *
 * @param array $cookies
 *
 * @return array
 */

function burst_complianz_add_cookies( $cookies ): array {
	$cookies['burst_uid'] = 'uid';

	return $cookies;
}
add_filter( 'cmplz_detected_cookies', 'burst_complianz_add_cookies' );