<?php defined( 'ABSPATH' ) or die( "you do not have access to this page!" );
if ( ! class_exists( "burst_db_upgrade" ) ) {
	class burst_db_upgrade {
		private static $_this;

		public function __construct() {
			if ( isset( self::$_this ) ) {
				wp_die( burst_sprintf( '%s is a singleton class and you cannot create a second instance.',
					get_class( $this ) ) );
			}

			self::$_this = $this;
			// actions and filters
			add_action( 'admin_init', array( $this, 'init' ) );
		}

		/**
		 * Init the upgrades
		 * - upgrade only if admin is logged in
		 * - only one upgrade at a time
		 *
		 * return void
		 */

		public function init() {
			if ( ! burst_admin_logged_in() ) {
				return;
			}
			// check if we need to upgrade
			$db_upgrades = $this->get_db_upgrades();
			// check if all upgrades are done
			$do_upgrade = false;
			foreach ( $db_upgrades as $upgrade ) {
				error_log( get_option( "burst_db_upgrade_$upgrade"));
				if ( get_option( "burst_db_upgrade_$upgrade" ) == true ) { // if any upgrade is not done
					$do_upgrade = $upgrade;
					// if we need to upgrade break the loop
					break;
				}
			}
			error_log( 'burst db upgrade init' );
			error_log( $do_upgrade);
			// only one upgrade at a time
			if ( $do_upgrade === 'bounces' ) {
				$this->upgrade_bounces();
			}
			if ( $do_upgrade === 'goals_remove_columns' ) {
				$this->upgrade_goals_remove_columns();
			}
		}

		/**
		 * Get the upgrades
		 *
		 * @return array
		 */

		private function get_db_upgrades() {
			return apply_filters( 'burst_db_upgrades', [
				'bounces',
				'goals_remove_columns',
			] );
		}

		private function upgrade_bounces() {
			error_log('db upgrade bounces');
			if ( ! burst_admin_logged_in() ) {
				error_log( 'burst db upgrade bounces not logged in');
				return;
			}
			if ( ! get_option( 'burst_db_upgrade_bounces' ) ) {
				error_log( 'burst db upgrade bounces not needed');
				return;
			}
			error_log( 'burst db upgrade bounces start');
			// @todo remove
			//			$limit = (int) apply_filters('burst_db_upgrade_bounces_limit', 10000);
			//			$offset = (int) get_option('burst_db_upgrade_bounces_offset', 0);

			global $wpdb;
			$table_name = $wpdb->prefix . 'burst_statistics';

			$sql    = "UPDATE $table_name
					SET bounce = 0
					WHERE
					  (session_id IN (
					    SELECT session_id
					    FROM (
					      SELECT session_id
					      FROM $table_name
					      GROUP BY session_id
					      HAVING COUNT(*) >= 2
					    ) as t
					  ))";


			// @todo remove
			$start = microtime(true);
			$result = $wpdb->query( $sql );
			$end = microtime(true);
			error_log( 'burst db upgrade bounces multiple sessions time: ' . ($end - $start) );

			if ( $result !== false ) {
				error_log( 'burst db upgrade bounces multiple sessions success' );
			} else {
				error_log( 'burst db upgrade bounces multiple sessions failed' );

				return;
			}

			$sql    = "UPDATE $table_name
					SET bounce = 0
					WHERE bounce = 1 AND time_on_page > 5000";

			// @todo remove
			$start = microtime(true);
			$result = $wpdb->query( $sql );
			$end = microtime(true);
			error_log( 'burst db upgrade bounces time on page time: ' . ($end - $start) );

			// if query is successful
			if ( $result !== false ) {
				error_log( 'burst db upgrade bounces success' );
				update_option( 'burst_db_upgrade_bounces', false);
			} else {
				error_log( 'burst db upgrade bounces failed' );
			}
		}

		private function upgrade_goals_remove_columns(){
			if ( ! burst_admin_logged_in() ) {
				return;
			}
			if ( ! get_option( 'burst_db_upgrade_goals_remove_columns' ) ) {
				return;
			}

			global $wpdb;
			$table_name = $wpdb->prefix . 'burst_goals';
			// run an sql query to remove the columns `event` and `action`
			$sql    = "ALTER TABLE $table_name
					DROP COLUMN `event`,
					DROP COLUMN `action`";

			$remove = $wpdb->query( $sql );

			if ( $remove !== false ) {
				update_option( 'burst_db_upgrade_goals_remove_columns', false);
			}
			
		}
	}
}