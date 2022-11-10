<?php
defined( 'ABSPATH' ) or die( "you do not have access to this page!" );
$date_range = burst_sanitize_date_range(apply_filters('burst_dashboard_widget_date_range', 'last-7-days'));
$date_range_unix = BURST()->statistics->get_time_stamp_for_date_range($date_range);
$date_end = $date_range_unix['end'];
$date_start = $date_range_unix['start'];
?>
<div class="burst burst-dashboard-widget">
    <div class="burst-dashboard-widget__content">
        <?php
        $widget_statistics = BURST()->statistics->get_dashboard_widget_statistics($date_start, $date_end, $date_range);
        $args = array(
            'title' => __('Unique visitors', 'burst-statistics'),
            'tooltip' => '',
            'uplift' => $widget_statistics['visitors_uplift'],
            'uplift_status' => $widget_statistics['visitors_uplift_status'],
            'number' => burst_format_number($widget_statistics['visitors'], 1),
        );
        echo burst_get_html_template('blocks/burst-kpi.php', $args );

        $args = array(
            'title' => __('Avg. time per session', 'burst-statistics'),
            'tooltip' => '',
            'uplift' => $widget_statistics['time_per_session_uplift'],
            'uplift_status' => $widget_statistics['time_per_session_uplift_status'],
            'number' => burst_format_milliseconds_to_readable_time($widget_statistics['time_per_session']),
        );
        echo burst_get_html_template('blocks/burst-kpi.php', $args );

        $args = array(
            'title' => __('Top referrer', 'burst-statistics'),
            'tooltip' => '',
            'subtitle' => $widget_statistics['top_referrer'],
            'uplift' => __('Pageviews', 'burst-statistics'),
            'uplift_status' => '',
            'number' => burst_format_number($widget_statistics['top_referrer_pageviews'], 1),
        );
        echo burst_get_html_template('blocks/explanation-and-stats.php', $args );

        $args = array(
            'title' => __('Most visited page', 'burst-statistics'),
            'tooltip' => '',
            'subtitle' => $widget_statistics['most_visited'],
            'uplift' => __('Pageviews', 'burst-statistics'),
            'uplift_status' => '',
            'number' => burst_format_number($widget_statistics['most_visited_pageviews'], 1),
        );
        echo burst_get_html_template('blocks/explanation-and-stats.php', $args );

        ?>
    </div>
    <div class="burst-dashboard-widget__footer">
        <a href="<?php echo burst_dashboard_url ?>"><?php _e("Dashboard", "burst-statistics") ?></a> |
        <a href="<?php echo burst_dashboard_url . '#statistics' ?>"><?php _e("Statistics", "burst-statistics") ?></a>
        <p class="burst-dashboard-widget__selected-date">
            <i>
                <?php echo date_i18n( 'j F', $date_start )  . ' - ' . date_i18n( 'j F', $date_end );  ?>
            </i>
        </p>
    </div>
</div>