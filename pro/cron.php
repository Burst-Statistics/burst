<?php
defined('ABSPATH') or die("you do not have acces to this page!");

add_action('plugins_loaded','burst_pro_schedule_cron');
function burst_pro_schedule_cron() {
    //link function to this custom cron hook
//    add_action( 'burst_every_week_hook', array(COMPLIANZ::$cookie_admin, 'maybe_sync_cookies'), 100);
//    add_action( 'burst_every_week_hook', array(COMPLIANZ::$cookie_admin, 'maybe_sync_services'), 110);
//
//    add_action( 'burst_every_day_hook', array(COMPLIANZ::$statistics, 'cron_maybe_enable_best_performer'));
//    add_action( 'burst_every_day_hook', array(COMPLIANZ::$geoip, 'cron_check_geo_ip_db'));


    //testing
    //        add_action( 'init', array(COMPLIANZ::$cookie_admin, 'maybe_sync_cookies'), 100);
//        add_action( 'init', array(COMPLIANZ::$cookie_admin, 'maybe_sync_services'), 110);

//    if (defined('burst_premium')) add_action( 'init', array(COMPLIANZ::$statistics, 'cron_maybe_enable_best_performer'));
//    if (defined('burst_premium')) add_action( 'init', array(COMPLIANZ::$geoip, 'cron_check_geo_ip_db'));
}
