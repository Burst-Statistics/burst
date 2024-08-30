<?php 
defined( 'ABSPATH' ) or die( "you do not have access to this page!" );

global $burst_integrations_list;

/**
 * List of integrations that Burst Statistics supports.
 * Good to know for goals:
 * - The goals should always be user trigger-able, otherwise the goal can not be tracked as it requires a UID at least for now.
 * -
 */
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
		'constant_or_function' => 'EDD_PLUGIN_FILE',
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
					'hook' => 'edd_complete_purchase',
					'conversion_metric' => 'visitors',
				],
			]
	),
	'easy-digital-downloads-recurring' => array(
		'constant_or_function' => 'EDD_RECURRING_VERSION',
		'label'                => 'Easy Digital Downloads - Recurring Payments',
		'goals' =>
		[
			'id' => 'edd_subscription_post_create',
			'title'=> "Easy Digital Downloads - " . __('Subscription Created', 'burst-statistics'),
			'description' => __('Runs after creating a subscription', 'burst-statistics'),
			'type' => 'hook',
			'status' => 'active',
			'server_side' => true,
			'url' => '*',
			'hook' => 'edd_subscription_post_create',
		],
		[
			'id' => 'edd_subscription_cancelled',
			'title'=> "Easy Digital Downloads - " . __('Subscription Cancelled', 'burst-statistics'),
			'description' => __('Runs after cancelling a subscription', 'burst-statistics'),
			'type' => 'hook',
			'status' => 'active',
			'server_side' => true,
			'url' => '*',
			'hook' => 'edd_subscription_cancelled',
		],

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
	'formidable-forms' => [
		'constant_or_function' => 'frm_forms_autoloader',
		'label'                => 'Formidable Forms',
		'goals'                =>
			[
				[
					'id' => 'frm_submit_clicked',
					'title'=> "Formidable Forms - " . __('Submit form', 'burst-statistics'),
					'description' => __('Runs after submitting a form', 'burst-statistics'),
					'type' => 'clicks',
					'status' => 'active',
					'server_side' => false,
					'url' => '*',
					'attribute' => 'class',
					'attribute_value' => 'frm_button_submit',
				],
			]
	],
	'ninja-forms' => [
		'constant_or_function' => 'Ninja_Forms',
		'label'                => 'Ninja Forms',
		'goals'                =>
			[
				[
					'id' => 'ninja_forms_after_submission',
					'title'=> "Ninja Forms - " . __('Submit form', 'burst-statistics'),
					'description' => __('Runs after submitting a form', 'burst-statistics'),
					'type' => 'hook',
					'status' => 'active',
					'server_side' => true,
					'url' => '*',
					'hook' => 'ninja_forms_after_submission',
				],
			]
	],
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

/**
 * Check if a plugin from the integrations list is active
 * @param string $plugin
 *
 * @return bool
 */
function burst_integration_plugin_is_active( $plugin ): bool {
	global $burst_integrations_list;
	if ( !isset($burst_integrations_list[ $plugin ]) ) {
		return false;
	}

	$theme = wp_get_theme();
	$details = $burst_integrations_list[ $plugin ];
	if ( ! isset( $details['constant_or_function'] ) ) {
		return false;
	}

	return defined( $details['constant_or_function'] )
	         || function_exists( $details['constant_or_function'] )
	         || class_exists( $details['constant_or_function'] )
	         || ( $theme && ( $theme->name === $details['constant_or_function'] ) );
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

	// add integration with consent api for this plugin
	$plugin = plugin_basename( __FILE__ );
	add_filter( "wp_consent_api_registered_{$plugin}", '__return_true' );

}

add_action( 'plugins_loaded', 'burst_integrations', 10 );