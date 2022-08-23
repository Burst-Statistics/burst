=== Burst Statistics - Privacy-Friendly Analytics for WordPress ===
Contributors: hesseldejong, RogierLankhorst, aahulsebos, leonwimmenhoeve
Donate link: paypal.me/Burststatistics
Tags: statistics, analytics, privacy
Requires at least: 5.4
License: GPL2
Requires PHP: 7.0
Tested up to: 6.0
Stable tag: 1.2.0

Self-hosted and privacy-friendly analytics tool. 

== Description ==
Get detailed insights into visitors' behaviour with Burst Statistics, the privacy-friendly analytics dashboard from Really Simple Plugins.

== Features ==

* Essential Metrics: Pageviews, Visitors, Sessions, Time on Page, Referrers etc
* Privacy-friendly: Locally hosted, and anonymized data in collaboration with Complianz
* Cookieless Tracking: Get data based on anonymous parameters without storing data in browsers.
* Optimized: Built for performance and data minimization.
* Flexibility: Have your own idea how Bounce Rate should be measured? Configure your own metrics.
* Open-Source: We see our users as collaborators, so please feel free to use the below links to help us out building the best analytics tool for WordPress

== Useful Links ==

* [Documentation](https://burst-statistics.com/docs/)
* [Metric Definitions](https://burst-statistics.com/definitions/)
* [Translate Burst Statistics](https://translate.wordpress.org/projects/wp-plugins/burst-statistics/)
* [Issues & pull requests](https://github.com/Really-Simple-Plugins/burst/issues)
* [Feature requests](https://burst-statistics.com/feature-requests/how-to-add-a-feature-request/)

== Need Support ==

Burst Statistics offers full support on the WordPress.org [Forum](https://wordpress.org/support/plugin/burst-statistics/). Before starting a new thread, please check available documentation and other support threads. Leave a clear and concise description of your issue, and we will respond as soon as possible.

== About Really Simple Plugins ==

Check out other plugins developed by Really Simple Plugins as well: [Really Simple SSL](https://wordpress.org/plugins/really-simple-ssl/) and [Complianz](https://wordpress.org/plugins/complianz-gdpr/)

We're on [GitHub](https://github.com/Really-Simple-Plugins/burst) as well!

[Contact](https://burst-statistics.com#contact) us if you have any questions, issues, or suggestions. Burst Statistics is developed by [Burst Statistics B.V.](https://burst-statistics.com). Leave your feature requests [here](https://burst-statistics.com/feature-requests/).

== Installation ==
* Go to “Plugins” in your WordPress Dashboard, and click “Add new”.
* Click “Upload”, and select the downloaded .zip file.
* Activate your new plugin.
* Use our tour to get familiar with Burst Statistics.

== Frequently Asked Questions ==
= Knowledgebase =
Burst will maintain and a grow a knowledgebase about Burst Statistics and other products to assist, while using Burst Statistics [burst-statistics.com](https://burst-statistics.com)
= Can I block IP Addresses?
Before creating a dedicated user interface we collect proposed features as MU Plugins at [Github - Burst Integrations](https://github.com/Really-Simple-Plugins/burst-integrations)
= Why is Burst Statistics Privacy-friendly? =
Burst Statistics provides an Analytics Dashboard with anonymized data that is yours, and yours alone.
= What is Cookieless tracking? =
Burst Statistics can be used without setting cookies or storing data in browsers. This, however, can affect accuracy; that's why a hybrid option is possible with cookies after consent. Read more about [Cookieless tracking](https://burst-statistics.com/definition/what-is-cookieless-tracking/).
= Do you mind if I give feedback about the product? =
We really want your feedback, please use the "Useful Links" section to get in contact. We'd like to develop this together.
= Is there a Pro version? =
Not...yet.

== Change log ==
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
* Improvement: Added filters so that you can change the decimal and thousand seperator

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
