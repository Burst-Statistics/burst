<?php
defined( 'ABSPATH' ) or die( "you do not have access to this page!" );
$date_start = burst_offset_utc_time_to_gtm_offset(strtotime('7 days ago'));
$date_end = burst_offset_utc_time_to_gtm_offset(strtotime('tomorrow'));
?>
<div class="burst burst-dashboard-widget">
    <div class="burst-dashboard-widget__content">
        <?php
        $args = array(
            'title' => __('Total unique visitors', 'burst-statistics'),
            'tooltip' => '',
            'number' => '330',
            'uplift' => '+2%',
            'uplift_status' => 'positive',
        );
        echo burst_get_template('blocks/burst-kpi.php', $args );

        $args = array(
            'title' => __('Avg. time per session', 'burst-statistics'),
            'tooltip' => '',
            'number' => '00:00:23',
            'uplift' => '+2%',
            'uplift_status' => 'positive',
        );
        echo burst_get_template('blocks/burst-kpi.php', $args );

        $results = BURST::$statistics->get_single_statistic('referrer', $date_start, $date_end);
        $args = array(
            'title' => __('Top referrer', 'burst-statistics'),
            'tooltip' => '',
            'subtitle' => $results['val'],
            'uplift' => '',
            'uplift_status' => '',
            'number' => '',
        );
        echo burst_get_template('blocks/explanation-and-stats.php', $args );

        $results = BURST::$statistics->get_single_statistic('page_url', $date_start, $date_end);
        $args = array(
            'title' => __('Most visited page', 'burst-statistics'),
            'tooltip' => '',
            'subtitle' => $results['val'],
            'uplift' => '',
            'uplift_status' => '',
            'number' => '',
        );
        echo burst_get_template('blocks/explanation-and-stats.php', $args );

        ?>
    </div>
    <div class="burst-dashboard-widget__footer">
        <a href="<?php echo admin_url('index.php?page=burst') ?>"><?php _e("Dashboard", "burst-statistics") ?></a> |
        <a href="<?php echo admin_url('index.php?page=burst&burst-page=statistics') ?>"><?php _e("Statistics", "burst-statistics") ?></a>
    </div>
</div>

