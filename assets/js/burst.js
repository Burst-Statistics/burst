window.burst_test_version = burst_get_user_test_version();
let token = '?token='+Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
let insert_id = 0;
let interactive = false;
let scroll_percentage = 0;
let scroll_percentage_max = 0;
let ticking = false;
let heartbeat_interval;

// Save scroll percentage
let h = document.documentElement,
	b = document.body,
	st = 'scrollTop',
	sh = 'scrollHeight';

// TimeMe.min.js code
(()=>{((a,b)=>{if("undefined"!=typeof module&&module.exports)return module.exports=b();return"function"==typeof define&&define.amd?void define([],()=>a.TimeMe=b()):a.TimeMe=b()})(this,()=>{let a={startStopTimes:{},idleTimeoutMs:30000,currentIdleTimeMs:0,checkIdleStateRateMs:250,isUserCurrentlyOnPage:!0,isUserCurrentlyIdle:!1,currentPageName:"default-page-name",timeElapsedCallbacks:[],userLeftCallbacks:[],userReturnCallbacks:[],trackTimeOnElement:b=>{let c=document.getElementById(b);c&&(c.addEventListener("mouseover",()=>{a.startTimer(b)}),c.addEventListener("mousemove",()=>{a.startTimer(b)}),c.addEventListener("mouseleave",()=>{a.stopTimer(b)}),c.addEventListener("keypress",()=>{a.startTimer(b)}),c.addEventListener("focus",()=>{a.startTimer(b)}))},getTimeOnElementInSeconds:b=>{let c=a.getTimeOnPageInSeconds(b);return c?c:0},startTimer:(b,c)=>{if(b||(b=a.currentPageName),void 0===a.startStopTimes[b])a.startStopTimes[b]=[];else{let c=a.startStopTimes[b],d=c[c.length-1];if(void 0!==d&&void 0===d.stopTime)return}a.startStopTimes[b].push({startTime:c||new Date,stopTime:void 0})},stopAllTimers:()=>{let b=Object.keys(a.startStopTimes);for(let c=0;c<b.length;c++)a.stopTimer(b[c])},stopTimer:(b,c)=>{b||(b=a.currentPageName);let d=a.startStopTimes[b];void 0===d||0===d.length||d[d.length-1].stopTime===void 0&&(d[d.length-1].stopTime=c||new Date)},getTimeOnCurrentPageInSeconds:()=>a.getTimeOnPageInSeconds(a.currentPageName),getTimeOnPageInSeconds:b=>{let c=a.getTimeOnPageInMilliseconds(b);return void 0===c?void 0:c/1e3},getTimeOnCurrentPageInMilliseconds:()=>a.getTimeOnPageInMilliseconds(a.currentPageName),getTimeOnPageInMilliseconds:b=>{let c=0,d=a.startStopTimes[b];if(void 0===d)return;let e=0;for(let a=0;a<d.length;a++){let b=d[a].startTime,c=d[a].stopTime;void 0===c&&(c=new Date);let f=c-b;e+=f}return c=+e,c},getTimeOnAllPagesInSeconds:()=>{let b=[],c=Object.keys(a.startStopTimes);for(let d=0;d<c.length;d++){let e=c[d],f=a.getTimeOnPageInSeconds(e);b.push({pageName:e,timeOnPage:f})}return b},setIdleDurationInSeconds:b=>{let c=parseFloat(b);if(!1===isNaN(c))a.idleTimeoutMs=1e3*b;else throw{name:"InvalidDurationException",message:"An invalid duration time ("+b+") was provided."}},setCurrentPageName:b=>{a.currentPageName=b},resetRecordedPageTime:b=>{delete a.startStopTimes[b]},resetAllRecordedPageTimes:()=>{let b=Object.keys(a.startStopTimes);for(let c=0;c<b.length;c++)a.resetRecordedPageTime(b[c])},userActivityDetected:()=>{a.isUserCurrentlyIdle&&a.triggerUserHasReturned(),a.resetIdleCountdown()},resetIdleCountdown:()=>{a.isUserCurrentlyIdle=!1,a.currentIdleTimeMs=0},callWhenUserLeaves:(b,c)=>{a.userLeftCallbacks.push({callback:b,numberOfTimesToInvoke:c})},callWhenUserReturns:(b,c)=>{a.userReturnCallbacks.push({callback:b,numberOfTimesToInvoke:c})},triggerUserHasReturned:()=>{if(!a.isUserCurrentlyOnPage){a.isUserCurrentlyOnPage=!0,a.resetIdleCountdown();for(let b=0;b<a.userReturnCallbacks.length;b++){let c=a.userReturnCallbacks[b],d=c.numberOfTimesToInvoke;(isNaN(d)||d===void 0||0<d)&&(c.numberOfTimesToInvoke-=1,c.callback())}}a.startTimer()},triggerUserHasLeftPageOrGoneIdle:()=>{if(a.isUserCurrentlyOnPage){a.isUserCurrentlyOnPage=!1;for(let b=0;b<a.userLeftCallbacks.length;b++){let c=a.userLeftCallbacks[b],d=c.numberOfTimesToInvoke;(isNaN(d)||d===void 0||0<d)&&(c.numberOfTimesToInvoke-=1,c.callback())}}a.stopAllTimers()},callAfterTimeElapsedInSeconds:(b,c)=>{a.timeElapsedCallbacks.push({timeInSeconds:b,callback:c,pending:!0})},checkIdleState:()=>{for(let b=0;b<a.timeElapsedCallbacks.length;b++)a.timeElapsedCallbacks[b].pending&&a.getTimeOnCurrentPageInSeconds()>a.timeElapsedCallbacks[b].timeInSeconds&&(a.timeElapsedCallbacks[b].callback(),a.timeElapsedCallbacks[b].pending=!1);!1===a.isUserCurrentlyIdle&&a.currentIdleTimeMs>a.idleTimeoutMs?(a.isUserCurrentlyIdle=!0,a.triggerUserHasLeftPageOrGoneIdle()):a.currentIdleTimeMs+=a.checkIdleStateRateMs},visibilityChangeEventName:void 0,hiddenPropName:void 0,listenForVisibilityEvents:(b,c)=>{b&&a.listenForUserLeavesOrReturnsEvents(),c&&a.listForIdleEvents()},listenForUserLeavesOrReturnsEvents:()=>{"undefined"==typeof document.hidden?"undefined"==typeof document.mozHidden?"undefined"==typeof document.msHidden?"undefined"!=typeof document.webkitHidden&&(a.hiddenPropName="webkitHidden",a.visibilityChangeEventName="webkitvisibilitychange"):(a.hiddenPropName="msHidden",a.visibilityChangeEventName="msvisibilitychange"):(a.hiddenPropName="mozHidden",a.visibilityChangeEventName="mozvisibilitychange"):(a.hiddenPropName="hidden",a.visibilityChangeEventName="visibilitychange"),document.addEventListener(a.visibilityChangeEventName,()=>{document[a.hiddenPropName]?a.triggerUserHasLeftPageOrGoneIdle():a.triggerUserHasReturned()},!1),window.addEventListener("blur",()=>{a.triggerUserHasLeftPageOrGoneIdle()}),window.addEventListener("focus",()=>{a.triggerUserHasReturned()})},listForIdleEvents:()=>{document.addEventListener("mousemove",()=>{a.userActivityDetected()}),document.addEventListener("keyup",()=>{a.userActivityDetected()}),document.addEventListener("touchstart",()=>{a.userActivityDetected()}),window.addEventListener("scroll",()=>{a.userActivityDetected()}),setInterval(()=>{!0!==a.isUserCurrentlyIdle&&a.checkIdleState()},a.checkIdleStateRateMs)},websocket:void 0,websocketHost:void 0,setUpWebsocket:b=>{if(window.WebSocket&&b){let c=b.websocketHost;try{a.websocket=new WebSocket(c),window.onbeforeunload=()=>{a.sendCurrentTime(b.appId)},a.websocket.onopen=()=>{a.sendInitWsRequest(b.appId)},a.websocket.onerror=a=>{console&&console.log("Error occurred in websocket connection: "+a)},a.websocket.onmessage=a=>{console&&console.log(a.data)}}catch(a){console&&console.error("Failed to connect to websocket host.  Error:"+a)}}},websocketSend:b=>{a.websocket.send(JSON.stringify(b))},sendCurrentTime:b=>{let c=a.getTimeOnCurrentPageInMilliseconds(),d={type:"INSERT_TIME",appId:b,timeOnPageMs:c,pageName:a.currentPageName};a.websocketSend(d)},sendInitWsRequest:b=>{a.websocketSend({type:"INIT",appId:b})},initialize:b=>{let c,d,e=a.idleTimeoutMs||30,f=a.currentPageName||"default-page-name",g=!0,h=!0;b&&(e=b.idleTimeoutInSeconds||e,f=b.currentPageName||f,c=b.websocketOptions,d=b.initialStartTime,!1===b.trackWhenUserLeavesPage&&(g=!1),!1===b.trackWhenUserGoesIdle&&(h=!1)),a.setIdleDurationInSeconds(e),a.setCurrentPageName(f),a.setUpWebsocket(c),a.listenForVisibilityEvents(g,h),a.startTimer(void 0,d)}};return a})}).call(this);

