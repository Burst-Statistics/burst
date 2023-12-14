<?php defined( 'ABSPATH' ) or die( "you do not have access to this page!" );
if ( ! function_exists( 'burst_is_logged_in_rest' ) ) {
	function burst_is_logged_in_rest() {
		$valid_request = isset( $_SERVER['REQUEST_URI'] ) && strpos( $_SERVER['REQUEST_URI'], '/burst/v1/' ) !== false;
		if ( ! $valid_request ) {
			return false;
		}

		return is_user_logged_in();
	}
}

if ( ! function_exists( 'burst_admin_logged_in' ) ) {
    function burst_admin_logged_in() {
	    return ( is_user_logged_in() && burst_user_can_view()) || burst_is_logged_in_rest() || wp_doing_cron() || ( defined( 'WP_CLI' ) && WP_CLI );
    }
}

if ( ! function_exists( 'burst_is_pro' ) ) {
	function burst_is_pro() {
		return defined( 'burst_pro' );
	}
}

if ( ! function_exists('burst_add_view_capability')){
	/**
	 * Add a user capability to WordPress and add to admin and editor role
     *
     * @param bool $handle_subsites
	 */
	function burst_add_view_capability(bool $handle_subsites=true){
		$capability = 'view_burst_statistics';
		$roles = apply_filters('burst_burst_add_view_capability', array('administrator', 'editor') );
		foreach( $roles as $role ){
			$role = get_role( $role );
			if( $role && !$role->has_cap( $capability ) ){
				$role->add_cap( $capability );
			}
		}

		//we need to add this role across subsites as well.
		if ( $handle_subsites && is_multisite() ) {
			$sites = get_sites();
			if (count($sites)>0) {
				foreach ($sites as $site) {
					switch_to_blog($site->blog_id);
					burst_add_view_capability(false);
					restore_current_blog();
				}
			}
		}
	}
}
if (!function_exists('burst_is_networkwide_active')) {
	function burst_is_networkwide_active() {
		if ( ! is_multisite() ) {
			return false;
		}
		if ( ! function_exists( 'is_plugin_active_for_network' ) ) {
			require_once( ABSPATH . '/wp-admin/includes/plugin.php' );
		}

		if ( is_plugin_active_for_network( burst_plugin ) ) {
			return true;
		}

		return false;
	}
}

/**
 * Check if using multisite plugin on non-multisite environment
 */
if (!function_exists('burst_is_multisite_plugin_on_non_multisite_installation')){
	function burst_is_multisite_plugin_on_non_multisite_installation(){
		return !is_multisite() && defined('burst_pro_multisite');
	}
}

if ( ! function_exists('burst_add_manage_capability')){
	/**
	 * Add a user capability to WordPress and add to admin and editor role
	 *
	 * @param bool $handle_subsites
	 */
	function burst_add_manage_capability(bool $handle_subsites=true){
		$capability = 'manage_burst_statistics';
		$roles = apply_filters('burst_burst_add_manage_capability', array('administrator', 'editor') );
		foreach( $roles as $role ){
			$role = get_role( $role );
			if( $role && !$role->has_cap( $capability ) ){
				$role->add_cap( $capability );
			}
		}

		//we need to add this role across subsites as well.
		if ( $handle_subsites && is_multisite() ) {
			$sites = get_sites();
			if (count($sites)>0) {
				foreach ($sites as $site) {
					switch_to_blog($site->blog_id);
					burst_add_manage_capability(false);
					restore_current_blog();
				}
			}
		}
	}
}

if ( !function_exists('burst_add_role_to_subsite') ) {
    /**
     * When a new site is added, add our capability
     *
     * @param $site
     *
     * @return void
     */
    function burst_add_role_to_subsite( $site ) {
        switch_to_blog( $site->blog_id );
        burst_add_manage_capability( false );
        restore_current_blog();
    }
    add_action('wp_initialize_site', 'burst_add_role_to_subsite', 10, 1);
}

