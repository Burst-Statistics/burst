<?php defined( 'ABSPATH' ) or die();?>
<?php
/**
 * file is loaded with ajax, where experiment id is posted.
 */

$date_start = intval($_GET['date_start']);
$date_end = intval($_GET['date_end']);

$results = BURST::$statistics->get_single_statistic('pageviews', $date_start, $date_end);
$args = array(
    'title' => __('Pageviews', 'burst'),
    'tooltip' => __('Tooltip text', 'burst'),
    'subtitle' => __('', 'burst'),
    'uplift' => $results['uplift_val'],
    'uplift_status' => $results['uplift_status'],
    'number' => $results['val'],
);
echo burst_get_template('blocks/explanation-and-stats.php', $args );

$results = BURST::$statistics->get_single_statistic('sessions', $date_start, $date_end);
$args = array(
    'title' => __('Sessions', 'burst'),
    'tooltip' => __('Tooltip text', 'burst'),
    'subtitle' => __('', 'burst'),
    'uplift' => $results['uplift_val'],
    'uplift_status' => $results['uplift_status'],
    'number' => $results['val'],
);
echo burst_get_template('blocks/explanation-and-stats.php', $args );

$results = BURST::$statistics->get_single_statistic('visitors', $date_start, $date_end);
$args = array(
    'title' => __('Unique visitors', 'burst'),
    'tooltip' => __('Tooltip text', 'burst'),
    'subtitle' => __('', 'burst'),
    'uplift' => $results['uplift_val'],
    'uplift_status' => $results['uplift_status'],
    'number' => $results['val'],
);
echo burst_get_template('blocks/explanation-and-stats.php', $args );

$results = BURST::$statistics->get_single_statistic('bounce', $date_start, $date_end);
$args = array(
    'title' => __('Bounces', 'burst'),
    'tooltip' => __('Tooltip text', 'burst'),
    'subtitle' => __('', 'burst'),
    'uplift' => $results['uplift_val'],
    'uplift_status' => $results['uplift_status'],
    'number' => $results['val'],
);
echo burst_get_template('blocks/explanation-and-stats.php', $args );

$results = BURST::$statistics->get_single_statistic('time', $date_start, $date_end);
$args = array(
    'title' => __('Avg. time on page', 'burst'),
    'tooltip' => __('Tooltip text', 'burst'),
    'subtitle' => __('', 'burst'),
    'uplift' => $results['uplift_val'],
    'uplift_status' => $results['uplift_status'],
    'number' => burst_format_milliseconds_to_readable_time($results['val']),
);
echo burst_get_template('blocks/explanation-and-stats.php', $args );