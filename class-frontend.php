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
            add_action('admin_bar_menu', array($this, 'add_top_bar_menu'), 400 );
        }

        static function this()
        {
            return self::$_this;
        }

        public function add_to_admin_bar_menu( $wp_admin_bar ) {
            if ( ! burst_user_can_view() || is_admin() ) {
                return;
            }

			//don't show on subsites if networkwide activated, and this is not the main site.
			if ( burst_is_networkwide_active() && !is_main_site() ) {
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

	    /**
	     * Add top bar menu for page views
	     * @param $wp_admin_bar
	     *
	     * @return void
	     */
		public function add_top_bar_menu( $wp_admin_bar ) {
			global $wp_admin_bar;
			global $wpdb;
			if ( is_admin() ) {
				return;
			}

			if ( ! burst_user_can_view() ) {
				return;
			}

			global $post;
			if ( $post && is_object($post) ) {
				$post_id = $post->ID;
				$count = get_post_meta( $post_id, 'burst_total_pageviews_count', true );
			} else {
				$count = 0;
			}
			$wp_admin_bar->add_menu(
				array(
					'id' => 'burst-front-end',
					'title' => $count . ' ' . __('Pageviews', 'burst-statistics'),
				));
			$wp_admin_bar->add_menu(
				array(
					'parent' => 'burst-front-end',
					'id' => 'burst-statistics-link',
					'title' => __('Go to dashboard', 'burst-statistics'),
					'href' => burst_dashboard_url,
				));
		}
    }
}