<?php defined( 'ABSPATH' ) or die();?>
<?php
/**
 * file is loaded with ajax, where experiment id is posted.
 */
$date_start = intval($_GET['date_start']);
$date_end = intval($_GET['date_end']);
$results = BURST::$statistics->get_platform_and_device_statistics( $date_start, $date_end );

$args = array(
    'title' => __('Desktop', 'burst'),
    'tooltip' => __('Tooltip text', 'burst'),
    'subtitle' => '',
    'uplift' => '',
    'uplift_status' => '',
    'number' => $results['desktop']['percentage'] . '%',
);
echo burst_get_template('blocks/explanation-and-stats.php', $args );

$args = array(
    'title' => __('Tablet', 'burst'),
    'tooltip' => __('Tooltip text', 'burst'),
    'subtitle' => '',
    'uplift' => '',
    'uplift_status' => '',
    'number' => $results['tablet']['percentage'] . '%',
);
echo burst_get_template('blocks/explanation-and-stats.php', $args );

$args = array(
    'title' => __('Mobile', 'burst'),
    'tooltip' => __('Tooltip text', 'burst'),
    'subtitle' => '',
    'uplift' => '',
    'uplift_status' => '',
    'number' => $results['mobile']['percentage'] . '%',
);
echo burst_get_template('blocks/explanation-and-stats.php', $args );

$args = array(
    'title' => __('Other', 'burst'),
    'tooltip' => __('Tooltip text', 'burst'),
    'subtitle' => '',
    'uplift' => '',
    'uplift_status' => '',
    'number' => $results['other']['percentage'] . '%',
);
echo burst_get_template('blocks/explanation-and-stats.php', $args );
