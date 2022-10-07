<?php defined( 'ABSPATH' ) or die();?>
<?php
/**
 * file is loaded with ajax, where experiment id is posted.
 */
$date_start = burst_offset_utc_time_to_gtm_offset(strtotime('today'));
$date_end = strtotime('tomorrow');

$time_total = BURST::$statistics->get_single_statistic('time_total', $date_start, $date_end);
$visitors_total = BURST::$statistics->get_single_statistic('visitors', $date_start, $date_end);
$pageviews_total = BURST::$statistics->get_single_statistic('pageviews', $date_start, $date_end);
$visitors_now = BURST::$statistics->get_real_time_visitors();

$lines = array(
    //$pageviews_total['val'] . ' ' . __('are new visitors', 'burst-statistics'),
    $visitors_total . ' ' . __('visitors', 'burst-statistics'),
    $pageviews_total . ' ' . __('pageviews', 'burst-statistics'),
    burst_format_milliseconds_to_readable_time($time_total) . ' ' . __('time', 'burst-statistics'),
);
$html = '';
foreach ($lines as $line){ $html .= '<p>' . $line . '</p>'; }

$args = array(
    'title' => '',
    'tooltip' => '',
    'subtitles' => $html,
    'number' => $visitors_now,
    'number_subtitle' => __('online right now', 'burst-statistics'),
);
echo burst_get_template('blocks/big-number.php', $args );


$referrer = BURST::$statistics->get_single_statistic('referrer', $date_start, $date_end);
if ( !$referrer ) $referrer = __('No referrers today', 'burst-statistics');

$args = array(
    'title' => __('Top referrer', 'burst-statistics'),
    'tooltip' => '',
    'subtitle' => $referrer,
    'uplift' => '',
    'uplift_status' => '',
    'number' => '',
);
echo burst_get_template('blocks/explanation-and-stats.php', $args );

$most_visited = BURST::$statistics->get_single_statistic('page_url', $date_start, $date_end);
if ( !$most_visited ) $most_visited = __('No pages visited today', 'burst-statistics');
$args = array(
    'title' => __('Most visited page', 'burst-statistics'),
    'tooltip' => '',
    'subtitle' => $most_visited,
    'uplift' => '',
    'uplift_status' => '',
    'number' => '',
);
echo burst_get_template('blocks/explanation-and-stats.php', $args );
