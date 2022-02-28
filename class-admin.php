<?php
defined( 'ABSPATH' ) or die( "you do not have acces to this page!" );
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
			add_action( 'admin_menu', array( $this, 'register_admin_page' ), 20 );

			$plugin = burst_plugin;
			add_filter( "plugin_action_links_$plugin", array( $this, 'plugin_settings_link' ) );
			//multisite
			add_filter( "network_admin_plugin_action_links_$plugin", array( $this, 'plugin_settings_link' ) );
			add_action( 'admin_init', array( $this, 'check_upgrade' ), 10, 2 );
			add_action( 'admin_init', array($this, 'init_grid') );
            add_action('wp_ajax_burst_get_datatable', array($this, 'ajax_get_datatable'));

			// deactivating
			add_action( 'admin_footer', array($this, 'deactivate_popup'), 40);
			add_action( 'admin_init', array($this, 'listen_for_deactivation'), 40);

            //disabled for now
		}

		static function this() {
			return self::$_this;
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
			 if ( strpos( $hook, 'burst') === false
			 ) {
			 	return;
			 }
			 


			//select2
//			wp_register_style( 'select2', burst_url . 'assets/select2/css/select2.min.css', false, burst_version );
//			wp_enqueue_style( 'select2' );
//			wp_enqueue_script( 'select2', burst_url . "assets/select2/js/select2.min.js", array( 'jquery' ), burst_version, true );

			$minified = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';



            if (isset($_GET['burst-page']) && $_GET['burst-page'] ==='statistics') {
                wp_enqueue_script( 'chartjs', burst_url . "assets/chartjs/chart.min.js", array(), burst_version, true );

                //datapicker
                wp_enqueue_style( 'burst-datepicker' , trailingslashit(burst_url) . 'assets/datepicker/datepicker.css', "", burst_version);
                wp_enqueue_script('burst-moment', trailingslashit(burst_url) . 'assets/datepicker/moment.js', array("jquery"), burst_version);
                wp_enqueue_script('burst-datepicker', trailingslashit(burst_url) . 'assets/datepicker/datepicker.js', array("jquery", "burst-moment"), burst_version);

                wp_enqueue_script('burst-statistics', burst_url . "assets/js/statistics$minified.js", array('burst-admin'), burst_version, false);

                //Datatables
                wp_register_script('burst-datatables',
                    trailingslashit(burst_url)
                    . 'assets/datatables/datatables.min.js', array("jquery"), burst_version);
                wp_enqueue_script('burst-datatables');

                //Datatables plugin to hide pagination when it isn't needed
                wp_register_script('burst-datatables-pagination',
                    trailingslashit(burst_url)
                    . 'assets/datatables/dataTables.conditionalPaging.js', array("jquery"), burst_version);
                wp_enqueue_script('burst-datatables-pagination');
            } else if (isset($_GET['page']) && $_GET['page'] ==='burst') {
                wp_enqueue_script('burst-dashboard', burst_url . "assets/js/dashboard$minified.js", array('burst-admin'), burst_version, false);
			}

            wp_register_style( 'burst-admin', trailingslashit( burst_url ) . "assets/css/admin$minified.css", "", burst_version );
            wp_enqueue_style( 'burst-admin' );
            wp_enqueue_script( 'burst-admin', burst_url . "assets/js/admin$minified.js", array( 'jquery' ), burst_version, false );

			wp_localize_script(
				'burst-admin',
				'burst',
				array(
					'ajaxurl' => admin_url( 'admin-ajax.php' ),
					'strings' => array(
						'Today'        => __( 'Today', 'burst-statistics' ),
						'Yesterday'    => __( 'Yesterday', 'burst-statistics' ),
						'Previous 7 days'  => __( 'Last 7 days', 'burst-statistics' ),
						'Previous 30 days' => __( 'Last 30 days', 'burst-statistics' ),
						'This Month'   => __( 'This Month', 'burst-statistics' ),
						'Previous Month'   => __( 'Last Month', 'burst-statistics' ),
						'date_format'  => get_option( 'date_format' ),
						'Apply'        => __( "Apply", "burst-statistics" ),
						'Cancel'       => __( "Cancel", "burst-statistics" ),
						'From'         => __( "From", "burst-statistics" ),
						'To'           => __( "To", "burst-statistics" ),
						'Custom'       => __( "Custom", "burst-statistics" ),
						'W'            => _x( "W", "Abbreviation for week", "burst-statistics"),
						"Mo"           => _x( "Mo", "Abbreviation for monday", "burst-statistics" ),
						'Tu'           => _x( "Tu", "Abbreviation for Tuesday", "burst-statistics" ),
						'We'           => _x( "We", "Abbreviation for Wednesday", "burst-statistics" ),
						'Th'           => _x( "Th", "Abbreviation for Thursday", "burst-statistics" ),
						'Fr'           => _x( "Fr", "Abbreviation for Friday", "burst-statistics" ),
						'Sa'           => _x( "Sa", "Abbreviation for Saturday", "burst-statistics" ),
						'Su'           => _x( "Su", "Abbreviation for Sunday", "burst-statistics" ),
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
		 * Register admin page
		 */

		public function register_admin_page() {
			if ( ! burst_user_can_manage() ) {
				return;
			}

			$warnings      = BURST::$notices->get_notices( array('plus_ones'=>true) );
			$warning_count = count( $warnings );
			$warning_title = esc_attr( burst_sprintf( '%d plugin warnings', $warning_count ) );
			$menu_label    = __('Statistics', 'burst-statistics') .
				"<span class='update-plugins count-$warning_count' title='$warning_title'>
                    <span class='update-count'>
				        ". number_format_i18n( $warning_count ) . "
                    </span>
                </span>";

			add_submenu_page(
				'index.php',
				'Burst Statistics',
                $menu_label,
				'manage_options',
				'burst',
				array( $this, 'burst_pages' )
			);
		}

        public function get_metric_dropdown(){
            //@todo add filter so we can add metrics with integrations
            $metrics = array(
                    'conversion_percentages' => __('Conversion percentages', 'burst-statistics'),
                    'conversions' => __('Conversions', 'burst-statistics'),
                    'visits' => __('Visits', 'burst-statistics'),
            );
            ob_start();
            echo '<div class="burst-metric-container">';
            echo '<select name="burst_selected_metric">';
                foreach ($metrics as $metric_val => $metric){
                    echo  esc_html('<option value="' . esc_html($metric_val) . '">'. esc_html($metric) .'</option>');
                }
            echo '</select></div>';

            $html = ob_get_clean();

            return $html;
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
            $html = ob_get_clean();

            return $html;
        }


		/**
		 * Initialize the grid
		 */

		public function init_grid()
        {
            if (!burst_user_can_manage()) return;

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
                        'controls' => '<div class="rsp-logo"><a href="https://really-simple-plugins.com/"><img src="' . trailingslashit(burst_url) . 'assets/images/really-simple-plugins.svg" alt="Really Simple Plugins" /></a></div>',
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
                ),
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
            if (!burst_user_can_manage()) {
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
         * Generate the recent searches table in dashboard
         * @param int $start
         * @param int $end
         * @param int $page
         *
         * @return string|array
         * @since 1.0
         */

        public function datatable_html($start, $end, $page, $type, $date_range)
        {
            // Start generating rows
            $args = array(
                'date_from' => $start,
                'date_to' => $end,
	            'group_by' => $type,
                'date_range' => $date_range,//for caching purposes
                'page' => $page, //for caching purposes
            );
            $hits = BURST::$statistics->get_hits_single($args);
            if ( $page > 1 ) {
                $output = array();
                foreach ($hits as $hit) {
                    $data = $hit->val_grouped;
                    $output[] = '
                    <tr>
                        <td data-label="Page" class="burst-term"
                            data-term_id="'.$hit->id.'">'.$data.'</td>
                        <td>'.$hit->result_count.'</td>
                        <td data-label="When">'. burst_localize_date( $hit->time ).'</td>
                        <td data-label="When-unix">'.$hit->time.'</td>
                    </tr>';
                }
                return $output;
            } else {
                $output = '<table id="burst-table" class="burst-table" width="100%"><thead>
                    <tr class="burst-thead-th">
                        <th scope="col">'.__( "Page", "burst-statistics" ).'</th>
                        <th class="text-align-right" scope="col">'.__( "Pageviews", "burst-statistics" ).'</th>
                    </tr>
                    </thead>
                    <tbody>';

                foreach ( $hits as $hit ) {
	                $data = $hit->val_grouped;
	                $output .=
                        '<tr>
                            <td data-label="Page" title="'.$data.'" class="burst-term">'.$data.'</td>
                            <td data-label="Pageviews" class="text-align-right">'.$hit->hit_count.'</td>
                        </tr>';
                }
                $output .= '</tbody>
                </table>';

                return $output;
            }
        }

	    /**
	     *
	     * Add a button and thickbox to deactivate the plugin
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
	                $(document).on('click', '#deactivate-burst-statistics', function(e){
	                    e.preventDefault();
	                    tb_show( '', '#TB_inline?height=420&inlineId=deactivate_and_delete_data', 'null');
	                    $("#TB_window").addClass('burst-deactivation-popup');

	                });
	                if ($('#deactivate-burst-statistics').length){
	                    $('.burst-button-deactivate').attr('href',  $('#deactivate-burst-statistics').attr('href') );
	                }

	            });
	        </script>

	        <div id="deactivate_and_delete_data" style="display: none;">
	                <div class="burst-deactivate-notice-content">
	                    <h3 style="margin: 20px 0; text-align: left;">
	                        <?php _e("To deactivate the plugin correctly, please select if you want to:", "burst-statistics" ) ?></h3>
	                    <ul style="text-align: left; font-size: 1.2em;">

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

            $options = array(
                'burst_activation_time',
                'burst_db_version',
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
                $wpdb->prefix . 'burst_sessions',
                $wpdb->prefix . 'burst_statistics',
            );

            foreach($table_names as $table_name){
                $sql = "DROP TABLE IF EXISTS $table_name";
                $wpdb->query($sql);
            }
        }
	}
} //class closure
