<?php defined( 'ABSPATH' ) or die();?>
    <form action="" method="post">
        <?php BURST::$field->get_fields( 'settings', 'general' ); ?>
        <div class="burst-grid-footer"><?php BURST::$field->save_button(); ?></div>
    </form>