=== Burst Statistics - Privacy-Friendly Analytics for WordPress ===
Contributors: hesseldejong, RogierLankhorst, aahulsebos, leonwimmenhoeve
Donate link: paypal.me/Burststatistics
Tags: statistics, analytics, privacy, analytics alternative
Requires at least: 5.4
License: GPL2
Requires PHP: 7.2
Tested up to: 6.2
Stable tag: 1.3.5

Self-hosted and privacy-friendly analytics tool. 

== Description ==
Get detailed insights into visitors' behaviour with Burst Statistics, the privacy-friendly analytics dashboard from Really Simple Plugins.

== Features ==

* Essential Metrics: Pageviews, Visitors, Sessions, Time on Page and Referrers.
* Privacy-friendly: Locally hosted, and anonymized data in collaboration with Complianz.
* Cookieless Tracking: Get data based on anonymous parameters without storing data in browsers.
* Optimized: Built for performance and data minimization.
* Flexibility: Have your own idea how Bounce Rate should be measured? Configure your own metrics.
* Open-Source: We see our users as collaborators, so please feel free to use the below links to help us out building the best analytics tool for WordPress.

== Useful Links ==

* [Documentation](https://burst-statistics.com/docs/)
* [Metric Definitions](https://burst-statistics.com/definitions/)
* [Translate Burst Statistics](https://translate.wordpress.org/projects/wp-plugins/burst-statistics/)
* [Issues & pull requests](https://github.com/Really-Simple-Plugins/burst/issues)
* [Feature requests](https://burst-statistics.com/feature-requests/how-to-add-a-feature-request/)

== Need Support ==

Burst Statistics offers full support on the WordPress.org [Forum](https://wordpress.org/support/plugin/burst-statistics/). Before starting a new thread, please check available documentation and other support threads. Leave a clear and concise description of your issue, and we will respond as soon as possible.

== About Really Simple Plugins ==

Check out other plugins developed by Really Simple Plugins as well: [Really Simple SSL](https://wordpress.org/plugins/really-simple-ssl/) and [Complianz](https://wordpress.org/plugins/complianz-gdpr/).

We're on [GitHub](https://github.com/Really-Simple-Plugins/burst) as well!

[Contact](https://burst-statistics.com#contact) us if you have any questions, issues, or suggestions. Burst Statistics is developed by [Burst Statistics B.V.](https://burst-statistics.com). Leave your feature requests [here](https://burst-statistics.com/feature-requests/).

== Installation ==
* Go to “Plugins” in your WordPress Dashboard, and click “Add new”.
* Click “Upload”, and select the downloaded .zip file.
* Activate your new plugin.
* Use our tour to get familiar with Burst Statistics.

== Frequently Asked Questions ==
= Knowledgebase =
Burst will maintain and grow a knowledgebase about Burst Statistics and other products to assist, while using Burst Statistics [burst-statistics.com](https://burst-statistics.com)
= Can I block IP Addresses?
Yes, you can block IP addresses in the Burst Statistics settings. You can also exclude User Roles from being tracked.
= Why is Burst Statistics Privacy-friendly? =
Burst Statistics provides an Analytics Dashboard with anonymized data that is yours, and yours alone.
= What is Cookieless tracking? =
Burst Statistics can be used without setting cookies or storing data in browsers. However, this can affect accuracy; that's why a hybrid option is possible with cookies after consent. Read more about [Cookieless tracking](https://burst-statistics.com/definition/what-is-cookieless-tracking/).
= Does it affect performance? =
Burst Statistics uses an endpoint to minimize requests during sessions. For best performance you can always use our 'Turbo Mode' which loads Burst in the footer, using the defer attribute.
= Do you mind if I give feedback about the product? =
We really want your feedback, please use the "Useful Links" section to get in contact. We'd like to develop this together.
= Is there a Pro version? =
Not...yet.

== Change log ==
= 1.3.5 =
* Fix: Fixed timezone issue where there would be a mismatch between the selected date in the datepicker and the date shown up top.
* Fix: Fixed issue where referreres would not show up when Czech language was selected.
* Fix: RTL issue in some languages
* Improvement: Tested up to WordPress 6.2

= 1.3.4 =
* Fix: Removed caching of statistics due to causing multiple issues and not providing performance benefits.
* Fix: Timestamp bug where the time for today would be off by the client timezone offset has been resolved.
* Improvement: Obsolete output buffering has been removed.
* Fix: JS translations have been corrected.
* Fix: Unnecessary error logs have been removed.

= 1.3.3 =
* Fix: Timezones were not functioning correctly. Burst now utilizes the WordPress timezone setting to ensure the correct timezone is used for all dates.
* Fix: Translation plugins would occasionally alter the REST API URL, resulting in tracking with the REST API not working. This issue has been resolved by utilizing wp.apiFetch instead of fetch.
* Improvement: Previously, when an IP was blocked in the settings, a 403 error would be displayed. Now, a 202 response with a message indicating that the IP has been blocked is returned.
* Fix: Typos in the code have been corrected.
* Fix: PHP warnings that would appear upon dismissing the tour have been resolved.

= 1.3.2 =
* Fix: Cookieless tracking was not working properly. Issue where some users were not tracked.
* Fix: Qtranslate caused an error where the dashboard could not load.
* Fix: DateTime object was not properly formatted in the dashboard.
* Fix: Issue where the tracking tests would crash and display the wrong information.
* Feature: DoNotTrack & Global Privacy Control support. Added setting to honor DoNotTrack & Global Privacy Control headers.

= 1.3.1 =
* Fix: auto updates causing critical error because a required function is only loaded for logged in users

= 1.3.0 =
* Improvement: React dashboard & settings page. This helps us speed up development and improve the user experience.
* Improvement: Settings for blocking IP addresses & user roles from tracking. Props @lowym
* Improvement: Improved endpoint path. Path is now dynamic with WP_CONTENT_DIR. Props @HubertGL
* Improvement: Improved performance because of REST API optimizer for the dashboard.
* Improvement: Show all results in the datatables. Props @alfanova
* Improvement: Added RTL support.
* Improvement: Added 'plain' permalinks support.
* Feature: Change metrics for insights chart.
* Feature: Show hourly stats in the insights chart. Props @perties
* Feature: Show data for today in the 'Statistics' tab. Props @perties

= 1.2.3 =
* Fix: Fixed an issue with a translatable string
* Tested up to WordPress 6.1

= 1.2.2 =
* Fix: Fixed an issue where duplicating a WooCommerce product would copy the total pageviews from the original product.

= 1.2.1 =
* Fix: Fixed an issue where adding role capabilities would result in a fatal error.
* Fix: Post and page counts did not update, this is fixed now.
* Fix: Changed endpoint DIR to URL to prevent 404 errors on subfolder installs.
* Improvement: Delete endpoint on uninstallation.

= 1.2.0 =
* Feature: Introducing defer/footer as option
* Feature: Introducing new  improved tracking method
* Improvement: Feedback notices

= 1.1.5 =
* Improvement: Changed from .less to .scss because WordPress also uses .scss
* Improvement: Update option autoload turned off on front end for better performance
* Fix: Fixed bug where UID could be empty resulting in an SQL error
* Fix: Fixed last step of shepherd tour to be inside the viewport
* Improvement: Integration with Complianz that adds burst_uid to the cookie-scanner

= 1.1.4 =
* Fix: Bounce rate calculation
* Feature: Cookieless tracking

= 1.1.3 =
* Fix: Fatal error on PHP 7.2
* Improvement: Block IP address with MU Plugin
* Improvement: Notice for REST API failure

= 1.1.2 =
* Improvement: Added drop down to datatables, props @topfgartenwelt

= 1.1.1 =
* Improvement: Added capabilities to view and/or edit burst
* Improvement: Added new devices to recognized devices
* Improvement: Added filters so that you can change the decimal and thousand separator

= 1.1.0 =
* Fix: better tracking script. Hits from one pageview can not be registered multiple times now
* Improvement: visits in pages and posts overview. As these hits are stored differently,
  they will start at 0 for existing setups as well. Props: Shayne
* Improvement: added parameter to clear the dashboard cache
* Improvement: added JS event to so other plugins can integrate with Burst
* Improvement: added privacy annex
* Improvement: added widget to the Wordpress Dashboard Props: Shayne

= 1.0.2 =
* Fix: typo fix in generate_cached_data, props @seath
* Fix: some strings with wrong text domain 
* Improvement: link in readme, props @8725z4twhugias

= 1.0.1 =
* Fix: text domain, props @bonaldi
* Fix: parse_user_agent library prefix to fix compatibility with Rank Math

= 1.0.0 =
* Initial release

== Upgrade notice ==
* Please backup before upgrading.

== Screenshots ==
1. Burst Statistics: Analytics Dashboard
