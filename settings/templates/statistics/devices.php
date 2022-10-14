<?php defined( 'ABSPATH' ) or die();?>
<?php
/**
 * file is loaded with ajax, where experiment id is posted.
 */
$date_start = intval($_GET['date_start']);
$date_end = intval($_GET['date_end']);
$date_range = burst_sanitize_date_range($_GET['date_range']);
$results = BURST::$statistics->get_platform_and_device_statistics( $date_start, $date_end, $date_range );

$args = array(
    'title' => __('Desktop', 'burst-statistics'),
    'tooltip' => '',
    'subtitle' => $results['desktop']['platform'].' / '.$results['desktop']['browser'],
    'uplift' => '',
    'uplift_status' => '',
    'number' => $results['desktop']['percentage'] . '%',
);
echo burst_get_template('blocks/explanation-and-stats.php', $args );

$args = array(
    'title' => __('Tablet', 'burst-statistics'),
    'tooltip' => '',
    'subtitle' => $results['tablet']['platform'].' / '.$results['tablet']['browser'],
    'uplift' => '',
    'uplift_status' => '',
    'number' => $results['tablet']['percentage'] . '%',
);
echo burst_get_template('blocks/explanation-and-stats.php', $args );

$args = array(
    'title' => __('Mobile', 'burst-statistics'),
    'tooltip' => '',
    'subtitle' => $results['mobile']['platform'].' / '.$results['mobile']['browser'],
    'uplift' => '',
    'uplift_status' => '',
    'number' => $results['mobile']['percentage'] . '%',
);
echo burst_get_template('blocks/explanation-and-stats.php', $args );

$args = array(
    'title' => __('Other', 'burst-statistics'),
    'tooltip' => '',
    'subtitle' => $results['other']['platform'].' / '.$results['other']['browser'],
    'uplift' => '',
    'uplift_status' => '',
    'number' => $results['other']['percentage'] . '%',
);
echo burst_get_template('blocks/explanation-and-stats.php', $args );
