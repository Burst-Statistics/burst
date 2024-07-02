<?php
defined( 'ABSPATH' ) or die( 'you do not have access to this page!' );

/**

 * Delete burst_total_pageviews_count meta when duplicating a product
 *
 * @param $duplicate
 *
 * @return void
 * @hooked woocommerce_product_duplicate
 */
function burst_delete_post_pageviews_on_duplicate_product( $duplicate = null ) {
	if ( ! $duplicate ) {
		return;
	}
	$id = $duplicate->get_id();
	delete_post_meta( $id, 'burst_total_pageviews_count' );
}

add_action('woocommerce_product_duplicate', 'burst_delete_post_pageviews_on_duplicate_product' );