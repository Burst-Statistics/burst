<?php 
defined( 'ABSPATH' ) or die( "you do not have acces to this page!" );
	
if ( ! class_exists( "burst_experimenting" ) ) {
	class burst_experimenting {
		private static $_this;
		public $experimenting_enabled = false;
		public $cookie_expiration_days;

		function __construct() {
			if ( isset( self::$_this ) ) {
				wp_die( burst_sprintf( '%s is a singleton class and you cannot create a second instance.',
					get_class( $this ) ) );
			}
			$this->cookie_expiration_days = apply_filters('burst_cookie_retention_days', 365);
			add_action( 'init', array($this, 'add_experiment_post_status') );
			add_filter( 'the_content', array($this, 'load_experiment_content'), 10, 2);
			add_action( 'wp_enqueue_scripts', array($this,'enqueue_assets') );
			add_action( 'admin_footer-post.php', array($this,'add_variant_status_add_in_post_page') );
		    add_action( 'admin_footer-post-new.php', array($this,'add_variant_status_add_in_post_page') );
		    add_action( 'admin_footer-edit.php', array($this,'add_variant_status_add_in_quick_edit') );
		    add_filter( 'display_post_states', array( $this, 'add_display_post_states' ), 10, 2 );
		    add_action( 'wp_ajax_burst_experiment_action', array($this, 'experiment_action'));
			add_action( 'burst_wizard_experiment',array( $this, 'process_burst_experiment' ) );

			self::$_this = $this;
		}

		static function this() {
			return self::$_this;
		}

        /**
         * Function to process the wizard data
         */

		public function process_burst_experiment()
		{
			if (!burst_user_can_manage()) return;
			if (isset($_GET['page']) && $_GET['page'] !== 'burst-experiment') return;
            //when clicking to the last page, or clicking finish, run the finish sequence.
            if ( isset( $_POST['burst-finish'] ) || isset( $_POST['burst-next'] ) || isset( $_POST['burst-save'] ) || isset( $_POST['burst-stop'] ) ){
                if ( ! isset( $_POST['burst_nonce'] ) || ! wp_verify_nonce( $_POST['burst_nonce'], 'burst_save' ) ) {
                    return;
                }
            } else {
                return;
            }


            $experiment_id = ( isset( $_GET['experiment_id'] ) ) ? intval( $_GET['experiment_id'] ) : intval( $_POST['experiment_id'] );
            $control_id = isset( $_POST['burst_control_id'] ) ? intval($_POST['burst_control_id']) : false;
            if ( $experiment_id ) {
                $experiment = new BURST_EXPERIMENT( $experiment_id );
				$experiment->process_form( $_POST );
            } else {
                $experiment_id = $this->create_experiment( $control_id );

                $url = add_query_arg(array( 'page' => 'burst-'.sanitize_title($_POST['wizard_type']) ),  admin_url('admin.php') );
                if ( isset( $experiment_id ) ) {
                    $url = add_query_arg(array( 'experiment_id' => $experiment_id),  $url );
                }
                if ( isset( $experiment_id ) ) {
                    $url = add_query_arg(array( 'step' => 2),  $url );
                }

            wp_redirect( $url );
            exit();

            }

            //after clicking finish, redirect to dashboard.
            if ( isset( $_POST['burst-finish'] ) ) {
                $experiment = new BURST_EXPERIMENT( $experiment_id );
                $experiment->start();
                wp_redirect( admin_url( 'admin.php?page=burst&experiment_id=' . $experiment_id . '&burst-start' ) );
                exit();
            }
            //after clicking finish, redirect to dashboard.
            if ( isset( $_POST['burst-stop'] ) ) {
                $experiment = new BURST_EXPERIMENT( $experiment_id );
                $experiment->stop();
                wp_redirect( admin_url( 'admin.php?page=burst&experiment_id=' . $experiment_id . '&burst-stop' ) );
                exit();
            }

		}

		/**
		 * Get an activate experiment_id
		 */

		public function get_selected_experiment_id(){
			if (isset( $_GET['experiment_id'] )) {
				$experiment_id = intval( $_GET['experiment_id'] );
				update_user_meta(get_current_user_id(), 'burst_selected_experiment_id', $experiment_id);
			} else {
				if ( get_user_meta(get_current_user_id(), 'burst_selected_experiment_id' ) ) {
					$experiment_id = get_user_meta(get_current_user_id(), 'burst_selected_experiment_id', true );
				} else {
					$experiment_id = burst_get_default_experiment_id();
				}
			}
			return $experiment_id;
		}

		/**
		 * Function for post duplication. Dups appear as experiments. User is redirected to the edit screen
		 * @param int $post_id
		 */

		public function duplicate_post($post_id)
		{
			if (!burst_user_can_manage()) return false;
			global $wpdb;

			$post = get_post($post_id);
			$current_user = wp_get_current_user();
			$new_post_author = $current_user->ID;
			if (isset($post) && $post != null) {
				$args = array(
					'comment_status'     => $post->comment_status,
					'post_author'        => $new_post_author,
					'post_content'       => $post->post_content,
					'post_excerpt'       => $post->post_excerpt,
					'post_parent'        => $post->post_parent,
					'post_password'      => $post->post_password,
					'post_title'         => __( 'Variant:', 'burst' ) . ' ' . $post->post_title,
					'post_slug'          => $post->post_title,
					'post_type'          => $post->post_type,
					'to_ping'            => $post->to_ping,
					'menu_order'         => $post->menu_order
				);
				$new_post_id = wp_insert_post($args);

				/*
				 * get all current post terms ad set them to the new post draft
				 */
				$taxonomies = get_object_taxonomies($post->post_type); // returns array of taxonomy names for post type, ex array("category", "post_tag");
				foreach ($taxonomies as $taxonomy) {
					$post_terms = wp_get_object_terms($post_id, $taxonomy, array('fields' => 'slugs'));
					wp_set_object_terms($new_post_id, $post_terms, $taxonomy, false);
				}

				/*
				 * duplicate all post meta just in two SQL queries
				 */

				$post_meta_infos = $wpdb->get_results($wpdb->prepare("SELECT meta_key, meta_value FROM $wpdb->postmeta WHERE post_id=%s", intval($post_id)));
				if (count($post_meta_infos) != 0) {
					$sql_query = "INSERT INTO $wpdb->postmeta (post_id, meta_key, meta_value) ";
					foreach ($post_meta_infos as $meta_info) {
						$meta_key = $meta_info->meta_key;
						if ($meta_key == '_wp_old_slug') continue;
						$meta_value = addslashes($meta_info->meta_value);
						$sql_query_sel[] = "SELECT $new_post_id, '$meta_key', '$meta_value'";
					}
					$sql_query .= implode(" UNION ALL ", $sql_query_sel);
					$wpdb->query($sql_query);
				}
				do_action( 'burst_after_duplicate_post', $post_id, $new_post_id);

				return $new_post_id;
			}
		}

		/**
		 * Create a new experiment for this post
		 * @param int $post_ID
		 *
		 * @return false|int
		 */
		public function create_experiment( $post_id = false){
			if (!burst_user_can_manage()) {
				return false;
			}
            $variant_id = false;
			if (!$post_id) return false;

			if (isset($_POST["duplicate_burst_variant_id"])) {
				$variant_id = $this->duplicate_post($post_id);
			} else  {
				$variant_id = intval( $_POST["burst_variant_id"] );
				$args = array(
					'ID'                 => $variant_id,
				);
				wp_update_post($args);
			}

			/**
			 * create experiment entry
			 */
			$experiment_title = !empty($_POST['burst_title']) ? sanitize_text_field($_POST['burst_title']) : __('Unnamed experiment', 'burst');
			$experiment = new BURST_EXPERIMENT();
			$experiment->title = $experiment_title;
			$experiment->control_id = $post_id;
			$experiment->variant_id = $variant_id;
			$experiment->save();

			return $experiment->id;
		}

		/**
		 * Check for each active experiment, if it is significant. If so, activate the
		 */
		public function maybe_activate_winner() {
			$experiments = burst_get_experiments( array( 'status' => 'active' ) );
			foreach ( $experiments as $experiment_item ) {
				$experiment = new BURST_EXPERIMENT($experiment_item->ID);
				if ( $experiment->is_statistical_significant() && $experiment->has_reached_minimum_sample_size() ) {
					$experiment->activate_winner();
				}
			}
		}

		/**
		 * Maybe stop experiment
		 */

		public function maybe_stop_experiment(){
			$experiments = burst_get_experiments( array( 'status' => 'active' ) );
			foreach ( $experiments as $experiment_item ) {
				$experiment = new BURST_EXPERIMENT($experiment_item->ID);
				if ( $experiment->is_statistical_significant() && $experiment->has_reached_minimum_sample_size() ) {
					$experiment->stop();
				}
			}
		}

		/**
		 * Start or stop an experiment with an ajax request
		 *
		 */
		public function experiment_action(){
			$error = false;
			if ( ! burst_user_can_manage() ) {
				$error = true;
			}
			if ( !isset($_POST['experiment_id'])) {
				$error = true;
			}
			$actions = array(
				'stop',
				'start',
                'pause',
				'delete',
				'archive'
			);

			if ( !isset($_POST['type']) || !in_array($_POST['type'], $actions ) ) {
				$error = true;
			}

			if ( !$error ) {
				$experiment_id = intval( $_POST['experiment_id'] );
				$type = sanitize_title($_POST['type']);
				$experiment = new BURST_EXPERIMENT($experiment_id);
				if ( $type === 'start' ) {
					$experiment->start();
				} else if ( $type === 'stop' ) {
					$experiment->stop();
                } else if ( $type === 'pause' ) {
                    $experiment->pause();
				} else if ( $type === 'delete' ) {
					$experiment->delete();
				} else if ( $type === 'archive' ) {
					$experiment->archive();
				}
			}

			$return  = array(
				'success' => !$error,
			);
			echo json_encode( $return );
			die;
		}

		/**
		 * Enqueue some assets
		 * @param $hook
		 */
		public function enqueue_assets( $hook ) {
			$minified = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '.min';


			global $post;
			//set some defaults
			$localize_args = array(
				'url'                       => get_rest_url() . 'burst/v1/',
				'goal'                      => 'visit',
				'goal_identifier'           => '',
				'page_id'                   => isset($post->ID) ? $post->ID : 0,
				'cookie_retention_days'     => BURST::$experimenting->cookie_expiration_days,
                'anon_ip'                   => burst_get_anon_ip_address(),
			);

			if ( $post ) {
				$experiment = new BURST_EXPERIMENT(false, $post->ID );
				if ($experiment->id) {
					$localize_args['goal'] = $experiment->goal_id;
					$localize_args['goal_identifier'] = $experiment->goal_identifier;
				}
			}

			wp_enqueue_script( 'burst',
				burst_url . "assets/js/burst$minified.js", array(),
				burst_version, true );
			wp_localize_script(
				'burst',
				'burst',
				$localize_args
			);
		}

		/**
		 * Load variant content by filtering the_content
		 * @param string $content
		 *
		 * @return string
		 */

		public function load_experiment_content($content){
			global $post;
			$experiment = new BURST_EXPERIMENT(false, $post->ID );
			if ($experiment->status !== 'active') return $content;
			//when this page is a goal
			if ( $experiment->goal_id == $post->ID ) {
				error_log('is goal id');
				$content .= '<script type="text/javascript">var burst_experiment_id = "' . $experiment->id . '";var burst_is_goal_page = true;</script>';
			} else if ( $experiment->id && $experiment->variant_id && $post->ID == $experiment->control_id ) {
				error_log('is experiment');
				$content_control = $content;
				$content_variant = $this->get_the_content( $experiment->variant_id );
				
				$content = '<div class="burst_control" style="visibility: hidden">'.$content_control.'</div><div class="burst_variant" style="display: none">'.$content_variant.'</div>';

				$content .= '<script id="burst-js-experiment" type="text/javascript">
								var burst_experiment_id = ' . $experiment->id . ';
								var burst_goal_identifier = "' . $experiment->goal_identifier . '";
							</script>';
			}
			return $content;
		}


		private function get_the_content($post_id) {
			return apply_filters('burst_the_content', get_the_content( null, false, $post_id ), $post_id );
		}

		/**
		 * Function for post copying
		 * @param int $old_post_id
		 * @param int $new_post_id
		 * @return bool
		 */
		public function copy_post( $old_post_id, $new_post_id )
		{
			if (!burst_user_can_manage()) return false;
			global $wpdb;

			$post = get_post($old_post_id);
			$new_post = get_post($new_post_id);

			if ( !$new_post || !$post ) return false;
			if (isset($post) && $post != null) {
				$args = array(
					'ID'             => $new_post_id,
					'comment_status' => $post->comment_status,
					'post_author'    => $post->post_author,
					'post_content'   => $post->post_content,
					'post_excerpt'   => $post->post_excerpt,
					'post_parent'    => $post->post_parent,
					'post_password'  => $post->post_password,
					'post_title'     => $post->post_title,
					'post_slug'      => $post->post_title,
					'post_type'      => $post->post_type,
					'to_ping'        => $post->to_ping,
					'menu_order'     => $post->menu_order
				);
				$new_post_id = wp_update_post($args);

				/*
				 * get all current post terms ad set them to the new post draft
				 */
				$taxonomies = get_object_taxonomies($post->post_type); // returns array of taxonomy names for post type, ex array("category", "post_tag");
				foreach ($taxonomies as $taxonomy) {
					$post_terms = wp_get_object_terms($old_post_id, $taxonomy, array('fields' => 'slugs'));
					wp_set_object_terms($new_post_id, $post_terms, $taxonomy, false);
				}

				/*
				 * duplicate all post meta just in two SQL queries
				 */

				$post_meta_infos = $wpdb->get_results($wpdb->prepare("SELECT meta_key, meta_value FROM $wpdb->postmeta WHERE post_id=%s", intval($old_post_id)));
				if (count($post_meta_infos) != 0) {
					$sql_query = "INSERT INTO $wpdb->postmeta (post_id, meta_key, meta_value) ";
					foreach ($post_meta_infos as $meta_info) {
						$meta_key = $meta_info->meta_key;
						if ($meta_key == '_wp_old_slug') continue;
						$meta_value = addslashes($meta_info->meta_value);
						$sql_query_sel[] = "SELECT $new_post_id, '$meta_key', '$meta_value'";
					}
					$sql_query .= implode(" UNION ALL ", $sql_query_sel);
					$wpdb->query($sql_query);
				}

				return true;
			}
		}

		/**
		* Add a post display state for Experiments in the page list table.
		*
		* @param array $post_states An array of post display states.
		* @param \WP_Post $post The current post object.
		*
		* @return mixed
		*/
		
		public function add_display_post_states( $post_states, $post ) {
			if ($post->post_status == 'experiment') {
				$post_states[ 'Experiment' ] = __('Experiment', 'burst');
			}
        	
			return $post_states;
		}


		/**
		 * Add 'Experiment' post status.
		 */
		public function add_experiment_post_status(){
			register_post_status( 'experiment', array(
				'label'                     => __( 'Experiment', 'burst' ),
				'public'                    => true,
				'internal'					=> true,
				'exclude_from_search'       => false,
				'show_in_admin_all_list'    => true,
				'show_in_admin_status_list' => true,

				'label_count'               => _n_noop( 'Experiment <span class="count">(%s)</span>', 'Experiments <span class="count">(%s)</span>' , 'burst'),
			) );
		}

	 	public function add_variant_status_add_in_quick_edit() {
	        echo "	<script>
				        jQuery(document).ready( function() {
				            jQuery( 'select[name=\"_status\"]' ).append( '<option value=\"experiment\">". __('Experiment',"burst")."</option>' );      
				        }); 
			        </script>";
	    }
	    
	    public function add_variant_status_add_in_post_page() {
	        echo "	<script>
				        jQuery(document).ready( function($) {        
				            $( 'select[name=\"post_status\"]' ).append( '<option value=\"experiment\">". __('Experiment',"burst")."</option>' );
				            if ($('#hidden_post_status').val()=== 'experiment') {
				            	$('#post_status').val('experiment');
				            }

				        });
			        </script>";
	    }
	   

	} //class closure
} //class_exists closure