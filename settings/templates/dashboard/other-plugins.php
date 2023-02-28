<?php defined('ABSPATH') or die("you do not have access to this page!"); ?>

<?php
$plugins = array(

    'RSSSL' => array(
        'constant_free' => 'rsssl_version',
        'constant_premium' => 'rsssl_pro_version',
        'website' => 'https://really-simple-ssl.com/premium/?src=complianz-plugin',
        'search' => 'really-simple-ssl%20HSTS%20complianz&tab=search',
        'url' => 'https://wordpress.org/plugins/really-simple-ssl/',
        'title' => 'Really Simple SSL - '. __("Easily migrate your website to SSL", "burst-statistics" ),
    ),
    'COMPLIANZ' => array(
        'constant_free' => 'cmplz_plugin',
        'constant_premium' => 'cmplz_premium',
        'url' => 'https://wordpress.org/plugins/complianz-gdpr/',
        'website' => 'https://complianz.io/pricing?src=burst-plugin',
        'search' => 'complianz',
        'title' => __("Complianz Privacy Suite - Cookie Consent Management as it should be", "burst-statistics" ),
    ),
    'BURST' => array(
        'constant_free' => 'burst_plugin',
        'constant_premium' => 'burst_plugin',
        'website' => 'https://burst-statistics.com/premium/',
        'search' => 'burst+really+simple+plugins',
        'url' => 'https://wordpress.org/plugins/burst-statistics/',
        'title' => burst_plugin_name . ' - ' . __( 'Privacy Friendly Statistics' , 'burst-statistics' ),
    ),
);
?>
<div class="burst-other-plugins-container">
    <?php foreach ($plugins as $id => $plugin) {
        $prefix = strtolower($id);
        ?>
        <div class="burst-other-plugins-element burst-<?php echo esc_attr($prefix)?>">
            <a href="<?php echo esc_url_raw($plugin['url'])?>" target="_blank" title="<?php echo esc_html($plugin['title'])?>">
                <div class="burst-bullet medium"></div>
                <div class="burst-other-plugins-content"><?php echo esc_html($plugin['title'])?></div>
            </a>
            <div class="burst-other-plugin-status">
                <?php echo wp_kses_post(BURST()->admin->get_status_link($plugin))?>
            </div>
        </div>
    <?php }?>
</div>
