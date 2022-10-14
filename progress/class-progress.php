<?php
defined( 'ABSPATH' ) or die( "you do not have access to this page!" );
class burst_progress {
	private static $_this;

	function __construct() {
		if ( isset( self::$_this ) )
			wp_die( sprintf( '%s is a singleton class and you cannot create a second instance.', get_class( $this ) ) );
		self::$_this = $this;
	}

	static function this() {
		return self::$_this;
	}

	public function get() {
		return [
//			'text' => $this->get_text(),
//			'percentage' => $this->percentage(),
			'notices' => $this->notices(),
		];
	}

	public function notices(){
		error_log("notices");
		$notices = BURST::$notices->get_notices_list(array( 'status' => 'all' ));
		$out = [];
		foreach ($notices as $id => $notice ) {
			$notice['id'] = $id;
			$out[] =  $notice;
		}
		return $out;
	}

//	/**
//	 * Calculate the percentage completed in the dashboard progress section
//	 * Determine max score by adding $notice['score'] to the $max_score variable
//	 * Determine actual score by adding $notice['score'] of each item with a 'success' output to $actual_score
//	 * @return int
//	 *
//	 * @since 4.0
//	 *
//	 */
//
//	private function percentage() {
//		if ( ! burst_user_can_view() ) {
//			return 0;
//		}
//
//		$max_score    = 100;
//		$actual_score = 100;
//		$notices = BURST::$notices->get_notices_list(array(
//			'status' => 'all',
//		));
//		foreach ( $notices as $id => $notice ) {
//			if (isset( $notice['score'] )) {
//				// Only items matching condition will show in the dashboard. Only use these to determine max count.
//				$max_score = $max_score + intval( $notice['score'] );
//				$success = ( isset( $notice['output']['icon'] )
//				             && ( $notice['output']['icon']
//				                  === 'success' ) ) ? true : false;
//				if ( $success ) {
//					// If the output is success, task is completed. Add to actual count.
//					$actual_score = $actual_score + intval( $notice['score'] );
//				}
//			}
//		}
//		$score = $max_score>0 ? $actual_score / $max_score :0;
//		return intval( round( $score * 100 ) );
//	}

//	/**
//	 * Get text for progress block
//	 *
//	 * @return string
//	 */
//	private function get_text(){
//		if ( ! burst_user_can_view() ) {
//			return '';
//		}
//		ob_start();
//
//		$open_task_count = count( BURST::$notices->get_notices_list( array( 'status' => 'open' ) ));
//		// @todo add good text
//		if ( $open_task_count === 0 ) {
//			_e("Zero tasks open", "burst-statistics");
//		} else {
//			_e("You still have some tasks open", "burst-statistics");
//		}
//		do_action('burst_progress_feedback');
//		return ob_get_clean();
//	}

	/**
	 * Process the react dismissal of a task
	 *
	 * Since 3.1
	 *
	 * @access public
	 *
	 */

	public function dismiss_task($id)
	{
		error_log("dismiss task $id");
		if ( !empty($id) ) {

			$id = sanitize_title( $id );
			update_option( "burst_".$id."_dismissed", true, false );
			delete_transient( 'burst_plusone_count' );

			// count should be updated, therefore clear cache
//			BURST::$really_simple_ssl->clear_transients();
		}

		return true;
	}
}