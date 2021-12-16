<?php
defined( 'ABSPATH' ) or die( "you do not have acces to this page!" );
if ( ! class_exists( "burst_admin_pro" ) ) {
    class burst_admin_pro extends burst_admin {

        function __construct() {
            if (isset(self::$_this)) {
                wp_die(burst_sprintf('%s is a singleton class and you cannot create a second instance.',
                    get_class($this)));
            }
            add_action('burst_admin_menu', array($this, 'register_admin_page_pro'), 10);
            add_filter( 'submenu_file', array( $this, 'burst_wp_admin_submenu_filter' ), 20 );
        }

        static function this() {
            return self::$_this;
        }

        public function register_admin_page_pro() {
            if ( ! burst_user_can_manage() ) {
                return;
            }

            add_submenu_page(
                'burst',
                __('Experiments', 'burst'),
                __('Experiments', 'burst'),
                'manage_options',
                'burst-experiments',
                array($this, 'experiments_overview')
            );
            add_submenu_page(
                'burst',
                __('New experiment', 'burst'),
                __('New experiment', 'burst'),
                'manage_options',
                'burst-experiment',
                array($this, 'experiment_edit')
            );
        }

        /**
         * This filter removes the 'New experiment' submenu page from the submenu and highlights the experiment page
         * @param $submenu_file
         * @return mixed|string
         */
        function burst_wp_admin_submenu_filter( $submenu_file ) {

            global $plugin_page;

            $hidden_submenus = array(
                'burst-experiment' => true,
            );

            // Select another submenu item to highlight
            if ( $plugin_page && isset( $hidden_submenus[ $plugin_page ] ) ) {
                $submenu_file = 'burst-experiments';
            }

            // Hide the submenu.
            foreach ( $hidden_submenus as $submenu => $unused ) {
                remove_submenu_page( 'burst', $submenu );
            }

            return $submenu_file;
        }

        /**
         * Experiments table overview
         */
        function experiments_overview() {
            if ( ! burst_user_can_manage() ) {
                return;
            }

            ob_start();
            $id = false;
            if ( isset( $_GET['experiment_id'] ) ) {
                $id = intval( $_GET['experiment_id'] );
            }

            if ( $id || ( isset( $_GET['action'] ) && $_GET['action'] == 'new' ) ) {

                $grid_items = $this->grid_items['experiments'];
                //give each item the key as index
                array_walk($grid_items, function(&$a, $b) { $a['index'] = $b; });

                $grid_html = '';
                foreach ($grid_items as $index => $grid_item) {
                    $grid_html .= burst_grid_element($grid_item);
                }
                $args = array(
                    'page' => 'dashboard',
                    'content' => burst_grid_container($grid_html),
                    'controls' => '',
                );
                echo burst_get_template('admin_wrap.php', $args );

            } else {


                include( dirname( __FILE__ ) . '/experiments/class-experiment-table.php' );

                $experiments_table = new burst_experiment_Table();

                $experiments_table->prepare_items();

                ?>

                <div class="wrap experiment">
                    <h2><?php _e( "Experiments", 'burst' ) ?>
                        <?php do_action( 'burst_after_experiment_title' ); ?>
                        <a href="<?php echo admin_url('admin.php?page=burst-experiment&action=new'); ?>"
                           class="page-title-action"><?php _e('New experiment', 'burst') ?></a>
                    </h2>

                    <form id="burst-experiment-filter" method="get"
                          action="">

                        <?php
                        $experiments_table->views();
                        $experiments_table->search_box( __( 'Search', 'burst' ),
                            's' );
                        $experiments_table->display();
                        ?>
                        <input type="hidden" name="page" value="burst-experiments"/>
                    </form>
                </div>
                <?php

                $html = ob_get_clean();

                $args = array(
                    'page' => 'experiments_settings',
                    'content' => $html,
                    'controls' => '',
                );
                echo burst_get_template('admin_wrap.php', $args );
            }
        }

        /**
         * Experiment edit page/wizard
         */
        function experiment_edit() {
            if ( ! burst_user_can_manage() ) {
                return;
            }

            $id = false;
            if ( isset( $_POST['experiment_id'] ) ) {
                $id = intval( $_POST['experiment_id'] );
            }
            if ( !isset( $id ) ) {
                $id = isset( $_GET['experiment_id'] ) ? intval( $_GET['experiment_id'] ) : false;
            }
            $title = isset( $id ) ?  __( 'Create experiment', 'burst' ) : __( 'Edit experiment', 'burst' );

            ob_start();

            BURST::$wizard->wizard( 'experiment' , $title );

            $html = ob_get_clean();

            echo $html;
        }
    }
}