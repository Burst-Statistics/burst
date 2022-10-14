<div class="burst wrap" id="burst"> // @todo remove this div
	<h1 class="burst-notice-hook-element"></h1>
	<div class="burst-{page}">
        <div class="burst-header-container">
		    <div class="burst-header">
                <img src="<?php echo trailingslashit(burst_url)?>assets/images/burst-logo.svg">
                <div class="burst-header-left">
                    <nav class="burst-header-menu">
                        <ul>
                            <?php
                            $menu_items = BURST::$admin->get_burst_admin_pages();
                            foreach($menu_items as $page => $settings){
                                $active = false;
                                if ($settings['show_in_menu'] === false) continue;
                                if ( $_GET['page'] === 'burst' && isset($_GET['burst-page']) && $_GET['burst-page'] === $page){
                                    $active = true;
                                } else if ($_GET['page'] === 'burst' && !isset($_GET['burst-page']) && $page === 'dashboard')  {
                                    $active = true;
                                }
                                $active_class = $active ? 'class=active' : '';
                                $url = admin_url('index.php?page=burst&burst-page='.$page);

                                echo '<li><a '. esc_html($active_class) .' href="'. esc_url($url) .'">'. esc_html($settings['title']) .'</a></li>';
                            }
                            ?>
                        </ul>
                    </nav>
                </div>
                <div class="burst-header-right">
                    {controls}
                    <a href="https://wordpress.org/support/plugin/burst-statistics/" class="button button-black" target="_blank"><?php _e("Support", "burst-statistics") ?></a>
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
<div class="burst-settings-saved <?php echo esc_attr($hide)?>">
    <div class="burst-settings-saved__text_and_icon">
        <?php echo burst_icon('check'); ?>
        <span><?php _e('Changes saved successfully', 'burst-statistics') ?> </span>
    </div>
</div>