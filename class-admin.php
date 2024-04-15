<?php
defined( 'ABSPATH' ) or die( 'you do not have access to this page!' );
if ( ! class_exists( 'burst_admin' ) ) {
	class burst_admin {
		private static $_this;
		public $error_message = '';
		public $success_message = '';
		public $grid_items;
		public $default_grid_item;
		public $rows_batch = 200;

		function __construct() {
			if ( isset( self::$_this ) ) {
				wp_die(
					burst_sprintf(
						'%s is a singleton class and you cannot create a second instance.',
						get_class( $this )
					)
				);
			}

			self::$_this             = $this;
			$this->default_grid_item = array(
				'title'    => '',
				'class'    => '',
				'type'     => '',
				'can_hide' => false,
				'controls' => '',
				'page'     => '',
				'body'     => '',
			);
			add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_assets' ) );

			$plugin = burst_plugin;
			add_filter( "plugin_action_links_$plugin", array( $this, 'plugin_settings_link' ) );

			// multisite
			add_filter( "network_admin_plugin_action_links_$plugin", [ $this, 'plugin_settings_link' ] );

			// column
			add_action( 'admin_init', array( $this, 'add_burst_admin_columns' ), 1 );
			add_action( 'pre_get_posts', array( $this, 'posts_orderby_total_pageviews' ), 1 );

			add_action( 'admin_init', array( $this, 'setup_defaults' ) );

			// deactivating
			add_action( 'admin_footer', array( $this, 'deactivate_popup' ), 40 );
			add_action( 'admin_init', array( $this, 'listen_for_deactivation' ), 40 );
			add_action( 'admin_init', array( $this, 'add_privacy_info' ), 10 );

			// remove tables on multisite uninstall
			add_filter( 'wpmu_drop_tables', [ $this, 'ms_remove_tables' ], 10, 2 );

			add_filter( 'burst_do_action', array( $this, 'maybe_delete_all_data' ), 10, 3 );

			add_filter( 'burst_after_saved_fields', [ $this, 'create_js_file' ], 10, 1 );
			add_action( 'upgrader_process_complete', [ $this, 'create_js_file' ], 10, 1 );
			add_action( 'wp_initialize_site', [ $this, 'create_js_file' ], 10, 1 );
			add_action( 'admin_init', [ $this, 'activation' ] );

			add_action( 'admin_bar_menu', array( $this, 'add_to_admin_bar_menu' ), 35 );
			add_action( 'admin_bar_menu', array( $this, 'add_top_bar_menu' ), 400 );

			add_action( 'burst_activation', [ $this, 'run_table_init_hook' ], 10, 1 );
			add_action( 'after_reset_stats', [ $this, 'run_table_init_hook' ], 10, 1 );
			add_action( 'upgrader_process_complete', [ $this, 'run_table_init_hook' ], 10, 1 );
			add_action( 'wp_initialize_site', [ $this, 'run_table_init_hook' ], 10, 1 );
			add_action( 'burst_upgrade', [ $this, 'run_table_init_hook' ], 10, 1 );
		}


		public static function this() {
			return self::$_this;
		}

		public function add_to_admin_bar_menu( $wp_admin_bar ) {
			if ( ! burst_user_can_view() || is_admin() ) {
				return;
			}

			// don't show on subsites if networkwide activated, and this is not the main site.
			if ( burst_is_networkwide_active() && ! is_main_site() ) {
				return;
			}

			$wp_admin_bar->add_node(
				[
					'parent' => 'site-name',
					'id'     => 'burst-statistics',
					'title'  => __( 'Statistics', 'burst-statistics' ),
					'href'   => burst_dashboard_url,
				]
			);
		}

		/**
		 * Add top bar menu for page views
		 *
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
			if ( $post && is_object( $post ) ) {
				$post_id = $post->ID;
				$count   = get_post_meta( $post_id, 'burst_total_pageviews_count', true );
			} else {
				$count = 0;
			}
			$wp_admin_bar->add_menu(
				[
					'id'    => 'burst-front-end',
					'title' => $count . ' ' . __( 'Pageviews', 'burst-statistics' ),
				]
			);
			$wp_admin_bar->add_menu(
				[
					'parent' => 'burst-front-end',
					'id'     => 'burst-statistics-link',
					'title'  => __( 'Go to dashboard', 'burst-statistics' ),
					'href'   => burst_dashboard_url,
				]
			);
		}

		public function activation() {
			if ( ! burst_admin_logged_in() ) {
				return;
			}

			if ( get_option( 'burst_run_activation' ) ) {
				delete_option( 'burst_run_activation' );
			}
		}

		public function create_js_file() {
			if ( ! burst_user_can_manage() ) {
				return;
			}
			$cookieless      = burst_get_option( 'enable_cookieless_tracking' );
			$cookieless_text = $cookieless == '1' ? '-cookieless' : '';
			$beacon_enabled  = (int) burst_tracking_status_beacon();

			$localize_args = apply_filters(
				'burst_tracking_options',
				[
					'page_id'               => get_queried_object_id(),
					'cookie_retention_days' => 30,
					'beacon_url'            => burst_get_beacon_url(),
					'options'               => [
						'beacon_enabled'             => $beacon_enabled,
						'enable_cookieless_tracking' => (int) $cookieless,
						'enable_turbo_mode'          => (int) burst_get_option( 'enable_turbo_mode' ),
						'do_not_track'               => (int) burst_get_option( 'enable_do_not_track' ),
					],
					'goals'                 => burst_get_active_goals(),
					'goals_script_url'      => burst_get_goals_script_url(),
				]
			);

			$js = '';
			$js .= 'let burst = ' . json_encode( $localize_args ) . ';';
			$js .= file_get_contents( burst_path . "assets/js/build/burst$cookieless_text.min.js" );

			$upload_dir = burst_upload_dir( 'js' );
			$file       = $upload_dir . 'burst.min.js';
			if ( file_exists( $upload_dir ) && is_writable( $upload_dir ) ) {
				$handle = fopen( $file, 'wb' );
				fwrite( $handle, $js );
				fclose( $handle );
			}
		}

		/**
		 * On Multisite site creation, run table init hook as well.
		 *
		 * @return void
		 */
		public function run_table_init_hook() {
			// if already running, exit
			if ( defined( 'BURST_INSTALL_TABLES_RUNNING' ) ) {
				return;
			}

			define( 'BURST_INSTALL_TABLES_RUNNING', true );

			if ( get_transient( 'burst_running_upgrade' ) ) {
				return;
			}

			set_transient( 'burst_running_upgrade', true, 30 );
			do_action( 'burst_install_tables' );
			// we need to run table creation across subsites as well.
			if ( is_multisite() ) {
				$sites = get_sites();
				if ( count( $sites ) > 0 ) {
					foreach ( $sites as $site ) {
						switch_to_blog( $site->blog_id );
						do_action( 'burst_install_tables' );
						restore_current_blog();
					}
				}
			}
		}

		/**
		 * Add some privacy info
		 */
		public function add_privacy_info() {
			if ( ! function_exists( 'wp_add_privacy_policy_content' ) ) {
				return;
			}

			$content = sprintf(
				__( 'This website uses Burst Statistics, a Privacy-Friendly Statistics Tool to analyze visitor behavior. For this functionality we (this website) collect anonymized data, stored locally without sharing it with other parties. For more information, please read the %s Privacy Statement %s from Burst.', 'burst-statistics' ),
				'<a href="https://burst-statistics.com/legal/privacy-statement/" target="_blank">',
				'</a>'
			);
			wp_add_privacy_policy_content(
				'Burst Statistics',
				wp_kses_post( wpautop( $content, false ) )
			);
		}

		/**
		 * enqueue some assets
		 *
		 * @param $hook
		 */
		public function enqueue_assets( $hook ) {
			if ( $hook === 'index.php' || $hook === 'dashboard_page_burst' ) {
				$min  = ! is_rtl() && ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';
				$rtl  = is_rtl() ? 'rtl/' : '';
				$url  = trailingslashit( burst_url ) . "assets/css/{$rtl}admin{$min}.css";
				$path = trailingslashit( burst_path ) . "assets/css/{$rtl}admin{$min}.css";
				wp_enqueue_style( 'burst-admin', $url, array( 'wp-components' ), filemtime( $path ) );
			}
		}

		/**
		 * Setup default settings used for tracking
		 *
		 * @return void
		 */
		public function setup_defaults(): void {
			if ( get_option( 'burst_set_defaults' ) ) {
				update_option( 'burst_activation_time', time(), false );
				$this->run_table_init_hook();
                // tables installed, now set defaults
				$exclude_roles = burst_get_option( 'user_role_blocklist' );
				if ( ! $exclude_roles ) {
					$defaults = array( 'administrator' );
					burst_update_option( 'user_role_blocklist', $defaults );
				}

				$mailinglist = burst_get_option( 'email_reports_mailinglist' );
                if ( ! $mailinglist ) {
                    $defaults = array( array('email' => get_option( 'admin_email' ), 'frequency' => 'monthly') );
                    burst_update_option( 'email_reports_mailinglist', $defaults );
                }

				if ( get_option( 'burst_goals_db_version' ) === false ) {
					// if there is no goals db version, then we can assume there are no goals database.
					// rerun so this code is not executed
					return;
				}
				// set default goal
				// if there is no default goal, then insert one
				$goals = BURST()->goals->get_goals();
				$count = count( $goals );
				if ( $count === 0 ) {
					require_once burst_path . 'goals/class-goal.php';
					$goal        = new burst_goal();
					$goal->title = __( 'Default goal', 'burst-statistics' );
					$goal->save();
				}
				delete_option( 'burst_set_defaults' );
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
			                 . admin_url( 'index.php?page=burst' )
			                 . '" class="burst-settings-link">'
			                 . __( 'Settings', 'burst-statistics' ) . '</a>';
			array_unshift( $links, $settings_link );

			$support_link = defined( 'burst_free' )
				? 'https://wordpress.org/support/plugin/burst-statistics'
				: 'https://burst-statistics.com/support';
			$faq_link     = '<a target="_blank" href="' . $support_link . '">'
			                . __( 'Support', 'burst-statistics' ) . '</a>';
			array_unshift( $links, $faq_link );

			// if ( ! defined( 'burst_pro' ) ) {
			// $upgrade_link
			// = '<a style="color:#2DAAE1;font-weight:bold" target="_blank" href="https://burst-statistics.com/l/pricing">'
			// . __( 'Upgrade to pro', 'burst-statistics' ) . '</a>';
			// array_unshift( $links, $upgrade_link );
			// }

			return $links;
		}

		/**
		 * Function to easily add a column in a WordPress post table
		 *
		 * @param $column_title
		 * @param $post_type
		 * @param $cb
		 *
		 * @return void
		 * @since 1.1
		 */
		public function add_admin_column( $column_name, $column_title, $post_type, $sortable, $cb ) {
			// Add column
			add_filter(
				'manage_' . $post_type . '_posts_columns',
				function( $columns ) use ( $column_name, $column_title ) {
					$columns[ $column_name ] = $column_title;

					return $columns;
				}
			);

			// Add column content
			add_action(
				'manage_' . $post_type . '_posts_custom_column',
				function( $column, $post_id ) use ( $column_name, $column_title, $cb ) {
					if ( $column_name === $column ) {
						$cb( $post_id );
					}
				},
				10,
				2
			);

			// Add sortable column
			if ( $sortable ) {
				add_filter(
					'manage_edit-' . $post_type . '_sortable_columns',
					function( $columns ) use ( $column_name, $column_title ) {
						$columns[ $column_name ] = $column_name;

						return $columns;
					}
				);
			}
		}

		/**
		 * Function to add pageviews column to post table
		 *
		 * @return void
		 * @since 1.1
		 */
		public function add_burst_admin_columns() {
			if ( ! burst_user_can_view() ) {
				return;
			}
			$burst_column_post_types = apply_filters(
				'burst_column_post_types',
				[ 'post', 'page' ]
			);
			foreach ( $burst_column_post_types as $post_type ) {
				$this->add_admin_column(
					'pageviews',
					__( 'Pageviews', 'burst-statistics' ),
					$post_type,
					true,
					function( $post_id ) {
						$burst_total_pageviews_count = get_post_meta( $post_id, 'burst_total_pageviews_count', true );
						$count                       = (int) $burst_total_pageviews_count ?: 0;
						echo $count;
					}
				);
			}
		}

		public function posts_orderby_total_pageviews( $query ) {
			if ( ! is_admin() || ! $query->is_main_query() || ! burst_user_can_view() ) {
				return;
			}

			if ( 'pageviews' === $query->get( 'orderby' ) ) {
				$query->set( 'orderby', 'meta_value_num title ' );
				$query->set( 'meta_key', 'burst_total_pageviews_count' );
			}
		}

		/**
		 * Check if current day falls within required date range.
		 *
		 * @return bool
		 */
		public function is_bf() {
			if ( defined( 'burst_pro_version' ) ) {
				return false;
			}
			$start_day     = 20;
			$end_day       = 27;
			$current_year  = date( 'Y' );// e.g. 2021
			$current_month = date( 'n' );// e.g. 3
			$current_day   = date( 'j' );// e.g. 4

			if ( $current_year == 2023 &&
			     $current_month == 11 &&
			     $current_day >= $start_day &&
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
		 * @since  1.0
		 *
		 * @access public
		 */
		public function deactivate_popup() {
			// only on plugins page
			$screen = get_current_screen();
			if ( ! $screen || $screen->base !== 'plugins' ) {
				return;
			}
			$slug = sanitize_title( burst_plugin_name );

			?>
			<?php add_thickbox(); ?>
            <style>

                #TB_ajaxContent.burst-deactivation-popup {
                    text-align: center !important;
                }

                #TB_window.burst-deactivation-popup {
                    height: min-content !important;
                    margin-top: initial !important;
                    margin-left: initial !important;
                    display: flex;
                    flex-direction: column;
                    top: 50% !important;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 500px !important;
                    border-radius: 12px !important;
                    min-width: min-content;
                }

                .burst-deactivation-popup #TB_title {
                    padding-bottom: 20px;
                    border-radius: 12px;
                    border-bottom: none !important;
                    background: #fff !important;
                }

                .burst-deactivation-popup #TB_ajaxWindowTitle {
                    font-weight: bold;
                    font-size: 20px;
                    padding: 20px;
                    background: #fff !important;
                    border-radius: 12px 12px 0 0;
                    width: calc(100% - 40px);
                }

                .burst-deactivation-popup .tb-close-icon {
                    color: #333;
                    width: 25px;
                    height: 25px;
                    top: 12px;
                    right: 20px;
                }

                .burst-deactivation-popup .tb-close-icon:before {
                    font: normal 25px/25px dashicons;
                }

                .burst-deactivation-popup #TB_closeWindowButton:focus .tb-close-icon {
                    outline: 0;
                    color: #666;
                }

                .burst-deactivation-popup #TB_closeWindowButton .tb-close-icon:hover {
                    color: #666;
                }

                .burst-deactivation-popup #TB_closeWindowButton:focus {
                    outline: 0;
                }

                .burst-deactivation-popup #TB_ajaxContent {
                    width: 90% !important;
                    height: initial !important;
                    padding-left: 20px !important;
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

                .burst-deactivate-notice-content h3, .burst-deactivate-notice-content ul {
                }

                .burst-deactivate-notice-footer {
                    display: flex;
                    gap: 10px;
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
              jQuery(document).ready(function($) {
                $('#burst_close_tb_window').click(tb_remove);

                $(document).on('click', '#deactivate-<?php echo $slug; ?>', function(e) {
                  e.preventDefault();
                  tb_show('', '#TB_inline?height=420&inlineId=deactivate_and_delete_data', 'null');
                  $('#TB_window').addClass('burst-deactivation-popup');

                });
                if ($('#deactivate-<?php echo $slug; ?>').length) {
                  $('.burst-button-deactivate').attr('href', $('#deactivate-<?php echo $slug; ?>').attr('href'));
                }

              });
            </script>

            <div id="deactivate_and_delete_data" style="display: none;">
                <div class="burst-deactivate-notice-content">
                    <h4 style="margin:0 0 20px 0; text-align: left; font-size: 1.1em;">
						<?php _e( 'To deactivate the plugin correctly, please select if you want to:', 'burst-statistics' ); ?></h4>
                    <ul style="text-align: left;">

                        <li><?php _e( 'Deactivate', 'burst-statistics' ); ?></li>
                        <li>
							<?php _e( 'Deactivate, and remove all statistics, experiments and settings.', 'burst-statistics' ); ?>
							<?php _e( 'The data will be gone forever.', 'burst-statistics' ); ?>
                        </li>
                    </ul>
                </div>

				<?php
				$token                              = wp_create_nonce( 'burst_deactivate_plugin' );
				$deactivate_and_remove_all_data_url = add_query_arg(
					array(
						'action' => 'uninstall_delete_all_data',
						'token'  => $token,
					),
					admin_url( 'plugins.php' )
				);
				?>
                <div class="burst-deactivate-notice-footer">
                    <a class="button button-default" href="#"
                       id="burst_close_tb_window"><?php _e( 'Cancel', 'burst-statistics' ); ?></a>
                    <a class="button button-primary burst-button-deactivate"
                       href="#"><?php _e( 'Deactivate', 'burst-statistics' ); ?></a>
                    <a class="button button-burst-tertiary"
                       href="<?php echo esc_url( $deactivate_and_remove_all_data_url ); ?>"><?php _e( 'Deactivate and delete all data', 'burst-statistics' ); ?></a>
                </div>
            </div>
			<?php
		}

		/**
		 * Deactivate the plugin, based on made choice regarding data
		 */
		public function listen_for_deactivation(): void {
			// check user role
			if ( ! current_user_can( 'activate_plugins' ) ) {
				return;
			}

			// check nonce
			if ( ! isset( $_GET['token'] ) || ( ! wp_verify_nonce( $_GET['token'], 'burst_deactivate_plugin' ) ) ) {
				return;
			}

			// check for action
			if ( isset( $_GET['action'] ) && $_GET['action'] === 'uninstall_delete_all_data' ) {
				$this->delete_all_burst_data();
                $this->delete_all_burst_configuration();
				$plugin  = burst_plugin;
				$plugin  = plugin_basename( trim( $plugin ) );
				$current = get_option( 'active_plugins', [] );
				$current = $this->remove_plugin_from_array( $plugin, $current );
				update_option( 'active_plugins', $current );
				wp_redirect( admin_url( 'plugins.php' ) );
				exit;
			}
		}

		/**
		 * Clear all data from the reset button in the settings
		 *
		 * @param array  $output
		 * @param string $action
		 * @param        $data
		 *
		 * @return array
		 */
		public function maybe_delete_all_data( array $output, string $action, $data ) {
			if ( ! burst_user_can_manage() ) {
				return $output;
			}
			if ( $action === 'reset' ) {
				// delete everything
				$this->delete_all_burst_data();

				// reset to defaults
				burst_set_defaults(false);

                // immediately run setup defaults, so db tables get made
                $this->setup_defaults();

				$output = [
					'success' => true,
					'message' => __( 'Successfully cleared data.', 'burst-statistics' ),
				];
			}

			return $output;
		}

		/**
		 * Remove the plugin from the active plugins array when called from listen_for_deactivation
		 * */
		public function remove_plugin_from_array( $plugin, $current ) {
			$key = array_search( $plugin, $current );
			if ( false !== $key ) {
				unset( $current[ $key ] );
			}

			return $current;
		}

		/**
		 * Clear plugin data
		 */
		public function delete_all_burst_data() {
			if ( ! current_user_can( 'activate_plugins' ) ) {
				return;
			}
			global $wpdb;

			// post meta to delete
			$post_meta = array(
				'burst_total_pageviews_count',
			);

			if ( ! function_exists( 'delete_post_meta_by_key' ) ) {
				require_once ABSPATH . WPINC . '/post.php';
			}
			foreach ( $post_meta as $post_meta_key ) {
				delete_post_meta_by_key( $post_meta_key );
			}

			// tables to delete
			$table_names = apply_filters(
				'burst_all_tables',
                [
                    'burst_statistics',
                    'burst_sessions',
                    'burst_goals',
                    'burst_goal_statistics',
                    'burst_summary',
	                'burst_archived_months',
                ],
            );

			// delete tables
			foreach ( $table_names as $table_name ) {
				$sql = "DROP TABLE IF EXISTS $wpdb->prefix$table_name";
				$wpdb->query( $sql );
			}

			// options to delete
			$options = apply_filters(
                   'burst_table_db_options',
                   [
                       'burst_stats_db_version',
	                   'burst_sessions_db_version',
                       'burst_goals_db_version',
                       'burst_goal_stats_db_version',
                       'burst_archive_db_version'
                   ],
                );

			// delete options
			foreach ( $options as $option_name ) {
				delete_option( $option_name );
				delete_site_option( $option_name );
			}

		}

		public function delete_all_burst_configuration() {
			if ( ! current_user_can( 'activate_plugins' ) ) {
				return;
			}

			global $wp_roles;
			// capabilities to delete
			$roles        = $wp_roles->roles;
			$capabilities = [
				'manage_burst_statistics',
				'view_burst_statistics',
			];

			// delete user capabilities from all user roles
			foreach ( $roles as $role_name => $role_info ) {
				foreach ( $capabilities as $capability ) {
					$wp_roles->remove_cap( $role_name, $capability );
				}
			}


			// options to delete
			$options = [
				'burst_activation_time',
				'burst_set_defaults',
				'burst_review_notice_shown',
				'burst_run_premium_upgrade',
				'burst_tracking_status',
				'burst_table_size',
				'burst_import_geo_ip_on_activation',
				'burst_geo_ip_import_error',
				'burst_archive_dir',
				'burst_geo_ip_file',
				'burst_last_update_geo_ip',
				'burst_license_attempts',
				'burst_ajax_fallback_active',
				'burst_tour_shown_once',
				'burst_options_settings',
				'burst-current-version',
			];
			// delete options
			foreach ( $options as $option_name ) {
				delete_option( $option_name );
				delete_site_option( $option_name );
			}

			// get all burst transients
			$results = $wpdb->get_results(
				"SELECT `option_name` AS `name`, `option_value` AS `value`
                                FROM  $wpdb->options
                                WHERE `option_name` LIKE '%transient_burst%'
                                ORDER BY `option_name`",
				'ARRAY_A'
			);
			// loop through all burst transients and delete
			foreach ( $results as $key => $value ) {
				$transient_name = substr( $value['name'], 11 );
				delete_transient( $transient_name );
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
		public
		function ms_remove_tables(
			$tables, $blog_id
		) {
			global $wpdb;

			$tables[] = $wpdb->get_blog_prefix( $blog_id ) . 'burst_sessions';
			$tables[] = $wpdb->get_blog_prefix( $blog_id ) . 'burst_statistics';
			$tables[] = $wpdb->get_blog_prefix( $blog_id ) . 'burst_goals';
			$tables[] = $wpdb->get_blog_prefix( $blog_id ) . 'burst_archived_months';
			$tables[] = $wpdb->get_blog_prefix( $blog_id ) . 'burst_goal_statistics';
			$tables[] = $wpdb->get_blog_prefix( $blog_id ) . 'burst_summary';

			return $tables;
		}
	}
} //class closure
