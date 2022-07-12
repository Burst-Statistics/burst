// TimeMe.js should be loaded and running to track time as soon as it is loaded.
const burst_token = '?token='+Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 7);
let burst_insert_id = 0;
let burst_track_hit_running = false;
let burst_last_time_update = false;
let burst_cookieless_option = burst.options.enable_cookieless_tracking; // User cookieless option
// add option to window so a consent plugin can change this value
window.burst_enable_cookieless_tracking = burst.options.enable_cookieless_tracking; // Consent plugin ccokieless option

/**
 * Get a cookie by name
 * @param name
 * @returns {Promise}
 */
let burst_get_cookie = (name) => {
	return new Promise((resolve, reject) => {
		name = name + "="; //Create the cookie name variable with cookie name concatenate with = sign
		let cArr = window.document.cookie.split(';'); //Create cookie array by split the cookie by ';'

		//Loop through the cookies and return the cookie value if we find the cookie name
		for (let i = 0; i < cArr.length; i++) {
			let c = cArr[i].trim();
			//If the name is the cookie string at position 0, we found the cookie and return the cookie value
			if (c.indexOf(name) === 0)
				resolve( c.substring(name.length, c.length) );
		}
		reject(false);
	});
};

/**
 * Set a cookie
 * @param name
 * @param value
 */
let burst_set_cookie = (name, value) => {
		let cookiePath = '/';
		let domain = '';
		let secure = ";secure";
		let date = new Date();
		let days = burst.cookie_retention_days;
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		let expires = ";expires=" + date.toGMTString();

		if ( window.location.protocol !== "https:" ) secure = '';

		//if we want to dynamically be able to change the domain, we can use this.
		if ( domain.length > 0 ) {
			domain = ";domain=" + domain;
		}
		document.cookie = name + "=" + value + ";SameSite=Strict" + secure + expires + domain + ";path="+cookiePath;
};

/**
 * Should we use cookies for tracking
 * @returns {boolean}
 */
let burst_use_cookies = () => {
	if ( !navigator.cookieEnabled ) return false; // cookies blocked by browser
	if ( burst_cookieless_option == '1' && window.burst_enable_cookieless_tracking == '1' ) return false; // cookieless is enabled by user or consent plugin
	return true; // cookies are enabled
};

/**
 * Enable or disable cookies
 * @returns {boolean}
 */
function burst_enable_cookies() {
	window.burst_enable_cookieless_tracking = 0;
	if ( burst_use_cookies() ) {
		burst_uid().then( obj => {
			burst_set_cookie( 'burst_uid', obj.uid ); // set uid cookie
		});
	}
};

/**
 * Generate a random string
 * @returns {string}
 */
let burst_generate_uid = () => {
	let uid = '';
	for (let i = 0; i < 32; i++) {
		uid += Math.floor(Math.random() * 16).toString(16);
	}
	return uid;
};

/**
 * Get or set the user identifier
 * @returns {Promise}
 */
const burst_uid = () => {
	return new Promise((resolve) => {
		let obj = {
			'uid': false,
			'first_time_visit': false,
		};
		if ( burst_use_cookies() ) {
			burst_get_cookie('burst_uid').then( cookie_uid => {
				obj.uid = cookie_uid;
				obj.first_time_visit = false;
				resolve( obj );
			}).catch( () => {
				// if no cookie, generate a uid and set it
				obj.uid  = burst_generate_uid();
				obj.first_time_visit = true;
				burst_set_cookie('burst_uid', obj.uid);
				resolve( obj );
			});
		} else {
			// if no cookies, generate a fingerprint and resolve
			burst_fingerprint().then(fingerprint => {
				// add prefix so we can identify it as a fingerprint
				obj.uid = 'f-' + fingerprint;
				obj.first_time_visit = 'fingerprint';
				resolve( obj );
			}).catch( () => {
				// if we can't get the fingerprint, generate a random uid
				obj.uid = 'f-' + burst_generate_uid();
				obj.first_time_visit = 'fingerprint';
				resolve( obj );
			});
		}
	});
};

/**
 * Generate a fingerprint
 * @returns {Promise}
 */
const burst_fingerprint = () => {
	return new Promise( (resolve, reject) => {
		let browserTests = [
			"availableScreenResolution",
			"canvas",
			"colorDepth",
			"cookies",
			"cpuClass",
			"deviceDpi",
			"doNotTrack",
			"indexedDb",
			// "installedFonts",
			"language",
			"localStorage",
			"pixelRatio",
			"platform",
			"plugins",
			"processorCores",
			"screenResolution",
			"sessionStorage",
			"timezoneOffset",
			"touchSupport",
			"userAgent",
			"webGl"
		];

		imprint.test(browserTests).then(function(fingerprint) {
			resolve(fingerprint);
		}).catch((error) => {
			reject(error);
		});

	});
};

