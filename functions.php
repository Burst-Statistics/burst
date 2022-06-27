<?php

use burst\UserAgent\UserAgentParser;

defined( 'ABSPATH' ) or die( "you do not have acces to this page!" );

if ( ! function_exists( 'burst_user_can_view' ) ) {
    /**
     * Check if user has Burst permissions
     * @return boolean true or false
     */
    function burst_user_can_view() {
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
	function burst_user_can_manage() {
		if ( ! is_user_logged_in() ) {
			return false;
		}
		if ( ! current_user_can( 'manage_burst_statistics' ) ) {
			return false;
		}

		return true;
	}
}

if ( !function_exists( 'burst_setcookie') ) {
	function burst_setcookie( $key, $value, $expiration_days ){
		$options = array (
			'expires' => time() + (DAY_IN_SECONDS * apply_filters('burst_cookie_retention', $expiration_days) ),
			'path' => '/',
			'secure' => is_ssl(),
			'samesite' => 'Lax' // None || Lax  || Strict
		);

		setcookie($key, $value, $options );
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
	function burst_read_more( $url, $add_space = true ) {
		$html
			= burst_sprintf( __( "For more information on this subject, please read this %sarticle%s", 'burst-statistics' ), '<a target="_blank" href="' . $url . '">',
			'</a>' );
		if ( $add_space ) {
			$html = '&nbsp;' . $html;
		}

		return $html;
	}
}
if ( ! function_exists( 'burst_get_template' ) ) {
	/**
	 * Get a template based on filename, overridable in theme dir
	 * @param $filename
	 *
	 * @return string
	 */

	function burst_get_template( $filename , $args = array() ) {

		$file       = trailingslashit( burst_path ) . 'templates/' . $filename;
		$theme_file = trailingslashit( get_stylesheet_directory() )
		              . trailingslashit( basename( burst_path ) )
		              . 'templates/' . $filename;

		if ( file_exists( $theme_file ) ) {
			$file = $theme_file;
		}

		if ( !file_exists($file) ) {
			return false;
		}

		if ( strpos( $file, '.php' ) !== false ) {
			ob_start();
			require $file;
			$contents = ob_get_clean();
		} else {
			$contents = file_get_contents( $file );
		}

		if ( !empty($args) && is_array($args) ) {
			foreach($args as $fieldname => $value ) {
				$contents = str_replace( '{'.$fieldname.'}', $value, $contents );
			}
		}

		return $contents;
	}
}

if ( ! function_exists( 'burst_array_filter_multidimensional' ) ) {
	function burst_array_filter_multidimensional(
		$array, $filter_key, $filter_value
	) {
		$new = array_filter( $array,
			function ( $var ) use ( $filter_value, $filter_key ) {
				return isset( $var[ $filter_key ] ) ? ( $var[ $filter_key ]
				                                        == $filter_value )
					: false;
			} );

		return $new;
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
		$date              = str_replace( $weekday, $weekday_localized, $date );

		return $date;
	}
}


if ( ! function_exists( 'burst_display_date' ) ) {
    /**
     * @param $date UNIX
     * @return string
     */
	function burst_display_date( $date ) {
		$display_date = date_i18n(get_option( 'date_format' ), $date);
		return $display_date;
	}
}

if ( ! function_exists( 'burst_format_milliseconds_to_readable_time' ) ) {
    /**
     * Format milliseconds to readable time
     *
     * @param $milliseconds
     * @param string $format
     * @return string
     */
    function burst_format_milliseconds_to_readable_time( $milliseconds, $format = '%02u:%02u:%02u ' )
    {
        $seconds = floor($milliseconds / 1000);
        $minutes = floor($seconds / 60);
        $hours = floor($minutes / 60);
        $milliseconds = $milliseconds % 1000;
        $seconds = $seconds % 60;
        $minutes = $minutes % 60;

        $time = sprintf($format, $hours, $minutes, $seconds, $milliseconds);
        return rtrim($time, '0');
    }
}


if ( ! function_exists( 'burst_offset_utc_time_to_gtm_offset' ) ) {
    function burst_offset_utc_time_to_gtm_offset($utc_time)
    {
        $utc_time = intval($utc_time);
        $gmt_offset_seconds = intval(get_option('gmt_offset') * HOUR_IN_SECONDS);

        return $utc_time - $gmt_offset_seconds;
    }
}

if ( ! function_exists( 'burst_sanitize_uid' ) ) {
	/**
     * Sanitize a UID
	 * @param $uid
	 *
	 * @return false|string
	 */
	function burst_sanitize_uid( $uid ) {
		if ( ! preg_match( '/^[a-z0-9-]*/', $uid ) ) {
			return false;
		}
		return $uid;
	}
}

if ( ! function_exists( 'burst_format_number' ) ) {
    /**
     * Format number with correct decimal and thousands separator
     *
     * @param $number
     * @param int $precision
     * @return int|string
     */
    function burst_format_number( $number, $precision = 2 ) {
        if (!intval($number)) return '0';
        $number_rounded = round( $number, 0 );
        if ( $number < 10000 ){
            if ($number_rounded - $number > 0 && $number_rounded - $number < 1) { // if difference is less than 1
                return number_format_i18n($number, $precision); // return number with specified decimal precision
            } else {
                return number_format_i18n($number, 0); // return number without decimal
            }
        }
        $divisors = array(
            pow(1000, 0) => '', // 1000^0 == 1
            pow(1000, 1) => 'k', // Thousand - kilo
            pow(1000, 2) => 'M', // Million - mega
            pow(1000, 3) => 'G', // Billion - giga
            pow(1000, 4) => 'T', // Trillion - tera
            pow(1000, 5) => 'P', // quadrillion - peta
        );

        // Loop through each $divisor and find the
        // lowest amount that matches
        foreach ($divisors as $divisor => $shorthand) {
            if (abs($number) < ($divisor * 1000)) {
                // We found a match!
                break;
            }
        }
        // We found our match, or there were no matches.
        // Either way, use the last defined value for $divisor.
        $number_rounded = round( $number / $divisor, 0 );
        $number = $number / $divisor;
        if ($number_rounded - $number > 0 && $number_rounded - $number < 1) { // if difference is less than 1
            return number_format_i18n($number, $precision) . $shorthand; // return number with specified decimal precision
        } else {
            return number_format_i18n($number, 0) . $shorthand; // return number without decimal
        }
    }
}

if ( ! function_exists( 'burst_get_current_post_type' ) ) {

	/**
	 * Get the current post type
	 * @param int $post_id
	 *
	 * @return string|bool
	 */
	
	function burst_get_current_post_type($post_id = false){
		if (!$post_id) {
			$post_id = burst_get_current_post_id();			
		}
		if (!$post_id) return false;

		$post = get_post($post_id);
		if (!$post) return false;

		return $post->post_type;
	}

}

if ( ! function_exists( 'burst_get_current_post_id' ) ) {

	/**
	 * Get the current post type
	 * @param $post_id
	 *
	 * @return string
	 */
	
	function burst_get_current_post_id(){
		$post_id = get_the_ID();
		
		if ( !$post_id ){
			$post_id = isset($_GET['post']) && is_numeric($_GET['post']) ? intval($_GET['post']) : false;
		}

		return $post_id;
	}
}

if ( ! function_exists( 'burst_get_value' ) ) {

    /**
     * Get value for an a burst option
     * For usage very early in the execution order, use the $page option. This bypasses the class usage.
     *
     * @param string $fieldname
     * @param bool|int $post_id
     * @param bool|string $page
     * @param bool $use_default
     * @param bool $use_translate
     *
     * @return array|bool|mixed|string
     */

    function burst_get_value(
        $fieldname, $post_id = false, $page = false, $use_default = true, $use_translate = true
    ) {
        if ( ! is_numeric( $post_id ) ) {
            $post_id = false;
        }

        if ( ! $page && ! isset( BURST::$config->fields[ $fieldname ] ) ) {
            return false;
        }

        //if  a post id is passed we retrieve the data from the post
        if ( ! $page ) {
            $page = BURST::$config->fields[ $fieldname ]['source'];
        }
        if ( $post_id && ( $page !== 'wizard' ) ) {
            $value = get_post_meta( $post_id, $fieldname, true );
        } else {
            $fields = get_option( 'burst_options_' . $page );

            $default = ( $use_default && $page && isset( BURST::$config->fields[ $fieldname ]['default'] ) )
                ? BURST::$config->fields[ $fieldname ]['default'] : '';
            //@todo $default = apply_filters( 'burst_default_value', $default, $fieldname );

            $value   = isset( $fields[ $fieldname ] ) ? $fields[ $fieldname ] : $default;
        }

        /*
         * Translate output
         *
         * */
        if ($use_translate) {

            $type = isset(BURST::$config->fields[$fieldname]['type'])
                ? BURST::$config->fields[$fieldname]['type'] : false;
            if ($type === 'cookies' || $type === 'thirdparties'
                || $type === 'processors'
            ) {
                if (is_array($value)) {

                    //this is for example a cookie array, like ($item = cookie("name"=>"_ga")

                    foreach ($value as $item_key => $item) {
                        //contains the values of an item
                        foreach ($item as $key => $key_value) {
                            if (function_exists('pll__')) {
                                $value[$item_key][$key] = pll__($item_key . '_'
                                    . $fieldname
                                    . "_" . $key);
                            }
                            if (function_exists('icl_translate')) {
                                $value[$item_key][$key]
                                    = icl_translate('burst',
                                    $item_key . '_' . $fieldname . "_" . $key,
                                    $key_value);
                            }

                            $value[$item_key][$key]
                                = apply_filters('wpml_translate_single_string',
                                $key_value, 'burst',
                                $item_key . '_' . $fieldname . "_" . $key);
                        }
                    }
                }
            } else {
                if (isset(BURST::$config->fields[$fieldname]['translatable'])
                    && BURST::$config->fields[$fieldname]['translatable']
                ) {
                    if (function_exists('pll__')) {
                        $value = pll__($value);
                    }
                    if (function_exists('icl_translate')) {
                        $value = icl_translate('burst', $fieldname, $value);
                    }

                    $value = apply_filters('wpml_translate_single_string', $value, 'burst-statistics', $fieldname);
                }
            }

        }

        return $value;
    }
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

        echo esc_html($html);

    }
}

if ( ! function_exists( 'burst_notice' ) ) {
    /**
     * Notification without arrow on the left. Should be used outside notifications center
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
            echo esc_html($html);
        } else {
            return esc_html($html);
        }
    }
}

if ( ! function_exists( 'burst_conclusion' ) ) {
    /**
     * Conclusion list drop down
     * @param string $msg
     * @param string $type notice | warning | success
     * @param bool   $echo
     *
     * @return string|void
     */
    function burst_conclusion( $title, $conclusions, $animate = true, $echo = true ) {
        if ( is_array( $conclusions ) == false ) {
            return;
        }

        ob_start();

        echo esc_html('<div id="burst-conclusion"><h3>' . $title . '</h3><ul class="burst-conclusion__list">');
        foreach($conclusions as $conclusion) {
            $icon = $animate ? 'icon-loading' : 'icon-' . $conclusion['report_status'];
            $displayOpac = $animate ? 'style="opacity: 0"' : '';
            $display = $animate ? 'style="display: none"' : '';
            echo esc_html('<li ' . $displayOpac . 'class="burst-conclusion__check '  .$icon . '" data-status="' . $conclusion['report_status'] . '">');
            if ($animate) echo esc_html('<p class="burst-conclusion__check--check-text">' . $conclusion['check_text'] . '</p>');
            echo esc_html('<p ' . $display . ' class="burst-conclusion__check--report-text">' . $conclusion['report_text'] . '</p>');
            echo '</li>';
        }
        echo'</ul></div>';
        if ($animate) {
            ?>
            <script>
                jQuery('.burst-conclusion__check--report-text').hide();
                // We initialise this to the first text element
                var firstText = jQuery(".burst-conclusion__check:first-child");
                var time = 0;
                var timeSmall = 0;

                jQuery(".burst-conclusion__check").each(function(){
                    jQuery(firstText).css('opacity', 1);
                    var that = this;
                    time += getRandomInt(5, 10) * 100;;
                    setTimeout( function(){
                        setTimeout( function() {

                            //jQuery(that).text(jQuery(that).data('text'));

                            jQuery(that).removeClass('icon-loading').addClass('icon-' + jQuery(that).data('status'));
                            jQuery(that).find('.burst-conclusion__check--check-text').hide();
                            jQuery(that).find('.burst-conclusion__check--report-text').show();
                            jQuery(that).next().css('opacity', 1);
                        }, timeSmall );
                        timeSmall = getRandomInt(5, 10) * 100;
                    }, time);

                });

                function getRandomInt(min, max) {
                    min = Math.ceil(min);
                    max = Math.floor(max);
                    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
                }

            </script>
            <?php
        }
        $html = ob_get_clean();

        if ( $echo ) {
            echo esc_html($html);
        } else {
            return esc_html($html);
        }
    }
}

if ( ! function_exists( 'burst_sidebar_notice' ) ) {
    /**
     * @param string $msg
     * @param string $type notice | warning | success
     * @param bool|array  $condition
     *
     * @return string|void
     */

    function burst_sidebar_notice( $msg, $type = 'notice', $condition = false ) {
        if ( $msg == '' ) {
            return;
        }

        // Condition
        $condition_check = "";
        $condition_question = "";
        $condition_answer = "";
        $burst_hidden = "";
        if ($condition) {
            //get first
            $questions = array_keys($condition);
            $question = reset($questions);
            $answer = reset($condition);
            $condition_check = "condition-check-1";
            $condition_question = "data-condition-question-1='{$question}'";
            $condition_answer = "data-condition-answer-1='{$answer}'";
            $args = array('condition'=> $condition);
            $burst_hidden = burst_field::this()->condition_applies( $args ) ? "" : "burst-hidden";;
        }

        echo esc_html("<div class='burst-help-modal burst-notice burst-{$type} {$burst_hidden} {$condition_check}' {$condition_question} {$condition_answer}>{$msg}</div>");
    }
}

if ( !function_exists('burst_admin_notice')) {
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
                                             src="<?php echo esc_url(burst_url) ?>assets/images/icon-logo.svg"
                                             alt="logo">
                </div>
                <div style="margin-left:30px">
                    <?php echo wp_kses_post($msg) ?>
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
    function burst_panel($title, $html, $custom_btn = '', $validate = '', $echo = true, $open = false) {
        if ( $title == '' ) {
            return '';
        }

        $open_class = $open ? 'style="display: block;"' : '';

        $output = '
        <div class="burst-panel burst-slide-panel burst-toggle-active">
            <div class="burst-panel-title">

                <span class="burst-panel-toggle">
                    '. burst_icon('arrow-right', 'default') .'
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
            echo wp_kses_post($output);
        } else {
            return $output;
        }

    }
}

