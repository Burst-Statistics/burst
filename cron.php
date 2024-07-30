<?php
defined( 'ABSPATH' ) or die();

/**
 * Schedule cron jobs if useCron is true
 * Else start the functions.
 */
add_action( 'plugins_loaded', 'burst_schedule_cron' );
function burst_schedule_cron() {
	if ( ! wp_next_scheduled( 'burst_every_5_minutes' ) ) {
		wp_schedule_event( time(), 'burst_every_5_minutes', 'burst_every_5_minutes' );
	}
	if ( ! wp_next_scheduled( 'burst_every_hour' ) ) {
		wp_schedule_event( time(), 'burst_every_hour', 'burst_every_hour' );
	}
	if ( ! wp_next_scheduled( 'burst_daily' ) ) {
		wp_schedule_event( time(), 'burst_daily', 'burst_daily' );
	}
	if ( ! wp_next_scheduled( 'burst_weekly' ) ) {
		wp_schedule_event( time(), 'burst_weekly', 'burst_weekly' );
	}
}

add_filter( 'cron_schedules', 'burst_filter_cron_schedules' );
function burst_filter_cron_schedules( $schedules ) {
	$schedules['burst_every_5_minutes'] = array(
		'interval' => 300,
		'display'  => __( 'Once every 5 minutes' ),
	);
	$schedules['burst_daily']      = array(
		'interval' => DAY_IN_SECONDS,
		'display'  => __( 'Once every day' ),
	);
	$schedules['burst_every_hour'] = array(
		'interval' => HOUR_IN_SECONDS,
		'display'  => __( 'Once every hour' ),
	);
	$schedules['burst_weekly'] = array(
		'interval' => WEEK_IN_SECONDS,
		'display'  => __( 'Once every week' ),
	);

	return $schedules;
}








