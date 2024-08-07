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
		// if not an rsp request return all plugins
		// but for some requests, we need to load other plugins, to ensure we can detect them.
		if ( isset( $_SERVER['REQUEST_URI'] ) && (
				strpos( $_SERVER['REQUEST_URI'], 'burst/v1' ) === false ||
				strpos( $_SERVER['REQUEST_URI'], 'otherpluginsdata' ) !== false ||
				strpos( $_SERVER['REQUEST_URI'], 'plugin_actions' ) !== false ||
				strpos( $_SERVER['REQUEST_URI'], 'fields/set' ) !== false ||
				strpos( $_SERVER['REQUEST_URI'], 'goals/get' ) !== false
			)
		) {
			return $plugins;
		}

		// Only leave burst and pro add ons active for this request
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
