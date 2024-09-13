<?php
defined( 'ABSPATH' ) or die( 'you do not have access to this page!' );
/**
 * Add a script to the blocked list
 * @param array $tags
 *
 * @return array
 */
function burst_cmplz_script( $tags ): array {
    //if wp consent api is active, let it handle the integration
    if ( function_exists('wp_has_consent') ) {
        return $tags;
    }

	//if cookieless tracking enabled, do not block.
	if ( burst_get_option('enable_cookieless_tracking') ) {
		return $tags;
	}

	//if added  by complianz, remove it
	foreach ($tags as $index => $tag) {
		if (isset($tag['name']) && $tag['name'] === 'burst') {
			unset($tags[$index]);
			break;
		}
	}

	$tags[] = array(
		'name' => 'burst',
		'category' => 'statistics',
		'urls' => array(
			'assets/js/build/burst.js',
			'assets/js/build/burst.min.js',
		),
		'enable_placeholder' => '0',
		'enable_dependency' => '0',
	);

	return $tags;
}
add_filter( 'cmplz_known_script_tags', 'burst_cmplz_script', 20 );

/**
 * No need for complianz integration anymore
 *
 * @return void
 */
function burst_remove_complianz_integration(){
	remove_action( 'wp_enqueue_scripts', 'cmplz_burst_statistics_activate_burst',PHP_INT_MAX );
}
add_action('init', 'burst_remove_complianz_integration');
