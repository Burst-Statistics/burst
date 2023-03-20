<?php
defined( 'ABSPATH' ) or die();

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * @since 1.0.0
 */

require_once( burst_path . 'settings/config/config.php' );
require_once( burst_path . 'settings/rest-api-optimizer/rest-api-optimizer.php' );

/**
 * Fix for WPML issue where WPML breaks the rest api by adding a language locale in the url
 *
 * @param $url
 * @param $path
 * @param $blog_id
 * @param $scheme
 *
 * @return string
 */
function burst_fix_rest_url_for_wpml( $url, $path, $blog_id, $scheme)  {
	if ( strpos($url, 'burst/v')===false ) {
		return $url;
	}
    $current_language = false;
	if ( function_exists( 'icl_register_string' ) ) {
		$current_language = apply_filters( 'wpml_current_language', null );
	}

    if ( function_exists('qtranxf_getLanguage') ){
	    $current_language = qtranxf_getLanguage();
    }

    if ( $current_language ) {
		if ( strpos($url, '/'.$current_language.'/wp-json/') ) {
			$url = str_replace( '/'.$current_language.'/wp-json/', '/wp-json/', $url);
		}
	}
	return $url;
}
add_filter( 'rest_url', 'burst_fix_rest_url_for_wpml', 10, 4 );

