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
					'id'       => 'data',
					'group_id' => 'archiving',
					'title'    => __( 'Data', 'burst-statistics' ),
					'step'     => 1,
					'groups'   => [
						[
							'id'    => 'data_archiving',
							'title' => __( 'Archiving', 'burst-statistics' ),
						],
						[
							'id'    => 'restore_archives',
							'title' => __( 'Archived Data', 'burst-statistics' ),
							'pro'      => true,
							'upgrade'     => 'https://burst-statistics.com/pricing?src=plugin-archive-data',
							'pro_text' => __( "Manage your archived data with %sBurst Pro%s", 'burst-statistics' ),
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


	return apply_filters( 'burst_menu', $menu_items);
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
				'title' => __( 'How to set goals?', 'burst-statistics' ),
				'text'  => __( "To set goals for a website, you need to identify the purpose of the site and the key actions you want visitors to take. Set measurable and achievable goals for each action and track your progress.", 'burst-statistics' ),
				'url'   => 'https://burst-statistics.com/how-to-set-goals/',
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
		[
			'id'       => 'archive_data',
			'menu_id'  => 'data',
			'group_id' => 'data_archiving',
			'options'  => [

				'none' 	 => __('Don\'t manage',"burst-statistics"),
				'archive' => __('Automatically Archive',"burst-statistics"),
				'delete' => __('Automatically Delete',"burst-statistics"),
			],
			'pro' => [
				'url' => 'https://burst-statistics.com/pricing/',
				'disabled' => false,
			],
			'help'     => [
				'label' => 'default',
				'title' => __( 'Why should I manage old data?', 'burst-statistics' ),
				'text'  => __( 'Managing old data can optimize storage and improve site performance. Choose to archive or delete based on your needs.', 'burst-statistics' ),
				'url'   => 'https://burst-statistics.com/do-I-need-to-archive-my-data/',
			],
			'disabled' => ['archive'],
			'type'     => 'select',
			'label'    => __( 'Choose how to manage old statistics', 'burst-statistics' ),
			// option is string with more than 1 letter
			'comment' => burst_admin_logged_in() && strlen( get_option( 'burst_table_size' ) ) > 1
				? sprintf( _x( 'Burst currently uses %s of your database.', 'e.g. Burst currently uses 10 MB of your database.', "burst-statistics" ), get_option( 'burst_table_size' ) ) : '',
			'default' => false,
		],
		[
			'id'       => 'archive_after_months',
			'menu_id'  => 'data',
			'group_id' => 'data_archiving',
			'min'   	 => 1,
			'type'     => 'number',
			'label'    => __( 'Retain data for how many months?', 'burst-statistics' ),
			'disabled' => false,
			'default'  => 24,
			'react_conditions' => [
				'relation' => 'AND',
				[
					'archive_data' => ['archive', 'delete'],
				],
			],
		],

		[
			'id'       => 'confirm_delete_data',
			'menu_id'  => 'data',
			'group_id' => 'data_archiving',
			'type'     => 'checkbox',
			'label'    => __( 'Please confirm the deletion, without the possibility to restore.', 'burst-statistics' ),
			'disabled' => false,
			'default'  => false,
			'react_conditions' => [
				'relation' => 'AND',
				[
					'archive_data' => ['delete'],
				],
			],
		],
//		[
//			'id'       => 'archive_data',
//			'menu_id'  => 'data',
//			'group_id' => 'data_archiving',
//			'options'  => [
//				'none' 	 => __('Never',"burst-statistics"),
//				'archive' => __('Archive',"burst-statistics"),
//				'delete' => __('Delete',"burst-statistics"),
//			],
//			'pro' => [
//				'url' => 'https://burst-statistics.com/pricing/',
//				'disabled' => false,
//			],
//			'help'     => [
//				'label' => 'default',
//				'title' => __( 'Do I need to archive my data?', 'burst-statistics' ),
//				'text'  => __( 'In general, your hosting peformance and storage is related to your website traffic. In some cases, this might be skewed and you might want to minimize data stored in your database.', 'burst-statistics' ),
//				'url'   => 'https://burst-statistics.com/do-I-need-to-archive-my-data/',
//			],
//			'disabled' => ['archive'],
//			'type'     => 'select',
//			'label'    => __( 'Do you want to automatically archive or delete statistics?', 'burst-statistics' ),
//			'comment' => burst_admin_logged_in() ? sprintf(_x('Burst currently uses %s of your database.','e.g. Burst currently uses 10 MB of your database.', "burst-statistics"), get_option('burst_table_size')) : 'test',
//			'default'  => false,
//		],

//		[
//			'id'       => 'enable_automatic_archiving',
//			'menu_id'  => 'data',
//			'group_id' => 'data_archiving',
//			'type'     => 'checkbox',
//			'label'    => __( 'Enable monthly data archiving', 'burst-statistics' ),
//			'pro' => [
//				'url' => 'https://burst-statistics.com/pricing/',
//				'disabled' => false,
//			],
//			'help'     => [
//				'label' => 'default',
//				'title' => __( 'Do I need to archive or delete my data?', 'burst-statistics' ),
//				'text'  => __( 'In general, your hosting performance and storage is related to your website traffic. In some cases, this might be skewed and you might want to minimize data stored in your database.', 'burst-statistics' ),
//				'url'   => 'https://burst-statistics.com/do-I-need-to-archive-my-data/',
//			],
//			'comment' => burst_admin_logged_in() ? sprintf(_x('Burst currently uses %s of your database.','e.g. Burst currently uses 10 MB of your database.', "burst-statistics"), get_option('burst_table_size')) : 'test',
//			'disabled' => false,
//			'default'  => false,
//		],
//
//		[
//			'id'       => 'archive_after_months',
//			'menu_id'  => 'data',
//			'group_id' => 'data_archiving',
//			'min'   	 => 1,
//			'type'     => 'select',
//			'label'    => __( 'Archive data older than', 'burst-statistics' ),
//			'disabled' => false,
//			'default'  => '24',
//			'options'  => [
//				'3' 	 => __('3 months',"burst-statistics"),
//				'6' => __('6 months',"burst-statistics"),
//				'12' => __('1 year',"burst-statistics"),
//				'24' => __('2 years',"burst-statistics"),
//				'36' => __('3 years',"burst-statistics"),
//				'48' => __('4 years',"burst-statistics"),
//			],
//			'react_conditions' => [
//				'relation' => 'AND',
//				[
//					'enable_automatic_archiving' => true,
//				],
//			],
//		],
//
		[
			'id'       => 'restore_archives',
			'menu_id'  => 'data',
			'group_id' => 'restore_archives',
			'type'     => 'restore_archives',
			'disabled' => false,
			'default'  => false,
		],
//
//		[
//			'id'       => 'enable_automatic_deletion',
//			'menu_id'  => 'data',
//			'group_id' => 'data_deleting',
//			'type'     => 'checkbox',
//			'label'    => __( 'Enable monthly data deleting', 'burst-statistics' ),
//			'pro' => [
//				'url' => 'https://burst-statistics.com/pricing/',
//				'disabled' => false,
//			],
//			'disabled' => false,
//			'default'  => false,
//		],
//
//		[
//			'id'       => 'delete_after_months',
//			'menu_id'  => 'data',
//			'group_id' => 'data_deleting',
//			'min'   	 => 1,
//			'type'     => 'select',
//			'label'    => __( 'Delete data older than', 'burst-statistics' ),
//			'warning' => __('This will delete all data older than the selected period. This cannot be undone.', 'burst-statistics'),
//			'disabled' => false,
//			'default'  => '24',
//			'options'  => [
//				'3' 	 => __('3 months',"burst-statistics"),
//				'6' => __('6 months',"burst-statistics"),
//				'12' => __('1 year',"burst-statistics"),
//				'24' => __('2 years',"burst-statistics"),
//				'36' => __('3 years',"burst-statistics"),
//				'48' => __('4 years',"burst-statistics"),
//			],
//			'react_conditions' => [
//				'relation' => 'AND',
//				[
//					'enable_automatic_deletion' => true,
//				],
//			],
//		],
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
