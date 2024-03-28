<?php 
defined( 'ABSPATH' ) or die( "you do not have access to this page!" );

global $burst_integrations_list;
$burst_integrations_list = apply_filters( 'burst_integrations', array(
	'complianz' => array(
		'constant_or_function' => 'cmplz_version',
		'label'                => 'Complianz GDPR/CCPA',
	),
	'elementor' => array(
			'constant_or_function' => 'ELEMENTOR_VERSION',
			'label'                => 'Elementor Website Builder',
	),
	'woocommerce' => array(
		'constant_or_function' => 'WC_VERSION',
		'label'                => 'Woo',
		'goals'                =>
			[
				[
					'id' => 'woocommerce_payment_complete', //made up hook
					'title'=> __('Woo Purchase Complete', 'burst-statistics'),
					'description' => __('Runs after completing a purchase', 'burst-statistics'),
					'type' => 'hook',
					'status' => 'active',
					'server_side' => true,
					'url' => '*',
					'hook' => 'woocommerce_payment_complete',
					'conversion_metric' => 'visitors',
				],
			]
	),
	'easy-digital-downloads' => array(
		'constant_or_function' => 'EDD',
		'label'                => 'Easy Digital Downloads',
		'goals'                =>
			[
				[
					'id' => 'edd_complete_purchase',
					'title'=> __('Easy Digital Downloads purchase', 'burst-statistics'),
					'description' => __('Runs after purchasing an item', 'burst-statistics'),
					'type' => 'hook',
					'status' => 'active',
					'server_side' => true,
					'url' => '*',
					'hook' => 'edd_complete_purchase', //made up hook
					'conversion_metric' => 'visitors',
				],
			]
	),
	'wp-rocket' => array(
		'constant_or_function' => 'WP_ROCKET_VERSION',
		'label'                => 'WP Rocket',
	),
));

//foreach ( $burst_integrations_list as $plugin => $details ) {
//
//	if ( ! isset( $details['early_load'] ) ) {
//		continue;
//	}
//	if ( ! file_exists( WP_PLUGIN_DIR . "/" . $plugin . "/" . $plugin
//	                    . ".php" )
//	) {
//		continue;
//	}
//
//	$early_load = $details['early_load'];
//	$file       = apply_filters( 'burst_early_load_path',
//		burst_path . "integrations/plugins/$early_load", $details );
//
//	if ( file_exists( $file ) ) {
//		require_once( $file );
//	} else {
//		burst_error_log( "Burst Statistics: searched for $plugin integration at $file, but did not find it" );
//	}
//}

 /* Check if a plugin from the integrations list is active
 * @param string $plugin
 * @param bool $skip_enabled_check //if true, only checks if the plugin is installed and active, not if the integration in Burst itself is enabled
 *
 * @return bool
 */
function burst_integration_plugin_is_active( $plugin, $skip_enabled_check = false ): bool {
	global $burst_integrations_list;
	if ( !isset($burst_integrations_list[ $plugin ]) ) {
		return false;
	}

	$enabled = true;
	if ( !$skip_enabled_check ) {
		//because we need a default, we don't use the get_value from burst. The fields array is not loaded yet, so there are no defaults
		$fields = get_option( 'burst_options_integrations' );
		$enabled = ! isset( $fields[ $plugin ] ) || $fields[ $plugin ];
	}

	$theme = wp_get_theme();
	$details = $burst_integrations_list[ $plugin ];

	return ( defined( $details['constant_or_function'] )
	         || function_exists( $details['constant_or_function'] )
	         || class_exists( $details['constant_or_function'] )
	         || ( $theme && ( $theme->name === $details['constant_or_function'] ) )
	       )
	       && $enabled;
}

/**
 * code loaded without privileges to allow integrations between plugins and services, when enabled.
 */

function burst_integrations() {

	global $burst_integrations_list;
	foreach ( $burst_integrations_list as $plugin => $details ) {
		if ( burst_integration_plugin_is_active( $plugin ) ) {
			$file = apply_filters( 'burst_integration_path', burst_path . "integrations/plugins/$plugin.php", $plugin );
			if ( file_exists( $file ) ) {
				require_once( $file );
			}
		}
	}

}

add_action( 'plugins_loaded', 'burst_integrations', 10 );