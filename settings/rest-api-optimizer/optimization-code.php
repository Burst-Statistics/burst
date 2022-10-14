<?php defined( 'ABSPATH' ) or die();
define('burst_rest_api_optimizer', true);
if ( ! function_exists( 'burst_exclude_plugins_for_rest_api' ) ) {
	/**
	 * Exclude all other plugins from the active plugins list if this is a Burst Statistics rest request
	 *
	 * @param array $plugins The active plugins.
	 *
	 * @return array The filtered active plugins.
	 */
	function burst_exclude_plugins_for_rest_api( $plugins ) {
		// if not a burst request return all plugins
		if ( isset($_SERVER['REQUEST_URI']) && strpos($_SERVER['REQUEST_URI'], 'wp-json/burst/v') === false ) {
			return $plugins;
		}

		//Only leave burst
		foreach ( $plugins as $key => $plugin ) {
			if ( strpos($plugin, 'burst-') !== false ){
				continue;
			}
			unset( $plugins[ $key ] );
		}
		return $plugins;
	}
	add_filter( 'option_active_plugins', 'burst_exclude_plugins_for_rest_api' );
}