function burst_plugin_admin_scripts() {
	$script_asset_path = __DIR__ . "/build/index.asset.php";
	$script_asset      = require( $script_asset_path );
	wp_enqueue_script(
		'burst-settings',
		plugins_url( 'build/index.js', __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);
	wp_set_script_translations( 'burst-settings', 'burst-statistics' );

	global $wpdb;
	wp_localize_script(
        'burst-settings',
        'burst_settings',
        apply_filters('burst_localize_script',array(
            'site_url' => get_rest_url(),
            'dashboard_url' => add_query_arg(['page' => 'burst'], burst_admin_url() ),
            'upgrade_link' => is_multisite() ? 'https://burst-statistics.com/pro-multisite' : 'https://burst-statistics.com/pro',
            'plugin_url' => burst_url,
            'network_link' => network_site_url('plugins.php'),
            'blocks' => burst_blocks(),
            'pro_plugin_active' => defined('burst_pro_version'),
            'networkwide_active' => ! is_multisite(),//true for single sites and network wide activated
            'nonce' => wp_create_nonce( 'wp_rest' ),//to authenticate the logged in user
            'burst_nonce' => wp_create_nonce( 'burst_nonce' ),
            'current_ip' => burst_get_ip_address(),
            'user_roles' => burst_get_user_roles(),
            'date_ranges' => burst_get_date_ranges(),
            'tour_shown' => burst_get_option('burst_tour_shown_once'),
            'gmt_offset' => get_option('gmt_offset'),
        ))
	);
}

function burst_add_option_menu() {
	if ( ! burst_user_can_view() ) {
		return;
	}

    $menu_label = __('Statistics', 'burst-statistics');
	$warnings      = BURST()->notices->count_plusones( array('plus_ones'=>true) );
	$warning_title = esc_attr( burst_sprintf( '%d plugin warnings', $warnings ) );
    if ( $warnings > 0 ) {
        $warning_title .= ' ' . esc_attr( burst_sprintf( '(%d plus ones)', $warnings ) );
	    $menu_label    .=
		    "<span class='update-plugins count-$warnings' title='$warning_title'>
			<span class='update-count'>
				". number_format_i18n( $warnings ) . "
			</span>
		</span>";
    }


		$page_hook_suffix = add_submenu_page(
			'index.php',
			'Burst Statistics',
			$menu_label,
			'view_burst_statistics',
			'burst',
			'burst_dashboard'
		);

	add_action( "admin_print_scripts-{$page_hook_suffix}", 'burst_plugin_admin_scripts' );
}

add_action( 'admin_menu', 'burst_add_option_menu' );

/**
 * Render the settings page
 */

function burst_dashboard() {
	if ( ! burst_user_can_view() ) {
		return;
	}
    ?>
    <div id="burst-statistics" class="burst">
        <div class="burst-header-container">
            <div class="burst-header">
                <img class="burst-logo"
                     src="<?php echo burst_url . 'assets/img/burst-logo.svg' ?>"
                     alt="Burst Statistics logo"/>
            </div>
        </div>
        <div class="burst-content-area burst-grid burst-dashboard burst-page-placeholder">
            <div class="burst-grid-item  burst-column-2 burst-row-2 "></div>
            <div class="burst-grid-item burst-row-2"></div>
            <div class="burst-grid-item burst-row-2"></div>
            <div class="burst-grid-item  burst-column-2"></div>
        </div>
    </div>
    <div id="burst-statistics-modal"></div>
    <?php
}

add_action( 'rest_api_init', 'burst_settings_rest_route', 1 );
function burst_settings_rest_route() {
	if ( ! burst_user_can_view() ) {
		return;
	}
	register_rest_route( 'burst/v1', 'fields/get', array(
		'methods'             => 'GET',
		'callback'            => 'burst_rest_api_fields_get',
		'permission_callback' => function () {
			return burst_user_can_manage();
		}
	) );

	register_rest_route( 'burst/v1', 'fields/set', array(
		'methods'             => 'POST',
		'callback'            => 'burst_rest_api_fields_set',
		'permission_callback' => function() {
			return burst_user_can_manage();
		},
	) );

	register_rest_route( 'burst/v1', 'block/(?P<block>[a-z\_\-]+)', array(
		'methods'             => 'GET',
		'callback'            => 'burst_rest_api_block_get',
		'permission_callback' => function() {
			return burst_user_can_view();
		},
	) );

	 register_rest_route( 'burst/v1', 'tests/(?P<test>[a-z\_\-]+)', array(
	 	'methods'  => 'GET',
	 	'callback' => 'burst_run_test',
	 	'permission_callback' => function () {
		    return burst_user_can_view();
	 	}
	 ) );

	register_rest_route( 'burst/v1', 'data/(?P<type>[a-z\_\-]+)', array(
		'methods'  => 'GET',
		'callback' => 'burst_get_data',
		'permission_callback' => function () {
			return burst_user_can_view();
		}
	) );

	register_rest_route( 'burst/v1', 'do_action/(?P<action>[a-z\_\-]+)', array(
		'methods'  => 'POST',
		'callback' => 'burst_do_action',
		'permission_callback' => function () {
			return burst_user_can_view();
		}
	) );
}

/**
 * @param WP_REST_Request $request
 *
 * @return void
 */
function burst_run_test($request){
	if ( ! burst_user_can_view() ) {
		return;
	}

	$test = sanitize_title($request->get_param('test'));
	$state = $request->get_param('state');
	$state =  $state !== 'undefined' ? $state : false;
	switch($test){
		case 'progressdata':
			$data = BURST()->notices->get();
			break;
		case 'dismiss_task':
			$data = BURST()->notices->dismiss_notice($state);
			break;
		case 'otherpluginsdata':
			$data = burst_other_plugins_data();
			break;
		case 'tracking':
			$data = BURST()->endpoint->get_tracking_status_and_time();
			break;
		default:
			$data = apply_filters("burst_run_test", [], $test, $request);
	}

    return $data;
}


/**
 * @param WP_REST_Request $request
 *
 * @return void
 */
function burst_do_action($request){
	if ( !burst_user_can_manage() ) {
		return;
	}

	$action = sanitize_title($request->get_param('action'));
	$data = $request->get_params();
	$nonce = $data['nonce'];
	if ( !wp_verify_nonce($nonce, 'burst_nonce') ) {
		return;
	}

	switch( $action ){
		case 'plugin_actions':
			$data = burst_plugin_actions($request);
			break;
		default:
			$data = apply_filters("burst_do_action", [], $action, $request);
	}
	return $data;
}

/**
 * Process plugin installation or activation actions
 *
 * @param WP_REST_Request $request
 *
 * @return array
 */

function burst_plugin_actions($request){
	if ( !burst_user_can_manage() ) {
		return [];
	}
	$data = $request->get_params();
	$slug = sanitize_title($data['slug']);
	$action = sanitize_title($data['pluginAction']);
	$installer = new burst_installer($slug);
	if ($action==='download') {
		$installer->download_plugin();
	} else if ( $action === 'activate' ) {
		$installer->activate_plugin();
	}
	return burst_other_plugins_data($slug);
}

/**
 * Get plugin data for other plugin section
 * @param string $slug
 * @return array
 */
function burst_other_plugins_data($slug=false){
	if ( !burst_user_can_view() ) {
		return [];
	}
	$plugins = array(
		[
			'slug' => 'burst-statistics',
			'constant_free' => 'burst_version',
			'wordpress_url' => 'https://wordpress.org/plugins/burst-statistics/',
			'upgrade_url' => 'https://burst-statistics.com/?src=burst-plugin',
			'title' => 'Burst Statistics - '. __("Self-hosted, Privacy-friendly analytics tool.", "burst-statistics"),
		],
		[
			'slug' => 'complianz-gdpr',
			'constant_free' => 'cmplz_plugin',
			'constant_premium' => 'cmplz_premium',
			'wordpress_url' => 'https://wordpress.org/plugins/complianz-gdpr/',
			'upgrade_url' => 'https://complianz.io/pricing?src=burst-plugin',
			'title' => __("Complianz Privacy Suite - Cookie Consent Management as it should be", "burst-statistics" ),
		],
		[
			'slug' => 'complianz-terms-conditions',
			'constant_free' => 'cmplz_tc_version',
			'wordpress_url' => 'https://wordpress.org/plugins/complianz-terms-conditions/',
			'upgrade_url' => 'https://complianz.io?src=burst-plugin',
			'title' => 'Complianz - '. __("Terms and Conditions", "burst-statistics"),
		],
	);

	foreach ($plugins as $index => $plugin ){
		$installer = new burst_installer($plugin['slug']);
		if ( isset($plugin['constant_premium']) && defined($plugin['constant_premium']) ) {
			$plugins[ $index ]['pluginAction'] = 'installed';
		} else if ( !$installer->plugin_is_downloaded() && !$installer->plugin_is_activated() ) {
			$plugins[$index]['pluginAction'] = 'download';
		} else if ( $installer->plugin_is_downloaded() && !$installer->plugin_is_activated() ) {
			$plugins[ $index ]['pluginAction'] = 'activate';
		} else {
			if (isset($plugin['constant_premium']) ) {
				$plugins[$index]['pluginAction'] = 'upgrade-to-premium';
			} else {
				$plugins[ $index ]['pluginAction'] = 'installed';
			}
		}
	}

	if ( $slug ) {
		foreach ($plugins as $key=> $plugin) {
			if ($plugin['slug']===$slug){
				return $plugin;
			}
		}
	}
	return $plugins;

}

/**
 * @param WP_REST_Request $request
 *
 * @return void
 */
function burst_get_data($request){
	if ( ! burst_user_can_view() ) {
		return;
	}
	$type = sanitize_title($request->get_param('type'));
    $args = [
            'date_start' => BURST()->statistics->convert_date_to_utc( $request->get_param('date_start') . ' 00:00:00'), // add 00:00:00 to date,
            'date_end' => BURST()->statistics->convert_date_to_utc($request->get_param('date_end') . ' 23:59:59'), // add 23:59:59 to date
            'date_range' => burst_sanitize_date_range($request->get_param('date_range')),
    ];
    $request_args = json_decode($request->get_param('args'), true);
	$args['metrics'] = $request_args['metrics'] ?? ['visitors'];
    $args['metrics'] = BURST()->statistics->sanitize_metrics($args['metrics']);

	switch($type){
		case 'today':
			$data = BURST()->statistics->get_today_data($args);
			break;
		case 'insights':
			$args['interval'] = $request_args['interval'] ?? 'day';
			$args['interval'] = BURST()->statistics->sanitize_interval($args['interval']);
			$data = BURST()->statistics->get_insights_data($args);
			break;
		case 'pages':
			$data = BURST()->statistics->get_pages_data($args);
			break;
		case 'referrers':
			$data = BURST()->statistics->get_referrers_data($args);
			break;
		case 'compare':
			$data = BURST()->statistics->get_compare_data($args);
			break;
		case 'devices':
			$data = BURST()->statistics->get_devices_data($args);
			break;
		default:
			$data = apply_filters("burst_get_data", [], $type, $request);
	}
	return $data;
}

/**
 * List of allowed field types
 *
 * @param $type
 *
 * @return mixed|string
 */
function burst_sanitize_field_type( $type ) {
	$types = [
		'hidden',
		'database',
		'checkbox',
		'radio',
		'text',
		'textarea',
		'number',
		'email',
		'select',
        'ip_blocklist',
        'user_role_blocklist',
	];
	if ( in_array( $type, $types ) ) {
		return $type;
	}

	return 'checkbox';
}

/**
 * @param WP_REST_Request $request
 *
 * @return array
 */
function burst_rest_api_fields_set( $request ) {
	if ( ! burst_user_can_manage() ) {
		return;
	}
	$fields = $request->get_json_params();
	//get the nonce
	$nonce = false;
	foreach ( $fields as $index => $field ){
		if ( isset($field['nonce']) ) {
			$nonce = $field['nonce'];
			unset($fields[$index]);
		}
	}

	if ( !wp_verify_nonce($nonce, 'burst_nonce') ) {
		return;
	}

	$config_fields = burst_fields(false);
	$config_ids = array_column($config_fields, 'id');
	foreach ( $fields as $index => $field ) {
		$config_field_index = array_search($field['id'], $config_ids);
		$config_field = $config_fields[$config_field_index];
		if ( !$config_field_index ){
			error_log("Burst Statistics: unsetting ".$field['id']." as not existing field in BURST ");
			unset($fields[$index]);
			continue;
		}
		$type = burst_sanitize_field_type($field['type']);
		$field_id = sanitize_text_field($field['id']);
		$value = burst_sanitize_field( $field['value'] , $type,  $field_id);
		//if an endpoint is defined, we use that endpoint instead
		if ( isset($config_field['data_endpoint'])){
			//the updateItemId allows us to update one specific item in a field set.
			$update_item_id = isset($field['updateItemId']) ? $field['updateItemId'] : false;
			$action = isset($field['action']) && $field['action']==='delete' ? 'delete' : 'update';
			$endpoint = $config_field['data_endpoint'];
			if (is_array($endpoint) ) {
				$main = $endpoint[0];
				$class = $endpoint[1];
				$function = $endpoint[2];
				if (function_exists($main)) {
					$main()->$class->$function( $value, $update_item_id, $action );
				}
			} else if ( function_exists($endpoint) ){
				$endpoint($value, $update_item_id, $action);
			}

			unset($fields[$index]);
			continue;
		}

		$field['value'] = $value;
		$fields[$index] = $field;
	}

    $options = get_option( 'burst_options_settings', [] );


	//build a new options array
	foreach ( $fields as $field ) {
		$prev_value = isset( $options[ $field['id'] ] ) ? $options[ $field['id'] ] : false;
		do_action( "burst_before_save_option", $field['id'], $field['value'], $prev_value, $field['type'] );
		$options[ $field['id'] ] = $field['value'];
	}

	if ( ! empty( $options ) ) {
			update_option( 'burst_options_settings', $options );
	}

	foreach ( $fields as $field ) {
		do_action( "burst_after_save_field", $field['id'], $field['value'], $prev_value, $field['type'] );
	}
	do_action('burst_after_saved_fields', $fields );

	return [
		'success' => true,
		'progress' => BURST()->notices->get(),
		'fields' => burst_fields(true),
	];
}

/**
 * Update a burst option
 * @param string $name
 * @param mixed $value
 *
 * @return void
 */

function burst_update_option( $name, $value ) {
	if ( !burst_user_can_manage() && !wp_doing_cron() ) {
		return;
	}

	$config_fields = burst_fields(false);
	$config_ids = array_column($config_fields, 'id');
	$config_field_index = array_search($name, $config_ids);
	$config_field = $config_fields[$config_field_index];
	if ( $config_field_index === false ){
		error_log("Burst Statistics: exiting ".$name." as not existing field in burst ");
		return;
	}

	$type = isset( $config_field['type'] ) ? $config_field['type'] : false;
	if ( !$type ) {
		error_log("Burst Statistics: exiting ".$name." has not existing type ");
		return;
	}
    $options = get_option( 'burst_options_settings', [] );
	if ( !is_array($options) ) $options = [];
	$prev_value = $options[ $name ] ?? false;
	$name = sanitize_text_field($name);
	$type = burst_sanitize_field_type($config_field['type']);
	$value = burst_sanitize_field( $value, $type, $name );
	$value = apply_filters("burst_fieldvalue", $value, sanitize_text_field($name), $type);
	$options[$name] = $value;
    update_option( 'burst_options_settings', $options );
	do_action( "burst_after_save_field", $name, $value, $prev_value, $type );
}
/**
 * Get the rest api fields
 * @return void
 */

function burst_rest_api_fields_get() {
	if ( !burst_user_can_manage() ) {
		return;
	}

	$output = array();
	$fields = burst_fields();
	$menu = burst_menu();
	foreach ( $fields as $index => $field ) {
		/**
		 * Load data from source
		 */
		if ( isset($field['data_source']) ){
			$data_source = $field['data_source'];
			if ( is_array($data_source)) {
				$main = $data_source[0];
				$class = $data_source[1];
				$function = $data_source[2];
				$field['value'] = [];
				if (function_exists($main)){
					$field['value'] = $main()->$class->$function();
				}
			} else if ( function_exists($field['data_source'])) {
				$func = $field['data_source'];
				$field['value'] = $func();
			}
		}

		$fields[$index] = $field;
	}

	//remove empty menu items
	foreach ($menu as $key => $menu_group ){
		$menu_group['menu_items'] = burst_drop_empty_menu_items($menu_group['menu_items'], $fields);
		$menu[$key] = $menu_group;
	}

	$output['fields'] = $fields;
	$output['menu'] = $menu;
	$output['progress'] = BURST()->notices->get();

	return apply_filters('rsssl_rest_api_fields_get', $output);
}

/**
 * Checks if there are field linked to menu_item if not removes menu_item from menu_item array
 * @param $menu_items
 * @param $fields
 * @return array
 */
function burst_drop_empty_menu_items( $menu_items, $fields) {
	if ( !burst_user_can_manage() ) {
		return $menu_items;
	}
    $new_menu_items = $menu_items;
    foreach($menu_items as $key => $menu_item) {
        $searchResult = array_search($menu_item['id'], array_column($fields, 'menu_id'));
        if($searchResult === false) {
            unset($new_menu_items[$key]);
            //reset array keys to prevent issues with react
	        $new_menu_items = array_values($new_menu_items);
        } else {
            if(isset($menu_item['menu_items'])){
                $updatedValue = burst_drop_empty_menu_items($menu_item['menu_items'], $fields);
                $new_menu_items[$key]['menu_items'] = $updatedValue;
            }
        }
    }
    return $new_menu_items;
}

/**
 * Get grid block data
 *
 * @param WP_REST_Request $request
 *
 * @return void
 */
function burst_rest_api_block_get( $request ) {
	if ( ! burst_user_can_manage() ) {
		return;
	}
	$block    = $request->get_param( 'block' );
	$blocks   = burst_blocks();

	return isset( $blocks[ $block ] ) ? $blocks[ $block ] : [];

}

/**
 * Sanitize a field
 *
 * @param mixed  $value
 * @param string $type
 *
 * @oaram string $id
 *
 * @return array|bool|int|string|void
 */
function burst_sanitize_field( $value, $type, $id ) {
	if ( ! burst_user_can_manage() ) {
		return false;
	}

	switch ( $type ) {
		case 'checkbox':
		case 'hidden':
		case 'database':
			return intval( $value );
		case 'select':
		case 'text':
			return sanitize_text_field( $value );
		case 'textarea':
			return sanitize_text_field( $value );
		case 'multicheckbox':
        case 'user_role_blocklist':
			if ( ! is_array( $value ) ) {
				$value = array( $value );
			}
			return array_map( 'sanitize_text_field', $value );
		case 'email':
			return sanitize_email( $value );
		case 'url':
			return esc_url_raw( $value );
		case 'number':
			return intval( $value );
		case 'ip_blocklist':
			return burst_sanitize_ip_field( $value );
		default:
			return sanitize_text_field( $value );
	}
}

function burst_sanitize_ip_field( $value ) {
    if ( ! burst_user_can_manage() ) {
        return false;
    }

    $ips = explode( PHP_EOL, $value );
    $ips = array_map( 'trim', $ips ); // remove whitespace
    $ips = array_filter( $ips ); // remove empty lines
    $ips = array_unique( $ips ); // remove duplicates
    $ips = array_map( 'sanitize_text_field', $ips ); // sanitize each ip
    return implode( PHP_EOL, $ips );
}

/**
 * Get user roles for the settings page in Burst
 *
 * @return array
 */

function burst_get_user_roles(): array {
    if ( !burst_user_can_manage() ) {
        return [];
    }

    global $wp_roles;
    return $wp_roles->get_names();
}