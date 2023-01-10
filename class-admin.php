<?php
defined( 'ABSPATH' ) or die( "you do not have access to this page!" );
if ( ! class_exists( "burst_admin" ) ) {
	class burst_admin {
		private static $_this;
		public $error_message = "";
		public $success_message = "";
		public $grid_items;
		public $default_grid_item;
        public $rows_batch = 200;

		function __construct() {
			if ( isset( self::$_this ) ) {
				wp_die( burst_sprintf( '%s is a singleton class and you cannot create a second instance.',
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
            add_action( 'admin_init', array($this, 'empty_dashboard_cache') );
            add_action( 'wp_dashboard_setup', array($this, 'add_burst_dashboard_widget') );

			$plugin = burst_plugin;
			add_filter( "plugin_action_links_$plugin", array( $this, 'plugin_settings_link' ) );

			//multisite
			add_filter( "network_admin_plugin_action_links_$plugin", array( $this, 'plugin_settings_link' ) );
			add_action( 'admin_init', array($this, 'init_grid') );
            add_action( 'wp_ajax_burst_get_datatable', array($this, 'ajax_get_datatable') );

            // column
            add_action( 'admin_init', array($this, 'add_burst_admin_columns' ), 1);
            add_action( 'pre_get_posts', array($this, 'posts_orderby_total_pageviews'), 1);

			// deactivating
			add_action( 'admin_footer', array($this, 'deactivate_popup'), 40);
			add_action( 'admin_init', array($this, 'listen_for_deactivation'), 40);
			add_action( 'admin_init', array($this, 'add_privacy_info'), 10);
			add_filter( 'wpmu_drop_tables', array( $this, 'ms_remove_tables' ), 10, 2 );

            //disabled for now
		}


		static function this() {
			return self::$_this;
		}

		/**
		 * Add some privacy info
		 */

		public function add_privacy_info()
		{
			if (!function_exists('wp_add_privacy_policy_content')) {
				return;
			}

			$content = sprintf(
				__('This website uses Burst Statistics, a Privacy-Friendly Statistics Tool to analyze visitor behavior. For this functionality we (this website) collect anonymized data, stored locally without sharing it with other parties. For more information, please read the %s Privacy Statement %s from Burst.', 'burst-statistics'),
				'<a href="https://burst-statistics.com/legal/privacy-statement/" target="_blank">', '</a>'
			);
			wp_add_privacy_policy_content(
				'Burst Statistics',
				wp_kses_post(wpautop($content, false))
			);
		}

		/**
		 * enqueue some assets
		 * @param $hook
		 */


		public function enqueue_assets( $hook ) {
            if ( $hook === 'index.php' || $hook === 'dashboard_page_burst') {
	            $min  = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';
	            $rtl  = is_rtl() ? 'rtl/' : '';
	            $url  = trailingslashit( burst_url ) . "assets/css/{$rtl}admin{$min}.css";
	            $path = trailingslashit( burst_path ) . "assets/css/{$rtl}admin{$min}.css";
	            wp_enqueue_style( 'burst-admin', $url, [ 'wp-components' ], filemtime( $path ) );
            }
		}

		/**
		 * Setup default settings used for tracking
		 * @return void
		 */

		public function setup_defaults(): void {
			update_option( 'burst_activation_time', time(), false );
			burst_add_view_capability();
			burst_add_manage_capability();

			$setup_defaults = get_option( 'burst_setup_defaults');
			if ($setup_defaults) return;
			$exclude_roles = burst_get_option('user_role_blocklist');
			if ( ! $exclude_roles ) {
				$defaults = [ 'administrator' ];
				burst_update_option( 'user_role_blocklist', $defaults );
			}

			update_option( 'burst_setup_defaults', true, false );
		}

		/**
         * Empty dashboard cache for Burst
         * @param $hook
         */

        public function empty_dashboard_cache( $hook ) {
            if ( !burst_user_can_view() ) return;
            $skip_transients = array('burst_warnings');
            if (isset($_GET['burst_clear_cache'])){
                global $wpdb;
                // get all burst transients
                $results = $wpdb->get_results(
                        "SELECT `option_name` AS `name`, `option_value` AS `value`
                                FROM  $wpdb->options
                                WHERE `option_name` LIKE '%transient_burst%'
                                ORDER BY `option_name`", 'ARRAY_A'
                );
                // loop through all burst transients
                foreach ($results as $key => $value){
                    $transient_name = substr($value['name'], 11);
                    if ( in_array($transient_name, $skip_transients) ) continue;
                    delete_transient($transient_name);
                }
                // delete custom transient
                delete_option('burst_transient');
            }
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
			                 . __( "Settings", 'burst-statistics' ) . '</a>';
			array_unshift( $links, $settings_link );

			$support_link = defined( 'burst_free' )
				? "https://wordpress.org/support/plugin/burst-statistics"
				: "https://burst-statistics.com/support";
			$faq_link     = '<a target="_blank" href="' . $support_link . '">'
			                . __( 'Support', 'burst-statistics' ) . '</a>';
			array_unshift( $links, $faq_link );

			// if ( ! defined( 'burst_premium' ) ) {
			// 	$upgrade_link
			// 		= '<a style="color:#2DAAE1;font-weight:bold" target="_blank" href="https://burst-statistics.com/l/pricing">'
			// 		  . __( 'Upgrade to premium', 'burst-statistics' ) . '</a>';
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
         *
         * Add a dashboard widget
         *
         * @since 1.1
         *
         */

        public function add_burst_dashboard_widget()
        {
            if ( ! burst_user_can_view() ) {
                return;
            }
            wp_add_dashboard_widget('dashboard_widget_burst', 'Burst Statistics', array(
                $this,
                'generate_burst_dashboard_widget_wrapper'
            ));
        }

        /**
         * Wrapper function for dashboard widget so params can be sent along
         */

        public function generate_burst_dashboard_widget_wrapper() {
            echo $this->generate_dashboard_widget();
        }

        /**
         *
         * Generate the dashboard widget
         * Also generated the Top Searches grid item
         *
         * @param int|bool $start
         * @param int|bool $end
         * @return false|string
         */
        public function generate_dashboard_widget($start = false, $end = false)
        {
            ob_start();
            echo 'henkie';
            $template = burst_get_html_template('wordpress/dashboard-widget.php');
            //only use cached data on dash


            ob_get_clean();
            return $template;

        }

        public function get_daterange_dropdown()
        {
            ob_start();
            ?>
            <div class="burst-date-container burst-date-range">
                <i class="dashicons dashicons-calendar-alt"></i>&nbsp;
                <span></span>
                <i class="dashicons dashicons-arrow-down-alt2"></i>
            </div>
            <input type="hidden" name="burst_date_start" value="0">
            <input type="hidden" name="burst_date_end" value="0">
            <?php
	        return ob_get_clean();
        }


		/**
		 * Initialize the grid
		 */

		public function init_grid()
        {
            if (!burst_user_can_view()) return;

            if (!isset($_GET['page']) || substr($_GET['page'], 0, 5) !== 'burst') return;

            //$metric_control = $this->get_metric_dropdown();


            $grid_items = apply_filters('burst_grid_items', array(
                'dashboard' => array(
                    1 => array(
                        'title' => __("Your notices", "burst-statistics" ),
                        'class' => 'burst-overview column-2 row-2',
                        'type' => 'progress',
                        'controls' => '',
                        'page' => 'dashboard',
                    ),
                    2 => array(
                        'title' => __("Today", "burst-statistics" ),
                        'class' => 'row-2 border-to-border',
                        'type' => 'real-time',
                        'ajax_load' => true,
                        'page' => 'dashboard',
                    ),
                    3 => array(
                        'title' => __("Settings", "burst-statistics" ),
                        'class' => 'row-2 border-to-border',
                        'type' => 'settings',
                        'page' => 'dashboard',
                    ),
                    4 => array(
                        'title' => __("Tips & Tricks", "burst-statistics" ),
                        'type' => 'tipstricks',
                        'class' => 'column-2',
                        'page' => 'dashboard',
                    ),
                    5 => array(
                        'title' => __("Other Plugins", "burst-statistics" ),
                        'class' => 'column-2 no-border no-background ',
                        'type' => 'other-plugins',
                        'footer' => ' ',
                        'controls' => '<div class="rsp-logo"><a href="https://really-simple-plugins.com/"><img src="' . trailingslashit(burst_url) . 'assets/img/really-simple-plugins.svg" alt="Really Simple Plugins" /></a></div>',
                        'page' => 'dashboard',
                    ),
                ),
                'statistics' => array(
                    1 => array(
                        'title' => __("Insights", "burst-statistics" ),
                        'class' => 'statistics column-2',
                        'type' => 'insights-chart',
                        'controls' => '',
                        'page' => 'statistics',
                    ),
                    2 => array(
                        'title' => __("Compare", "burst-statistics" ),
                        'body' => '<div class="burst-skeleton"></div>',
                        'footer' => 'henkje',
                        'class' => 'burst-load-ajax',
                        //'body' => '<div class="burst-skeleton"></div>',
                        'type' => 'compare',
                        'controls' => '',
                        'page' => 'statistics',

                    ),
                    3 => array(
                        'title' => __("Devices", "burst-statistics" ),
                        'body' => '<div class="burst-skeleton"></div>',
                        'class' => 'burst-load-ajax',
                        'type' => 'devices',
                        'controls' => '',
                        'page' => 'statistics',
                    ),
                    4 => array(
                        'title' => __("Most visited", "burst-statistics" ),
                        'body' => '<div class="burst-skeleton datatable-skeleton"></div><div class="burst-datatable" width="100%"><table class="burst-table" width="100%"></table></div>',
                        'class' => 'burst-grid-datatable column-2 burst-load-ajax-datatable',
                        'type' => 'page_url',
                        'controls' => '',
                        'page' => 'statistics',
                    ),
                    5 => array(
                        'title' => __("Top referrers", "burst-statistics" ),
                        'body' => '<div class="burst-skeleton datatable-skeleton"></div><div class="burst-datatable" width="100%"><table class="burst-table" width="100%"></table></div>',
                        'class' => 'burst-grid-datatable column-2 burst-load-ajax-datatable',
                        'type' => 'referrer',
                        'controls' => '',
                        'page' => 'statistics',
                    ),
                ),
            ));



            foreach ( $grid_items as $key => $grid_dashboard ) {
                foreach ($grid_dashboard as $grid_key => $grid_block) {
                    $grid_dashboard[$grid_key] = wp_parse_args($grid_block, $this->default_grid_item);
                }
                $grid_items[$key] = $grid_dashboard;
            }
            $this->grid_items = $grid_items;
        }


		/**
		 * Dashboard page
		 */
		public function burst_pages() {
            $burst_page = isset($_GET['burst-page']) ? $_GET['burst-page'] : false;
		    $burst_page = $this->sanitize_burst_page($burst_page);
			$grid_items = $this->grid_items[$burst_page];
			$admin_pages = $this->get_burst_admin_pages();
            $controls = $admin_pages[$burst_page]['controls'];

			//give each item the key as index
			array_walk($grid_items, function(&$a, $b) { $a['index'] = $b; });

			$grid_html = '';
			foreach ($grid_items as $index => $grid_item) {
			    $grid_html .= burst_grid_element($grid_item);
			}

            $args = array(
                'page' => $burst_page,
                'content' => burst_grid_container($grid_html),
                'controls' => $controls,
            );
			echo burst_get_template('admin_wrap.php', $args );
		}

        /**
         * Dashboard page
         */
        public function burst_statistics() {

            $grid_items = $this->grid_items['statistics'];

            //give each item the key as index
            array_walk($grid_items, function(&$a, $b) { $a['index'] = $b; });

            $grid_html = '';
            foreach ($grid_items as $index => $grid_item) {
                $grid_html .= burst_grid_element($grid_item);
            }
            $args = array(
                'page' => 'statistics',
                'content' => burst_grid_container($grid_html),
                'controls' => $this->get_daterange_dropdown(),
            );
            echo burst_get_template('admin_wrap.php', $args );
        }

        public function sanitize_burst_page($page_unsanitized){
            $pages = $this->get_burst_admin_pages();
            foreach ( $pages as $page => $value) {
                if ($page_unsanitized === $page) {
                    return $page;
                }
            }
            return 'dashboard';
        }

        public function get_burst_admin_pages(){
            return apply_filters('burst_admin_pages',
                array(
                    'dashboard' => array(
                        'title' => __('Dashboard', 'burst-statistics'),
                        'show_in_menu' => true,
                        'controls' => '',
                    ),
                    'statistics' => array(
                        'title' => __('Statistics', 'burst-statistics'),
                        'show_in_menu' => true,
                        'controls' => $this->get_daterange_dropdown(),
                    ),
                )
            );
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
		        $status = __("Installed", "burst-statistics" );
	        } elseif (defined($item['constant_free']) && !defined($item['constant_premium'])) {
		        $link = $item['website'];
		        $text = __('Upgrade to pro', 'burst-statistics');
		        $status = "<a href=$link>$text</a>";
	        } else {
		        $link = $install_url.$item['search']."&tab=search&type=term";
		        $text = __('Install', 'burst-statistics');
		        $status = "<a href=$link>$text</a>";
	        }
	        return $status;
        }

        public function ajax_get_datatable()
        {
            $error = false;
            $total = 0;
            $html  = __("No data found", "burst-statistics" );
            if (!burst_user_can_view()) {
                $error = true;
            }

            if (!isset($_GET['start'])){
                $error = true;
            }

            if (!isset($_GET['end'])){
                $error = true;
            }

            if (!isset($_GET['type'])){
                $error = true;
            }

	        if (!isset($_GET['date_range'])){
		        $error = true;
	        }

            $page = isset($_GET['page']) ? intval($_GET['page']) : false;

            if (!$error){
                $start = burst_offset_utc_time_to_gtm_offset($_GET['start']);
                $end = burst_offset_utc_time_to_gtm_offset($_GET['end']);
                $type = sanitize_title($_GET['type']);
                $date_range = burst_sanitize_date_range($_GET['date_range']);
                $total = 2;
                $html = $this->datatable_html( $start, $end, $page, $type, $date_range);
            }

            $data = array(
                'success' => !$error,
                'html' => $html,
                'total_rows' => $total,
                'batch' => $this->rows_batch,
            );

            header("Content-Type: application/json");
            echo wp_json_encode($data);
            exit;
        }

        /**
         * Function to easily add a column in a WordPress post table
         * @param $column_title
         * @param $post_type
         * @param $cb
         * @return void
         * @since 1.1
         */
        public function add_admin_column($column_name, $column_title, $post_type, $sortable, $cb){
            // Add column
            add_filter( 'manage_' . $post_type . '_posts_columns', function($columns) use ($column_name, $column_title) {
                $columns[ $column_name ] = $column_title;
                return $columns;
            } );

            // Add column content
            add_action( 'manage_' . $post_type . '_posts_custom_column' , function( $column, $post_id ) use ($column_name, $column_title, $cb) {
                if($column_name === $column){
                    $cb($post_id);
                }
            }, 10, 2 );

            // Add sortable column
            if ($sortable){
                add_filter( 'manage_edit-' . $post_type . '_sortable_columns', function( $columns ) use ($column_name, $column_title) {
                    $columns[ $column_name ] = $column_name;
                    return $columns;
                });
            }
        }

        /**
         * Function to add pageviews column to post table
         * @return void
         * @since 1.1
         */
		public function add_burst_admin_columns() {
			if ( ! burst_user_can_view() ) {
				return;
			}
			$burst_column_post_types = apply_filters( 'burst_column_post_types',
				array( 'post', 'page' )
			);
			foreach ( $burst_column_post_types as $post_type ) {
				$this->add_admin_column( 'pageviews', __( 'Pageviews', 'burst-statistics' ), $post_type, true, function( $post_id ) {
					$burst_total_pageviews_count = get_post_meta( $post_id, 'burst_total_pageviews_count', true );
					$count                       = (int) $burst_total_pageviews_count ?: 0;
					echo $count;
				} );
			}
		}

        public function posts_orderby_total_pageviews( $query ) {
            if( ! is_admin() || ! $query->is_main_query() || ! burst_user_can_view() ) {
                return;
            }

            if ( 'pageviews' === $query->get( 'orderby') ) {
                $query->set( 'orderby', 'meta_value_num title ' );
                $query->set( 'meta_key', 'burst_total_pageviews_count' );
            }
        }

		/**
		 * Check if current day falls within required date range.
		 *
		 * @return bool
		 */

		public function is_bf(){
			if ( defined("burst_pro_version" ) ) {
				return false;
			}
			$start_day = 21;
			$end_day = 28;
			$current_year = date("Y");//e.g. 2021
			$current_month = date("n");//e.g. 3
			$current_day = date("j");//e.g. 4

			if ( $current_year == 2022 && $current_month == 11 &&
			     $current_day >=$start_day &&
			     $current_day <= $end_day
			) {
				return true;
			}
			return false;
		}

	    /**
	     *
	     * Add a button and thickbox to deactivate the plugin
	     *
	     * @since 1.0
	     *
	     * @access public
	     *
	     */

	    public function deactivate_popup()
	    {
	        //only on plugins page
	        $screen = get_current_screen();
	        if (!$screen || $screen->base !=='plugins' ) return;
            $slug = sanitize_title(burst_plugin_name);

	        ?>
		    <?php add_thickbox();?>
	        <style>

                #TB_ajaxContent.burst-deactivation-popup {
                    text-align: center !important;
                }
                #TB_window.burst-deactivation-popup {
                    height: min-content !important;
                    margin-top:initial!important;
                    margin-left:initial!important;
                    display:flex;
                    flex-direction: column;
                    top: 50%!important;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 500px !important;
                    border-radius: 12px!important;
                    min-width: min-content;
                }
                .burst-deactivation-popup #TB_title{
                    padding-bottom: 20px;
                    border-radius:12px;
                    border-bottom:none!important;
                    background:#fff !important;
                }
                .burst-deactivation-popup #TB_ajaxWindowTitle {
                    font-weight:bold;
                    font-size:20px;
                    padding: 20px;
                    background:#fff !important;
                    border-radius: 12px 12px 0 0;
                    width: calc( 100% - 40px );
                }

                .burst-deactivation-popup .tb-close-icon {
                    color:#333;
                    width: 25px;
                    height: 25px;
                    top: 12px;
                    right: 20px;
                }
                .burst-deactivation-popup .tb-close-icon:before {
                    font: normal 25px/25px dashicons;
                }
                .burst-deactivation-popup #TB_closeWindowButton:focus .tb-close-icon {
                    outline:0;
                    color:#666;
                }
                .burst-deactivation-popup #TB_closeWindowButton .tb-close-icon:hover {
                    color:#666;
                }
                .burst-deactivation-popup #TB_closeWindowButton:focus {
                    outline:0;
                }
                .burst-deactivation-popup #TB_ajaxContent {
                    width: 90% !important;
                    height:initial!important;
                    padding-left: 20px!important;
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

                .burst-deactivate-notice-content h3, .burst-deactivate-notice-content ul{
                }

                .burst-deactivate-notice-footer {
                    display: flex;
                    gap:10px;
                    padding: 15px 10px 0 10px;
                }

                .burst-deactivation-popup ul {
                    list-style: disc;
                    padding-left: 20px;
                }
                .burst-deactivate-notice-footer .button {
                    min-width: fit-content;
                    white-space: nowrap;
                    cursor: pointer;
                    text-decoration: none;
                    text-align: center;
                }
	        </style>
	        <script>
	            jQuery(document).ready(function ($) {
	                $('#burst_close_tb_window').click(tb_remove);

	                $(document).on('click', '#deactivate-<?php echo $slug?>', function(e){
	                    e.preventDefault();
	                    tb_show( '', '#TB_inline?height=420&inlineId=deactivate_and_delete_data', 'null');
	                    $("#TB_window").addClass('burst-deactivation-popup');

	                });
	                if ($('#deactivate-<?php echo $slug?>').length){
	                    $('.burst-button-deactivate').attr('href',  $('#deactivate-<?php echo $slug?>').attr('href') );
	                }

	            });
	        </script>

	        <div id="deactivate_and_delete_data" style="display: none;">
	                <div class="burst-deactivate-notice-content">
	                    <h4 style="margin:0 0 20px 0; text-align: left; font-size: 1.1em;">
	                        <?php _e("To deactivate the plugin correctly, please select if you want to:", "burst-statistics" ) ?></h4>
	                    <ul style="text-align: left;">

	                        <li><?php _e("Deactivate", "burst-statistics" ) ?></li>
	                        <li>
	                        	<?php _e("Deactivate, and remove all statistics, experiments and settings.", "burst-statistics" ); ?>
	                        	<?php _e("The data will be gone forever.", "burst-statistics" ); ?>
	                        </li>
	                    </ul>
	                </div>

	                <?php
	                $token = wp_create_nonce('burst_deactivate_plugin');
	                $deactivate_and_remove_all_data_url = admin_url("options-general.php?page=burst&action=uninstall_delete_all_data&token=" . $token);
	                ?>
	                <div class="burst-deactivate-notice-footer">
	                    <a class="button button-default" href="#" id="burst_close_tb_window"><?php _e("Cancel", "burst-statistics" ) ?></a>
	                    <a class="button button-primary burst-button-deactivate" href="#"><?php _e("Deactivate", "burst-statistics" ) ?></a>
	                    <a class="button button-burst-tertiary" href="<?php echo esc_url($deactivate_and_remove_all_data_url); ?>"><?php _e("Deactivate and delete all data", "burst-statistics" ) ?></a>
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
            global $wpdb;
            global $wp_roles;

            // options to delete
            $options = array(
                'burst_activation_time',
                'burst-current-version',
                'burst_review_notice_shown',
                'burst_stats_db_version',
                'burst_sessions_db_version',
                'burst_goals_db_version',
                'burst_experiments_db_version',
                'burst_options_settings',
                'burst_last_generated',
            );

            // capabilities to delete
            $roles = $wp_roles->roles;
            $capabilities = array(
                'manage_burst_statistics',
                'view_burst_statistics'
            );

            // tables to delete
            $table_names = array(
                $wpdb->prefix . 'burst_sessions',
                $wpdb->prefix . 'burst_statistics',
                $wpdb->prefix . 'burst_goals',
            );

            // delete options
            foreach ($options as $option_name) {
                delete_option($option_name);
                delete_site_option($option_name);
            }

            // delete user capabilities from all user roles
            foreach ($roles as $role_name => $role_info) {
                foreach ($capabilities as $capability) {
                    $wp_roles->remove_cap($role_name, $capability);
                }
            }

            // delete tables
            foreach($table_names as $table_name){
                $sql = "DROP TABLE IF EXISTS $table_name";
                $wpdb->query($sql);
            }
        }

		/**
		 * Drop tables during the site deletion
		 *
		 * @param array $tables  The tables to drop.
		 * @param int   $blog_id The site ID.
		 *
		 * @return array
		 */
		public function ms_remove_tables( $tables, $blog_id ) {
			global $wpdb;

			$tables[] = $wpdb->get_blog_prefix( $blog_id ) . 'burst_sessions';
			$tables[] = $wpdb->get_blog_prefix( $blog_id ) . 'burst_statistics';
			$tables[] = $wpdb->get_blog_prefix( $blog_id ) . 'burst_goals';

			return $tables;
		}
	}
} //class closure
