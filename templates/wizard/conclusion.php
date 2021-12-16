<div class="burst-wizard-conclusion">
    <h3>{experiment_title}</h3>
    <h1>{title}</h1>
    <h2><?php _e('Versus', 'burst') ?></h2>
    <div class="burst-wizard-conclusion__summary">
        <div class="burst-wizard-conclusion__summary__control">
            <?php echo burst_display_experiment_version('control'); ?>
            <h5>{control_title}</h5>
            <p>
                <i>{control_url}</i>
            </p>
            <p><a href="{control_edit_url}"><?php _e('Edit', 'burst') ?></a></p>
        </div>
        <div class="burst-wizard-conclusion__summary__variant">
            <?php echo burst_display_experiment_version('variant'); ?>
            <h5>{variant_title}</h5>
            <p>
                <i>{variant_url}</i>
            </p>
            <p><a href="{variant_edit_url}"><?php _e('Edit', 'burst') ?></a></p>
        </div>
    </div>
    <h2><?php _e('Experiment settings', 'burst') ?></h2>
    <div class="burst-wizard-conclusion__settings">
        {experiment_settings}
    </div>
</div>