// Initialize library and start tracking time
TimeMe.initialize({
	idleTimeoutInSeconds: 5 // seconds
});

// visibilitychange and pagehide work in more browsers hence we check if they are supported and try to use them
document.addEventListener('visibilitychange', function () {
	if ( document.visibilityState === 'hidden' ) {
		burst_update_time_on_page();
	}
});
window.addEventListener("pagehide", burst_update_time_on_page, false );
window.addEventListener("beforeunload", burst_update_time_on_page, false );
TimeMe.callWhenUserLeaves( burst_update_time_on_page );
TimeMe.callWhenUserLeaves( stop_heartbeat_interval );
TimeMe.callWhenUserReturns( start_heartbeat_interval );


document.addEventListener('scroll', function(e) {
	scroll_percentage = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
	if (!ticking) {
		window.requestAnimationFrame(function() {
			save_highest_scroll_percentage(scroll_percentage);
			ticking = false;
		});
		ticking = true;
	}
});
function start_heartbeat_interval(){
	heartbeat_interval = window.setInterval(function(){
		burst_update_time_on_page();
	}, 30000);
}
function stop_heartbeat_interval(){
	clearInterval(heartbeat_interval);
}



if ( !burst_is_user_agent() ) {
	conversion = window.burst_is_goal_page !== undefined;
	burst_track_hit(conversion);
}

