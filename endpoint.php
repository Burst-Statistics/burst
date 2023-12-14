<?php
/**
 * Burst Statistics endpoint for collecting hits
 */
define( 'SHORTINIT', true ); // disable loading of most WP core files
# Find the base path
define('BASE_PATH', find_wordpress_base_path() . "/");
# Load WordPress Core
if ( !file_exists(BASE_PATH . 'wp-load.php') ) {
	die("WordPress not installed here");
}
require_once(BASE_PATH . 'wp-load.php');

require_once __DIR__ . '/helpers/php-user-agent/UserAgentParser.php';
if ( file_exists(__DIR__ . '/pro/tracking/tracking.php')) {
	require_once __DIR__ . '/pro/tracking/tracking.php';
}
require_once __DIR__ . '/tracking/tracking.php';

burst_beacon_track_hit();

function find_wordpress_base_path()
{
	$path = __DIR__;
	// move three directories up from here
	$path = "$path/../../..";

	// Check Bitnami-specific structure first
	if ( file_exists('/opt/bitnami/wordpress/wp-load.php' ) && file_exists('/bitnami/wordpress/wp-config.php')) {
		return '/opt/bitnami/wordpress';
	}

	// If not in Bitnami structure, fall back to original logic
	do {
		//check if the wp-load.php file exists here. If not, we assume it's in a subdir.
		if ( file_exists( $path . '/wp-load.php') ) {
			return $path;
		} else {
			//wp not in this directory. Look in each folder to see if it's there.
			if ( file_exists( $path ) && $handle = opendir( $path ) ) {
				while ( false !== ( $file = readdir( $handle ) ) ) {
					if ( $file !== "." && $file !== ".." ) {
						$file = $path .'/' . $file;
						if ( is_dir( $file ) && file_exists( $file . '/wp-load.php') ) {
							$path = $file;
							break;
						}
					}
				}
				closedir( $handle );
			}
		}

		return $path;

	} while ($path = realpath("$path/.."));
}