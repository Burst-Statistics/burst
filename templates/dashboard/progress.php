<?php defined( 'ABSPATH' ) or die( "you do not have access to this page!" );?>

<?php //$progress = BURST::admin->dashboard_percentage_complete();
$progress = 0;
?>

	<div class="burst-scroll-container">
			<?php

			if ( isset($_GET['status']) && $_GET['status'] === 'remaining' ) {
				$notice_args['status'] = array('urgent', 'open');
			}
            $notices = BURST::$notices->get_notices( array( 'cache'=>false ) );
			if (count($notices) == 0 ){
				//make sure we don't have an empty space
				$notices['no-notices'] = array(
						'status' => 'completed',
						'plus_one' => false,
						'message'    => sprintf(
                                            __( 'You have no new notices! Have a look at our %sdocumentation%s and see all the possibilities %s has to offer.', 'burst-statistics' ),
                                            '<a href="https://burst-statistics.com/docs/" target="_blank">',
                                            '</a>',
                                            burst_plugin_name
                                        ),
				);
                $notices['leave_feedback'] = array(
                    'status' => 'completed',
                    'plus_one' => false,
                    'message'    =>  burst_sprintf(
                        __( 'If you have any suggestions to improve our plugin, feel free to %sopen a support thread%s.', 'burst-statistics' ),
                        '<a href="https://wordpress.org/support/plugin/burst-statistics/" target="_blank">',
                        '</a>'
                    ),
                );
				?>
			<?php }
			$status_message = '';
			foreach ( $notices as $id => $notice) {
				$status = $notice['status'];
				$plus_one = $notice['plus_one'];
				if ( $status === 'completed' ) {
					$status_message = __("Completed", 'burst-statistics');
				}
				if ( $status === 'open' ) {
					$status_message = __("Open", 'burst-statistics');
				}
				if ( $status === 'urgent' ) {
					$status_message = __("Urgent", 'burst-statistics');
				}
				if ( $status === 'premium' ) {
					$status_message = __("Premium", 'burst-statistics');
				}

				?>
                    <div class="burst-notice">
                        <div class="burst-notice__status <?php echo esc_attr($status)?>"><?php echo wp_kses_post($status_message)?></div>
                        <div class="burst-notice__message">
                            <p>
                                <?php echo wp_kses_post($notice['message']) ?>
                                <?php if ( $plus_one ) { ?>
                                    <span class="burst-plus-one">1</span>
                                <?php } ?>
                            </p>
                        </div>
                        <div class="burst-notice__dismiss">
                            <?php if ( $status === 'open' ) { ?>
                                <button type="button" class="burst-dismiss-warning" data-warning_id="<?php echo intval($id)?>">
                                    X
                                </button>
                            <?php } ?>
                        </div>
                    </div>

				<?php
                    }
                ?>
	</div>
<?php