if ( ! function_exists( 'burst_update_option' ) ) {
    /**
     * Save a burst option
     * @param string $page
     * @param string $fieldname
     * @param mixed $value
     */
    function burst_update_option( $page, $fieldname, $value ) {
        $options               = get_option( 'burst_options_' . $page );
        $options[ $fieldname ] = $value;
        if ( ! empty( $options ) ) {
            update_option( 'burst_options_' . $page, $options );
        }
    }
}

if ( ! function_exists( 'burst_get_anon_ip_address' ) ) {
    /**
     * Get anon ip address
     * @return string
     */
    function burst_get_anon_ip_address()
    {
        $ip = burst_get_ip_address();
        $anon_ip = BURST::$anonymize_IP->anonymizeIp($ip);
        return $anon_ip;
    }
}
if ( ! function_exists( 'burst_get_ip_address' ) ) {
    /**
     * Get IP address
     * @return string
     */
	function burst_get_ip_address()
	{
		if ( !empty( $_SERVER['HTTP_CLIENT_IP'] ) ) {
			$ip = $_SERVER['HTTP_CLIENT_IP'];
		} elseif ( !empty( $_SERVER['HTTP_X_FORWARDED_FOR'] ) ) {
			$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
		} else {
			$ip = $_SERVER['REMOTE_ADDR'];
		}
		return $ip;
	}
}

