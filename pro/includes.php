<?php
defined( 'ABSPATH' ) or die( "you do not have acces to this page!" );

require_once( burst_path . '/pro/cron.php');
require_once( burst_path . '/pro/rest-api/rest-api.php');

require_once( burst_path . '/pro/experiments/class-experiment.php' );
require_once( burst_path . '/pro/experiments/experimenting.php' );

if ( is_admin() ) {

    require_once( burst_path . '/pro/functions.php');
    require_once( burst_path . '/pro/filters-actions.php');

    require_once( burst_path . '/pro/class-admin.php');
}