let burst_get_time_on_page = () => {
	return new Promise((resolve) => {
		let current_time_on_page = TimeMe.getTimeOnCurrentPageInMilliseconds();
		if ( burst_last_time_update + 1000 < current_time_on_page) {
			burst_last_time_update = current_time_on_page;
			resolve(current_time_on_page);
		}
		resolve(0);
	});
};

/**
 * Check if this is a user agent
 * @returns {boolean}
 */
let burst_is_user_agent = () => {
	const botPattern = "(googlebot\/|bot|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)";
	let re = new RegExp(botPattern, 'i');
	let userAgent = navigator.userAgent;

	return re.test(userAgent);
};

/**
 * Make a XMLHttpRequest and return a promise
 * @param obj
 * @returns {Promise<unknown>}
 */
let burst_api_request = obj => {
	return new Promise((resolve, reject) => {

		let request = new XMLHttpRequest();
		request.open(obj.method || "POST", obj.url, true);
		request.setRequestHeader('Content-type', 'application/json');
		request.send(obj.data);
		request.onload = () => {
			if (request.status >= 200 && request.status < 300) {
				resolve(request.response);
			} else {
				reject(request.statusText);
			}
		};
		request.onerror = () => reject(request.statusText);
	});
};

/**
 * Update the tracked hit
 * Mostly used for updating time spent on a page
 * Also used for updating the UID (from fingerprint to a cookie)
 */

async function burst_update_hit ( update_uid = false ){
	if ( burst_is_user_agent() ) return;
	if ( burst_insert_id < 1 ) return;

	let event = new CustomEvent('burst_before_update_hit', {detail: burst});
	document.dispatchEvent(event);

	let data = {
		'ID': burst_insert_id,
		'uid': false,
		'time_on_page': 0,
	};

	await burst_get_time_on_page().then( time_on_page => { data.time_on_page = time_on_page; });

	if ( update_uid !== false) {
		await burst_uid().then( obj => data.uid = obj.uid );
	}

	if (data.time_on_page > 0 || data.uid !== false) {
		await burst_api_request({
			url: burst.url + 'update' + burst_token,
			data: JSON.stringify(data)
		}).catch(error => {
			console.log(error);
		});
	}
}

/**
 * Track a hit
 *
 */
async function burst_track_hit () {
	if (burst_is_user_agent()) return;
	if (burst_insert_id > 0) return;
	if (burst_track_hit_running) return;
	burst_track_hit_running = true;
	let event = new CustomEvent('burst_before_track_hit', {detail: burst});
	document.dispatchEvent(event);

	burst_last_time_update = TimeMe.getTimeOnCurrentPageInMilliseconds();
	// add browser data to the hit
	let data = {
		'uid': false,
		'url': location.pathname,
		'entire_url': location.href,
		'page_id': burst.page_id,
		'referrer_url': document.referrer,
		'user_agent': navigator.userAgent,
		'device_resolution': window.screen.width * window.devicePixelRatio + "x" + window.screen.height * window.devicePixelRatio,
		'time_on_page': burst_last_time_update,
	};

	await burst_uid().then( ( obj ) => {
		data.uid = obj.uid;
		data.first_time_visit = obj.first_time_visit;
	})

	event = new CustomEvent('burst_track_hit', {detail: data});
	document.dispatchEvent(event);

	let request_params = {
		method: 'POST',
		url: burst.url + 'hit' + burst_token,
		data: JSON.stringify(data)
	};
	burst_api_request(request_params)
		.then(data => {
			let response = JSON.parse(data);
			burst_insert_id = response.insert_id;
			burst_track_hit_running	= false;
		}).catch(error => {
			burst_track_hit_running	= false;
			console.log(error);
		} );
}


/**
 * Initialize events
 */
function burst_init_events() {
	// visibilitychange and pagehide work in most browsers hence we check if they are supported and try to use them
	document.addEventListener('visibilitychange', function () {
		if ( document.visibilityState === 'hidden' ) {
			burst_update_hit();
		}
	});
	window.addEventListener("pagehide", burst_update_hit, false );
	// beforeunload does not get fired all the time. But it is the latest event that is fired before the page is unloaded.
	window.addEventListener("beforeunload", burst_update_hit, false );
	TimeMe.callWhenUserLeaves( burst_update_hit );

	if (document.readyState !== 'loading') burst_track_hit()
	else document.addEventListener('DOMContentLoaded', burst_track_hit);

	document.addEventListener("burst_fire_hit", function(){
		burst_track_hit();
	});

	document.addEventListener("burst_enable_cookies", function(){
		burst_enable_cookies();
		burst_update_hit(true);
	});
}
burst_init_events();