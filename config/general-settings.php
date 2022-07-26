<?php
defined( 'ABSPATH' ) or die( "you do not have access to this page!" );

add_filter('burst_fields', 'burst_add_general_settings');
function burst_add_general_settings($fields){
	$fields = $fields + array(
            'enable_cookieless_tracking' => array(
	            'source'   => 'settings',
	            'step'     => 'general',
	            'type'    => 'checkbox',
	            'label'   => __( "Enable Cookieless tracking", 'burst-statistics' ),
	            'default' => false,
	            'table'   => true,
            ),
            'type_of_tracking' => array(
	            'source'   => 'settings',
	            'step'     => 'general',
	            'type'    => 'radio',
	            'label'   => __( "Select tracking mode", 'burst-statistics' ),
	            'options' => array(
		            'accurate'  => __( 'Most accurate data', 'burst-statistics' ),
					'balanced' => __( 'Balanced', 'burst-statistics' ),
		            'fast' => __( 'Best page speed', 'burst-statistics' ),
	            ),
	            'default' => 'accurate',
	            'table'   => true,
            ),
	);
	return $fields;
}
