<?php
defined( 'ABSPATH' ) or die( 'you do not have access to this page!' );

//only add if not added in Complianz already
if ( !function_exists('cmplz_burst_statistics_activate_burst') ) {
	function burst_cmplz_statistics_activate_burst() {
		ob_start(); ?>
		<script>
	        function ensure_complianz_is_loaded() {
	            let timeout = 30000000; // 30 seconds
	            let start = Date.now();
	            return new Promise(wait_for_complianz);

	            function wait_for_complianz(resolve, reject) {
	                if (window.cmplz_get_cookie) // if complianz is loaded, resolve the promise
	                    resolve(window.cmplz_get_cookie);
	                else if (timeout && (Date.now() - start) >= timeout)
	                    reject(new Error("timeout"));
	                else
	                    setTimeout(wait_for_complianz.bind(this, resolve, reject), 30);
	            }
	        }

	        // This runs the promise code
	        ensure_complianz_is_loaded().then(function(){

				<?php if ( burst_get_value('enable_cookieless_tracking') ) {
				// if cookieless tracking is enabled, we need to add a listener to the consent change
				// to turn off cookieless tracking and set a cookie
				// ?>

	            document.addEventListener("burst_before_track_hit", function(burstData) {
	                if ( cmplz_has_consent('statistics') ) {
	                    window.burst_enable_cookieless_tracking = 0;
	                }
	            });
	            document.addEventListener("cmplz_status_change", function (){
	                if ( cmplz_has_consent('statistics') ) {
	                    window.burst_enable_cookieless_tracking = 0;
	                    let event = new CustomEvent('burst_enable_cookies');
	                    document.dispatchEvent( event );
	                }
	            });

				<?php } else { ?>
	            // cookieless tracking is disabled
	            document.addEventListener("cmplz_cookie_warning_loaded", function(consentData) {
	                let region = consentData.detail;
	                if (region !== 'uk') {
	                    let scriptElements = document.querySelectorAll('script[data-service="burst"]');
	                    scriptElements.forEach(obj => {
	                        if (obj.classList.contains('cmplz-activated') || obj.getAttribute('type') === 'text/javascript') {
	                            return;
	                        }
	                        obj.classList.add('cmplz-activated');
	                        let src = obj.getAttribute('src');
	                        if (src) {
	                            obj.setAttribute('type', 'text/javascript');
	                            cmplz_run_script(src, 'statistics', 'src');
	                            obj.parentNode.removeChild(obj);
	                        }
	                    });
	                }
	            });
	            document.addEventListener("cmplz_run_after_all_scripts", cmplz_burst_fire_domContentLoadedEvent);

	            function cmplz_burst_fire_domContentLoadedEvent() {
	                let event = new CustomEvent('burst_fire_hit');
	                document.dispatchEvent(event);
	            }
				<?php } ?>
	        });
		</script>
		<?php


		$script = ob_get_clean();
		$script = str_replace(array('<script>', '</script>'), '', $script);
		wp_add_inline_script( 'cmplz-cookiebanner', $script);
	}
	add_action( 'wp_enqueue_scripts', 'burst_cmplz_statistics_activate_burst',PHP_INT_MAX );
}

/**
 * Add a script to the blocked list
 * @param array $tags
 *
 * @return array
 */
function burst_cmplz_script( $tags ): array {
	//if cookieless tracking enabled, do not block.
	if ( burst_get_option('enable_cookieless_tracking') ) {
		return $tags;
	}

	//if added  by complianz, remove it
	foreach ($tags as $index => $tag) {
		if (isset($tag['name']) && $tag['name'] === 'burst') {
			unset($tags[$index]);
			break;
		}
	}

	$tags[] = array(
		'name' => 'burst',
		'category' => 'statistics',
		'urls' => array(
			'assets/js/build/burst.js',
			'assets/js/build/burst.min.js',
			'helpers/timeme/timeme.js',
			'helpers/timeme/timeme.min.js',

		),
		'enable_placeholder' => '0',
		'enable_dependency' => '0',
	);

	return $tags;
}
add_filter( 'cmplz_known_script_tags', 'burst_cmplz_script', 20 );