if ( ! function_exists( 'burst_user_can_view' ) ) {
	/**
	 * Check if user has Burst permissions
	 * @return boolean true or false
	 */
	function burst_user_can_view(): bool {
		if ( ! is_user_logged_in() ) {
			return false;
		}
		if ( ! current_user_can( 'view_burst_statistics' ) ) {
			return false;
		}

		return true;
	}
}

if ( ! function_exists( 'burst_user_can_manage' ) ) {
	/**
	 * Check if user has Burst permissions
	 * @return boolean true or false
	 */
	function burst_user_can_manage(): bool {
		if ( ! is_user_logged_in() ) {
			return false;
		}
		if ( ! current_user_can( 'manage_burst_statistics' ) ) {
			return false;
		}

		return true;
	}
}

if ( !function_exists('burst_admin_url')) {
	/**
	 * Get admin url, adjusted for multisite
	 * @return string|null
	 */
	function burst_admin_url(){
		return is_multisite() && is_network_admin() ? network_admin_url('index.php') : admin_url("index.php");
	}
}


if ( ! function_exists('burst_read_more' ) ) {
	/**
	 * Create a generic read more text with link for help texts.
	 *
	 * @param string $url
	 * @param bool   $add_space
	 *
	 * @return string
	 */
	function burst_read_more( $url, $text = '', $add_space = true ) {
        if ($text !== ''){
	        $html
		        = burst_sprintf( $text, '<a target="_blank" href="' . $url . '">',
		        '</a>' );
        } else {
	        $html
		        = burst_sprintf( __( "For more information on this subject, please read this %sarticle%s", 'burst-statistics' ), '<a target="_blank" href="' . $url . '">',
		        '</a>' );
        }

		if ( $add_space ) {
			$html = '&nbsp;' . $html;
		}

		return $html;
	}
}

if ( ! function_exists( 'burst_array_filter_multidimensional' ) ) {
	function burst_array_filter_multidimensional(
		$array, $filter_key, $filter_value
	) {
		return array_filter( $array,
			static function( $var ) use ( $filter_value, $filter_key ) {
				return isset( $var[ $filter_key ] ) && $var[ $filter_key ] === $filter_value;
			} );
	}
}

/**
 *
 * Check if we are currently in preview mode from one of the known page builders
 *
 * @return bool
 *
 */
if ( ! function_exists( 'burst_is_pagebuilder_preview' ) ) {
	function burst_is_pagebuilder_preview() {
		$preview = false;
		global $wp_customize;
		if ( isset( $wp_customize ) || isset( $_GET['fb-edit'] )
		     || isset( $_GET['et_pb_preview'] )
		     || isset( $_GET['et_fb'] )
		     || isset( $_GET['elementor-preview'] )
		     || isset( $_GET['vc_action'] )
		     || isset( $_GET['vcv-action'] )
		     || isset( $_GET['fl_builder'] )
		     || isset( $_GET['tve'] )
		     || isset( $_GET['ct_builder'] )
		) {
			$preview = true;
		}

		return apply_filters( 'burst_is_preview', $preview );
	}
}

if ( ! function_exists( 'burst_localize_date' ) ) {

	function burst_localize_date( $date ) {
		$month             = date( 'F', strtotime( $date ) ); //june
		$month_localized   = __( $month ); //juni
		$date              = str_replace( $month, $month_localized, $date );
		$weekday           = date( 'l', strtotime( $date ) ); //wednesday
		$weekday_localized = __( $weekday ); //woensdag

		return str_replace( $weekday, $weekday_localized, $date );
	}
}


if ( ! function_exists( 'burst_display_date' ) ) {
	/**
	 * @param $date
	 *
	 * @return string
	 */
	function burst_display_date( $date ) {
		return date_i18n( get_option( 'date_format' ), $date );
	}
}

