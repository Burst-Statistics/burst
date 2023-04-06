<?php
defined( 'ABSPATH' ) or die();

function burst_menu() {
	$menu_items = [
		[
			'id'    => 'dashboard',
			'title' => __( 'Dashboard', 'burst-statistics' ),
			'default_hidden' => false,
			'menu_items' => [],
		],
		[
			'id'    => 'statistics',
			'title' => __( 'Statistics', 'burst-statistics' ),
			'default_hidden' => false,
			'menu_items' => [],
		],
		[
			'id'         => 'settings',
			'title'      => __( 'Settings', 'burst-statistics' ),
			'default_hidden' => false,
			'menu_items' => [
				[
					'id'       => 'general',
					'group_id' => 'general',
					'title'    => __( 'General', 'burst-statistics' ),
					'step'     => 1,
					'groups'   => [
						[
							'id'    => 'general',
							'title' => __( 'General', 'burst-statistics' ),
						],
					],
				],
				[
					'id'       => 'goals',
					'group_id' => 'goals',
					'title'    => __( 'Goals', 'burst-statistics' ),
					'step'     => 1,
					'groups'   => [
						[
							'id'    => 'goals',
							'title' => __( 'Goals', 'burst-statistics' ),
						],
					],
				],
				[
					'id'       => 'advanced',
					'group_id' => 'tracking',
					'title'    => __( 'Advanced', 'burst-statistics' ),
					'step'     => 1,
					'groups'   => [
						[
							'id'    => 'tracking',
							'title' => __( 'Tracking', 'burst-statistics' ),
						],
					],
				],
			],
		],
	];


	return apply_filters( 'cmplz_menu', $menu_items);
}

function burst_migrate_settings( $prev_version ) {


}

add_action( 'burst_upgrade', 'burst_migrate_settings', 10, 1 );

function burst_fields( $load_values = true ) {

	if ( ! burst_user_can_manage() ) {
		return [];
	}
	$fields = [
		[
			'id'       => 'review_notice_shown',
			'menu_id'  => 'general',
			'group_id' => 'general',
			'type'     => 'hidden',
			'label'    => '',
			'disabled' => false,
			'default'  => false,
		],
		[
			'id'       => 'burst_tour_shown_once',
			'menu_id'  => 'general',
			'group_id' => 'general',
			'type'     => 'hidden',
			'label'    => '',
			'disabled' => false,
			'default'  => false,
		],
		[
			'id'       => 'enable_turbo_mode',
			'menu_id'  => 'general',
			'group_id' => 'general',
			'type'     => 'checkbox',
			'label'    => __( 'Enable Turbo mode', 'burst-statistics' ),
			'help'     => [
				'label' => 'default',
				'title' => __( 'What is Turbo mode?', 'burst-statistics' ),
				'text'  => __( 'Turbo mode improves pagespeed. When enabled, the script is no longer loaded in the header asynchronously, but is loaded in the footer and deferred. You could lose data from visitors who leave before the page has fully loaded.', 'burst-statistics' ),
				'url'   => 'https://burst-statistics.com/definition/turbo-mode/',
			],
			'disabled' => false,
			'default'  => false,
		],
		[
			'id'       => 'enable_cookieless_tracking',
			'menu_id'  => 'general',
			'group_id' => 'general',
			'type'     => 'checkbox',
			'label'    => __( 'Enable Cookieless tracking', 'burst-statistics' ),
			'help'     => [
				'label' => 'default',
				'title' => __( 'What is Cookieless tracking?', 'burst-statistics' ),
				'text'  => __( "With cookieless tracking enabled, Burst will not use cookies to determine the number of unique visitors. It will use contextual data, like the browser version and device, also called 'fingerprinting'. The latter could be less reliable for some users.", 'burst-statistics' ),
				'url'   => 'https://burst-statistics.com/definition/what-is-cookieless-tracking/',
			],
			'disabled' => false,
			'default'  => false,
		],
		[
			'id'       => 'enable_do_not_track',
			'menu_id'  => 'general',
			'group_id' => 'general',
			'type'     => 'checkbox',
			'label'    => __( "Honor 'Do Not Track' requests", 'burst-statistics' ),
			'disabled' => false,
			'default'  => false,
		],
		[
			'id'          => 'restart_tour',
			'menu_id'     => 'general',
			'group_id'    => 'general',
			'type'        => 'button',
			'url'         => burst_dashboard_url . '#dashboard/tour',
			'button_text' => __( 'Restart', 'burst-statistics' ),
			'label'       => __( 'Restart plugin tour', 'burst-statistics' ),
			'disabled'    => false,
			'default'     => false,
		],
		[
			'id'       => 'goals',
			'menu_id'  => 'goals',
			'group_id' => 'goals',
			'type'     => 'goals',
			'label'    => __( 'Goals', 'burst-statistics' ),
			'help'     => [
				'label' => 'default',
				'title' => __( 'How to select goals?', 'burst-statistics' ),
				'text'  => __( "To set goals for a website, you need to identify the purpose of the site and the key actions you want visitors to take. Set measurable and achievable goals for each action and track your progress.", 'burst-statistics' ),
				'url'   => 'https://burst-statistics.com/definition/what-is-cookieless-tracking/',
			],
			'default' => [],
		],
		[
			'id'       => 'user_role_blocklist',
			'menu_id'  => 'advanced',
			'group_id' => 'tracking',
			'type'     => 'user_role_blocklist',
			'label'    => __( 'Exclude user roles from being tracked', 'burst-statistics' ),
			'help'     => [
				'label' => 'default',
				'title' => __( 'Excluding visitors', 'burst-statistics' ),
				'text'  => __( 'You can exclude visitors by user role and IP address. This will affect new data only.', 'burst-statistics' ),
				'url'   => 'https://burst-statistics.com/exclude-ip-addresses-from-burst-statistics/',
			],
			'disabled' => false,
			'default'  => false,
		],
		[
			'id'       => 'ip_blocklist',
			'menu_id'  => 'advanced',
			'group_id' => 'tracking',
			'type'     => 'ip_blocklist',
			'label'    => __( 'Exclude IP address from tracking, separate with a line break', 'burst-statistics' ),
			'disabled' => false,
			'default'  => false,
		],
	];

	$fields = apply_filters( 'burst_fields', $fields );
	foreach ( $fields as $key => $field ) {
		$field = wp_parse_args( $field, [ 'id'                 => false,
		                                  'visible'            => true,
		                                  'disabled'           => false,
		                                  'new_features_block' => false,
		] );
		if ( $load_values ) {
			$value          = burst_sanitize_field( burst_get_option( $field['id'], $field['default'] ), $field['type'], $field['id'] );
			$field['value'] = apply_filters( 'burst_field_value_' . $field['id'], $value, $field );
			$fields[ $key ] = apply_filters( 'burst_field', $field, $field['id'] );
		}
	}

	$fields = apply_filters( 'burst_fields_values', $fields );

	return array_values( $fields );
}

