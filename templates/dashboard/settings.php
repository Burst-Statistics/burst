<?php defined( 'ABSPATH' ) or die();
if ( burst_user_can_manage() ) { ?>
    <form action="" method="post">
        <?php BURST::$field->get_fields( 'settings', 'general' ); ?>
        <div class="burst-grid-footer">
            <p><a href="https://burst-statistics.com/feature-requests/"><?php _e("Feature request?", 'burst-statistics') ?> </a></p>
            <?php BURST::$field->save_button(); ?>
        </div>
    </form>
<?php } else { ?>
    <form>
        <div>
            <p><?php _e("You don't have permissions to change settings.", 'burst-statistics') ?></p>
        </div>
        <div class="burst-grid-footer">
            <p><a href="https://burst-statistics.com/feature-requests/"><?php _e("Feature request?", 'burst-statistics') ?> </a></p>
            <?php BURST::$field->save_button(); ?>
        </div>
    </form>
<?php } ?>
