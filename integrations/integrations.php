<?php 
defined( 'ABSPATH' ) or die( "you do not have access to this page!" );

global $burst_integrations_list;
$burst_integrations_list = apply_filters( 'burst_integrations', array(
	// Consent plugins
	'complianz' => array(
		'constant_or_function' => 'cmplz_version',
		'label'                => 'Complianz GDPR/CCPA',
	),

	// Pagebuilders
	// @todo add goals
	'elementor' => array(
			'constant_or_function' => 'ELEMENTOR_VERSION',
			'label'                => 'Elementor Website Builder',
			'goals'                =>
				[
					[
						'id' => 'elementor_pro_forms_form_submitted',
						'title'=> "Elementor - " . __('Form Submission', 'burst-statistics'),
						'description' => __('Runs after submitting a form', 'burst-statistics'),
						'type' => 'hook',
						'status' => 'active',
						'server_side' => true,
						'url' => '*',
						'hook' => 'elementor_pro/forms/form_submitted',
					],
				]
	),
	'beaver-builder' => [],
	'thrive-architect' => [],
	'divi-builder' => [],

	// eCommerce plugins
	'woocommerce' => array(
		'constant_or_function' => 'WC_VERSION',
		'label'                => 'WooCommerce',
		'goals'                =>
			[
				[
					'id' => 'woocommerce_add_to_cart',
					'title'=> "WooCommerce - " . __('Add to Cart', 'burst-statistics'),
					'description' => __("Runs after clicking 'Add to Cart' button ", 'burst-statistics'),
					'type' => 'hook',
					'status' => 'active',
					'server_side' => true,
					'url' => '*',
					'hook' => 'woocommerce_add_to_cart',
				],
				[
					'id' => 'woocommerce_checkout_order_created',
					'title'=> "WooCommerce - " . __('Order Created', 'burst-statistics'),
					'description' => __('Runs before the payment', 'burst-statistics'),
					'type' => 'hook',
					'status' => 'active',
					'server_side' => true,
					'url' => '*',
					'hook' => 'woocommerce_checkout_order_created',
				],
				[
					'id' => 'woocommerce_payment_complete',
					'title'=> "WooCommerce - " . __('Payment Completed', 'burst-statistics'),
					'description' => __('Runs after completing a payment', 'burst-statistics'),
					'type' => 'hook',
					'status' => 'active',
					'server_side' => true,
					'url' => '*',
					'hook' => 'woocommerce_payment_complete',
					'conversion_metric' => 'visitors',
				],
			]
	),
	// @todo test and add goals
	'easy-digital-downloads' => array(
		'constant_or_function' => 'EDD',
		'label'                => 'Easy Digital Downloads',
		'goals'                =>
			[
				[
					'id' => 'edd_complete_purchase',
					'title'=> "Easy Digital Downloads -" .  __('Purchase', 'burst-statistics'),
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
	'wp-simple-pay' => [],
	'charitable' => [],
	'sure-cart' => [],

	// Contact from plugins
	'contact-form-7' => [
		'constant_or_function' => 'WPCF7_VERSION',
		'label'                => 'Contact Form 7',
		'goals'                =>
			[
				[
					'id' => 'wpcf7_submit',
					'title'=> "Contact Form 7 - " . __('Submit form', 'burst-statistics'),
					'description' => __('Runs after submitting a form', 'burst-statistics'),
					'type' => 'hook',
					'status' => 'active',
					'server_side' => true,
					'url' => '*',
					'hook' => 'wpcf7_submit',
				],
			]
	],
	'wpforms' => [
		'constant_or_function' => 'WPFORMS_VERSION',
		'label'                => 'WPForms',
		'goals'                =>
			[
				[
					'id' => 'wpforms_process_complete',
					'title'=> "WPForms - " . __('Submit form', 'burst-statistics'),
					'description' => __('Runs after submitting a form', 'burst-statistics'),
					'type' => 'hook',
					'status' => 'active',
					'server_side' => true,
					'url' => '*',
					'hook' => 'wpforms_process_complete',
				],
			]
	],
	'gravity_forms' => [
		'constant_or_function' => 'gravity_form',
		'label'                => 'Gravity Forms',
		'goals'                =>
			[
				[
					'id' => 'gform_post_submission',
					'title'=> "Gravity Forms - " . __('Submit form', 'burst-statistics'),
					'description' => __('Runs after submitting a form', 'burst-statistics'),
					'type' => 'hook',
					'status' => 'active',
					'server_side' => true,
					'url' => '*',
					'hook' => 'gform_post_submission',
				],
			]
	],
	'formidable-forms' => [],
	'ninja-forms' => [],
	'happy-forms' => [],
	'forminator' => [],
	'ws-form' => [],
	'everest-forms' => [],
	'kaliforms' => [],
	'form-maker-web10' => [],

	// Lead and CRM plugins
	// @todo add goals
	'mail-poet' => [],
	'mailster' => [],
	'optinmonster' => [], // No hooks to my knowledge
	'thrive-leads' => [],
	'fluentcrm' => [],
	'groundhogg' => [],
	'mailchimp-for-wp' => [],

	// LMS plugins
	'learndash' => [],
	'lifterlms' => [],
	'tutor-lms' => [],

	// caching plugins
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

	if ( ! isset( $details['constant_or_function'] ) ) {
		return false;
	}

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