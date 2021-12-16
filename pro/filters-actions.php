<?php
defined('ABSPATH') or die("you do not have acces to this page!");
/**
 * NON ADMIN FUNCTIONS
 */

/**
* Add our pro grid items
* @param array $grid_items
*
* @return array
*/
function burst_add_pro_grid_items( $grid_items ){
    $grid_items = $grid_items + array(
     'experiments' => array(
        1 => array(
            'title' => __("Your experiment", "burst"),
            'class' => 'table-overview',
            'type' => 'progress',
            'controls' => '',
            'can_hide' => true,
            'page' => 'experiments',
        ),
        2 => array(
            'title' => __("Objective", "burst"),
            'body' => '<div class="burst-skeleton"></div>',
            'class' => 'small burst-load-ajax',
            'type' => 'objective',
            'can_hide' => true,
            'ajax_load' => true,
            'page' => 'experiments',
        ),
        3 => array(
            'title' => __("Setup", "burst"),
            'body' => '<div class="burst-skeleton"></div>',
            'class' => 'small burst-load-ajax',
            'type' => 'experiment-setup',
            'can_hide' => true,
            'ajax_load' => true,
            'page' => 'experiments',
        ),
     ),
    );
return $grid_items;
}
add_filter( 'burst_grid_items', 'burst_add_pro_grid_items', 10 );