<?php
if ( ! defined( 'ABSPATH' ) ) {
	die();
}

class burst_tour {
	private static $_this;
	public $capability = 'activate_plugins';

	function __construct() {
		if ( isset( self::$_this ) ) {
			wp_die( burst_sprintf( '%s is a singleton class and you cannot create a second instance.', get_class( $this ) ) );
		}

		self::$_this = $this;
		add_action( 'wp_ajax_burst_cancel_tour', array( $this, 'listen_for_cancel_tour' ) );
		add_action( 'admin_init', array( $this, 'restart_tour' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_assets' ) );
	}

	static function this() {
		return self::$_this;
	}

	/**
	 * Enqueue our assets
	 * @param $hook
	 */
	public function enqueue_assets( $hook ) {
		if ( get_site_option( 'burst_tour_started' ) ) {

			wp_register_script( 'burst-tether', burst_url . 'shepherd/tether/tether.min.js', "", burst_version );
			wp_enqueue_script( 'burst-tether' );
			wp_register_script( 'burst-shepherd', burst_url . 'shepherd/tether-shepherd/shepherd.min.js', "", burst_version );
			wp_enqueue_script( 'burst-shepherd' );
			wp_register_style( 'burst-shepherd', burst_url . "shepherd/css/shepherd-theme-arrows.min.css", "", burst_version );
			wp_enqueue_style( 'burst-shepherd' );
			wp_register_style( 'burst-shepherd-tour', burst_url . "shepherd/css/tour.min.css", "", burst_version );
			wp_enqueue_style( 'burst-shepherd-tour' );
			wp_register_script( 'burst-shepherd-tour', burst_url . 'shepherd/js/tour.js', array( 'jquery' ), burst_version );
			wp_enqueue_script( 'burst-shepherd-tour' );

			$logo  = '<span class="burst-tour-logo"><img class="burst-tour-logo" style="width: 70px; height: 70px;" src="' . burst_url . 'assets/images/burst-logo.svg"></span>';
			$html  = '<div class="burst-tour-logo-text">' . $logo . '<span class="burst-tour-text">{content}</span></div>';
			$steps = array(
				array(
					'title'  => burst_sprintf(__( 'Welcome to %s', 'burst-statistics' ), burst_plugin_name),
					'text'   => burst_sprintf(__( "%s is now active.", 'burst-statistics'), burst_plugin_name ) . ' '.  __("Follow a quick tour and make sure everything works.", 'burst-statistics' ),
					'link'   => admin_url( "plugins.php" ),
					'attach' => '.burst-settings-link',
					'position' => 'right',
				),
				array(
					'title'  => __( 'Your dashboard', 'burst-statistics' ),
					'text'   => __( "This is your Dashboard. This will give you an overview of notices, real time data, and settings", 'burst-statistics' ),
					'link'   => admin_url( "index.php?page=burst" ),
					'attach' => '.burst-progress',
					'position' => 'right',
				),
                array(
                    'title'  => __( 'Real time data', 'burst-statistics' ),
                    'text'   => __( "This block will show you real time visitors.", 'burst-statistics' ) . ' ' .  burst_sprintf(__( "To make sure %s is setup properly, try visiting this website on another device or open a private window.", 'burst-statistics' ), burst_plugin_name),
                    'link'   => admin_url( "index.php?page=burst" ),
                    'attach' => '.burst-real-time',
                    'position' => 'right',
                ),
                array(
                    'title'  => __( 'Real time visitors', 'burst-statistics' ),
                    'text'   => __( "Did you visit your website on another device? This number should change. If that is not the case, feel free to open a support thread.", 'burst-statistics' ),
                    'link'   => admin_url( "index.php?page=burst" ),
                    'attach' => '.burst-real-time .block__big-number__right',
                    'position' => 'right',
                ),
				array(
					'title'  => __( "Your website statistics", "burst-statistics" ),
					'text'   => __( "This page is probably quite empty at the moment. The data from your website will show up here in a few days. So be sure to come back soon.", 'burst-statistics' ),
					'link'   => admin_url( "index.php?page=burst&burst-page=statistics" ),
					'attach' => '.burst-insights-chart',
					'position' => 'right',
				),
                array(
                    'title'  => __( "Changing the period", "burst-statistics" ),
                    'text'   => __( "Over here you can change the date range for the data being shown. Click on to different days or click twice on a single day to show the data for that period.", 'burst-statistics' ),
                    'link'   => admin_url( "index.php?page=burst&burst-page=statistics" ),
                    'attach' => '.burst-date-container',
                    'position' => 'bottom',
                ),
                array(
                    'title'  => __( 'Support & feedback', 'burst-statistics' ),
                    'text'   => __( "Feel free to post your questions or feedback on the WordPress forums. We are happy to help!", 'burst-statistics' ),
                    'link'   => admin_url( "index.php?page=burst&burst-page=statistics" ),
                    'attach' => '.burst-header-right .button',
                    'position' => 'auto',
                ),
			);

			$steps = apply_filters( 'burst_shepherd_steps', $steps );
			wp_localize_script( 'burst-shepherd-tour', 'burst_tour',
				array(
					'ajaxurl'        => admin_url( 'admin-ajax.php' ),
					'html'           => $html,
					'token'          => wp_create_nonce( 'burst_tour_nonce' ),
					'nextBtnText'    => __( "Next", "burst-statistics" ),
					'backBtnText'    => __( "Previous", "burst-statistics" ),
					'configure_text' => __( "Skip tour", "burst-statistics" ),
					'configure_link' => admin_url( "index.php?page=burst" ),
					'startTour'      => __( "Start tour", "burst-statistics" ),
					'endTour'        => __( "End tour", "burst-statistics" ),
					'steps'          => $steps,
				) );
		}
	}

	/**
	 *
	 * @since 1.0
	 *
	 * When the tour is cancelled, a post will be sent. Listen for post and update tour cancelled option.
	 *
	 */

	public function listen_for_cancel_tour() {
		if ( ! isset( $_POST['token'] )
		     || ! wp_verify_nonce( $_POST['token'], 'burst_tour_nonce' )
		) {
			return;
		}
		update_site_option( 'burst_tour_started', false );
		update_site_option( 'burst_tour_shown_once', true );
	}

	/**
	 * Restart the tour
	 */
	public function restart_tour() {
		if ( ! isset( $_POST['burst_restart_tour'] ) ) {
			return;
		}

		if ( ! current_user_can( 'view_burst_statistics' ) ) {
			return;
		}

		if ( ! isset( $_POST['burst_nonce'] )
		     || ! wp_verify_nonce( $_POST['burst_nonce'], 'burst_save' )
		) {
			return;
		}

		update_site_option( 'burst_tour_started', true );
		wp_redirect( admin_url( 'plugins.php' ) );
		exit;
	}

}