if ( ! function_exists( 'burst_get_html_template' ) ) {
	/**
	 * Get a template based on filename, overridable in theme dir
	 *
	 * @param $filename
	 *
	 * @return string
	 */

	function burst_get_html_template( $filename, $args = array() ) {

		$file       = trailingslashit( burst_path ) . 'settings/templates/' . $filename;
		$theme_file = trailingslashit( get_stylesheet_directory() )
		              . trailingslashit( basename( burst_path ) )
		              . 'templates/' . $filename;

		if ( file_exists( $theme_file ) ) {
			$file = $theme_file;
		}

		if ( ! file_exists( $file ) ) {
			return false;
		}

		if ( strpos( $file, '.php' ) !== false ) {
			ob_start();
			require $file;
			$contents = ob_get_clean();
		} else {
			$contents = file_get_contents( $file );
		}

		if ( ! empty( $args ) && is_array( $args ) ) {
			foreach ( $args as $fieldname => $value ) {
				$contents = str_replace( '{' . $fieldname . '}', $value, $contents );
			}
		}

		return $contents;
	}
}

if ( ! function_exists( 'burst_format_milliseconds_to_readable_time' ) ) {
	/**
	 * Format milliseconds to readable time
	 *
	 * @param        $milliseconds
	 * @param string $format
	 *
	 * @return string
	 */
	function burst_format_milliseconds_to_readable_time( $milliseconds, $format = '%02u:%02u:%02u ' ): string {
		$seconds = floor( $milliseconds / 1000 );
		$minutes = floor( $seconds / 60 );
		$hours   = floor( $minutes / 60 );
		$seconds %= 60;
		$minutes %= 60;

		$time = sprintf( $format, $hours, $minutes, $seconds );

		return rtrim( $time, '0' );
	}
}

