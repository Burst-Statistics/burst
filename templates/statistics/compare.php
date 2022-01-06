<?php defined( 'ABSPATH' ) or die();?>
<?php
/**
 * file is loaded with ajax, where experiment id is posted.
 */

$date_start = intval($_GET['date_start']);
$date_end = intval($_GET['date_end']);

$results = BURST::$statistics->get_compare_statistics( $date_start, $date_end );

foreach ( $results as $result ) {
    echo burst_get_template('blocks/explanation-and-stats.php', $result );
}