if ( ! function_exists( 'burst_get_user_agent_data' ) ) {
	/**
     * Get user agent data
	 * @param $user_agent
	 *
	 * @return null[]|string[]
	 */
    function burst_get_user_agent_data($user_agent){
        $ua = \burst\UserAgent\parse_user_agent($user_agent);

        switch ($ua['platform']) {
            case 'Macintosh':
            case 'Chrome OS':
            case 'Linux':
            case 'Windows':
            $ua['device'] = 'desktop';
                break;
            case 'Android':
            case 'BlackBerry':
            case 'iPhone':
            case 'Windows Phone':
            case 'Sailfish':
            case 'Symbian':
            case 'Tizen':
            $ua['device'] = 'mobile';
                break;
            case 'iPad':
                $ua['device'] = 'tablet';
                break;
            case 'PlayStation 3':
            case 'PlayStation 4':
            case 'PlayStation 5':
            case 'PlayStation Vita':
            case 'Xbox':
            case 'Xbox One':
            case 'New Nintendo 3DS':
            case 'Nintendo 3DS':
            case 'Nintendo DS':
            case 'Nintendo Switch':
            case 'Nintendo Wii':
            case 'Nintendo WiiU':
            case 'iPod':
            case 'Kindle':
            case 'Kindle Fire':
            case 'NetBSD':
            case 'OpenBSD':
            case 'PlayBook':
            case 'FreeBSD':
            default:
                $ua['device'] = 'other';
                break;
        }
        return $ua;
    }
}