if ( burst_is_experiment_page() ) {
	//console.log("is experiment page");
	if ( burst_is_user_agent() ) {
		burst_show_content('control');
	} else {
		window.burst_test_version = burst_get_user_test_version();
		console.log(window.burst_test_version);

		burst_show_content(window.burst_test_version);
	}
} else {
	//fallback for when burst_experiment_id is undefined, but .burst_control does exist
	if (document.querySelectorAll(".burst_control").length > 0) {
		burst_show_content('control');
		//@todo send an error notice to the server, so we can notice the user or stop the experiment
	}
	//console.log("Not an experiment page");
}

if ( window.burst_goal_identifier !== undefined && window.burst_goal_identifier.length > 0 ) {
	console.log('burst_goal_identifier !== undefined');
	document.querySelectorAll( window.burst_goal_identifier ).forEach(item => {
		item.addEventListener('click', event => {
			console.log('click on');
			let target = (event.currentTarget) ? event.currentTarget : event.srcElement;
			let is_link = false;
			if (target.tagName.toLowerCase() === "a" && target !== undefined) {
				is_link = true;
				// Don't follow the link yet
				event.preventDefault();
				// Remember the link href
				let href = event.srcElement.attributes.href.textContent;
			}

			// Do the async thing
			burst_track_hit(true, function() {
				console.log('burst_track_hit');

				// go to the link
				if (is_link) window.location = href;
			});
		})
	})
}

/**
 *
 * @param callback
 */
