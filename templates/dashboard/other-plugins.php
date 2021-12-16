<?php

$plugins = array(
    1 => array(
        'title' => '<div class="rsp-yellow burst-bullet medium"></div>',
        'content' => 'Really Simple SSL - '. __("Easily migrate your website to SSL", "complianz-gdpr"),
        'link' => 'https://wordpress.org/plugins/really-simple-ssl/',
        'class' => 'rsssl',
        'constant_free' => 'rsssl_version',
        'constant_premium' => 'rsssl_pro_version',
        'website' => 'https://ziprecipes.net/premium?src=burst-plugin',
        'search' => 'really-simple-ssl%20rogier%20lankhorst&tab=search',


    ),
	2 => array(
        'title' => '<div class="rsp-blue burst-bullet medium"></div>',
		'content' => __("Complianz Privacy Suite - Cookie Consent Management as it should be ", "burst"),
		'link' => 'https://wordpress.org/plugins/complianz-gdpr/',
		'class' => 'cmplz',
		'constant_free' => 'cmplz_plugin',
		'constant_premium' => 'cmplz_premium',
		'website' => 'https://complianz.io/pricing?src=burst-plugin',
		'search' => 'Complianz',
	),
    3 => array(
        'title' => '<div class="rsp-green burst-bullet medium"></div>',
        'content' => burst_plugin_name . ' - ' . __( 'Privacy Friendly Statistics' , 'burst' ),
        'link' => 'https://wordpress.org/plugins/burst/',
        'class' => 'burst',
        'constant_free' => 'burst_plugin',
        'constant_premium' => 'burst_premium_plugin',
        'website' => 'https://burst.com/premium?src=burst-plugin',
        'search' => 'Burst',
    ),
);

$element = burst_get_template('dashboard/other-plugins-row.php');
$output = '<div class="burst-other-plugins-container">';
foreach ($plugins as $plugin) {
	$output .= str_replace(array(
		'{title}',
		'{link}',
		'{content}',
		'{status}',
		'{class}',
	), array(
		$plugin['title'],
		$plugin['link'],
		$plugin['content'],
		BURST::$admin->get_status_link($plugin),
		$plugin['class'],
		'',
	), $element);
}
$output .= '</div>';
echo $output;