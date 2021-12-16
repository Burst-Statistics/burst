<?php defined( 'ABSPATH' ) or die();?>
<?php
    /**
     * file is loaded with ajax, where experiment id is posted.
     */
    $experiment_id = BURST::$experimenting->get_selected_experiment_id();
    $experiment = new BURST_EXPERIMENT($experiment_id);
    $args = array(
        'test_version' => 'control',
    );
    $count_control_all = $experiment->count_hits($args);
    $args['converted'] =  true;
    $count_control_completed = $experiment->count_hits($args);

    $args = array(
        'test_version' => 'variant',
    );
    $count_variant_all = $experiment->count_hits($args);
    $args['converted'] =  true;
    $count_variant_completed = $experiment->count_hits($args);
    $total = $count_control_all + $count_variant_all;

    if ($count_control_all==0) {
	    $percentage = 0;
    } else {
	    $percentage = $experiment->probability_of_variant_winning();
    }
    $conversion_percentage_control = $experiment->get_average('control', 4) * 100;
    $conversion_percentage_variant = $experiment->get_average('variant', 4) * 100;

    $uplift = $experiment->get_uplift('2');
?>
<!--
<div class="burst-progress-bar-container">
	<div class="burst-progress">
		<div class="burst-percentage" style="width:<?php //echo $percentage ?>%"></div>
	</div>
</div>
-->
<div class="burst-compare-experiments-container">
    <div class="burst-compare-experiments control">
        <div class="burst-row">
            <span class="burst-experiment-dot control"></span>
            <h5><?php echo get_the_title($experiment->control_id); ?>&nbsp;<a href="<?php echo get_permalink($experiment->control_id) ?>">View</a></h5>
        </div>
        <div class="burst-row">
            <p><?php _e('Conversions', 'burst'); ?> / <?php _E('Visits', 'burst'); ?></p>
            <h6><?php echo $count_control_completed ?> / <?php echo $count_control_all ?></h6>
        </div>
        <div class="burst-row">
            <p><?php _e('Conversion rate', 'burst'); ?></p>
            <h6><?php echo $conversion_percentage_control ?>&#x25; </h6>
        </div>
    </div>

    <div class="burst-compare-experiments variant">
        <div class="burst-row">
            <span class="burst-experiment-dot variant"></span>
            <h5><?php echo get_the_title($experiment->variant_id); ?>&nbsp;<a href="<?php echo get_permalink($experiment->variant_id) ?>">View</a></h5>
        </div>
        <div class="burst-row">
            <p><?php _e('Conversions', 'burst'); ?> / <?php _E('Visits', 'burst'); ?></p>
            <h6><?php echo $count_variant_completed ?> / <?php echo $count_variant_all ?></h6>
        </div>
        <div class="burst-row">
            <p><?php _e('Conversion rate', 'burst'); ?></p>
            <h6><?php echo $conversion_percentage_variant ?>&#x25; </h6>
        </div>
        <div class="burst-row">
            <h6><?php _e('Uplift', 'burst'); ?></h6>

            <h3>
            <?php
            if ($uplift < 0 ){
                echo burst_icon('uplift', 'down');
            } else if ($uplift > 0) {
                echo burst_icon('uplift', 'up');
            }
            ?>
            <?php echo $uplift ?>&#x25;
            </h3>
        </div>
    </div>
</div>

<?php
$is_significant = $experiment->is_statistical_significant();
error_log($is_significant);
$significance = $experiment->get_significance();
$significance = $significance ? 100 * (1-$significance) : 0;

$margin_of_error = $experiment->get_margin_of_error();
?>
<div class="burst-probability">
    <div class="burst-row">
        <h1><?php echo $experiment->probability_of_improvement()?>%</h1>
        <h5><?php _e("Probability of variant being an improvement","burst")?></h5>

    </div>
    <div class="burst-row">
        <h1><?php echo $percentage?>%</h1>
        <h5><?php _e("Probability of variant winning.","burst")?></h5>
    </div>
</div>
<div class="burst-statisitics">
    <div class="burst-row">
        <p><?php _e("Significance","burst")?></p>
        <h6><?php echo $significance?>%&nbsp;<?php echo $is_significant ? __("(Significant)", "burst") : __("(Not significant)", "burst");?></>
    </div>
    <div class="burst-row">
        <p><?php _e("Margin of error","burst")?></p>
        <h6><?php echo $margin_of_error?>%</>
    </div>
    <div class="burst-row">
        <p><?php _e("Sample size reached","burst")?></p>
        <h6>
            <?php if ( $experiment->has_reached_minimum_sample_size() ) {
                _e("Yes","burst");
            } else {
                _e("No","burst");
            } ?>
        </>
    </div>
</div>

