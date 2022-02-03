<?php

/**
 * Add a script to the blocked list
 * @param array $tags
 *
 * @return array
 */
function burst_complianz_script( $tags ) {
	$tags[] = array(
		'name' => 'burst',
		'category' => 'statistics',
		'urls' => array(
			'assets/js/burst.js',
			'assets/js/burst.min.js',
		),
		'enable_placeholder' => '0',
		'enable_dependency' => '0',
	);

	return $tags;
}
add_filter( 'cmplz_known_script_tags', 'burst_complianz_script' );