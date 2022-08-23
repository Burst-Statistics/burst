<?php defined( 'ABSPATH' ) or die();

$items = array(
    1 => array(
        'content' => "Hidden Features of the Insights Graph",
        'link'    => 'https://burst-statistics.com/hidden-features-of-the-insights-graph/',
    ),
    2 => array(
        'content' => "What is Cookieless tracking?",
        'link' => 'https://burst-statistics.com/what-is-cookieless-tracking/',
    ),
    3 => array(
        'content' => "Why is Burst Privacy-Friendly?",
        'link' => 'https://burst-statistics.com/why-is-burst-privacy-friendly/',
    ),
    4 => array(
        'content' => "How can I compare metrics?",
        'link' => 'https://burst-statistics.com/how-can-i-compare-metrics/',
    ),
    5 => array(
        'content' => "What is Bounce Rate?",
        'link' => 'https://burst-statistics.com/definition/what-is-bounce-rate/',
    ),
    6 => array(
	    'content' => "What is Turbo Mode?",
	    'link' => 'https://burst-statistics.com/definition/turbo-mode/',
    ),
);
$container = '<div class="burst-tips-tricks-element"><a href="{link}" target="_blank" title="{content}"><div class="burst-bullet medium"></div><div class="burst-tips-tricks-content">{content}</div></a></div>';
$output = '<div class="burst-tips-tricks-container">';

foreach ($items as $item) {
    $output .= str_replace(array(
        '{link}',
        '{content}',
    ), array(
        $item['link'],
        $item['content'],
    ), $container);
}
 $output .= '</div>';
echo wp_kses_post($output);


