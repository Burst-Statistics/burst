<?php
defined( 'ABSPATH' ) or die( "you do not have acces to this page!" );
if ( ! class_exists( "burst_admin" ) ) {
	class burst_admin {
		private static $_this;
		public $error_message = "";
		public $success_message = "";
		public $grid_items;
		public $default_grid_item;
		function __construct() {
			if ( isset( self::$_this ) ) {
				wp_die( sprintf( '%s is a singleton class and you cannot create a second instance.',
					get_class( $this ) ) );
			}

			self::$_this = $this;
			$this->default_grid_item = array(
				'title' => '',
				'class' => '',
				'type' => '',
				'can_hide' => false,
				'controls' => '',
				'page' => '',
				'body' => '',
			);
			add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_assets' ) );
			add_action( 'admin_menu', array( $this, 'register_admin_page' ), 20 );
            add_filter( 'submenu_file', array( $this, 'burst_wp_admin_submenu_filter' ), 20 );

			$plugin = burst_plugin;
			add_filter( "plugin_action_links_$plugin", array( $this, 'plugin_settings_link' ) );
			//multisite
			add_filter( "network_admin_plugin_action_links_$plugin", array( $this, 'plugin_settings_link' ) );
			add_action( 'admin_init', array( $this, 'check_upgrade' ), 10, 2 );

			add_action( 'admin_init', array($this, 'init_grid') );
//			add_action( 'edit_form_top', array( $this, 'add_experiment_info_below_title' ));
			add_action( 'admin_init', array($this, 'hide_wordpress_and_other_plugin_notices') );

			add_action( 'wp_ajax_burst_load_status_info', array( $this, 'ajax_load_status_info') );

			// deactivating
			add_action( 'admin_footer', array($this, 'deactivate_popup'), 40);
			add_action( 'admin_init', array($this, 'listen_for_deactivation'), 40);
			add_action( 'admin_bar_menu', array($this, 'add_admin_bar_item'), 500 );
		}

		static function this() {
			return self::$_this;
		}

        /**
         * Add admin bar for displaying if a test is running on the page
         *
         */
        public function add_admin_bar_item ( WP_Admin_Bar $admin_bar ) {
            if ( ! burst_user_can_manage() ) {
                return;
            }
            $active_experiments = burst_get_experiments(array( 'status' => 'active' ));
            $count = count($active_experiments);
            $color = $count > 0 ? 'rsp-green' : 'grey';
            $icon = '<span class="burst-bullet '. $color .'"></span>';
            $title =  burst_plugin_name;
            if ( $count > 0 ) {
                $title .= ' | ' . sprintf( __( '%s active experiments', 'burst' ), $count );
            }

            wp_register_style( 'burst-admin-bar',
                trailingslashit( burst_url ) . 'assets/css/admin-bar.css', "",
                burst_version );
            wp_enqueue_style( 'burst-admin-bar' );

            $admin_bar->add_menu( array(
                'id'    	=> 'burst',
                'parent' 	=> null,
                'group'  	=> null,
                'title' 	=> $icon . '<span class="burst-top-menu-text">'. $title .'</span>', //you can use img tag with image link. it will show the image icon Instead of the title.
                'href'  	=> admin_url('admin.php?page=burst'),
                'meta' 		=> [
                    'title' => __( $title, 'burst' ), //This title will show on hover
                ]
            ) );

            $admin_bar->add_menu(array(
                'id'     	=> 'burst-results',
                'parent' 	=> 'burst',
                'title'  	=> __( 'Dashboard', 'burst' ),
                'href'   	=> admin_url( 'admin.php?page=burst' ),
            ) );

            // if experiments are active display them here
            if ($count > 0) {
                $admin_bar->add_menu(array(
                    'id'     	=> 'burst-active-experiments',
                    'parent' 	=> 'burst',
                    'title'  	=> __( 'Active experiments', 'burst' ),
                    'href'   	=> admin_url( 'admin.php?page=burst' ),
                ) );

                // loop through active experiments and add to top menu
                foreach ($active_experiments as $experiment) {
                    $experiment = new BURST_EXPERIMENT($experiment->ID);
                    $admin_bar->add_menu(array(
                        'id'     	=> 'burst-add-experiment-'. $experiment->id,
                        'parent' 	=> 'burst-active-experiments',
                        'title'  	=> $experiment->title,
                        'href'   	=> add_query_arg(array('page' => 'burst', 'experiment_id' => $experiment->id ), admin_url( 'admin.php' ) ),
                    ) );
                }
            }

             $admin_bar->add_menu(array(
             	'id'     	=> 'burst-add-experiment',
             	'parent' 	=> 'burst',
             	'title'  	=> __( 'New experiment', 'burst' ),
             	'href'   	=> admin_url( 'admin.php?page=burst-experiment&action=new' ),
             ) );


        }


		/**
		 * Do upgrade on update
		 */

		public function check_upgrade() {
			//when debug is enabled, a timestamp is appended. We strip this for version comparison purposes.
			$prev_version = get_option( 'burst-current-version', false );

			//set a default region if this is an upgrade:
			if ( $prev_version
			     && version_compare( $prev_version, '1.0.0', '<' )
			) {
                //upgrade
			}

			do_action( 'burst_upgrade', $prev_version );

			update_option( 'burst-current-version', burst_version );
		}

		/**
		 * enqueue some assets
		 * @param $hook
		 */


		public function enqueue_assets( $hook ) {
			 if ( strpos( $hook, 'burst' ) === false
			 ) {
			 	return;
			 }

			//datapicker
			wp_enqueue_style( 'burst-datepicker' , trailingslashit(burst_url) . 'assets/datepicker/datepicker.css', "", burst_version);
			wp_enqueue_script('burst-moment', trailingslashit(burst_url) . 'assets/datepicker/moment.js', array("jquery"), burst_version);
			wp_enqueue_script('burst-datepicker', trailingslashit(burst_url) . 'assets/datepicker/datepicker.js', array("jquery", "burst-moment"), burst_version);

			//select2
			wp_register_style( 'select2', burst_url . 'assets/select2/css/select2.min.css', false, burst_version );
			wp_enqueue_style( 'select2' );
			wp_enqueue_script( 'select2', burst_url . "assets/select2/js/select2.min.js", array( 'jquery' ), burst_version, true );

			//chartjs
            if (isset($_GET['page']) && $_GET['page'] === 'burst' ) {
	            wp_register_style( 'chartjs', burst_url . 'assets/chartjs/Chart.min.css', false, burst_version );
	            wp_enqueue_style( 'chartjs' );
	            wp_enqueue_script( 'chartjs', burst_url . "assets/chartjs/Chart.min.js", array(), burst_version, true );
            }

			$minified = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';

			wp_register_style( 'burst-admin', trailingslashit( burst_url ) . "assets/css/admin$minified.css", "", burst_version );
			wp_enqueue_style( 'burst-admin' );
			wp_enqueue_script( 'burst-admin', burst_url . "assets/js/admin$minified.js", array( 'jquery' ), burst_version, false );

			if (isset($_GET['page']) && $_GET['page'] ==='burst') {
				wp_enqueue_script( 'burst-dashboard', burst_url . "assets/js/dashboard$minified.js", array( 'burst-admin' ), burst_version, false );
			}

			wp_localize_script(
				'burst-admin',
				'burst',
				array(
					'ajaxurl' => admin_url( 'admin-ajax.php' ),
					'experiment_time_ranges' => array(

                    ),
					'strings' => array(
						'Today'        => __( 'Today', 'burst' ),
						'Yesterday'    => __( 'Yesterday', 'burst' ),
						'Last 7 days'  => __( 'Last 7 days', 'burst' ),
						'Last 30 days' => __( 'Last 30 days', 'burst' ),
						'This Month'   => __( 'This Month', 'burst' ),
						'Last Month'   => __( 'Last Month', 'burst' ),
						'date_format'  => get_option( 'date_format' ),//_x( 'MM/DD/YYYY','Date format' 'burst' ),
						'Apply'        => __( "Apply", "burst" ),
						'Cancel'       => __( "Cancel", "burst" ),
						'From'         => __( "From", "burst" ),
						'To'           => __( "To", "burst" ),
						'Custom'       => __( "Custom", "burst" ),
						'W'            => __( "W", "burst" ),
						"Mo"           => __( "Mo", "burst" ),
						'Tu'           => __( "Tu", "burst" ),
						'We'           => __( "We", "burst" ),
						'Th'           => __( "Th", "burst" ),
						'Fr'           => __( "Fr", "burst" ),
						'Sa'           => __( "Sa", "burst" ),
						'Su'           => __( "Su", "burst" ),
						'January'      => __( "January" ),
						'February'     => __( "February" ),
						'March'        => __( "March" ),
						'April'        => __( "April" ),
						'May'          => __( "May" ),
						'June'         => __( "June" ),
						'July'         => __( "July" ),
						'August'       => __( "August" ),
						'September'    => __( "September" ),
						'October'      => __( "October" ),
						'November'     => __( "November" ),
						'December'     => __( "December" ),
                    ),
                )
            );
	
		}

		/**
		 * Add custom link to plugins overview page
		 *
		 * @hooked plugin_action_links_$plugin
		 *
		 * @param array $links
		 *
		 * @return array $links
		 */

		public function plugin_settings_link( $links ) {
			$settings_link = '<a href="'
			                 . admin_url( "admin.php?page=burst" )
			                 . '" class="burst-settings-link">'
			                 . __( "Settings", 'burst' ) . '</a>';
			array_unshift( $links, $settings_link );

			$support_link = defined( 'burst_free' )
				? "https://wordpress.org/support/plugin/burst"
				: "https://wpburst.com/support";
			$faq_link     = '<a target="_blank" href="' . $support_link . '">'
			                . __( 'Support', 'burst' ) . '</a>';
			array_unshift( $links, $faq_link );

			// if ( ! defined( 'burst_premium' ) ) {
			// 	$upgrade_link
			// 		= '<a style="color:#2DAAE1;font-weight:bold" target="_blank" href="https://wpburst.com/l/pricing">'
			// 		  . __( 'Upgrade to premium', 'burst' ) . '</a>';
			// 	array_unshift( $links, $upgrade_link );
			// }

			return $links;
		}

		/**
         *  get list of warnings for the tool
         *
		 * @param bool $cache
		 *
		 * @return array
		 */

		public function get_warnings($cache = false) {
		    return array('warning-one');
        }


		/**
		 * Register admin page
		 */

		public function register_admin_page() {
			if ( ! burst_user_can_manage() ) {
				return;
			}

			$warnings      = BURST::$notices->get_notices( array('plus_ones'=>true) );
			$warning_count = count( $warnings );
			$warning_title = esc_attr( sprintf( '%d plugin warnings', $warning_count ) );
			$warning_count = count( $warnings );
			$warning_title = esc_attr( sprintf( '%d plugin warnings', $warning_count ) );
			$menu_label    = sprintf( __( 'Burst %s', 'burst' ),
				"<span class='update-plugins count-$warning_count' title='$warning_title'><span class='update-count'>"
				. number_format_i18n( $warning_count ) . "</span></span>" );

			global $burst_admin_page;
			$burst_admin_page = add_menu_page(
				burst_plugin_name,
				$menu_label,
				'manage_options',
				'burst',
				array( $this, 'dashboard' ),
				burst_url . 'assets/images/menu-icon.svg',
				burst_main_menu_position
			);

			add_submenu_page(
				'burst',
				__( 'Dashboard', 'burst' ),
				__( 'Dashboard', 'burst' ),
				'manage_options',
				'burst',
				array( $this, 'dashboard' )
			);

			add_submenu_page(
				'burst',
				__( 'Experiments', 'burst' ),
				__( 'Experiments', 'burst' ),
				'manage_options',
				'burst-experiments',
				array( $this, 'experiments_overview' )
			);
            add_submenu_page(
                'burst',
                __( 'New experiment', 'burst' ),
                __( 'New experiment', 'burst' ),
                'manage_options',
                'burst-experiment',
                array( $this, 'experiment_edit' )
            );

			add_submenu_page(
				'burst',
				__( 'Settings' ),
				__( 'Settings' ),
				'manage_options',
				"burst-settings",
				array( $this, 'settings' )
			);

			do_action( 'burst_admin_menu' );

			// if ( defined( 'burst_free' ) && burst_free ) {
			// 	global $submenu;
			// 	$class                  = 'burst-submenu';
			// 	$highest_index = count($submenu['burst']);
			// 	$submenu['burst'][] = array(
			// 			__( 'Upgrade to premium', 'burst' ),
			// 			'manage_options',
			// 			'https://wpburst.com/pricing'
			// 	);
			// 	if ( isset( $submenu['burst'][$highest_index] ) ) {
			// 		if (! isset ($submenu['burst'][$highest_index][4])) $submenu['burst'][$highest_index][4] = '';
			// 		$submenu['burst'][$highest_index][4] .= ' ' . $class;
			// 	}
			// }

		}

        /**
         * This filter removes the 'New experiment' submenu page from the submenu and highlights the experiment page
         * @param $submenu_file
         * @return mixed|string
         */
        function burst_wp_admin_submenu_filter( $submenu_file ) {

            global $plugin_page;

            $hidden_submenus = array(
                'burst-experiment' => true,
            );

            // Select another submenu item to highlight
            if ( $plugin_page && isset( $hidden_submenus[ $plugin_page ] ) ) {
                $submenu_file = 'burst-experiments';
            }

            // Hide the submenu.
            foreach ( $hidden_submenus as $submenu => $unused ) {
                remove_submenu_page( 'burst', $submenu );
            }

            return $submenu_file;
        }

        public function get_metric_dropdown(){
            //@todo add filter so we can add metrics with integrations
            $metrics = array(
                    'conversion_percentages' => __('Conversion percentages', 'burst'),
                    'conversions' => __('Conversions', 'burst'),
                    'visits' => __('Visits', 'burst'),
            );
            ob_start();
            echo '<div class="burst-metric-container">';
            echo '<select name="burst_selected_metric">';
                foreach ($metrics as $metric_val => $metric){
                    echo '<option value="' . $metric_val . '">'. $metric .'</option>';
                }
            echo '</select></div>';

            $html = ob_get_clean();

            return $html;
        }

		/**
		 * Initialize the grid
		 */

		public function init_grid(){
		    if (!burst_user_can_manage()) return;

		    if (!isset($_GET['page']) || $_GET['page'] !== 'burst') return;

		    $this->tabs = apply_filters('burst_tabs', array(
		            'dashboard' => array(
		                    'title'=> __( "General", "burst" ),
                    ),
		            'settings' => array(
			            'title'=> __( "Settings", "burst" ),
			            'capability' => 'manage_options',
		            ),
            ));
		    $metric_control = $this->get_metric_dropdown();
            $date_control =
            '<div class="burst-date-container burst-date-range">
                <i class="dashicons dashicons-calendar-alt"></i>&nbsp;
                <span></span>
                <i class="dashicons dashicons-arrow-down-alt2"></i>
            </div>';

            $grid_items = apply_filters( 'burst_grid_items', array(
                1 => array(
                    'title' => __("Your experiment", "burst"),
                    'class' => 'table-overview',
                    'type' => 'statistics',
                    'controls' => $metric_control . $date_control,
                    'can_hide' => true,
                    'page' => 'dashboard',
                ),
                2 => array(
                    'title' => __("Objective", "burst"),
                    'body' => '<div class="burst-skeleton"></div>',
                    'class' => 'small burst-load-ajax',
                    'type' => 'objective',
                    'can_hide' => true,
                    'ajax_load' => true,
                    'page' => 'dashboard',
                ),
                3 => array(
                    'title' => __("Setup", "burst"),
                    'body' => '<div class="burst-skeleton"></div>',
                    'class' => 'small burst-load-ajax',
                    'type' => 'experiment-setup',
                    'can_hide' => true,
                    'ajax_load' => true,
                    'page' => 'dashboard',
                ),
                4 => array(
                    'title' => __("Tips & Tricks", "burst"),
                    'type' => 'tipstricks',
                    'class' => 'half-height burst-tips-tricks',
                    'can_hide' => true,
                    'page' => 'dashboard',

                ),
                5 => array(
                    'title' => __("Other Plugins", "burst"),
                    'class' => 'half-height no-border no-background upsell-grid-container upsell',
                    'type' => 'other-plugins',
                    'can_hide' => false,
                    'controls' => '<div class="rsp-logo"><a href="https://really-simple-plugins.com/"><img src="'. trailingslashit(burst_url) .'assets/images/really-simple-plugins.svg" alt="Really Simple Plugins" /></a></div>',
                    'page' => 'dashboard',
                ),

            ));
            foreach ( $grid_items as $key => $grid_item ) {
	            $grid_items[ $key ] = wp_parse_args($grid_item, $this->default_grid_item );
            }
            $this->grid_items = $grid_items;
        }

		/**
		 * Dashboard page
		 */
		public function dashboard() {

			$grid_items = $this->grid_items;
			//give each item the key as index
			array_walk($grid_items, function(&$a, $b) { $a['index'] = $b; });

			$grid_html = '';
			foreach ($grid_items as $index => $grid_item) {
			    $grid_html .= burst_grid_element($grid_item);
			}
			$args = array(
				'page' => 'dashboard',
				'content' => burst_grid_container($grid_html),
			);
			echo burst_get_template('admin_wrap.php', $args );
		}



		/**
		 * Experiments table overview
		 */
		function experiments_overview() {
			if ( ! burst_user_can_manage() ) {
				return;
			}

			ob_start();

            include( dirname( __FILE__ ) . '/experiments/class-experiment-table.php' );

            $experiments_table = new burst_experiment_Table();

            $experiments_table->prepare_items();

            ?>

            <div class="wrap experiment">
                <h1><?php _e( "Your experiments", 'burst' ) ?>
                    <?php do_action( 'burst_after_experiment_title' ); ?>
                     <a href="<?php echo admin_url('admin.php?page=burst-experiment&action=new'); ?>"
                       class="page-title-action"><?php _e('New experiment', 'burst') ?></a>
                </h1>

                <form id="burst-experiment-filter" method="get"
                      action="">

                    <?php
                    $experiments_table->views();
                    $experiments_table->search_box( __( 'Search', 'burst' ),
                        's' );
                    $experiments_table->display();
                    ?>
                    <input type="hidden" name="page" value="burst-experiments"/>
                </form>
            </div>
            <?php

			$html = ob_get_clean();
			
			$args = array(
				'page' => 'experiments_settings',
				'content' => $html,
			);
			echo burst_get_template('admin_wrap.php', $args );
		}

        /**
         * Experiment edit page/wizard
         */
        function experiment_edit() {
            if ( ! burst_user_can_manage() ) {
                return;
            }

            $id = false;
            if ( isset( $_POST['experiment_id'] ) ) {
                $id = intval( $_POST['experiment_id'] );
            }
            if ( !isset( $id ) ) {
                $id = isset( $_GET['experiment_id'] ) ? intval( $_GET['experiment_id'] ) : false;
            }
            $title = isset( $id ) ?  __( 'Create experiment', 'burst' ) : __( 'Edit experiment', 'burst' );

            ob_start();

            BURST::$wizard->wizard( 'experiment' , $title );

            $html = ob_get_clean();

            echo $html;
        }


        /**
		 * General settings page
		 *
		 */
		public function settings() {
			ob_start();
			?>

			<form class="burst-grid-container" action="" method="post" enctype="multipart/form-data">
				<div class="burst-grid-header">
					<h3 class="burst-grid-title"><?php _e( "Settings" ) ?></h3>
				</div>
				<div class="burst-grid-content">
					<?php
					BURST::$field->get_fields( 'settings', 'general' );
					?>
				</div>
				<div class="burst-grid-footer">
					<?php
					BURST::$field->save_button();
					?>
				</div>
			</form>

			<?php

			$html = ob_get_clean();
			
			$args = array(
				'page' => 'general-settings',
				'content' => burst_grid_container($html),
			);
			echo burst_get_template('admin_wrap.php', $args );
		}



		/**
		 * Get the html output for a help tip
		 *
		 * @param $str
		 */

		public function get_help_tip( $str ) {
			?>
			<span class="burst-tooltip-right tooltip-right"
			      data-burst-tooltip="<?php echo $str ?>">
              <span class="dashicons dashicons-editor-help"></span>
            </span>
			<?php
		}

	    /**
         * Get status link for plugin, depending on installed, or premium availability
	     * @param $item
	     *
	     * @return string
	     */

        public function get_status_link($item){
            if (is_multisite()){
                $install_url = network_admin_url('plugin-install.php?s=');
            } else {
                $install_url = admin_url('plugin-install.php?s=');
            }

	        if (defined($item['constant_free']) && defined($item['constant_premium'])) {
		        $status = __("Installed", "burst");
	        } elseif (defined($item['constant_free']) && !defined($item['constant_premium'])) {
		        $link = $item['website'];
		        $text = __('Upgrade to pro', 'burst');
		        $status = "<a href=$link>$text</a>";
	        } else {
		        $link = $install_url.$item['search']."&tab=search&type=term";
		        $text = __('Install', 'burst');
		        $status = "<a href=$link>$text</a>";
	        }
	        return $status;
        }

        /**
         * Hides all notices from other plugins and themes on Burst pages
         * 
         */
        public function hide_wordpress_and_other_plugin_notices(){
        	if ( isset( $_GET['page'] ) && strpos($_GET['page'], 'burst') === 0 ) {
				if(! current_user_can('update_core')){ return; }
				add_filter('pre_option_update_core','__return_null');
				add_filter('pre_site_transient_update_core','__return_null');
				add_filter('pre_site_transient_update_plugins','__return_null');
				add_filter('pre_site_transient_update_themes','__return_null');
				add_filter('all_admin_notices','__return_null');
				add_filter('admin_notices','__return_null');
        	}

        }

        /**
		 * Function for getting statistics for display with Chart JS
		 * @return json                     Returns a JSON that is compatible with Chart JS
		 *
		 */
		public function ajax_load_status_info(){
			$error = false;
			if ( ! burst_user_can_manage() ) {
				$error = true;
			}

			if ( !isset($_GET['experiment_id'])) {
				$error = true;
			}

			if ( !$error ) {
				$experiment_id = intval( $_GET['experiment_id'] );
			}

			if ( !$error ) {
				$experiment = new BURST_EXPERIMENT($experiment_id);
				$data['status'] = burst_display_experiment_status(false, $experiment->status, true);
				$data['date_end'] = burst_display_date($experiment->date_end);
				$data['date_end_text'] = __('Experiment completed on', 'burst' ) .' '. burst_display_date ($experiment->date_end);
			}

			$return  = array(
				'success' => !$error,
				'data'    => $data,
			);
			echo json_encode( $return );
			die;
		}

	    /**
	     *
	     * Add a button and thickbox to deactivate the plugin while keeping SSL
	     *
	     * @since 3.0
	     *
	     * @access public
	     *
	     */

	    public function deactivate_popup()
	    {
	        //only on plugins page
	        $screen = get_current_screen();
	        if (!$screen || $screen->base !=='plugins' ) return;

	        ?>
		    <?php add_thickbox();?>
	        <style>

	            #TB_ajaxContent.burst-deactivation-popup {
	                text-align: center !important;
	                width:750px;
	            }
	            #TB_window.burst-deactivation-popup {
	                height: auto;
	                max-height: 400px;
	                border-left: 7px solid black;
	            }
	            .burst-deactivation-popup #TB_title{
	                height: 70px;
	                border-bottom: 1px solid #dedede;
	            }
	            .burst-deactivation-popup #TB_ajaxWindowTitle {
	                font-weight:bold;
	                font-size:30px;
	                padding: 20px;
	            }

	            .burst-deactivation-popup .tb-close-icon {
	                color:#dedede;
	                width: 50px;
	                height: 50px;
	                top: 12px;
	                right: 20px;
	            }
	            .burst-deactivation-popup .tb-close-icon:before {
	                font: normal 50px/50px dashicons;
	            }
	            .burst-deactivation-popup #TB_closeWindowButton:focus .tb-close-icon {
	                outline:0;
	                box-shadow: 0 0 0 0 #5b9dd9, 0 0 0 0 rgba(30, 140, 190, .8);
	                color:#dedede;
	            }
	            .burst-deactivation-popup #TB_closeWindowButton .tb-close-icon:hover {
	                color:#666;
	            }
	            .burst-deactivation-popup #TB_closeWindowButton:focus {
	                outline:0;
	            }
	            .burst-deactivation-popup #TB_ajaxContent {
	                width: 100% !important;
	                padding: 0;
	            }

	            .burst-deactivation-popup .button-burst-tertiary.button {
	                background-color: #D7263D !important;
	                color: white !important;
	                border-color: #D7263D;
	            }

	            .burst-deactivation-popup .button-burst-tertiary.button:hover {
	                background-color: #f1f1f1 !important;
	                color: #d7263d !important;
	            }

	            .burst-deactivate-notice-content {
	                margin: 20px
	            }
	            .burst-deactivate-notice-content h3 , .burst-deactivate-notice-content ul{
	                font-size:1.1em;
	            }

	            .burst-deactivate-notice-footer {
	                padding-top: 20px;
	                position:absolute;
	                bottom:15px;
	                width: 94%;
	                margin-left: 3%;
	                border-top: 1px solid #dedede;
	            }

	            .burst-deactivation-popup ul {
	                list-style: circle;
	                padding-left: 20px;
	            }
	            .burst-deactivation-popup a {
	                margin-right:10px !important;
	            }
	        </style>
	        <script>
	            jQuery(document).ready(function ($) {
	                $('#burst_close_tb_window').click(tb_remove);
	                $(document).on('click', '#deactivate-burst-a-b-split-testing', function(e){
	                    e.preventDefault();
	                    tb_show( '', '#TB_inline?height=420&inlineId=deactivate_and_delete_data', 'null');
	                    $("#TB_window").addClass('burst-deactivation-popup');

	                });
	                if ($('#deactivate-burst-a-b-split-testing').length){
	                    $('.burst-button-deactivate').attr('href',  $('#deactivate-burst-a-b-split-testing').attr('href') );
	                }

	            });
	        </script>

	        <div id="deactivate_and_delete_data" style="display: none;">
	                <div class="burst-deactivate-notice-content">
	                    <h3 style="margin: 20px 0; text-align: left;">
	                        <?php _e("To deactivate the plugin correctly, please select if you want to:", "burst") ?></h3>
	                    <ul style="text-align: left; font-size: 1.2em;">

	                        <li><?php _e("Deactivate", "burst") ?></li>
	                        <li>
	                        	<?php _e("Deactivate, and remove all statistics, experiments and settings.", "burst"); ?>
	                        	<?php _e("The data will be gone forever.", "burst"); ?>		
	                        </li>
	                    </ul>
	                </div>

	                <?php
	                $token = wp_create_nonce('burst_deactivate_plugin');
	                $deactivate_and_remove_all_data_url = admin_url("options-general.php?page=burst&action=uninstall_delete_all_data&token=" . $token);
	                ?>
	                <div class="burst-deactivate-notice-footer">
	                    <a class="button button-default" href="#" id="burst_close_tb_window"><?php _e("Cancel", "burst") ?></a>
	                    <a class="button button-primary burst-button-deactivate" href="#"><?php _e("Deactivate", "burst") ?></a>
	                    <a class="button button-burst-tertiary" href="<?php echo $deactivate_and_remove_all_data_url ?>"><?php _e("Deactivate and delete all data", "burst") ?></a>
	                </div>
	        </div>
	        <?php
	    }
	    /**
	     * Deactivate the plugin while keeping SSL
	     * Activated when the 'uninstall_keep_data' button is clicked in the settings tab
	     *
	     */

	    public function listen_for_deactivation()
	    {	

	        //check user role
	        if (!current_user_can('activate_plugins')) return;

	        //check nonce
	        if (!isset($_GET['token']) || (!wp_verify_nonce($_GET['token'], 'burst_deactivate_plugin'))) return;

	        //check for action
	        if (isset($_GET["action"]) && $_GET["action"] == 'uninstall_delete_all_data') {
	            $this->delete_all_burst_data();
	            $plugin = burst_plugin;
	            $plugin = plugin_basename(trim($plugin));
                $current = get_option('active_plugins', array());
                $current = $this->remove_plugin_from_array($plugin, $current);
                update_option('active_plugins', $current);
	            wp_redirect(admin_url('plugins.php'));
	            exit;
	        }
	    }

	    /**
	     * Remove the plugin from the active plugins array when called from listen_for_deactivation
	     *
	     * */

	    public function remove_plugin_from_array($plugin, $current)
	    {
	        $key = array_search($plugin, $current);
	        if (false !== $key) {
	            unset($current[$key]);
	        }
	        return $current;
	    }

		/**
		 * Clear plugin data
		 */
	    public function delete_all_burst_data(){
		    if (!current_user_can('activate_plugins')) return;

		    $options = array(
			    'burst_activation_time',
			    'burst_abdb_version',
                'burst-current-version',
                'burst_options_settings',
                'burst_review_notice_shown',
                'burst_activation_time',
                'burst_stats_db_version',
		    );

		    foreach ($options as $option_name) {
			    delete_option($option_name);
			    delete_site_option($option_name);
		    }

		    global $wpdb;
		    $table_names = array(
			    $wpdb->prefix . 'burst_experiments',
			    $wpdb->prefix . 'burst_statistics',
		    );

		    foreach($table_names as $table_name){
			    $sql = "DROP TABLE IF EXISTS $table_name";
			    $wpdb->query($sql);
		    }
		    // Delete post meta like burst_experiment_id? 
	    }

	}
} //class closure
