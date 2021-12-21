<?php

$items = array(
    1 => array(
        'content' => "Writing Content for Google",
        'link'    => 'https://burststatistics.com/writing-content-for-google/',
    ),
    2 => array(
        'content' => "WP Search Insights Beginner's Guide",
        'link' => 'https://burststatistics.com/burst-beginners-guide/',
    ),
    3 => array(
        'content' => "Using CSV/Excel Exports",
        'link' => 'https://burststatistics.com/using-csv-excel-exports/',
    ),
    4 => array(
        'content' => "Improving your Search Result Page",
        'link' => 'https://burststatistics.com/improving-your-search-result-page/',
    ),
    5 => array(
        'content' => "The Search Filter",
        'link' => 'https://burststatistics.com/the-search-filter/',
    ),
    6 => array(
        'content' => "Positioning your search form",
        'link' => 'https://burststatistics.com/about-search-forms/',
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
echo $output;


