<?php
defined( 'ABSPATH' ) or die();

if ( ! class_exists( "burst_goals_tracker" ) ) {
	class burst_goals_tracker {
		public function __construct() {
			add_action( 'init', array( $this, 'add_dynamic_hooks' ) );

		}

		public function add_dynamic_hooks(): void {
			$goals = burst_get_active_goals( true );
			require_once burst_path . 'goals/class-goal.php';
			foreach ( $goals as $goal ) {
				$goal = new burst_goal( $goal['ID'] );
				if ( $goal->type !== 'hook' ) {
					continue;
				}
				$hook = $goal->hook;
				if ( $hook ) {
					add_action( $hook, function() use ( $hook ) {
						$this->handle_hook( $hook );
					} );
				}
			}
		}

		/**
		 * Get the goal by hook name
		 *
		 * @param string $find_hook_name
		 *
		 * @return burst_goal|bool
		 */
		public function get_goal_by_hook_name( string $find_hook_name ) {
			$goals = burst_get_active_goals( true );
			require_once burst_path . 'goals/class-goal.php';

			foreach ( $goals as $goal ) {
				$goal = new burst_goal( $goal['ID'] );
				if ( $goal->type !== 'hook' ) {
					continue;
				}

				$hook = $goal->hook;
				if ( $hook === $find_hook_name ) {
					return $goal;
				}
			}

			return false;
		}

		/**
		 * Process the execution of a hook as goal achieved
		 *
		 * @param string $hook_name
		 *
		 * @return void
		 */
		public function handle_hook( string $hook_name ): void {

			// get cookie burst_uid
			$burst_uid = isset( $_COOKIE['burst_uid'] ) ? burst_sanitize_uid( $_COOKIE['burst_uid'] ) : false;
			// we assume there has at least been one interaction clientside, so there should be a uid.
			if ( $burst_uid ) {
				$statistic    = burst_get_last_user_statistic( $burst_uid, false );
				$statistic_id = $statistic['ID'] ?? false;
				if ( ! $statistic_id ) {
					return;
				}
				$page_url = $statistic['entire_page_url'] ?? false;

				//get the goal by $hook_name.
				$goal = $this->get_goal_by_hook_name( $hook_name );
				if ( ! $goal ) {
					return;
				}
				//if the goal should be tracked on a specific page only, check if the current page is the page to track.
				if ( $goal->page_or_website === 'page' ) {
					//this is a relative url
					$tracking_page = $goal->specific_page;
					if ( $page_url && strpos( $page_url, $tracking_page ) === false ) {
						return;
					}
				}

				$goal_arr = array(
					'goal_id'      => $goal->id,
					'statistic_id' => $statistic_id,
				);
				
				burst_create_goal_statistic( $goal_arr );
			} else {
				burst_error_log( 'No burst_uid found in handle_hook' );
			}
		}

	}

}