<?php
defined('ABSPATH') or die("you do not have acces to this page!");

/**
 * If free is active, we should deactivate it.
 * @todo deze settings fixen of verwijderen
 * */

//add_action('admin_init', 'burst_check_for_free_version');
if (!function_exists('burst_check_for_free_version')) {
    function burst_check_for_free_version()
    {
         if (defined('burst_free')) {
             $free = 'complianz-gdpr/complianz-gpdr.php';
             deactivate_plugins($free);
            add_action('admin_notices', 'burst_notice_free_active');
         }
    }
}

if (!function_exists('burst_notice_free_active')) {
    function burst_notice_free_active()
    { ?>
       <div id="message" class="notice notice-success is-dismissible burst-dismiss-notice really-simple-plugins">
           <p>
               <?php echo __("You have installed Complianz Privacy Suite. We have deactivated the free plugin, it can be safely removed.", 'complianz-gdpr'); ?>
           </p>
       </div>
       <?php
   }

}

if (!function_exists('burst_free_plugin_not_deleted')){
	function burst_free_plugin_not_deleted(){
		if ( file_exists(trailingslashit( WP_PLUGIN_DIR).'complianz-gdpr/complianz-gpdr.php' ) ){
			return true;
		} else {
			return false;
		}
	}
}
