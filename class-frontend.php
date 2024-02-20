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
	        add_action( 'init', array( $this, 'register_pageviews_block' ) );

	        add_shortcode( 'burst-most-visited', array( $this, 'most_visited_posts' ) );

        }

        static function this()
        {
            return self::$_this;
        }

	    /**
	     * Show content conditionally, based on consent
	     * @param array  $atts
	     * @param string   $content
	     * @param string $tag
	     *
	     * @return false|string
	     */

	    public function most_visited_posts(
		    $atts = array(), $content = null, $tag = ''
	    ) {
		    // normalize attribute keys, lowercase
		    $atts = array_change_key_case( (array) $atts, CASE_LOWER );
		    $blocked_text = __('Click to accept the cookies for this service', 'complianz-gdpr');
		    // override default attributes with user attributes
		    $atts   = shortcode_atts( array(
			    'count'       => 5,
			    'post_type'   => 'post',
			    'show_count'   => false,
		    ), $atts, $tag );

		    //sanitize post type
		    $post_types = get_post_types();
			if ( !in_array( $atts['post_type'], $post_types ) ) {
			    $atts['post_type'] = 'post';
		    }

		    $count = (int) $atts['count'];
		    $show_count = (bool) $atts['show_count'];
		    $post_type = (string) $atts['post_type'];
			//posts, sorted by post_meta
		    $args = [
			    'post_type'         => $post_type,
			    'numberposts'       => $count,
			    'meta_key'          => 'burst_total_pageviews_count',
			    'orderby'           => 'meta_value_num',
			    'order'             => 'DESC',
			    'meta_query'        => array(
				    'key'   => 'burst_total_pageviews_count', // Same meta key for sorting
				    'type'  => 'NUMERIC' // Make sure to specify the type as numeric for correct sorting
			    )
		    ];
		    $posts = get_posts($args);
		    ob_start();

		    if (count($posts)>0){
				?>
			    <ul class="burst-most-visited-posts">
				    <?php foreach ($posts as $post) {
						$count = (int) get_post_meta($post->ID, 'burst_total_pageviews_count', true);
					    $count_html = '';
						if ($show_count) {
							$count_html = '&nbsp;<span class="burst-post-count">(' . apply_filters('burst_most_visited_count', $count, $post ). ')</span>';
						}
						?>
					    <li class="burst-post-item"><a href="<?php esc_url_raw(get_the_permalink($post))?>"><?php echo esc_html(get_the_title($post)); ?><?php echo $count_html?></a></li>
	                <?php }; ?>
			    </ul>
				<?php
			}
		    return ob_get_clean();
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

	    public function register_pageviews_block() {
		    wp_register_script(
			    'burst-pageviews-block-editor',
			    plugins_url( 'blocks/pageviews.js', __FILE__ ), // Adjust the path to your JavaScript file
			    array( 'wp-blocks', 'wp-element', 'wp-editor' ),
			    filemtime( plugin_dir_path( __FILE__ ) . 'blocks/pageviews.js' )
		    );
		    wp_set_script_translations( 'burst-pageviews-block-editor', 'burst-statistics' , burst_path . '/languages');

		    register_block_type( 'burst/pageviews-block', array(
			    'editor_script' => 'burst-pageviews-block-editor',
			    'render_callback' => array( $this, 'render_burst_pageviews' )
		    ) );
	    }
	    public function render_burst_pageviews() {
		    global $post;
		    $burst_total_pageviews_count = get_post_meta( $post->ID, 'burst_total_pageviews_count', true );
		    $count = (int) $burst_total_pageviews_count ?: 0;
		    $text = sprintf( _n('This page has been viewed %d time.', 'This page has been viewed %d times.', $count, 'burst-statistics'), $count );
			return '<p class="burst-pageviews">' . $text . '</p>';
	    }
    }
}