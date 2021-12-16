<?php defined( 'ABSPATH' ) or die();?>
<?php
/**
 * file is loaded with ajax, where experiment id is posted.
 */
    $experiment_id = BURST::$experimenting->get_selected_experiment_id();
    $experiment = new BURST_EXPERIMENT($experiment_id);
?>

<div class="burst-experiment-setup">
    <div class="burst-row">
        <p><?php _e('Test period', 'burst'); ?></p>
        <h6><?php echo burst_display_date($experiment->date_started) ?> - <?php echo burst_display_date($experiment->date_end) ?> </h6>
    </div>
    <div class="burst-row">
        <p><?php _e('Confidence (Significance)', 'burst'); ?></p>
        <h6><?php echo $experiment->significance ?>&#x25; </h6>
    </div>
    <div class="burst-row">
        <p><?php _e('Goal', 'burst'); ?></p>
        <h6><?php echo $experiment->goal_id ?> </h6>
    </div>
</div>