=== Burst Statistics - Privacy-Friendly Analytics for WordPress ===
Contributors: hesseldejong, RogierLankhorst, aahulsebos, leonwimmenhoeve
Donate link: paypal.me/Burststatistics
Tags: statistics, analytics, privacy, analytics alternative
Requires at least: 5.8
License: GPL2
Requires PHP: 7.2
Tested up to: 6.3
Stable tag: 1.5.0

Self-hosted and privacy-friendly analytics for Wordpress.

== Description ==
= Unlock the Power of Privacy-Friendly Analytics with Burst Statistics! =
Burst Statistics keeps all data on your server, making it fully compliant with privacy laws. Our dashboards offer clear and concise insights, allowing you to make informed decisions without feeling overwhelmed by abundant data. Choose Burst Statistics for seamless and reliable analytics trusted by over 100,000 users.

**This plugin is free and does not require an account.**

== Benefits ==
* **Privacy-Friendly:** All data is stored on your own server.
* **Essential Metrics:** Get the core data you need, like Pageviews, Visitors, Sessions, Time on Page, and Referrers.
* **Real-Time Data:** Get instant insights directly on your dashboard.
* **Track Your Goals:** Easily track your custom goals and keep track of conversions.
* **Free Support:** Feel free to reach out to us for assistance. We would be happy to help in any way we can.
* **Simplicity:** User-friendly analytics that does not overwhelm you with data.

