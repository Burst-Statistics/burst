/**
 * TimeMe library
 */
(()=>{var e,t;e=this,t=()=>{let e={startStopTimes:{},idleTimeoutMs:3e4,currentIdleTimeMs:0,checkIdleStateRateMs:250,isUserCurrentlyOnPage:!0,isUserCurrentlyIdle:!1,currentPageName:"default-page-name",timeElapsedCallbacks:[],userLeftCallbacks:[],userReturnCallbacks:[],trackTimeOnElement:t=>{let s=document.getElementById(t);s&&(s.addEventListener("mouseover",(()=>{e.startTimer(t)})),s.addEventListener("mousemove",(()=>{e.startTimer(t)})),s.addEventListener("mouseleave",(()=>{e.stopTimer(t)})),s.addEventListener("keypress",(()=>{e.startTimer(t)})),s.addEventListener("focus",(()=>{e.startTimer(t)})))},getTimeOnElementInSeconds:t=>{let s=e.getTimeOnPageInSeconds(t);return s||0},startTimer:(t,s)=>{if(t||(t=e.currentPageName),void 0===e.startStopTimes[t])e.startStopTimes[t]=[];else{let s=e.startStopTimes[t],n=s[s.length-1];if(void 0!==n&&void 0===n.stopTime)return}e.startStopTimes[t].push({startTime:s||new Date,stopTime:void 0})},stopAllTimers:()=>{let t=Object.keys(e.startStopTimes);for(let s=0;s<t.length;s++)e.stopTimer(t[s])},stopTimer:(t,s)=>{t||(t=e.currentPageName);let n=e.startStopTimes[t];void 0!==n&&0!==n.length&&void 0===n[n.length-1].stopTime&&(n[n.length-1].stopTime=s||new Date)},getTimeOnCurrentPageInSeconds:()=>e.getTimeOnPageInSeconds(e.currentPageName),getTimeOnPageInSeconds:t=>{let s=e.getTimeOnPageInMilliseconds(t);return void 0===s?void 0:s/1e3},getTimeOnCurrentPageInMilliseconds:()=>e.getTimeOnPageInMilliseconds(e.currentPageName),getTimeOnPageInMilliseconds:t=>{let s=0,n=e.startStopTimes[t];if(void 0===n)return;let i=0;for(let e=0;e<n.length;e++){let t=n[e].startTime,s=n[e].stopTime;void 0===s&&(s=new Date),i+=s-t}return s=Number(i),s},getTimeOnAllPagesInSeconds:()=>{let t=[],s=Object.keys(e.startStopTimes);for(let n=0;n<s.length;n++){let i=s[n],r=e.getTimeOnPageInSeconds(i);t.push({pageName:i,timeOnPage:r})}return t},setIdleDurationInSeconds:t=>{let s=parseFloat(t);if(!1!==isNaN(s))throw{name:"InvalidDurationException",message:"An invalid duration time ("+t+") was provided."};e.idleTimeoutMs=1e3*t},setCurrentPageName:t=>{e.currentPageName=t},resetRecordedPageTime:t=>{delete e.startStopTimes[t]},resetAllRecordedPageTimes:()=>{let t=Object.keys(e.startStopTimes);for(let s=0;s<t.length;s++)e.resetRecordedPageTime(t[s])},userActivityDetected:()=>{e.isUserCurrentlyIdle&&e.triggerUserHasReturned(),e.resetIdleCountdown()},resetIdleCountdown:()=>{e.isUserCurrentlyIdle=!1,e.currentIdleTimeMs=0},callWhenUserLeaves:(t,s)=>{e.userLeftCallbacks.push({callback:t,numberOfTimesToInvoke:s})},callWhenUserReturns:(t,s)=>{e.userReturnCallbacks.push({callback:t,numberOfTimesToInvoke:s})},triggerUserHasReturned:()=>{if(!e.isUserCurrentlyOnPage){e.isUserCurrentlyOnPage=!0,e.resetIdleCountdown();for(let t=0;t<e.userReturnCallbacks.length;t++){let s=e.userReturnCallbacks[t],n=s.numberOfTimesToInvoke;(isNaN(n)||void 0===n||n>0)&&(s.numberOfTimesToInvoke-=1,s.callback())}}e.startTimer()},triggerUserHasLeftPageOrGoneIdle:()=>{if(e.isUserCurrentlyOnPage){e.isUserCurrentlyOnPage=!1;for(let t=0;t<e.userLeftCallbacks.length;t++){let s=e.userLeftCallbacks[t],n=s.numberOfTimesToInvoke;(isNaN(n)||void 0===n||n>0)&&(s.numberOfTimesToInvoke-=1,s.callback())}}e.stopAllTimers()},callAfterTimeElapsedInSeconds:(t,s)=>{e.timeElapsedCallbacks.push({timeInSeconds:t,callback:s,pending:!0})},checkIdleState:()=>{for(let t=0;t<e.timeElapsedCallbacks.length;t++)e.timeElapsedCallbacks[t].pending&&e.getTimeOnCurrentPageInSeconds()>e.timeElapsedCallbacks[t].timeInSeconds&&(e.timeElapsedCallbacks[t].callback(),e.timeElapsedCallbacks[t].pending=!1);!1===e.isUserCurrentlyIdle&&e.currentIdleTimeMs>e.idleTimeoutMs?(e.isUserCurrentlyIdle=!0,e.triggerUserHasLeftPageOrGoneIdle()):e.currentIdleTimeMs+=e.checkIdleStateRateMs},visibilityChangeEventName:void 0,hiddenPropName:void 0,listenForVisibilityEvents:(t,s)=>{t&&e.listenForUserLeavesOrReturnsEvents(),s&&e.listForIdleEvents()},listenForUserLeavesOrReturnsEvents:()=>{void 0!==document.hidden?(e.hiddenPropName="hidden",e.visibilityChangeEventName="visibilitychange"):void 0!==document.mozHidden?(e.hiddenPropName="mozHidden",e.visibilityChangeEventName="mozvisibilitychange"):void 0!==document.msHidden?(e.hiddenPropName="msHidden",e.visibilityChangeEventName="msvisibilitychange"):void 0!==document.webkitHidden&&(e.hiddenPropName="webkitHidden",e.visibilityChangeEventName="webkitvisibilitychange"),document.addEventListener(e.visibilityChangeEventName,(()=>{document[e.hiddenPropName]?e.triggerUserHasLeftPageOrGoneIdle():e.triggerUserHasReturned()}),!1),window.addEventListener("blur",(()=>{e.triggerUserHasLeftPageOrGoneIdle()})),window.addEventListener("focus",(()=>{e.triggerUserHasReturned()}))},listForIdleEvents:()=>{document.addEventListener("mousemove",(()=>{e.userActivityDetected()})),document.addEventListener("keyup",(()=>{e.userActivityDetected()})),document.addEventListener("touchstart",(()=>{e.userActivityDetected()})),window.addEventListener("scroll",(()=>{e.userActivityDetected()})),setInterval((()=>{!0!==e.isUserCurrentlyIdle&&e.checkIdleState()}),e.checkIdleStateRateMs)},websocket:void 0,websocketHost:void 0,setUpWebsocket:t=>{if(window.WebSocket&&t){let s=t.websocketHost;try{e.websocket=new WebSocket(s),window.onbeforeunload=()=>{e.sendCurrentTime(t.appId)},e.websocket.onopen=()=>{e.sendInitWsRequest(t.appId)},e.websocket.onerror=e=>{console&&console.log("Error occurred in websocket connection: "+e)},e.websocket.onmessage=e=>{console&&console.log(e.data)}}catch(e){console&&console.error("Failed to connect to websocket host.  Error:"+e)}}},websocketSend:t=>{e.websocket.send(JSON.stringify(t))},sendCurrentTime:t=>{let s={type:"INSERT_TIME",appId:t,timeOnPageMs:e.getTimeOnCurrentPageInMilliseconds(),pageName:e.currentPageName};e.websocketSend(s)},sendInitWsRequest:t=>{let s={type:"INIT",appId:t};e.websocketSend(s)},initialize:t=>{let s,n,i=e.idleTimeoutMs||30,r=e.currentPageName||"default-page-name",a=!0,o=!0;t&&(i=t.idleTimeoutInSeconds||i,r=t.currentPageName||r,s=t.websocketOptions,n=t.initialStartTime,!1===t.trackWhenUserLeavesPage&&(a=!1),!1===t.trackWhenUserGoesIdle&&(o=!1)),e.setIdleDurationInSeconds(i),e.setCurrentPageName(r),e.setUpWebsocket(s),e.listenForVisibilityEvents(a,o),e.startTimer(void 0,n)}};return e},"undefined"!=typeof module&&module.exports?module.exports=t():"function"==typeof define&&define.amd?define([],(()=>e.TimeMe=t())):e.TimeMe=t()}).call(this),TimeMe.initialize({idleTimeoutInSeconds:30});

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

document.addEventListener("burst_fire_hit", function(){
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

	let event = new CustomEvent( 'burst_track_hit', { detail: data });
	document.dispatchEvent(event);

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