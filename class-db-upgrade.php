<?php defined( 'ABSPATH' ) or die( 'you do not have access to this page!' );
if ( ! class_exists( 'burst_db_upgrade' ) ) {
	class burst_db_upgrade {
		private static $_this;

		public function __construct() {
			if ( isset( self::$_this ) ) {
				wp_die(
					burst_sprintf(
						'%s is a singleton class and you cannot create a second instance.',
						get_class( $this )
					)
				);
			}

			self::$_this = $this;
			// actions and filters
			if ( ! wp_doing_cron() ) {
				add_action( 'admin_init', array( $this, 'init' ) );
			}
		}

		/**
		 * Init the upgrades
		 * - upgrade only if admin is logged in
		 * - only one upgrade at a time
		 *
		 * return void
		 */
		public function init() {
			if ( defined( 'BURST_NO_UPGRADE' ) && BURST_NO_UPGRADE ) {
				return;
			}

			if ( ! burst_admin_logged_in() ) {
				return;
			}

			$upgrade_running = get_transient( 'burst_upgrade_running' );
			if ( $upgrade_running ) {
				return;
			}
			set_transient( 'burst_upgrade_running', true, 60 );
			// check if we need to upgrade
			$db_upgrades = $this->get_db_upgrades();
			// check if all upgrades are done
			$do_upgrade = false;
			foreach ( $db_upgrades as $upgrade ) {
				if ( get_option( "burst_db_upgrade_$upgrade" ) == true ) { // if any upgrade is not done
					$do_upgrade = $upgrade;
					// if we need to upgrade break the loop
					break;
				}
			}
			// only one upgrade at a time
			if ( $do_upgrade === 'bounces' ) {
				$this->upgrade_bounces();
			}
			if ( $do_upgrade === 'goals_remove_columns' ) {
				$this->upgrade_goals_remove_columns();
			}
			if ( $do_upgrade === 'goals_set_conversion_metric' ) {
				$this->upgrade_goals_set_conversion_metric();
			}
			if ( $do_upgrade === 'drop_user_agent' ) {
				$this->upgrade_drop_user_agent();
			}
			if ( $do_upgrade === 'empty_referrer_when_current_domain' ) {
				$this->upgrade_empty_referrer_when_current_domain();
			}
			if ( $do_upgrade === 'strip_domain_names_from_entire_page_url' ) {
				$this->upgrade_strip_domain_names_from_entire_page_url();
			}
			if ( $do_upgrade === 'summary_table' ) {
				BURST()->summary->upgrade_summary_table_alltime();
			}

			delete_transient( 'burst_upgrade_running' );
		}

		/**
		 * Get the upgrades
		 *
		 * @return array
		 */
		private function get_db_upgrades() {
			return apply_filters(
				'burst_db_upgrades',
				array(
					'bounces',
					'goals_remove_columns',
					'goals_set_conversion_metric',
					'drop_user_agent',
					'empty_referrer_when_current_domain',
					'strip_domain_names_from_entire_page_url',
					'summary_table',
				)
			);
		}

		private function upgrade_bounces() {
			if ( ! burst_admin_logged_in() ) {
				return;
			}
			if ( ! get_option( 'burst_db_upgrade_bounces' ) ) {
				return;
			}

			global $wpdb;
			$table_name = $wpdb->prefix . 'burst_statistics';

			$sql = "UPDATE $table_name
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

			$result = $wpdb->query( $sql );
			if ( $result === false ) {
				burst_error_log( 'db upgrade bounces multiple sessions failed' );
				return;
			}

			$sql    = "UPDATE $table_name
					SET bounce = 0
					WHERE bounce = 1 AND time_on_page > 5000";
			$result = $wpdb->query( $sql );

			// if query is successful
			if ( $result !== false ) {
				delete_option( 'burst_db_upgrade_bounces' );
			} else {
				burst_error_log( 'db upgrade bounces failed' );
			}
		}

		private function upgrade_goals_remove_columns() {
			if ( ! burst_admin_logged_in() ) {
				return;
			}
			if ( ! get_option( 'burst_db_upgrade_goals_remove_columns' ) ) {
				return;
			}

			global $wpdb;
			$table_name = $wpdb->prefix . 'burst_goals';
			// check if columns exist first
			$columns = $wpdb->get_col( "DESC $table_name", 0 );
			if ( ! in_array( 'event', $columns ) || ! in_array( 'action', $columns ) ) {
				delete_option( 'burst_db_upgrade_goals_remove_columns' );
				return;
			}

			// run an sql query to remove the columns `event` and `action`
			$sql = "ALTER TABLE $table_name
					DROP COLUMN `event`,
					DROP COLUMN `action`";

			$remove = $wpdb->query( $sql );

			if ( $remove !== false ) {
				delete_option( 'burst_db_upgrade_goals_remove_columns' );
			}
		}

		private function upgrade_goals_set_conversion_metric() {
			if ( ! burst_admin_logged_in() ) {
				return;
			}
			$option_name = 'burst_db_upgrade_goals_set_conversion_metric';
			if ( ! get_option( $option_name ) ) {
				return;
			}

			global $wpdb;
			$table_name = $wpdb->prefix . 'burst_goals';

			// set conversion_metric to 'pageviews' for all goals
			$sql = "UPDATE $table_name
					SET conversion_metric = 'pageviews'
					WHERE conversion_metric IS NULL OR conversion_metric = ''";

			$add_conversion_metric = $wpdb->query( $sql );

			if ( $add_conversion_metric !== false ) {
				delete_option( $option_name );
			}
		}

		private function upgrade_drop_user_agent() {
			if ( ! burst_admin_logged_in() ) {
				return;
			}

			$option_name = 'burst_db_upgrade_drop_user_agent';
			if ( ! get_option( $option_name ) ) {
				return;
			}

			global $wpdb;
			$table_name = $wpdb->prefix . 'burst_statistics';

			// check if columns exist first
			$columns = $wpdb->get_col( "DESC $table_name", 0 );
			if ( ! in_array( 'user_agent', $columns, true ) ) {
				delete_option( 'burst_db_upgrade_drop_user_agent' );
				return;
			}

			// drop user_agent column
			$sql = "ALTER TABLE $table_name
					DROP COLUMN `user_agent`";

			$drop_user_agent = $wpdb->query( $sql );

			if ( $drop_user_agent !== false ) {
				delete_option( $option_name );
			}
		}

		private function upgrade_empty_referrer_when_current_domain() {
			if ( ! burst_admin_logged_in() ) {
				return;
			}
			$option_name = 'burst_db_upgrade_empty_referrer_when_current_domain';
			if ( ! get_option( $option_name ) ) {
				return;
			}

			global $wpdb;
			$table_name = $wpdb->prefix . 'burst_statistics';
			$home_url   = home_url();
			// empty referrer when starts with current domain
			$sql = "UPDATE $table_name
					SET referrer = null
					WHERE referrer LIKE '$home_url%'";

			$empty_referrer_when_current_domain = $wpdb->query( $sql );

			if ( $empty_referrer_when_current_domain !== false ) {
				delete_option( $option_name );
			}
		}

		private function upgrade_strip_domain_names_from_entire_page_url() {
			if ( ! burst_admin_logged_in() ) {
				return;
			}
			$option_name = 'burst_db_upgrade_strip_domain_names_from_entire_page_url';
			if ( ! get_option( $option_name ) ) {
				return;
			}

			global $wpdb;
			$table_name = $wpdb->prefix . 'burst_statistics';
			// make sure it does not end with slash
			$home_url = untrailingslashit( home_url() );

			// strip home url from entire_page_url where it starts with home_url
			$sql = "UPDATE $table_name
					SET entire_page_url = REPLACE(entire_page_url, '$home_url', '')
					WHERE entire_page_url LIKE '$home_url%'";

			$strip_domain_names_from_entire_page_url = $wpdb->query( $sql );

			if ( $strip_domain_names_from_entire_page_url !== false ) {
				delete_option( $option_name );
			}
		}
	}
}
