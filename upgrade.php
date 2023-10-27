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

	// update burst_update_endpoint option, so that the endpoint file will be updated every time the version is changed
	update_option( 'burst_update_endpoint', true );

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

	// Version 1.3.5
	// - Upgrade to new bounce table
	// - Upgrade to remove `event` and `action` columns from `burst_statistics` table

	if ( $prev_version
	     && version_compare( $prev_version, '1.4.2.1', '<' ) ) {
		update_option( "burst_db_upgrade_bounces", true );
		update_option( 'burst_db_upgrade_goals_remove_columns', true);
	}
	if ( $prev_version
	     && version_compare( $prev_version, '1.5.2', '<' ) ) {
		update_option( 'burst_db_upgrade_goals_set_conversion_metric', true);
	}


	do_action( 'burst_upgrade', $prev_version );
	update_option( 'burst-current-version', burst_version, false );
}
