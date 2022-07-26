<?php defined( 'ABSPATH' ) or die( "you do not have access to this page!" );
/**
 * Register rest routes
 * @return void
 */
function burst_register_rest_routes() {
	register_rest_route( 'burst/v1', 'hit', array(
		'methods'             => 'POST',
		'callback'            => 'burst_track_hit',
		'permission_callback' => '__return_true',
	) );
	register_rest_route( 'burst/v1', 'update', array(
		'methods'             => 'POST',
		'callback'            => 'burst_update_track_hit',
		'permission_callback' => '__return_true',
	) );
}
add_action( 'rest_api_init', 'burst_register_rest_routes' );