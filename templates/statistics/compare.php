<?php defined( 'ABSPATH' ) or die();?>
<?php
/**
 * file is loaded with ajax, where experiment id is posted.
 */

$date_start = intval($_GET['date_start']);
$date_end = intval($_GET['date_end']);
$date_range = burst_sanitize_date_range($_GET['date_range']);
$results = BURST::$statistics->get_compare_statistics( $date_start, $date_end, $date_range );

foreach ( $results as $result ) {
    echo burst_get_template('blocks/explanation-and-stats.php', $result );
}
