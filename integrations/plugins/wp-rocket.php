<?php
defined( 'ABSPATH' ) or die();

/**
 * Excludes some Uncode inline scripts from combine JS
 *
 * @since 3.1
 * @author Remy Perona
 *
 * @param array $inline_js Array of patterns to match for exclusion.
 * @return array
 */
function burst_exclude_inline_js( $inline_js ) {
    $inline_js[] = 'burst';

    return $inline_js;
}
add_filter( 'rocket_excluded_inline_js_content', 'burst_exclude_inline_js' );

/**
 * Excludes Uncode init and ai-uncode JS files from minification/combine
 *
 * @since 3.1
 * @author Remy Perona
 *
 * @param array $excluded_js Array of JS filepaths to be excluded.
 * @return array
 */
function burst_exclude_js( $excluded_js ) {
    $excluded_js[] = rocket_clean_exclude_file( burst_url . 'assets/js/burst.js' );
    $excluded_js[] = rocket_clean_exclude_file( burst_url . 'assets/js/burst.min.js' );

    return $excluded_js;
}
add_filter( 'rocket_exclude_js', 'burst_exclude_js' );