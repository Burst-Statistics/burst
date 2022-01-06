<?php
defined( 'ABSPATH' ) or die();
$chartjs_metrics = json_encode(array('visitors', 'pageviews'));

?>

<input type="hidden" name="burst_chartjs_metrics" value='<?php echo esc_attr($chartjs_metrics); ?>'>

<div class="burst-statistics-container">
    <canvas class="burst-chartjs-stats"></canvas>
</div>