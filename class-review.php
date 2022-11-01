<?php
defined( 'ABSPATH' ) or die( "you do not have access to this page!" );

if ( ! class_exists( "burst_review" ) ) {
	class burst_review {
		private static $_this;

		function __construct() {
			if ( isset( self::$_this ) ) {
				wp_die( burst_sprintf( '%s is a singleton class and you cannot create a second instance.',
					get_class( $this ) ) );
			}
			self::$_this = $this;

			//uncomment for testing
//			update_option('burst_review_notice_shown', false);
//			update_option( 'burst_activation_time', strtotime( "-2 month" ) );
			
			//show review notice, only to free users
			if ( ! defined( "burst_premium" ) && ! is_multisite() ) {
				if ( ! get_option( 'burst_review_notice_shown' )
				     && get_option( 'burst_activation_time' )
				     && get_option( 'burst_activation_time' )
				        < strtotime( "-1 month" )
				) {
					add_action( 'wp_ajax_dismiss_review_notice',
						array( $this, 'dismiss_review_notice_callback' ) );

					add_action( 'admin_notices',
						array( $this, 'show_leave_review_notice' ) );
					add_action( 'admin_print_footer_scripts',
						array( $this, 'insert_dismiss_review' ) );
				}

				//set a time for users who didn't have it set yet.
				if ( ! get_option( 'burst_activation_time' ) ) {
					update_option( 'burst_activation_time', time(), false );
				}
			}

			add_action('admin_init', array($this, 'process_get_review_dismiss' ));

		}

		static function this() {
			return self::$_this;
		}

		public function show_leave_review_notice() {
			if (isset( $_GET['burst_dismiss_review'] ) ) return;

			/**
			 * Prevent notice from being shown on Gutenberg page, as it strips off the class we need for the ajax callback.
			 *
			 * */
			$screen = get_current_screen();
			if ( $screen->parent_base === 'edit' ) {
				return;
			}
			?>
			<style>
                .burst.wrap .notice.burst-review {
                    margin: var(--rsp-spacing-l, 30px);
                }
				.burst-container {
					display: flex;
					padding: 12px;
				}

				.burst-container .dashicons {
					margin-left: 10px;
					margin-right: 5px;
				}

				.burst-review-image img {
					margin-top: 0.5em;
				}

				.burst-buttons-row {
					margin-top: 10px;
					display: flex;
					align-items: center;
				}
			</style>
			<div id="message"
			     class="updated fade notice is-dismissible burst-review really-simple-plugins"
			     style="border-left:4px solid var(--rsp-green, #2e8a37)">
				<div class="burst-container">
					<div class="burst-review-image"><img width="80px"
					                                     src="<?php echo esc_url_raw(burst_url) ?>/assets/img/burst-logo.svg"
					                                     alt="review-logo">
					</div>
					<div style="margin-left:30px">
                        <p>
                        	<b>
                                <?php _e( 'Hi, you have been using Burst for more than a month now, awesome!', 'burst-statistics') ?>&nbsp;
                        	</b>
                            <?php burst_printf( __('If you have any questions or feedback, leave us a %smessage%s.', 'burst-statistics' ), '<a href="https://burst-statistics.com/contact" target="_blank">', '</a>' );?>
                        </p>
                        <p>
                            <?php _e('If you have a moment, please consider leaving a review on WordPress.org to spread the word. We greatly appreciate it!', 'burst-statistics'); ?>
                        </p>
						<i>- Hessel</i>
						<div class="burst-buttons-row">
							<a class="button button-primary" target="_blank"
							   href="https://wordpress.org/support/plugin/burst-statistics/reviews/#new-post"><?php _e( 'Leave a review',
									'burst-statistics' ); ?></a>

							<div class="dashicons dashicons-calendar"></div>
							<a href="#"
							   id="maybe-later"><?php _e( 'Maybe later',
									'burst-statistics' ); ?></a>

							<div class="dashicons dashicons-no-alt"></div>
							<a href="<?php echo add_query_arg(array('page'=>'burst', 'burst_dismiss_review'=>1), admin_url('admin.php') )?>"><?php _e( 'Don\'t show again',
									'burst-statistics' ); ?></a>
						</div>
					</div>
				</div>
			</div>
			<?php

		}

		/**
		 * Insert some ajax script to dismiss the review notice, and stop nagging about it
		 *
		 * @since  2.0
		 *
		 * @access public
		 *
		 * type: dismiss, later
		 *
		 */

		public function insert_dismiss_review() {
			$ajax_nonce = wp_create_nonce( "burst_dismiss_review" );
			?>
			<script type='text/javascript'>
				jQuery(document).ready(function ($) {
					$(".burst-review.notice.is-dismissible").on("click", ".notice-dismiss", function (event) {
						burst_dismiss_review('dismiss');
					});
					$(".burst-review.notice.is-dismissible").on("click", "#maybe-later", function (event) {
						burst_dismiss_review('later');
						$(this).closest('.burst-review').remove();
					});
					$(".burst-review.notice.is-dismissible").on("click", ".review-dismiss", function (event) {
						burst_dismiss_review('dismiss');
						$(this).closest('.burst-review').remove();
					});

					function burst_dismiss_review(type) {
						var data = {
							'action': 'dismiss_review_notice',
							'type': type,
							'token': '<?php echo esc_attr($ajax_nonce); ?>'
						};
						$.post(ajaxurl, data, function (response) {
						});
					}
				});
			</script>
			<?php
		}

		/**
		 * Process the ajax dismissal of the review message.
		 *
		 * @since  2.1
		 *
		 * @access public
		 *
		 */

		public function dismiss_review_notice_callback() {
			$type = isset( $_POST['type'] ) ? sanitize_title($_POST['type']) : false;

			if ( $type === 'dismiss' ) {
				update_option( 'burst_review_notice_shown', true, false );
			}
			if ( $type === 'later' ) {
				//Reset activation timestamp, notice will show again in one month.
				update_option( 'burst_activation_time', time(), false );
			}

			wp_die(); // this is required to terminate immediately and return a proper response
		}

		/**
		 * Dismiss review notice with get, which is more stable
		 */

		public function process_get_review_dismiss(){
			if (isset( $_GET['burst_dismiss_review'] ) ){
				update_option( 'burst_review_notice_shown', true, false );
			}
		}
	}
}