if ( ! function_exists( 'burst_sprintf' ) ) {
    /**
     * @param string $format
     * @param mixed $values
     * @return string
     *
     * We use this custom sprintf for outputting translatable strings. This function only works with %s
     * This function wraps the sprintf and will prevent fatal errors.
     */
    function burst_sprintf(){
        $args = func_get_args();
        $count = substr_count($args[0], '%s');
        $count_percentage = substr_count($args[0], '%');
        $args_count = count($args) - 1;

        if ($count_percentage === $count){
            if ($args_count === $count){
                $string = call_user_func_array('sprintf', $args);
                return $string;
            }
        }
        return $args[0] .  ' (Translation error)';
    }
}

if ( ! function_exists( 'burst_printf' ) ) {
    /**
     * @param string $format
     * @param mixed $values
     * @echo string
     */
    function burst_printf(){
        $args = func_get_args();
        $count = substr_count($args[0], '%s');
        $args_count = count($args) - 1;

        if ($args_count === $count){
            $string = call_user_func_array('sprintf', $args);
            echo wp_kses_post($string);
        } else {
            echo wp_kses_post($args[0]) .  ' (Translation error)';
        }
    }
}


if ( !function_exists('burst_get_date_ranges')) {
	function burst_get_date_ranges(){
		return apply_filters('burst_date_ranges',array(
			'yesterday',
			'last-7-days',
			'last-30-days',
			'last-90-days',
			'last-month',
			'custom'
		));
	}
}

if ( !function_exists('burst_sanitize_date_range')) {
	function burst_sanitize_date_range($date_range){
		$date_range = sanitize_title($date_range);
		$date_ranges = burst_get_date_ranges();
		if ( in_array($date_range, $date_ranges) ){
			return $date_range;
		}
		return 'custom';
	}
}