function burst_goal_fields() {
	$goals = [
		'goal_title' => [
			'id'       => 'goal_title',
			'type'     => 'hidden',
			'default'  => false,
		],
		'goal_status' => [
			'id'       => 'goal_status',
			'type'     => 'hidden',
			'default'  => false,
		],
		'goal_type' => [
			'id'       => 'goal_type',
			'type'     => 'radio-buttons',
			'label'    => __( 'What type of goal do you want to set?', 'burst-statistics' ),
			'options'  => [
				'clicks' => [
					'label' => __('Clicks', 'burst-statistics'),
			          'description' => __('Track clicks on element', 'burst-statistics'),
			          'type' => 'clicks',
			          'icon' => 'mouse',
				],
				'views'  => [
					'label'       => __( 'Views', 'burst-statistics' ),
					'description' => __( 'Track views of element', 'burst-statistics' ),
					'type'        => 'views',
					'icon'        => 'eye',
				],
				'visits' => [
					'label'       => __( 'Visits', 'burst-statistics' ),
					'description' => __( 'Track visits to page', 'burst-statistics' ),
					'type'        => 'visits',
					'icon'        => 'visitors',
				],
			],
			'disabled' => false,
			'default'  => 'clicks',
		],
		'goal_page_or_website' => [
			'id'               => 'goal_page_or_website',
			'type'             => 'radio-buttons',
			'label'            => __( 'Do you want to track a specific page or the entire website?', 'burst-statistics' ),
			'options'          => [
				'page'    => [
					'label'       => __( 'Page', 'burst-statistics' ),
					'description' => __( 'Track page specific', 'burst-statistics' ),
					'type'        => 'page',
					'icon'        => 'page',
				],
				'website' => [
					'label'       => __( 'Website', 'burst-statistics' ),
					'description' => __( 'Track on whole site', 'burst-statistics' ),
					'type'        => 'website',
					'icon'        => 'website',
				],
			],
			'react_conditions' => [
				'relation' => 'AND',
				[
					'goal_type' => ['clicks', 'views'],
				],
			],
			'disabled'         => false,
			'default'          => 'website',
		],
		'goal_specific_page' => [
			'id'               => 'goal_specific_page',
			'type'             => 'select-page',
			'label'            => __( 'Which specific page do you want to track?', 'burst-statistics' ),
			'disabled'         => false,
			'default'          => false,
			'react_conditions' => [
				'relation' => 'OR',
				[
					'goal_page_or_website' => ['page'],
					'goal_type' => ['visits'],
				],
			],
		],
		'goal_element' => [
			'id'               => 'goal_element',
			'type'             => 'class-id',
			'label'            => __( 'What element do you want to track?', 'burst-statistics' ),
			'disabled'         => false,
			'default'          => [
				'attribute' => 'class',
				'value'     => '',
			],
			'react_conditions' => [
				'relation' => 'AND',
				[
					'goal_type'=> ['clicks', 'views'],
				],
			],
		],
	];

	return apply_filters( 'burst_goal_fields', $goals );
}

/**
 * Render html based on template
 *
 * @param string $template
 *
 * @return string
 */

function burst_get_template( $template ) {
	if ( ! burst_user_can_view() ) {
		return '';
	}
	$html = '';
	$file = trailingslashit( burst_path ) . 'settings/templates/' . $template;
	if ( file_exists( $file ) ) {
		ob_start();
		require $file;
		$html = ob_get_clean();
	}

	return $html;
}


