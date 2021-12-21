<div class="burst--other-plugins-element burst-{class}">
    <div class="cmplz-bullet medium"></div>
        {title}
    </div>
    <div class="plugin-text">
        <a href="{link}" target="_blank">{content}</a>
    </div>
    <div class="plugin-status">
        {status}
    </div>
</div>

<div class="cmplz-other-plugins-element cmplz-<?php echo $prefix?>">
    <a href="<?php echo esc_url_raw($plugin['url'])?>" target="_blank" title="<?php echo esc_html($plugin['title'])?>">
        <div class="cmplz-bullet medium"></div>
        <div class="cmplz-other-plugins-content"><?php echo esc_html($plugin['title'])?></div>
    </a>
    <div class="cmplz-other-plugin-status">
        <?php echo COMPLIANZ::$admin->get_status_link($plugin)?>
    </div>
</div>