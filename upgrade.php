<?php
defined( 'ABSPATH' ) or die();
add_action( 'init', 'burst_check_upgrade', 10, 2 );

/**
 * Run an upgrade procedure if the version has changed
 */
function burst_check_upgrade() {
	#only run upgrade check if cron, or if admin.
	if ( !is_admin() && !wp_doing_cron() ) {
		return;
	}

	$prev_version = get_option( 'burst-current-version', false );
	if ( $prev_version === burst_version ) return; // no upgrade

	// always delete transients on upgrade
	global $wpdb;

	// Find all burst transients in the database
	$results = $wpdb->get_results("SELECT option_name FROM $wpdb->options WHERE option_name LIKE '%transient_burst%'");

	// Delete each transient found
	foreach ($results as $result) {
		$transient_name = substr($result->option_name, 11); // 11 = strlen('_transient_')
		delete_transient($transient_name);
	}

	// burst custom transients are not deleted by the above code
	// so we need to delete them manually, an empty array will do
	update_option('burst_transients', [], false);

	// add burst capabilities
	if ( $prev_version
	     && version_compare( $prev_version, '1.1.1', '<' )
	) {
		burst_add_view_capability();
		burst_add_manage_capability();
	}

	if ( $prev_version
	     && version_compare( $prev_version, '1.3.0', '<' ) ) {
		if (is_multisite()) {
			$tour_shown = get_site_option('burst_tour_shown_once', false);
		} else {
			$tour_shown = get_option('burst_tour_shown_once', false);
		}

		if ($tour_shown) {
			burst_update_option('burst_tour_shown_once', $tour_shown);
		}
	}

	//add capability to multisite as well
	if ( is_multisite() ) {
		if ( $prev_version
		     && version_compare( $prev_version, '1.3.4', '<' )
		) {
			burst_add_view_capability();
			burst_add_manage_capability();
		}
	}

	do_action( 'burst_upgrade', $prev_version );
	update_option( 'burst-current-version', burst_version, false );
}
