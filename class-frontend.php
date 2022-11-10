<?php
defined( 'ABSPATH' ) or die( "you do not have access to this page!" );
if ( ! class_exists( "burst_frontend" ) ) {
    class burst_frontend
    {
        private static $_this;

        function __construct()
        {
            if (isset(self::$_this)) {
                wp_die(burst_sprintf('%s is a singleton class and you cannot create a second instance.',
                    get_class($this)));
            }

            self::$_this = $this;

            add_action('admin_bar_menu', array($this, 'add_to_admin_bar_menu'), 35);
        }

        static function this()
        {
            return self::$_this;
        }

        function add_to_admin_bar_menu( $wp_admin_bar ) {
            if ( ! burst_user_can_view() || is_admin() ) {
                return;
            }
            $wp_admin_bar->add_node(
                array(
                    'parent' => 'site-name',
                    'id' => 'burst-statistics',
                    'title' => __('Statistics', 'burst-statistics'),
                    'href' => burst_dashboard_url,
                )
            );
        }
    }
}