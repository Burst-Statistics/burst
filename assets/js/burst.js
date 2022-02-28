let token = '?token='+Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 7);
let insert_id = false;
let ticking = false;

// visibilitychange and pagehide work in more browsers hence we check if they are supported and try to use them
document.addEventListener('visibilitychange', function () {
	if ( document.visibilityState === 'hidden' ) {
		burst_update_time_on_page();
	}
});
window.addEventListener("pagehide", burst_update_time_on_page, false );
window.addEventListener("beforeunload", burst_update_time_on_page, false );
TimeMe.callWhenUserLeaves( burst_update_time_on_page );


document.addEventListener("DOMContentLoaded", function(){
	burst_track_hit();
});

/**
 *
 * @param callback
 */
function burst_track_hit(callback) {
	if ( burst_is_user_agent() ) return;

	let data = {
		'url': location.pathname,
		'entire_url': location.href,
		'page_id': burst.page_id,
		'referrer_url': document.referrer,
		'user_agent': navigator.userAgent,
		'device_resolution': window.screen.width * window.devicePixelRatio + "x" + window.screen.height * window.devicePixelRatio,
		'time_on_page': TimeMe.getTimeOnCurrentPageInMilliseconds(),
	};

	let request = new XMLHttpRequest();
	request.open('POST', burst.url+'hit'+token, true);
	request.setRequestHeader('Content-type', 'application/json')
	request.send(JSON.stringify(data)) // Make sure to stringify
	request.onload = function (e) {
		if (request.readyState === 4) {
			if (request.status === 200) {
				let response;
				response = JSON.parse(request.response);
				insert_id = response.insert_id;
			} else {
				console.error(request.statusText);
			}
		}
	};
	request.onerror = function (e) {
		console.error(request.statusText);
	};


	if (typeof callback == 'function') {
		callback();
	}
}

let burst_last_time_update = false;
function burst_update_time_on_page(event){
	if ( burst_is_user_agent() ) return;
	if ( !insert_id ) return;

	let current_time_on_page = TimeMe.getTimeOnCurrentPageInMilliseconds();
	if ( burst_last_time_update + 1000 > current_time_on_page) {
		return;
	}
	burst_last_time_update = current_time_on_page;

	let data = {
		'ID': insert_id,
		'time_on_page': current_time_on_page,
	};

	let request = new XMLHttpRequest();
	request.open('POST', burst.url+'time'+token, true);
	request.setRequestHeader('Content-type', 'application/json')
	request.send(JSON.stringify(data)) // Make sure to stringify
	request.onerror = function (e) {
		console.error(request.statusText);
	};

	if (typeof callback == 'function') {
		callback();
	}
}

/**
 * Check if this is a user agent
 * @returns {boolean}
 */
function burst_is_user_agent() {
	const botPattern = "(googlebot\/|bot|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)";
	let re = new RegExp(botPattern, 'i');
	let userAgent = navigator.userAgent;

	return re.test(userAgent);
}

/**
 * Get a cookie by name
 * @param name
 * @returns {string}
 */
function burst_get_cookie(name) {
	name = name + "="; //Create the cookie name variable with cookie name concatenate with = sign
	let cArr = window.document.cookie.split(';'); //Create cookie array by split the cookie by ';'

	//Loop through the cookies and return the cookie value if it find the cookie name
	for (let i = 0; i < cArr.length; i++) {
		let c = cArr[i].trim();
		//If the name is the cookie string at position 0, we found the cookie and return the cookie value
		if (c.indexOf(name) == 0)
			return c.substring(name.length, c.length);
	}

	return "";
}

/**
 * set a cookie
 * @param name
 * @param value
 * @param days
 */

function burst_set_cookie(name, value) {
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
	document.cookie = name + "=" + value + ";SameSite=Lax" + secure + expires + domain + ";path="+cookiePath;
}