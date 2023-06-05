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
function burst_fix_rest_url_for_wpml( $url, $path, $blog_id, $scheme ) {
	if ( strpos( $url, 'burst/v' ) === false ) {
		return $url;
	}
	$current_language = false;
	if ( function_exists( 'icl_register_string' ) ) {
		$current_language = apply_filters( 'wpml_current_language', null );
	}

	if ( function_exists( 'qtranxf_getLanguage' ) ) {
		$current_language = qtranxf_getLanguage();
	}

	if ( $current_language ) {
		if ( strpos( $url, '/' . $current_language . '/wp-json/' ) ) {
			$url = str_replace( '/' . $current_language . '/wp-json/', '/wp-json/', $url );
		}
	}

	return $url;
}

add_filter( 'rest_url', 'burst_fix_rest_url_for_wpml', 10, 4 );
/**
 * WordPress doesn't allow for translation of chunks resulting of code splitting.
 * Several workarounds have popped up in JetPack and Woocommerce: https://developer.wordpress.com/2022/01/06/wordpress-plugin-i18n-webpack-and-composer/
 * Below is mainly based on the Woocommerce solution, which seems to be the most simple approach. Simplicity is king here.
 *
 * @return array
 */
function burst_get_chunk_translations($path) {
	//get all files from the settings/build folder
	$files = scandir(burst_path . 'settings/build');
	$json_translations = [];
	foreach ($files as $file) {
		$chunk_handle = 'burst-chunk-'.$file;
		//temporarily register the script, so we can get a translations object.
		wp_register_script( $chunk_handle, plugins_url('build/'.$file, __FILE__), [], true );
		$localeData = load_script_textdomain( $chunk_handle, 'burst-statistics', $path );
		if (!empty($localeData)){
			$json_translations[] = $localeData;
		}
		wp_deregister_script( $chunk_handle );
	}
	return $json_translations;
}

