<?php
defined( 'ABSPATH' ) or die();

if ( ! class_exists( "burst_goals_tracker" ) ) {
	class burst_goals_tracker {
		public function __construct() {
			add_action('init', array( $this, 'add_dynamic_hooks' ) );
		}

		public function add_dynamic_hooks(): void {
			$goals = burst_get_active_goals(true);
			require_once burst_path . 'goals/class-goal.php';
			foreach ( $goals as $goal) {
				$goal = new burst_goal($goal['ID']);
				if ( $goal->type !== 'hook' ) {
					continue;
				}
				$hook = $goal->hook;
				if ( $hook ) {
					add_action( $hook, function() use ($hook) {
						$this->handle_hook($hook);
					});
				}
			}
		}

		/**
		 * Get the goal by hook name
		 *
		 * @param string $find_hook_name
		 *
		 * @return int|bool
		 */
		public function get_goal_by_hook_name( string $find_hook_name) {
			$goals = burst_get_active_goals(true);
			require_once burst_path . 'goals/class-goal.php';

			foreach ( $goals as $goal) {
				$goal = new burst_goal($goal['ID']);
				if ( $goal->type !== 'hook' ) {
					continue;
				}

				$hook = $goal->hook;
				if ( $hook === $find_hook_name ) {
					return $goal->id;
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
		public function handle_hook( string $hook_name): void {
			//get cookie burst_uid
			$burst_uid = isset($_COOKIE['burst_uid']) ? burst_sanitize_uid($_COOKIE['burst_uid']) : false;
			//we assume there has at least been one interaction clientside, so there should be a uid.
			if ( $burst_uid ) {
				$statistic = burst_get_last_user_statistic( $burst_uid, false);
				$statistic_id = $statistic['ID'] ?? false;
				if ( !$statistic_id ) {
					return;
				}
				//get the goal by $hook_name.
				$goal_id = $this->get_goal_by_hook_name($hook_name);
				$goal_arr = array(
					'goal_id'      => $goal_id,
					'statistic_id' => $statistic_id,
				);
				burst_create_goal_statistic( $goal_arr );
			}
		}

	}

}