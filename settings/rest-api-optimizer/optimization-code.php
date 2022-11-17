<?php defined( 'ABSPATH' ) or die();
define( 'burst_rest_api_optimizer', true );
if ( ! function_exists( 'burst_exclude_plugins_for_rest_api' ) ) {
	/**
	 * Exclude all other plugins from the active plugins list if this is a Burst rest request
	 *
	 * @param array $plugins The active plugins.
	 *
	 * @return array The filtered active plugins.
	 */
	function burst_exclude_plugins_for_rest_api( $plugins ) {
		// If this is a burst data request we just activate the Burst plugin, to minimize the load on the server
		if ( isset($_SERVER['REQUEST_URI']) && strpos($_SERVER['REQUEST_URI'], 'burst/v1/data/') === false ) {
			// if not a burst request return all plugins
			return $plugins;
		}

		//Only leave burst and premium add ons active for this request
		foreach ( $plugins as $key => $plugin ) {
			if ( strpos( $plugin, 'burst-' ) !== false ) {
				continue;
			}
			unset( $plugins[ $key ] );
		}

		return $plugins;
	}

	add_filter( 'option_active_plugins', 'burst_exclude_plugins_for_rest_api' );
}