function burst_track_hit(conversion, callback) {
	console.log("burst");
	if ( !burst_wp_has_consent() ) return;
	console.log("has_consent");

	let request = new XMLHttpRequest();
	request.open('POST', burst.url+'hit'+token, true);
	let url = location.pathname;
	let entire_url = location.href;
	let data = {
		'url': url,
		'entire_url': entire_url,
		'page_id': burst.page_id,
		'test_version': window.burst_test_version,
		'experiment_id': window.burst_experiment_id,
		'conversion': conversion,
		'referrer_url': document.referrer,
		'anon_ip': burst.anon_ip,
		'user_agent': navigator.userAgent,
		'device_resolution': window.screen.width * window.devicePixelRatio + "x" + window.screen.height * window.devicePixelRatio,
		'time_on_page': TimeMe.getTimeOnCurrentPageInMilliseconds(),
		'scroll_percentage': scroll_percentage_max,
	};

	request.setRequestHeader('Content-type', 'application/json')
	request.send(JSON.stringify(data)) // Make sure to stringify
	request.onreadystatechange = function() {
		if (request.readyState === XMLHttpRequest.DONE) {
			response = JSON.parse(request.response);
			start_heartbeat_interval();
			insert_id = response.insert_id;
		}
	}

	if (typeof callback == 'function') {
		callback();
	}
}

function save_highest_scroll_percentage(scroll_percentage) {
	if (scroll_percentage > scroll_percentage_max) {
		scroll_percentage_max = scroll_percentage;
	}
}

let burst_last_time_update = false;
function burst_update_time_on_page(event){
	if ( !burst_wp_has_consent() ) return;

	let current_time_on_page = TimeMe.getTimeOnCurrentPageInMilliseconds();
	if ( burst_last_time_update + 1000 > current_time_on_page) {
		return;
	}
	console.log('burst_update_time_on_page');

	burst_last_time_update = current_time_on_page;

	let data = {
		'ID': insert_id,
		'time_on_page': current_time_on_page,
		'scroll_percentage': scroll_percentage_max,
	};

	let request = new XMLHttpRequest();
	request.open('POST', burst.url+'time'+token, true);
	request.setRequestHeader('Content-type', 'application/json')
	request.send(JSON.stringify(data)) // Make sure to stringify

	if (typeof callback == 'function') {
		callback();
	}
}

/**
 * wrapper to check consent for wp consent API. If consent API is not active, do nothing
 */

function burst_wp_has_consent() {
	if (typeof wp_has_consent == 'function') {
		return wp_has_consent('statistics-anonymous');
	}
	return true;
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
 * Check if we're on an experiment page
 * @returns {boolean}
 */
function burst_is_experiment_page(){
	return window.burst_experiment_id !== undefined;
}

function burst_show_content( test_type ){
	//by default, the control is 'visibility:none', which ensures the right amount of space is taken in the dom.
	//the variant is display:none, so not visible at all.
	const variants = document.querySelectorAll(".burst_variant");
	const controls = document.querySelectorAll(".burst_control");
	if ( test_type === 'control' ) {
		for (const variant of variants) {
			variant.style.display = 'none';
		}
		for (const control of controls) {
			control.style.visibility = 'visible';
			control.style.display = 'block';
		}
	} else {
		for (const control of controls) {
			control.style.display = 'none';
		}
		for (const variant of variants) {
			variant.style.display = 'block';
		}
	}
}

/**
 * check if user has cookie: uid && test_version.
 * if no cookie, create a uid, and random choose control/variant.
 * set cookie
 */
function burst_get_user_test_version(){
	//get uid cookie
	let v = burst_get_cookie('burst_v');
	if ( v.length == 0 ) {
		//determine test_version randomly
		let rand = Math.floor(Math.random() * 2);
		if ( rand === 1 ) {
			window.burst_test_version = 'variant';
		} else {
			window.burst_test_version = 'control';
		}
		burst_set_cookie('burst_v', window.burst_test_version );

	} else {
		window.burst_test_version = burst_get_cookie('burst_v');
	}
	return window.burst_test_version;
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