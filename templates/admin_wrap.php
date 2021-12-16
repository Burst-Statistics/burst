<div class="burst wrap" id="burst">
	<h1 class="burst-noticed-hook-element"></h1>
	<div class="burst-{page}">
        <div class="burst-header-container">
		    <div class="burst-header">
                <img src="<?php echo trailingslashit(burst_url)?>assets/images/burst-logo.svg">
                <div class="burst-header-left">
                    <nav class="burst-header-menu">
                        <ul>
                            <?php
                            $burst_menus = $GLOBALS[ 'submenu' ][ 'burst' ];
                            foreach($burst_menus as $menu){
                                $page = $menu[2];
                                $title = $menu[3];
                                $active = $_GET['page'] === $page || $_GET['page'] === substr($page, 0, -1)  ? 'class="active"' : '';
                                $url = admin_url('admin.php?page=' . $page);
                                echo '<li><a '. $active .' href='. $url .'>'. $title .'</a></li>';
                            }
                            ?>
                        </ul>
                    </nav>
                </div>
                <div class="burst-header-right">
                    {controls}
                    <a href="https://wpburst.com/support" class="button button-black" target="_blank"><?php _e("Support", "burst") ?></a>
                </div>
            </div>
		</div>
		<div class="burst-content-area">
			{content}
		</div>
	</div>
</div>
<?php
$hide = isset( $_GET['burst-save']) || isset( $_POST['burst-save'] ) ? 'burst-settings-saved--fade-in': ''; ?>
<div class="burst-settings-saved <?php echo $hide?>">
    <div class="burst-settings-saved__text_and_icon">
        <?php echo burst_icon('check', 'success', '', 18); ?>
        <span><?php _e('Changes saved successfully', 'burst') ?> </span>
    </div>
</div>

<?php
// Experiment started succesfully
$hide = isset( $_GET['burst-start']) || isset( $_POST['burst-start'] ) ? 'burst-settings-saved--fade-in': ''; ?>
<div class="burst-settings-saved <?php echo $hide?>">
    <div class="burst-settings-saved__text_and_icon">
        <?php echo burst_icon('check', 'success', '', 18); ?>
        <span><?php _e('Experiment started successfully', 'burst') ?> </span>
    </div>
</div>
<?php
// Experiment stopped succesfully
$hide = isset( $_GET['burst-stop']) || isset( $_POST['burst-stop'] ) ? 'burst-settings-saved--fade-in': ''; ?>
<div class="burst-settings-saved <?php echo $hide?>">
    <div class="burst-settings-saved__text_and_icon">
        <?php echo burst_icon('check', 'success', '', 18); ?>
        <span><?php _e('Experiment stopped successfully', 'burst') ?> </span>
    </div>
</div>