if ( ! function_exists( 'burst_get_referrer_url' ) ) {
	/**
	 * Get the referrer url
	 *
	 * @return string
	 */
	function burst_get_referrer_url( $unsanitzed_referrer ) {
		$referrer      = esc_url_raw( $unsanitzed_referrer );
		$referrer_url  = parse_url( $referrer, PHP_URL_HOST );
		$ref_spam_list = file( burst_path . 'helpers/referrer-spam-list/spammers.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES );
		if ( in_array( $referrer_url, $ref_spam_list, true ) ) {
			return 'spammer';
		}

        return trailingslashit(esc_url_raw( $unsanitzed_referrer ));
	}
}

if ( ! function_exists( 'burst_format_number' ) ) {
	/**
     * Format number with correct decimal and thousands separator
     *
	 * @param     $number
	 * @param int $precision
	 *
	 * @return string
	 */
	function burst_format_number( $number, int $precision = 2 ): string {
		if ( ! (int) $number ) {
			return '0';
		}
		$number_rounded = round( $number);
		if ( $number < 10000 ) {
			if ( $number_rounded - $number > 0 && $number_rounded - $number < 1 ) { // if difference is less than 1
				return number_format_i18n( $number, $precision ); // return number with specified decimal precision
			}

			return number_format_i18n( $number ); // return number without decimal
		}
		$divisors = array(
			1000 ** 0 => '', // 1000^0 == 1
			1000 ** 1 => 'k', // Thousand - kilo
			1000 ** 2 => 'M', // Million - mega
			1000 ** 3 => 'G', // Billion - giga
			1000 ** 4 => 'T', // Trillion - tera
			1000 ** 5 => 'P', // quadrillion - peta
		);

		// Loop through each $divisor and find the
		// lowest amount that matches
		foreach ( $divisors as $divisor => $shorthand ) {
			if ( abs( $number ) < ( $divisor * 1000 ) ) {
				// We found a match!
				break;
			}
		}
		// We found our match, or there were no matches.
		// Either way, use the last defined value for $divisor.
		$number_rounded = round( $number / $divisor);
		$number         /= $divisor;
		if ( $number_rounded - $number > 0 && $number_rounded - $number < 1 ) { // if difference is less than 1
			return number_format_i18n( $number, $precision ) . $shorthand; // return number with specified decimal precision
		}

		return number_format_i18n( $number ) . $shorthand; // return number without decimal
	}
}

if ( ! function_exists( 'burst_get_current_post_type' ) ) {

	/**
	 * Get the current post type
	 *
	 * @param int $post_id
	 *
	 * @return string|bool
	 */

	function burst_get_current_post_type( $post_id = false ) {
		if ( ! $post_id ) {
			$post_id = burst_get_current_post_id();
		}
		if ( ! $post_id ) {
			return false;
		}

		$post = get_post( $post_id );

		return $post->post_type ?? '';
	}

}

if ( ! function_exists( 'burst_get_current_post_id' ) ) {

	/**
	 * Get the current post type
	 *
	 * @return int
	 */

	function burst_get_current_post_id() {
		$post_id = get_the_ID();

		if ( ! $post_id ) {
			$post_id = isset( $_GET['post'] ) && is_numeric( $_GET['post'] ) ? (int) $_GET['post'] : false;
		}

		return $post_id;
	}
}


/**
 * Get a Burst option by name
 *
 * @param string $name
 * @param mixed $default
 *
 * @return mixed
 */

function burst_get_option( $name, $default=false ) {
	$name = sanitize_title($name);
    $options = get_option( 'burst_options_settings', [] );


	$value = isset($options[$name]) ? $options[$name] : false;
	if ( $value===false && $default!==false ) {
		$value = $default;
	}

	return apply_filters("burst_option_$name", $value, $name);
}

/**
 * Deprecated: Get a Burst option by name, use burst_get_option instead
 * @deprecated 1.3.0
 * @param $name
 * @param $default
 *
 * @return mixed
 */
function burst_get_value( $name, $default = false ) {
	return burst_get_option( $name, $default );
}

if ( ! function_exists( 'burst_intro' ) ) {

	/**
	 * @param string $msg
	 *
	 * @return string|void
	 */

	function burst_intro( $msg ) {
		if ( $msg == '' ) {
			return;
		}
		$html = "<div class='burst-panel burst-notification burst-intro'>{$msg}</div>";

		echo esc_html( $html );

	}
}

if ( ! function_exists( 'burst_notice' ) ) {
	/**
	 * Notification without arrow on the left. Should be used outside notifications center
	 *
	 * @param string $msg
	 * @param string $type notice | warning | success
	 * @param bool   $echo
	 *
	 * @return string|void
	 */
	function burst_notice( $msg, $type = 'notice', $echo = true ) {
		if ( $msg == '' ) {
			return;
		}

		$html = "<div class='burst-panel-wrap'><div class='burst-panel burst-notification burst-{$type}'><div>{$msg}</div></div></div>";

		if ( $echo ) {
			echo esc_html( $html );
		} else {
			return esc_html( $html );
		}
	}
}

if ( ! function_exists( 'burst_admin_notice' ) ) {
	/**
	 * @param $msg
	 *
	 * @return void
	 */
	function burst_admin_notice( $msg ) {
		/**
		 * Prevent notice from being shown on Gutenberg page, as it strips off the class we need for the ajax callback.
		 *
		 * */
		$screen = get_current_screen();
		if ( $screen && $screen->parent_base === 'edit' ) {
			return;
		}
		?>
        <div id="message"
             class="updated fade notice is-dismissible burst-admin-notice really-simple-plugins"
             style="border-left:4px solid #333">
            <div class="burst-admin-notice-container">
                <div class="burst-logo"><img width=80px"
                                             src="<?php echo esc_url( burst_url ) ?>assets/img/icon-logo.svg"
                                             alt="logo">
                </div>
                <div style="margin-left:30px">
					<?php echo wp_kses_post( $msg ) ?>
                </div>
            </div>
        </div>
		<?php

	}
}

if ( ! function_exists( 'burst_panel' ) ) {
	/**
	 * @param $title
	 * @param $html
	 * @param $custom_btn
	 * @param $validate
	 * @param $echo
	 * @param $open
	 *
	 * @return string|void
	 */
	function burst_panel( $title, $html, $custom_btn = '', $validate = '', $echo = true, $open = false ) {
		if ( $title == '' ) {
			return '';
		}

		$open_class = $open ? 'style="display: block;"' : '';

		$output = '
        <div class="burst-panel burst-slide-panel burst-toggle-active">
            <div class="burst-panel-title">

                <span class="burst-panel-toggle">
                    ' . burst_icon( 'arrow-right', 'default' ) . '
                    <span class="burst-title">' . $title . '</span>
                 </span>
                <span>' . $validate . '</span>
                <span>' . $custom_btn . '</span>
            </div>
            <div class="burst-panel-content" ' . $open_class . '>
                ' . $html . '
            </div>
        </div>';

		if ( $echo ) {
			echo wp_kses_post( $output );
		} else {
			return $output;
		}

	}
}

if ( ! function_exists( 'burst_get_anon_ip_address' ) ) {
	/**
	 * Get anon ip address
	 * @return string
	 */
	function burst_get_anon_ip_address(): string {
		$ip = burst_get_ip_address();

		return BURST()->anonymize_IP->anonymizeIp( $ip );
	}
}

if ( ! function_exists( 'burst_sprintf' ) ) {
	/**
	 * @param string $format
	 * @param mixed  $values
	 *
	 * @return string
	 *
	 * We use this custom sprintf for outputting translatable strings. This function only works with %s
	 * This function wraps the sprintf and will prevent fatal errors.
	 */
	function burst_sprintf(): string {
		$args             = func_get_args();
		$count            = substr_count( $args[0], '%s' );
		$count_percentage = substr_count( $args[0], '%' );
		$args_count       = count( $args ) - 1;

		if ( $count_percentage === $count ) {
			if ( $args_count === $count ) {
				return call_user_func_array( 'sprintf', $args );
			}
		}

		return $args[0] . ' (Translation error)';
	}
}

if ( ! function_exists( 'burst_printf' ) ) {
	/**
	 * @param string $format
	 * @param mixed  $values
	 *
	 * @echo string
	 */
	function burst_printf() {
		$args       = func_get_args();
		$count      = substr_count( $args[0], '%s' );
		$args_count = count( $args ) - 1;

		if ( $args_count === $count ) {
			$string = call_user_func_array( 'sprintf', $args );
			echo wp_kses_post( $string );
		} else {
			echo wp_kses_post( $args[0] ) . ' (Translation error)';
		}
	}
}


if ( ! function_exists( 'burst_get_date_ranges' ) ) {
	function burst_get_date_ranges() {
		return apply_filters( 'burst_date_ranges', array(
			'today',
			'yesterday',
			'last-7-days',
			'last-30-days',
			'last-90-days',
			'last-month',
            'last-year',
			'week-to-date',
			'month-to-date',
            'year-to-date',
		) );
	}
}

if ( ! function_exists('burst_sanitize_filters') ) {
    function burst_sanitize_filters( $filters ) {
        // sanitize key value pairs, but value can also be an array. Just one layer deep though. Also remove keys where value is empty. Also add comments to explain the code
        $filters = array_filter( $filters, static function( $item ) {
            return $item !== false && $item !== '';
        } );

        foreach ( $filters as $key => $value ) {
            if ( is_array( $value ) ) {
                $filters[ $key ] = array_map( 'sanitize_text_field', $value );
            } else {
                $filters[ $key ] = sanitize_text_field( $value );
            }
        }

        return $filters;
    }
}

if ( ! function_exists( 'burst_sanitize_relative_url' ) ) {
	/**
	 * Sanitize relative_url
	 *
	 * @param string $relative_url
	 *
	 * @return string
	 */
	function burst_sanitize_relative_url( $relative_url ): string {
        if ( empty( $relative_url ) ) {
            return '*';
        }
		if ( $relative_url[0] !== '/' ) {
			$relative_url = '/' . $relative_url;
		}
		return trailingslashit( filter_var( $relative_url, FILTER_SANITIZE_URL ) );
	}
}

if ( ! function_exists( 'burst_tracking_status_error' ) ) {
	/**
	 * Get tracking status message
	 *
	 * @return bool
	 */
	function burst_tracking_status_error() {
		return BURST()->endpoint->get_tracking_status() === 'error';
	}
}

if ( ! function_exists( 'burst_get_tracking_status' ) ) {
    function burst_get_tracking_status() {
        return BURST()->endpoint->get_tracking_status();
    }
}

if ( ! function_exists( 'burst_tracking_status_rest_api' ) ) {
	/**
	 * Get tracking status message
	 *
	 * @return bool
	 */
	function burst_tracking_status_rest_api() {
		return BURST()->endpoint->get_tracking_status() === 'rest';
	}
}

if ( ! function_exists( 'burst_tracking_status_beacon' ) ) {
	/**
	 * Get tracking status message
	 *
	 * @return bool
	 */
	function burst_tracking_status_beacon() {
		return BURST()->endpoint->get_tracking_status() === 'beacon';
	}
}

if ( ! function_exists( 'burst_get_beacon_url' ) ) {
    /**
     * Get beacon path
     *
     * @return string
     */
    function burst_get_beacon_url(): string {
        if ( is_multisite() && burst_is_networkwide_active() ) {
            if ( is_main_site() ) {
	            return burst_url . 'beacon.php';
            } else {
                //replace the subsite url with the main site url in burst_url
                //get main site_url
                $main_site_url = get_site_url(get_main_site_id());
                return str_replace(site_url(), $main_site_url, burst_url) . 'endpoint.php';
            }
        }
        return burst_url . 'endpoint.php';
    }
}

if ( ! function_exists( 'burst_get_rest_url' ) ) {
	/**
	 * Get beacon path
	 *
	 * @return string
	 */
	function burst_get_rest_url(): string {
		if ( is_multisite() && burst_is_networkwide_active() ) {
			if ( is_main_site() ) {
				return get_rest_url();
			} else {
				//replace the subsite url with the main site url in burst_url
				//get main site_url
				return get_rest_url(get_main_site_id());
			}
		}
		return burst_url . 'endpoint.php';
	}
}

if ( ! function_exists( 'burst_remote_file_exists' ) ) {
	function burst_remote_file_exists( $url ) {
		$ch = curl_init();
		curl_setopt( $ch, CURLOPT_URL, $url );
		// don't download content
		curl_setopt( $ch, CURLOPT_NOBODY, 1 );
		curl_setopt( $ch, CURLOPT_FAILONERROR, 1 );
		curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1 );

		$result = curl_exec( $ch );
		curl_close( $ch );

		return $result !== false;
	}
}

