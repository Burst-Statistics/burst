<?php
defined( 'ABSPATH' ) or die( "you do not have access to this page!" );

add_filter('burst_fields', 'burst_add_general_settings');
function burst_add_general_settings($fields){
	$fields = $fields + array(
            'enable_cookieless_tracking' => array(
                'source'   => 'settings',
                'step'     => 'general',
                'type'    => 'checkbox',
                'label'   => __( "Enable Cookieless tracking", 'burst' ),
                'default' => false,
                'table'   => true,
            ),
	);
	return $fields;
}