== Here’s a review from one of our users: ==
>“On-premise Analytics is a great, if not the best, alternative to Google Analytics in the GDPR era. On top of that, since it’s native to WordPress, it’s so easy to configure Goals, etc. That’s awesome.”
>- [Daan from Daan.dev (@daanvandenbergh)](https://wordpress.org/support/topic/great-product-with-great-potential/)

==From the creators of Really Simple SSL & Complianz==
Burst Statistics was created by experienced developers who created [Really Simple SSL](https://wordpress.org/plugins/really-simple-ssl/) & [Complianz](https://wordpress.org/plugins/complianz-gdpr/), with over 6,000,000 active installs combined. With a proven track record of providing top-notch, user-friendly solutions, you can trust that Burst Statistics meets the same high standards.
Our community speaks for itself: with over 1,000,000 downloads and 100,000 active users, Burst Statistics is a trusted choice for your analytics needs.

== Make Burst Statistics better! ==
Our team is always working on improving our plugin, and your input as a user can significantly help us in this process. You don’t require any coding or software development knowledge to contribute; simply sharing your ideas or any issues you encounter would help to improve the plugin significantly. Please feel free to contact us via [a support request on the WordPress forums; we welcome any feedback you may have.]](https://wordpress.org/support/plugin/burst-statistics/)

== Get even more insight with Burst Pro ==
Unlock comprehensive insights into your website’s user behavior with Burst Pro. Benefit from advanced features designed to improve performance, boost engagement, and drive conversions. [Elevate your data analysis experience by upgrading to Burst Pro today.](https://burst-statistics.com/pricing/)

Pro Features Include:
* **Geo-Tracking:** Identify the countries your visitors are coming from.
* **Data Archiving:** Automatic archiving and manual restore options.
* **Multiple Goals:** Track multiple objectives to measure your site’s success.
* **Premium Support:** Premium Support from our fantastic team.
For upcoming features, please [visit our roadmap on our website.](https://burst-statistics.com/development-roadmap/)

== Installation ==
* Go to “Plugins” in your WordPress Dashboard, and click “Add new”.
* Click “Upload”, and select the downloaded .zip file.
* Activate your new plugin.
* Use our tour to get familiar with Burst Statistics.

== Frequently Asked Questions ==
= Knowledgebase =
We will maintain and grow a [knowledgebase about Burst Statistics](https://burst-statistics.com/docs/) and analytics & privacy in general.

= Where is the data stored? =
The data is stored in your own WordPress database. Unlike cloud solutions, we have no access to your data. We aim to keep the data as small as possible, and Burst can also automatically archive or delete old data. Read more about [if you need data archiving](https://burst-statistics.com/do-i-need-to-archive-my-data/).

= Do I need an account? =
No, you don’t need an account; no data is sent to another website.

= Is there a limit to the number of visitors I can track? =
No, there is no limit. The only limiting factor is your own database and server.

= Can I exclude IP addresses or user roles from tracking? =
Burst Statistics allows you to exclude specific IP addresses and user roles from tracking in the settings. Burst also excludes most known crawlers and bots from being tracked. Read more about [IP blocking](https://burst-statistics.com/exclude-ip-addresses-from-burst-statistics/) or [excluding user roles](https://burst-statistics.com/excluding-logged-in-users-by-user-role/).

= Does Burst Statistics use cookies? =
There is an option to use cookieless tracking if you prefer. But by default, Burst uses cookies because they are more accurate and lightweight. While using cookies, Burst remains privacy-friendly because all data is anonymous and stored on your server. Read more about [why cookies are misunderstood](https://burst-statistics.com/why-is-burst-privacy-friendly/#misunderstood-cookies).

= Why is Burst Statistics Privacy-Friendly? =
Burst Statistics provides an Analytics Dashboard with anonymized data that is yours and yours alone. Read more about [Why Burst Statistics is Privacy-Friendly](https://burst-statistics.com/why-is-burst-privacy-friendly/).

= What is Cookieless tracking? =
Burst Statistics can be used without setting cookies or storing data in browsers. However, this can affect accuracy, so a hybrid option with cookies after consent is possible. Read more about [Cookieless tracking](https://burst-statistics.com/definition/what-is-cookieless-tracking/).

= Does Burst Statistics affect performance? =
Performance is almost not affected. We have built Burst to be very performant for your users because we know how important it is for your website. Read more about [Turbo Mode](https://burst-statistics.com/definition/turbo-mode/)

= Can I give feedback about the plugin? =
We value your feedback. You can submit a support request on the WordPress forums, and we will respond promptly.

== Change log ==
= 1.5.0 =
* Improvement: Updated outdated readme information.
* Improvement: Updated outdated links in the plugin.
* Improvement: Some minor styling changes.
* Improvement: Added notice about country insights.
* Fix: Dropdown in data archiving showing empty.
* Fix: Missing slug for Really Simple SSL with suggested plugins block
* Improvement: Skip a missing post in the posts array for the goals overview.
* Fix: Goals could crash when no hits were recorded yet. This has been resolved.

= 1.4.6.1 =
* Fix: Build issue for our dashboard.

= 1.4.6 =
* New: Delete old data to manage your database disk usage.
* Improvement: Don't add WordPress script dependencies if endpoint is working correctly, props @gauravtiwari.
* Improvement: Use fallback method for Burst endpoint test, props @ov3rfly.
* Fix: For when page id was always empty, props @huubl.

= 1.4.5 =
* Improvement: Tested up to WordPress 6.3

= 1.4.4 =
* Improvement: For checking if the endpoint works, we changed file_get_contents to wp_remote_get to prevent issues with some hosts. props @ov3rfly
* Fix: Tracking would sometimes not work properly when some data was missing like the user agent information. This has been resolved. props @ov3rfly
* Improvement: Added month to date and week to date to the datepicker. props @daanvandenbergh
* Fix: When tracking page visits as a goal, tracking would in some cases not work. This is now fixed.
* Fix: Some users could not load data due to a firewall issue. This has been resolved.
* Fix: Persian URLs would not show properly in the dashboard. This has been resolved.

= 1.4.3 =
* Fix: Fixed an issue where the REST API would not work properly and the AJAX fallback was used. This has been resolved.
* Fix: Fixed an issue where "Direct" referrers where not being displayed properly. In Czech language, this would result in referrers not showing all together. This has been resolved.
* Fix: When all tasks were completed, remaining tasks would still show 1. Now it will show 0.
* Fix: When activating Burst through the 'bulk' activate option, the plugin did not activate due to a fatal error. This has been resolved.
* Fix: Disabled some logs when debug mode is disabled.
* Fix: In some situations the 'Statistics' in the menu would not show an active state when visiting the Burst Dashboard.

= 1.4.2.1 =
* Fix: Upgrade script for 1.4.0 did not run properly. This has been resolved. The upgrade will run again.

= 1.4.2 =
* Fix: Fixed an issue where data was shown with bounces, even when bounces should be excluded.
* Fix: Fixed a fatal error in the REST API fallback. Props @helmar
* Fix: When inserting a goal, the statistics_id could be empty resulting in an error. This has been resolved.

= 1.4.1 =
* Fix: Added a fallback for when the REST API does not return a valid response.
* Fix: Translation strings were not being loaded properly.
* Fix: Date picker caused the dashboard to crash for some users. This has been resolved.
* Fix: IP block did not save IP addresses properly. This has been resolved.
* Fix: Datepicker did not select the right timezone. This has been fixed.

= 1.4.0 =
* Feature: Goals. You can now set goals for your website and track them in the dashboard.
* Feature: Filter your data by device, pages, referrers, and more.
* Improvement: Speed performance of statistics dashboard
* Improvement: WP and PHP version checks integrated with WP Core.

= 1.3.5 =
* Fix: Fixed timezone issue where there would be a mismatch between the selected date in the datepicker and the date shown up top.
* Fix: Fixed issue where referrers would not show up when Czech language was selected.
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