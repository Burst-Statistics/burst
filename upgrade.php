<?php
defined( 'ABSPATH' ) or die();
add_action( 'init', 'burst_check_upgrade', 10, 2 );

/**
 * Run an upgrade procedure if the version has changed
 */
function burst_check_upgrade() {
	// only run upgrade check if cron, or if admin.
	if ( ! is_admin() && ! wp_doing_cron() ) {
		return;
	}

	$prev_version = get_option( 'burst-current-version', false );
	$new_version  = burst_version;

	// strip off everything after '#'
	if ( strpos( $new_version, '#' ) !== false ) {
		$new_version = substr( $new_version, 0, strpos( $new_version, '#' ) );
	}
	if ( $prev_version === $new_version ) {
		return;
	} // no upgrade

	// add burst capabilities
	if ( $prev_version
		&& version_compare( $prev_version, '1.1.1', '<' )
	) {
		burst_add_view_capability();
		burst_add_manage_capability();
	}

	if ( $prev_version
		&& version_compare( $prev_version, '1.3.0', '<' ) ) {
		if ( is_multisite() ) {
			$tour_shown = get_site_option( 'burst_tour_shown_once', false );
		} else {
			$tour_shown = get_option( 'burst_tour_shown_once', false );
		}

		if ( $tour_shown ) {
			burst_update_option( 'burst_tour_shown_once', $tour_shown );
		}
	}

	// add capability to multisite as well
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
		update_option( 'burst_db_upgrade_bounces', true );
		update_option( 'burst_db_upgrade_goals_remove_columns', true );
	}
	if ( $prev_version
		&& version_compare( $prev_version, '1.5.2', '<' ) ) {
		update_option( 'burst_db_upgrade_goals_set_conversion_metric', true );
	}

	if ( $prev_version
		&& version_compare( $prev_version, '1.5.3', '<' ) ) {
		update_option( 'burst_db_upgrade_strip_domain_names_from_entire_page_url', true );
		update_option( 'burst_db_upgrade_empty_referrer_when_current_domain', true );
		update_option( 'burst_db_upgrade_drop_user_agent', true );

		// remove the endpoint file from the old location
		if ( file_exists( ABSPATH . '/burst-statistics-endpoint.php' ) ) {
			unlink( ABSPATH . '/burst-statistics-endpoint.php' );
		}
	}

	if ( $prev_version
		&& version_compare( $prev_version, '1.6.0', '<' ) ) {
		BURST()->summary->restart_update_summary_table_alltime();
	}

	if ( $prev_version
		&& version_compare( $prev_version, '1.6.1', '<' ) ) {
		// add the admin to the email reports mailing list
		$mailinglist = burst_get_option( 'email_reports_mailinglist' );
		if ( ! $mailinglist ) {
			$defaults = array(
				[
					'email'     => get_option( 'admin_email' ),
					'frequency' => 'monthly',
				],
			);
			burst_update_option( 'email_reports_mailinglist', $defaults );
		}
	}

	do_action( 'burst_upgrade', $prev_version );
	update_option( 'burst-current-version', $new_version, false );
}