function burst_plugin_admin_scripts() {
	$script_asset_path = __DIR__ . "/build/index.asset.php";
	$script_asset      = require( $script_asset_path );
	wp_enqueue_script(
		'burst-settings',
		plugins_url( 'build/index.js', __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);
	$path = defined('burst_pro') ? burst_path.'languages' : false;
	wp_set_script_translations( 'burst-settings', 'burst-statistics', $path );

	wp_localize_script(
		'burst-settings',
		'burst_settings',
		apply_filters( 'burst_localize_script', array(
			'json_translations'       => burst_get_chunk_translations($path),
			'menu'                    => burst_menu(),
			'site_url'                => get_rest_url(),
			'admin_ajax_url'          => add_query_arg( array( 'action' => 'burst_rest_api_fallback' ), admin_url('admin-ajax.php')),
			'dashboard_url'           => add_query_arg( [ 'page' => 'burst' ], burst_admin_url() ),
			'upgrade_link'            => is_multisite() ? 'https://burst-statistics.com/pricing/?src=burst-plugin' : 'https://burst-statistics.com/pricing/?src=burst-plugin',
			'plugin_url'              => burst_url,
			'network_link'            => network_site_url( 'plugins.php' ),
			'is_pro'                  => burst_is_pro(),
			'networkwide_active'      => ! is_multisite(),//true for single sites and network wide activated
			'nonce'                   => wp_create_nonce( 'wp_rest' ),//to authenticate the logged in user
			'burst_nonce'             => wp_create_nonce( 'burst_nonce' ),
			'current_ip'              => burst_get_ip_address(),
			'user_roles'              => burst_get_user_roles(),
			'date_ranges'             => burst_get_date_ranges(),
			'date_format'             => get_option( 'date_format' ),
			'tour_shown'              => burst_get_option( 'burst_tour_shown_once' ),
			'gmt_offset'              => get_option( 'gmt_offset' ),
			'goals_information_shown' => (int) get_option( 'burst_goals_information_shown' ),
		) )
	);
}

/**
 * If the rest api is blocked, the code will try an admin ajax call as fall back.
 *
 * @return void
 */
function burst_rest_api_fallback()
{
	$response = [];
	$error = $action = $do_action = $data = $data_type = false;
	if ( !burst_user_can_manage() ) {
		$error = true;
	}

	//if the site is using this fallback, we want to show a notice
	update_option('burst_ajax_fallback_active', time(), false);
	if ( isset($_GET['rest_action']) ) {
		$action = sanitize_text_field($_GET['rest_action']);
		if (strpos($action, 'burst/v1/data/') !== false) {
			$data_type = strtolower(str_replace('burst/v1/data/', '', $action));
		}
	}

	$requestData = json_decode(file_get_contents('php://input'), true);
	if ($requestData) {
		$action = $requestData['path'] ?? false;

		$action = sanitize_text_field($action);
		$data = $requestData['data'] ?? false;
		if (strpos($action, 'burst/v1/do_action/') !== false) {
			$do_action = strtolower(str_replace('burst/v1/do_action/', '', $action));
		}
	}

	$request = new WP_REST_Request();
	$args = ['type','nonce','date_start','date_end', 'args', 'search'];
	foreach ($args as $arg){
        if (isset($_GET[ $arg ])) {
	        $request->set_param($arg, stripcslashes($_GET[ $arg ]));
        }
	}

	if ( !$error ) {
		if (strpos($action, '/fields/get') !== false) {
			$response = burst_rest_api_fields_get($request);
		} else if (strpos($action, '/fields/set') !== false) {
			$response = burst_rest_api_fields_set( $request, $data);
        } else if (strpos($action, '/options/set') !== false) {
			$response = burst_rest_api_options_set( $request, $data);
		} else if (strpos($action, '/goals/get') !==false ) {
			$response = burst_rest_api_goals_get($request);
        } else if (strpos($action, '/goals/add') !==false ) {
			$response = burst_rest_api_goals_add($request, $data);
		} else if (strpos($action, '/goals/delete') !==false ) {
			$response = burst_rest_api_goals_delete($request, $data);
        } else if (strpos($action, '/goal_fields/get') !==false ) {
			$response = burst_rest_api_goal_fields_get($request);
        } else if (strpos($action, '/goal_fields/set') !==false ) {
			$response = burst_rest_api_goal_fields_set($request, $data);
        } else if (strpos($action, '/posts/') !==false ) {
			$response = burst_get_posts($request, $data);
		} else if (strpos($action, '/data/')){
            $request->set_param('type', $data_type);
			$response = burst_get_data($request);
		} else if ($do_action) {
			$request = new WP_REST_Request();
			$request->set_param('action', $do_action);
			$response = burst_do_action($request, $data);
		}
	}

	header("Content-Type: application/json");
	echo json_encode($response);
	exit;
}
add_action('wp_ajax_burst_rest_api_fallback', 'burst_rest_api_fallback');

function burst_add_option_menu() {
	if ( ! burst_user_can_view() ) {
		return;
	}

	$menu_label    = __( 'Statistics', 'burst-statistics' );
	$warnings      = BURST()->notices->count_plusones( array( 'plus_ones' => true ) );
	$warning_title = esc_attr( burst_sprintf( '%d plugin warnings', $warnings ) );
	if ( $warnings > 0 ) {
		$warning_title .= ' ' . esc_attr( burst_sprintf( '(%d plus ones)', $warnings ) );
		$menu_label    .=
			"<span class='update-plugins count-$warnings' title='$warning_title'>
			<span class='update-count'>
				" . number_format_i18n( $warnings ) . "
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

function burst_remove_fallback_notice()
{
	if (get_option('burst_ajax_fallback_active') !== false) {
		delete_option('burst_ajax_fallback_active');
	}
}
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
	register_rest_route( 'burst/v1', 'menu', array(
		'methods'             => 'GET',
		'callback'            => 'burst_rest_api_menu',
		'permission_callback' => function() {
			return burst_user_can_manage();
		},
	) );

	// setOption
	register_rest_route( 'burst/v1', 'options/set', array(
		'methods'             => 'POST',
		'callback'            => 'burst_rest_api_options_set',
		'permission_callback' => function() {
			return burst_user_can_manage();
		},
	) );

	register_rest_route( 'burst/v1', 'fields/get', array(
		'methods'             => 'GET',
		'callback'            => 'burst_rest_api_fields_get',
		'permission_callback' => function() {
			return burst_user_can_manage();
		},
	) );

	register_rest_route( 'burst/v1', 'fields/set', array(
		'methods'             => 'POST',
		'callback'            => 'burst_rest_api_fields_set',
		'permission_callback' => function() {
			return burst_user_can_manage();
		},
	) );

	register_rest_route( 'burst/v1', 'goals/get', array(
		'methods'             => 'GET',
		'callback'            => 'burst_rest_api_goals_get',
		'permission_callback' => function() {
			return burst_user_can_view();
		},
	) );

	register_rest_route( 'burst/v1', 'goals/delete', array(
		'methods'             => 'POST',
		'callback'            => 'burst_rest_api_goals_delete',
		'permission_callback' => function() {
			return burst_user_can_manage();
		},
	) );

	register_rest_route( 'burst/v1', 'goals/add', array(
		'methods'             => 'POST',
		'callback'            => 'burst_rest_api_goals_add',
		'permission_callback' => function() {
			return burst_user_can_manage();
		},
	) );

	register_rest_route( 'burst/v1', 'goal_fields/get', array(
		'methods'             => 'GET',
		'callback'            => 'burst_rest_api_goal_fields_get',
		'permission_callback' => function() {
			return burst_user_can_manage();
		},
	) );

	register_rest_route( 'burst/v1', 'goal_fields/set', array(
		'methods'             => 'POST',
		'callback'            => 'burst_rest_api_goal_fields_set',
		'permission_callback' => function() {
			return burst_user_can_manage();
		},
	) );

	register_rest_route( 'burst/v1', 'data/(?P<type>[a-z\_\-]+)', array(
		'methods'             => 'GET',
		'callback'            => 'burst_get_data',
		'permission_callback' => function() {
			return burst_user_can_view();
		},
	) );

	register_rest_route( 'burst/v1', 'do_action/(?P<action>[a-z\_\-]+)', array(
		'methods'             => 'POST',
		'callback'            => 'burst_do_action',
		'permission_callback' => function() {
			return burst_user_can_view();
		},
	) );

	register_rest_route( 'burst/v1', '/posts/', array(
		'methods'             => 'GET',
		'callback'            => 'burst_get_posts',
		'args'                => array(
			'search_input' => array(
				'required'          => false,
				'sanitize_callback' => 'sanitize_title',
			),
		),
		'permission_callback' => function() {
			return burst_user_can_view();
		},
	) );
}


/**
 * @param WP_REST_Request $request
 *
 * @return WP_REST_Response | WP_Error
 */
function burst_do_action( $request, $ajax_data = false ) {
	if ( ! burst_user_can_manage() ) {
		return new WP_Error( 'rest_forbidden', 'You do not have permission to perform this action.', array( 'status' => 403 ) );
	}
	$action = sanitize_title( $request->get_param( 'action' ) );
	$data   = $ajax_data ?: $request->get_params();
	$nonce  = $data['nonce'];
	if ( ! wp_verify_nonce( $nonce, 'burst_nonce' ) ) {
		return new WP_Error( 'rest_invalid_nonce', 'The provided nonce is not valid.', array( 'status' => 400 ) );
	}

	$data = $data['action_data'];
    if ( !$ajax_data ){
	    burst_remove_fallback_notice();
    }

	switch ( $action ) {
		case 'plugin_actions':
			$data = burst_plugin_actions( $request, $data);
			break;
		case 'notices':
			$data = BURST()->notices->get();
			break;
		case 'dismiss_task':
			$data = BURST()->notices->dismiss_notice($data);
			break;
		case 'otherpluginsdata':
			$data = burst_other_plugins_data();
			break;
		case 'tracking':
			$data = BURST()->endpoint->get_tracking_status_and_time();
			break;
		default:
			$data = apply_filters( "burst_do_action", [], $action, $data );
	}

	return new WP_REST_Response( array( 'data' => $data, 'request_success' => true ), 200 );
}

/**
 * Process plugin installation or activation actions
 *
 * @param WP_REST_Request $request
 *
 * @return array
 */

function burst_plugin_actions( $request, $data ) {
	if ( ! burst_user_can_manage() ) {
		return [];
	}
	$slug      = sanitize_title( $data['slug'] );
	$action    = sanitize_title( $data['pluginAction'] );
	$installer = new burst_installer( $slug );
	if ( $action === 'download' ) {
		$installer->download_plugin();
	} else if ( $action === 'activate' ) {
		$installer->activate_plugin();
	}

	return burst_other_plugins_data( $slug );
}

/**
 * Get plugin data for other plugin section
 *
 * @param string $slug
 *
 * @return array
 */
function burst_other_plugins_data( $slug = false ) {
	if ( ! burst_user_can_view() ) {
		return [];
	}
	$plugins = array(
		[
			'slug'          => 'burst-statistics',
			'constant_free' => 'burst_version',
			'constant_pro' => 'burst_pro',
			'wordpress_url' => 'https://wordpress.org/plugins/burst-statistics/',
			'upgrade_url'   => 'https://burst-statistics.com/?src=burst-plugin',
			'title'         => 'Burst Statistics - ' . __( "Self-hosted, Privacy-friendly analytics tool.", "burst-statistics" ),
		],
		[
			'slug'             => 'complianz-gdpr',
			'constant_free'    => 'cmplz_plugin',
			'constant_pro' => 'cmplz_premium',
			'wordpress_url'    => 'https://wordpress.org/plugins/complianz-gdpr/',
			'upgrade_url'      => 'https://complianz.io/pricing?src=burst-plugin',
			'title'            => __( "Complianz Privacy Suite - Cookie Consent Management as it should be", "burst-statistics" ),
		],
		[
			'slug'          => 'complianz-terms-conditions',
			'constant_free' => 'cmplz_tc_version',
			'wordpress_url' => 'https://wordpress.org/plugins/complianz-terms-conditions/',
			'upgrade_url'   => 'https://complianz.io?src=burst-plugin',
			'title'         => 'Complianz - ' . __( "Terms and Conditions", "burst-statistics" ),
		],
	);

	foreach ( $plugins as $index => $plugin ) {
		$installer = new burst_installer( $plugin['slug'] );
		if ( isset( $plugin['constant_pro'] ) && defined( $plugin['constant_pro'] ) ) {
			$plugins[ $index ]['pluginAction'] = 'installed';
		} else if ( ! $installer->plugin_is_downloaded() && ! $installer->plugin_is_activated() ) {
			$plugins[ $index ]['pluginAction'] = 'download';
		} else if ( $installer->plugin_is_downloaded() && ! $installer->plugin_is_activated() ) {
			$plugins[ $index ]['pluginAction'] = 'activate';
		} else {
			if ( isset( $plugin['constant_pro'] ) ) {
				$plugins[ $index ]['pluginAction'] = 'upgrade-to-pro';
			} else {
				$plugins[ $index ]['pluginAction'] = 'installed';
			}
		}
	}

	if ( $slug ) {
		foreach ( $plugins as $plugin ) {
			if ( $plugin['slug'] === $slug ) {
				return $plugin;
			}
		}
	}

	return $plugins;

}

/**
 * @param WP_REST_Request $request
 *
 * @return WP_Error | WP_REST_Response
 */
function burst_get_data( WP_REST_Request $request ) {
	if ( ! burst_user_can_view() ) {
		return new WP_Error( 'rest_forbidden', 'You do not have permission to perform this action.', array( 'status' => 403 ) );
	}

	$nonce  = $request->get_param( 'nonce' );
	if ( ! wp_verify_nonce( $nonce, 'burst_nonce' ) ) {
		return new WP_Error( 'rest_invalid_nonce', 'The provided nonce is not valid.', array( 'status' => 400 ) );
	}

	$type            = sanitize_title( $request->get_param( 'type' ) );
	$args            = [
		'date_start' => BURST()->statistics->convert_date_to_utc( $request->get_param( 'date_start' ) . ' 00:00:00' ),
		// add 00:00:00 to date,
		'date_end'   => BURST()->statistics->convert_date_to_utc( $request->get_param( 'date_end' ) . ' 23:59:59' ),
		// add 23:59:59 to date
	];
	$request_args    = json_decode( $request->get_param( 'args' ), true );
	$args['metrics'] = $request_args['metrics'] ?? [];
	$args['filters'] = burst_sanitize_filters( $request_args['filters'] ?? [] );
	switch ( $type ) {
		case 'live-visitors':
			$data = BURST()->statistics->get_live_visitors_data();
			break;
		case 'today':
			$data = BURST()->statistics->get_today_data( $args );
			break;
		case 'goals':
			$args['goal_id'] = $request_args['goal_id'] ?? 0;
			$data            = BURST()->goal_statistics->get_goals_data( $args );
			break;
		case 'live-goals':
			$args['goal_id'] = $request_args['goal_id'] ?? 0;
			$data = BURST()->goal_statistics->get_live_goals_data( $args );
			break;
		case 'insights':
			$data = BURST()->statistics->get_insights_data( $args );
			break;
		case 'compare':
            if (isset($args['filters']['goal_id'])) {
                $data = BURST()->statistics->get_compare_goals_data( $args );
            } else {
                $data = BURST()->statistics->get_compare_data( $args );
            }
			break;
		case 'devices':
            unset($args['filters']['goal_id']);
			$data = BURST()->statistics->get_devices_data( $args );
			break;
		case 'pages':
			$data = BURST()->statistics->get_pages_data( $args );
			break;
		case 'referrers':
			$data = BURST()->statistics->get_referrers_data( $args );
			break;
		default:
			$data = apply_filters( "burst_get_data", [], $type, $request );
	}

	return new WP_REST_Response( array( 'data' => $data, 'request_success' => true ), 200 );
}


function burst_rest_api_options_set( $request, $ajax_data ){
	if ( ! burst_user_can_manage() ) {
		return new WP_Error( 'rest_forbidden', 'You do not have permission to perform this action.', array( 'status' => 403 ) );
	}
	 $data = $ajax_data ?: $request->get_json_params();

	//get the nonce
	$nonce = $data['nonce'];
	$options = $data['option'];
	if ( ! wp_verify_nonce( $nonce, 'burst_nonce' ) ) {
		return new WP_Error( 'rest_invalid_nonce', 'The provided nonce is not valid.', array( 'status' => 400 ) );
	}

	// sanitize the options
	$option = sanitize_title( $options['option'] );
	$value  = sanitize_text_field( $options['value'] );

	// option should be prefixed with burst_, if not add it
	if ( strpos( $option, 'burst_' ) !== 0 ) {
		$option = 'burst_' . $option;
	}
	update_option($option, $value);

	return new WP_REST_Response( array( 'status' => 'success', 'request_success' => true ), 200 );

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
 * @return WP_ERROR|WP_REST_Response
 */
function burst_rest_api_fields_set( $request, $ajax_data = false ) {
	if ( ! burst_user_can_manage() ) {
		return new WP_Error( 'rest_forbidden', 'You do not have permission to perform this action.', array( 'status' => 403 ) );
	}

	$data = $ajax_data ?: $request->get_json_params();
	if (!$ajax_data){
		burst_remove_fallback_notice();
	}
	//get the nonce
	$nonce  = $data[ 'nonce' ];
	$fields  = $data[ 'fields' ];

	if ( ! wp_verify_nonce( $nonce, 'burst_nonce' ) ) {
		return new WP_Error( 'rest_invalid_nonce', 'The provided nonce is not valid.', array( 'status' => 400 ) );
	}

	$config_fields = burst_fields( false );
	$config_ids    = array_column( $config_fields, 'id' );
	foreach ( $fields as $index => $field ) {
		$config_field_index = array_search( $field['id'], $config_ids );
		$config_field       = $config_fields[ $config_field_index ];
		if ( ! $config_field_index ) {
			error_log( "Burst Statistics: unsetting " . $field['id'] . " as not existing field in BURST " );
			unset( $fields[ $index ] );
			continue;
		}
		$type     = burst_sanitize_field_type( $field['type'] );
		$field_id = sanitize_text_field( $field['id'] );
		$value    = burst_sanitize_field( $field['value'], $type, $field_id );
		//if an endpoint is defined, we use that endpoint instead
		if ( isset( $config_field['data_endpoint'] ) ) {
			//the updateItemId allows us to update one specific item in a field set.
			$update_item_id = isset( $field['updateItemId'] ) ? $field['updateItemId'] : false;
			$action         = isset( $field['action'] ) && $field['action'] === 'delete' ? 'delete' : 'update';
			$endpoint       = $config_field['data_endpoint'];
			if ( is_array( $endpoint ) ) {
				$main     = $endpoint[0];
				$class    = $endpoint[1];
				$function = $endpoint[2];
				if ( function_exists( $main ) ) {
					$main()->$class->$function( $value, $update_item_id, $action );
				}
			} else if ( function_exists( $endpoint ) ) {
				$endpoint( $value, $update_item_id, $action );
			}

			unset( $fields[ $index ] );
			continue;
		}

		$field['value']   = $value;
		$fields[ $index ] = $field;
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
	do_action( 'burst_after_saved_fields', $fields );

	$response_data = [
		'success'  => true,
		'request_success' => true,
		'progress' => BURST()->notices->get(),
		'fields'   => burst_fields( true ),
	];

	return new WP_REST_Response( $response_data, 200 );
}

/**
 * Update a burst option
 *
 * @param string $name
 * @param mixed  $value
 *
 * @return void
 */

function burst_update_option( $name, $value ) {
	if ( ! burst_user_can_manage() && ! wp_doing_cron() ) {
		return;
	}

	$config_fields      = burst_fields( false );
	$config_ids         = array_column( $config_fields, 'id' );
	$config_field_index = array_search( $name, $config_ids );
	$config_field       = $config_fields[ $config_field_index ];
	if ( $config_field_index === false ) {
		error_log( "Burst Statistics: exiting " . $name . " as not existing field in burst " );
		return;
	}

	$type = isset( $config_field['type'] ) ? $config_field['type'] : false;
	if ( ! $type ) {
		error_log( "Burst Statistics: exiting " . $name . " has not existing type " );

		return;
	}
	$options = get_option( 'burst_options_settings', [] );
	if ( ! is_array( $options ) ) {
		$options = [];
	}
	$prev_value       = $options[ $name ] ?? false;
	$name             = sanitize_text_field( $name );
	$type             = burst_sanitize_field_type( $config_field['type'] );
	$value            = burst_sanitize_field( $value, $type, $name );
	$value            = apply_filters( "burst_fieldvalue", $value, sanitize_text_field( $name ), $type );
	$options[ $name ] = $value;
	update_option( 'burst_options_settings', $options );
	do_action( "burst_after_save_field", $name, $value, $prev_value, $type );
}

/**
 * Get the rest api fields
 * @return WP_ERROR | WP_REST_Response
 */

function burst_rest_api_fields_get($request) {

	if ( ! burst_user_can_manage() ) {
		return new WP_Error( 'rest_forbidden', 'You do not have permission to perform this action.', array( 'status' => 403 ) );
	}

	$nonce  = $request->get_param( 'nonce' );
	if ( ! wp_verify_nonce( $nonce, 'burst_nonce' ) ) {
		return new WP_Error( 'rest_invalid_nonce', 'The provided nonce is not valid.', array( 'status' => 400 ) );
	}

	$output = array();
	$fields = burst_fields();
	$menu   = burst_menu();
	foreach ( $fields as $index => $field ) {
		/**
		 * Load data from source
		 */
		if ( isset( $field['data_source'] ) ) {
			$data_source = $field['data_source'];
			if ( is_array( $data_source ) ) {
				$main           = $data_source[0];
				$class          = $data_source[1];
				$function       = $data_source[2];
				$field['value'] = [];
				if ( function_exists( $main ) ) {
					$field['value'] = $main()->$class->$function();
				}
			} else if ( function_exists( $field['data_source'] ) ) {
				$func           = $field['data_source'];
				$field['value'] = $func();
			}
		}

		$fields[ $index ] = $field;
	}

	//remove empty menu items
	foreach ( $menu as $key => $menu_group ) {
		$menu_group['menu_items'] = burst_drop_empty_menu_items( $menu_group['menu_items'], $fields );
		$menu[ $key ]             = $menu_group;
	}

	$output['fields']   = $fields;
	$output['request_success']   = true;
	$output['progress'] = BURST()->notices->get();

	$output = apply_filters( 'burst_rest_api_fields_get', $output );
	return new WP_REST_Response( $output, 200 );
}

function burst_rest_api_goals_get($request) {
	if ( ! burst_user_can_manage() ) {
		return new WP_Error( 'rest_forbidden', 'You do not have permission to perform this action.', array( 'status' => 403 ) );
	}

	$nonce  = $request->get_param( 'nonce' );
	if ( ! wp_verify_nonce( $nonce, 'burst_nonce' ) ) {
		return new WP_Error( 'rest_invalid_nonce', 'The provided nonce is not valid.', array( 'status' => 400 ) );
	}

	$goals = BURST()->goals->get_goals();
	$goals = apply_filters( 'burst_rest_api_goals_get', $goals );
	return new WP_REST_Response( ['request_success' => true, 'goals' => $goals], 200 );
}

/**
 * Get the rest api fields
 * @return \WP_Error | \WP_REST_Response
 */

function burst_rest_api_goal_fields_get($request) {
	if ( ! burst_user_can_manage() ) {
		return new WP_Error( 'rest_forbidden', 'You do not have permission to perform this action.', array( 'status' => 403 ) );
	}

	$goal_fields = [];
	$fields      = burst_goal_fields();
	$goals       = BURST()->goals->get_goals();

	$nonce  = $request->get_param( 'nonce' );
	if ( ! wp_verify_nonce( $nonce, 'burst_nonce' ) ) {
		return new WP_Error( 'rest_invalid_nonce', 'The provided nonce is not valid.', array( 'status' => 400 ) );
	}

	// loop through goals and add the fields and get field values
	foreach ( $goals as $goal_id => $goal ) {

		// add fields to every goal
		$goal_fields[ $goal_id ] = $fields;
		$goal_values                = BURST()->goals->get_goal_field_values( $goal_id );
		// loop through fields and set values
		foreach ( $goal_fields[ $goal_id ] as $field_id => $field ) {
			$field_value                                      = isset( $goal_values[ $field_id ] ) ? $goal_values[ $field_id ] : '';
			$default_value                                    = isset( $fields[ $field_id ]['default'] ) ? $fields[ $field_id ]['default'] : '';
			$goal_fields[ $goal_id ][ $field_id ]['value'] = $field_value !== '' ? $field_value : $default_value;
		}
	}

	$goal_fields = apply_filters( 'burst_rest_api_goal_fields_get', $goal_fields );
	$response      = new WP_REST_Response( ['request_success' => true, 'goal_fields' => $goal_fields ] );
	$response->set_status( 200 );

	return $response;
}


/**
 * @param WP_REST_Request $request
 *
 * @return WP_REST_Response | WP_Error
 */
function burst_rest_api_goal_fields_set( $request, $ajax_data = false ) {
	if ( ! burst_user_can_manage() ) {
		return new WP_Error( 'rest_forbidden', 'You do not have permission to perform this action.', array( 'status' => 403 ) );
	}
	$data = $ajax_data ?:$request->get_json_params();
	$nonce  = $data[ 'nonce' ];
	$goals  = $data[ 'fields' ];
	//get the nonce
	if ( ! wp_verify_nonce( $nonce, 'burst_nonce' ) ) {
		return new WP_Error( 'rest_invalid_nonce', 'The provided nonce is not valid.', array( 'status' => 400 ) );
	}

	$saved_goal_ids = [];
	foreach ( $goals as $index => $goal ) {
		$id = (int) $goal['id'];
		unset( $goal['id'] );

		$set = BURST()->goals->set_goal_field_values( $id, $goal );
		// if not null add to saved goal ids
		if ( $set !== null ) {
			$saved_goal_ids[] = $id;
		}
	}
	$response = new WP_REST_Response( array( 'saved_goal_ids' => $saved_goal_ids, 'request_success' => true ) );
	$response->set_status( 200 );

	return $response;
}

/**
 * @param WP_REST_Request $request
 *
 * @return WP_REST_Response | WP_Error
 */
function burst_rest_api_goals_delete( $request, $ajax_data = false ) {
	if ( ! burst_user_can_manage() ) {
		return new WP_Error( 'rest_forbidden', 'You do not have permission to perform this action.', array( 'status' => 403 ) );
	}
	$data = $ajax_data ?: $request->get_json_params();
	$nonce  = $data[ 'nonce' ];
	if ( ! wp_verify_nonce( $nonce, 'burst_nonce' ) ) {
		return new WP_Error( 'rest_invalid_nonce', 'The provided nonce is not valid.', array( 'status' => 400 ) );
	}
	$id  = $data[ 'id' ];
	$deleted = BURST()->goals->delete( $id );

	// if not null return true
	$response_data = array( 'deleted' => $deleted !== null, 'request_success' => true );
	$response      = new WP_REST_Response( $response_data );
	$response->set_status( 200 );

	return $response;
}

/**
 * @param WP_REST_Request $request
 *
 * @return WP_REST_Response|WP_Error $response
 */

function burst_rest_api_goals_add( $request, $ajax_data = false ) {
	if ( ! burst_user_can_manage() ) {
		return new WP_Error( 'rest_forbidden', 'You do not have permission to perform this action.', array( 'status' => 403 ) );
	}
	$goal = $ajax_data ?: $request->get_json_params();

	if ( ! wp_verify_nonce( $goal['nonce'], 'burst_nonce' ) ) {
		return new WP_Error( 'rest_invalid_nonce', 'The provided nonce is not valid.', array( 'status' => 400 ) );
	}

	$goal    = BURST()->goals->set([], 'insert');
	$response      = new WP_REST_Response( ['request_success' => true, 'goal' => $goal] );
	$response->set_status( 200 );

	return $response;
}

/**
 * @param WP_REST_Request $request
 *
 * @return WP_REST_Response | WP_Error
 */
function burst_rest_api_menu($request) {
	if ( ! burst_user_can_manage() ) {
		return new WP_Error( 'rest_forbidden', 'You do not have permission to perform this action.', array( 'status' => 403 ) );
	}

	return burst_menu();
}

/**
 * Checks if there are field linked to menu_item if not removes menu_item from menu_item array
 *
 * @param $menu_items
 * @param $fields
 *
 * @return array
 */
function burst_drop_empty_menu_items( $menu_items, $fields ) {
	if ( ! burst_user_can_manage() ) {
		return $menu_items;
	}
	$new_menu_items = $menu_items;
	foreach ( $menu_items as $key => $menu_item ) {
		$searchResult = array_search( $menu_item['id'], array_column( $fields, 'menu_id' ) );
		if ( $searchResult === false ) {
			unset( $new_menu_items[ $key ] );
			//reset array keys to prevent issues with react
			$new_menu_items = array_values( $new_menu_items );
		} else {
			if ( isset( $menu_item['menu_items'] ) ) {
				$updatedValue                         = burst_drop_empty_menu_items( $menu_item['menu_items'], $fields );
				$new_menu_items[ $key ]['menu_items'] = $updatedValue;
			}
		}
	}

	return $new_menu_items;
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
			return (int) $value;
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
			return (int) $value;
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
	if ( ! burst_user_can_manage() ) {
		return [];
	}

	global $wp_roles;

	return $wp_roles->get_names();
}

function burst_get_posts( $request, $ajax_data = false ) {
	if ( ! burst_user_can_view() ) {
		return new WP_Error( 'rest_forbidden', 'You do not have permission to perform this action.', array( 'status' => 403 ) );
	}
	global $wpdb;
	$data = $ajax_data ?:$request->get_params();
	$nonce = $data['nonce'];
	if ( ! wp_verify_nonce( $nonce, 'burst_nonce' ) ) {
		return new WP_Error( 'rest_invalid_nonce', 'The provided nonce is not valid.', array( 'status' => 400 ) );
	}

	if ( $data['search'] !== '' ) {
		$search = sanitize_text_field($data['search']);
		$sql    = "SELECT page_url, page_id, count(*) as pageviews FROM {$wpdb->prefix}burst_statistics WHERE bounce = 0 AND page_url LIKE '%$search%' GROUP BY page_url ORDER BY pageviews DESC LIMIT 10";
	} else {
		// get the most viewed posts from wp_burst_statistics
		$sql = "SELECT page_url, page_id, count(*) as pageviews FROM {$wpdb->prefix}burst_statistics WHERE bounce = 0 GROUP BY page_url ORDER BY pageviews DESC LIMIT 10";
	}

	$posts = $wpdb->get_results( $sql, 'ARRAY_A' );
	// get the post title from wp_posts
	foreach ( $posts as $key => $post ) {
		$post_id                     = $post['page_id'];
		$post_title                  = get_the_title( $post_id );
		$posts[ $key ]['post_title'] = $post_title;
	}

	//$sql = "SELECT ID, post_title FROM $wpdb->posts WHERE post_type = 'post' AND post_status = 'publish' ORDER BY post_title ASC";
	if ( ! empty( $posts ) ) {
		return new WP_REST_Response( ['request_success' => true, 'posts' => $posts], 200 );
	}

	return new WP_REST_Response( ['request_success' => true, 'posts' => []], 200 );
}

