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

	        add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_burst_time_tracking_script' ), 0 );
	        add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_burst_tracking_script' ), 0 );
	        add_filter( 'script_loader_tag', array( $this, 'defer_burst_tracking_script' ), 10, 3 );
        }

        static function this()
        {
            return self::$_this;
        }

	    /**
	     * Enqueue some assets
	     *
	     * @param $hook
	     */

	    public function enqueue_burst_time_tracking_script( $hook ) {
		    $minified = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';
		    if ( ! $this->exclude_from_tracking() ) {
			    wp_enqueue_script(
				    'burst-timeme',
				    burst_url . "helpers/timeme/timeme$minified.js",
				    array(),
				    burst_version,
				    false
			    );
		    }
	    }

	    /**
	     * Enqueue some assets
	     *
	     * @param $hook
	     */

	    public function enqueue_burst_tracking_script( $hook ) {
		    //don't enqueue if headless.
		    if ( defined('BURST_HEADLESS' ) || burst_get_option('headless') ){
			    return;
		    }
			
		    if ( ! $this->exclude_from_tracking() ) {
			    $in_footer       = burst_get_option( 'enable_turbo_mode' );
			    $beacon_enabled  = (int) burst_tracking_status_beacon();
			    $deps = $beacon_enabled ? [ 'burst-timeme' ] : [ 'burst-timeme', 'wp-api-fetch' ];
				$combine_vars_and_script = burst_get_option( 'combine_vars_and_script' );
				if ( $combine_vars_and_script ) {
					$upload_url  = burst_upload_url( 'js' );
					$upload_path = burst_upload_dir( 'js' );
					wp_enqueue_script(
						'burst',
						$upload_url . "burst.min.js",
						apply_filters( 'burst_script_dependencies', $deps ),
						filemtime( $upload_path . "burst.min.js" ),
						$in_footer
					);
				} else {
					$minified        = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';
					$cookieless      = burst_get_option( 'enable_cookieless_tracking' );
					$cookieless_text = $cookieless == '1' ? '-cookieless' : '';

					$localize_args = apply_filters(
						'burst_tracking_options',
						array(
							'url'                   => burst_get_rest_url(),
							'page_id'               => get_queried_object_id(),
							'cookie_retention_days' => 30,
							'beacon_url'            => burst_get_beacon_url(),
							'options'               => array(
								'beacon_enabled'             => $beacon_enabled,
								'enable_cookieless_tracking' => (int) $cookieless,
								'enable_turbo_mode'          => (int) burst_get_option( 'enable_turbo_mode' ),
								'do_not_track'               => (int) burst_get_option( 'enable_do_not_track' ),
							),
							'goals'                 => burst_get_active_goals(),
							'goals_script_url'      => burst_get_goals_script_url(),
						)
					);
					wp_enqueue_script(
						'burst',
						burst_url . "assets/js/build/burst$cookieless_text$minified.js",
						apply_filters( 'burst_script_dependencies', $deps ),
						burst_version,
						$in_footer
					);
					wp_localize_script(
						'burst',
						'burst',
						$localize_args
					);
				}
		    }
	    }

	    public function defer_burst_tracking_script( $tag, $handle, $src ) {
		    // time me load asap but async to avoid blocking the page load
		    if ( 'burst-timeme' === $handle ) {
			    return str_replace( ' src', ' async src', $tag );
		    }

		    $turbo = burst_get_option( 'enable_turbo_mode' );
		    if ( $turbo ) {
			    if ( 'burst' == $handle ) {
				    return str_replace( ' src', ' defer src', $tag );
			    }
		    }

		    if ( 'burst' === $handle ) {
			    return str_replace( ' src', ' async src', $tag );
		    }

		    return $tag;
	    }

	    function exclude_from_tracking() {
		    if ( is_user_logged_in() ) {
			    $user                = wp_get_current_user();
			    $user_role_blocklist = burst_get_option( 'user_role_blocklist' );
			    $get_excluded_roles  = is_array( $user_role_blocklist ) ? $user_role_blocklist : array( 'adminstrator' );
			    $excluded_roles      = apply_filters( 'burst_roles_excluded_from_tracking', $get_excluded_roles );
			    if ( array_intersect( $excluded_roles, $user->roles ) ) {
				    return true;
			    }
			    if ( is_preview() || burst_is_pagebuilder_preview() ) {
				    return true;
			    }
		    }

		    return false;
	    }

    }
}