if ( ! function_exists('burst_upload_dir')) {
	/**
	 * Get the upload dir
	 *
	 * @param string $path
	 *
	 * @return string
	 */
	function burst_upload_dir( string $path=''): string {
		$uploads    = wp_upload_dir();
		$upload_dir = trailingslashit( apply_filters( 'burst_upload_dir', $uploads['basedir'] ) ).'burst/'.$path;
		if ( !is_dir( $upload_dir)  ) {
			burst_create_missing_directories_recursively($upload_dir);
		}

		return trailingslashit( $upload_dir );
	}
}


/**
 * Create directories recursively
 *
 * @param string $path
 */

if ( !function_exists('burst_create_missing_directories_recursively') ) {
	function burst_create_missing_directories_recursively( string $path ) {
		if ( ! burst_user_can_manage() ) {
			return;
		}

		$parts = explode( '/', $path );
		$dir   = '';
		foreach ( $parts as $part ) {
			$dir .= $part . '/';
			if (burst_has_open_basedir_restriction($dir)) {
				continue;
			}
			if ( ! is_dir( $dir ) && strlen( $dir ) > 0 && is_writable( dirname( $dir, 1 ) ) ) {
				if ( ! mkdir( $dir ) && ! is_dir( $dir ) ) {
					throw new \RuntimeException( sprintf( 'Directory "%s" was not created', $dir ) );
				}
			}
		}
	}
}


if (!function_exists('burst_has_open_basedir_restriction')) {
	function burst_has_open_basedir_restriction($path) {
		// Default error handler is required
		set_error_handler(null);
		// Clean last error info.
		error_clear_last();
		// Testing...
		@file_exists($path);
		// Restore previous error handler
		restore_error_handler();
		// Return `true` if error has occurred
		return ($error = error_get_last()) && $error['message'] !== '__clean_error_info';
	}
}
