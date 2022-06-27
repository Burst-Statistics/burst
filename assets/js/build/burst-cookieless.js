/*
 * Promise Polyfill
 * Lightweight ES6 Promise polyfill for the browser and node. 
 * Adheres closely to the spec. It is a perfect polyfill IE, Firefox 
 * or any other browser that does not support native promises.
 * 
 * Website: https://github.com/taylorhakes/promise-polyfill
 * Copyright: (c) 2014 Taylor Hakes
 * Copyright: (c) 2014 Forbes Lindesay
 * License: MIT
 */
!function(e){function n(){}function t(e,n){return function(){e.apply(n,arguments)}}function o(e){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],s(e,this)}function i(e,n){for(;3===e._state;)e=e._value;return 0===e._state?void e._deferreds.push(n):(e._handled=!0,void o._immediateFn(function(){var t=1===e._state?n.onFulfilled:n.onRejected;if(null===t)return void(1===e._state?r:u)(n.promise,e._value);var o;try{o=t(e._value)}catch(i){return void u(n.promise,i)}r(n.promise,o)}))}function r(e,n){try{if(n===e)throw new TypeError("A promise cannot be resolved with itself.");if(n&&("object"==typeof n||"function"==typeof n)){var i=n.then;if(n instanceof o)return e._state=3,e._value=n,void f(e);if("function"==typeof i)return void s(t(i,n),e)}e._state=1,e._value=n,f(e)}catch(r){u(e,r)}}function u(e,n){e._state=2,e._value=n,f(e)}function f(e){2===e._state&&0===e._deferreds.length&&o._immediateFn(function(){e._handled||o._unhandledRejectionFn(e._value)});for(var n=0,t=e._deferreds.length;n<t;n++)i(e,e._deferreds[n]);e._deferreds=null}function c(e,n,t){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof n?n:null,this.promise=t}function s(e,n){var t=!1;try{e(function(e){t||(t=!0,r(n,e))},function(e){t||(t=!0,u(n,e))})}catch(o){if(t)return;t=!0,u(n,o)}}var a=setTimeout;o.prototype["catch"]=function(e){return this.then(null,e)},o.prototype.then=function(e,t){var o=new this.constructor(n);return i(this,new c(e,t,o)),o},o.all=function(e){var n=Array.prototype.slice.call(e);return new o(function(e,t){function o(r,u){try{if(u&&("object"==typeof u||"function"==typeof u)){var f=u.then;if("function"==typeof f)return void f.call(u,function(e){o(r,e)},t)}n[r]=u,0===--i&&e(n)}catch(c){t(c)}}if(0===n.length)return e([]);for(var i=n.length,r=0;r<n.length;r++)o(r,n[r])})},o.resolve=function(e){return e&&"object"==typeof e&&e.constructor===o?e:new o(function(n){n(e)})},o.reject=function(e){return new o(function(n,t){t(e)})},o.race=function(e){return new o(function(n,t){for(var o=0,i=e.length;o<i;o++)e[o].then(n,t)})},o._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){a(e,0)},o._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},o._setImmediateFn=function(e){o._immediateFn=e},o._setUnhandledRejectionFn=function(e){o._unhandledRejectionFn=e},"undefined"!=typeof module&&module.exports?module.exports=o:e.Promise||(e.Promise=o)}(this);

// murmurHash3.js v2.1.2 |  http://github.com/karanlyons/murmurHash.js | MIT Licensed
(function(y,z){function l(a,c){return(a&65535)*c+(((a>>>16)*c&65535)<<16)}function r(a,c){return a<<c|a>>>32-c}function x(a){a=l(a^a>>>16,2246822507);a^=a>>>13;a=l(a,3266489909);return a^=a>>>16}function v(a,c){a=[a[0]>>>16,a[0]&65535,a[1]>>>16,a[1]&65535];c=[c[0]>>>16,c[0]&65535,c[1]>>>16,c[1]&65535];var b=[0,0,0,0];b[3]+=a[3]+c[3];b[2]+=b[3]>>>16;b[3]&=65535;b[2]+=a[2]+c[2];b[1]+=b[2]>>>16;b[2]&=65535;b[1]+=a[1]+c[1];b[0]+=b[1]>>>16;b[1]&=65535;b[0]+=a[0]+c[0];b[0]&=65535;return[b[0]<<16|b[1],b[2]<<
16|b[3]]}function u(a,c){a=[a[0]>>>16,a[0]&65535,a[1]>>>16,a[1]&65535];c=[c[0]>>>16,c[0]&65535,c[1]>>>16,c[1]&65535];var b=[0,0,0,0];b[3]+=a[3]*c[3];b[2]+=b[3]>>>16;b[3]&=65535;b[2]+=a[2]*c[3];b[1]+=b[2]>>>16;b[2]&=65535;b[2]+=a[3]*c[2];b[1]+=b[2]>>>16;b[2]&=65535;b[1]+=a[1]*c[3];b[0]+=b[1]>>>16;b[1]&=65535;b[1]+=a[2]*c[2];b[0]+=b[1]>>>16;b[1]&=65535;b[1]+=a[3]*c[1];b[0]+=b[1]>>>16;b[1]&=65535;b[0]+=a[0]*c[3]+a[1]*c[2]+a[2]*c[1]+a[3]*c[0];b[0]&=65535;return[b[0]<<16|b[1],b[2]<<16|b[3]]}function w(a,
c){c%=64;if(32===c)return[a[1],a[0]];if(32>c)return[a[0]<<c|a[1]>>>32-c,a[1]<<c|a[0]>>>32-c];c-=32;return[a[1]<<c|a[0]>>>32-c,a[0]<<c|a[1]>>>32-c]}function s(a,c){c%=64;return 0===c?a:32>c?[a[0]<<c|a[1]>>>32-c,a[1]<<c]:[a[1]<<c-32,0]}function p(a,c){return[a[0]^c[0],a[1]^c[1]]}function A(a){a=p(a,[0,a[0]>>>1]);a=u(a,[4283543511,3981806797]);a=p(a,[0,a[0]>>>1]);a=u(a,[3301882366,444984403]);return a=p(a,[0,a[0]>>>1])}var t={version:"2.1.2",x86:{},x64:{}};t.x86.hash32=function(a,c){a=a||"";for(var b=
a.length%4,p=a.length-b,d=c||0,e=0,f=0;f<p;f+=4)e=a.charCodeAt(f)&255|(a.charCodeAt(f+1)&255)<<8|(a.charCodeAt(f+2)&255)<<16|(a.charCodeAt(f+3)&255)<<24,e=l(e,3432918353),e=r(e,15),e=l(e,461845907),d^=e,d=r(d,13),d=l(d,5)+3864292196;e=0;switch(b){case 3:e^=(a.charCodeAt(f+2)&255)<<16;case 2:e^=(a.charCodeAt(f+1)&255)<<8;case 1:e^=a.charCodeAt(f)&255,e=l(e,3432918353),e=r(e,15),e=l(e,461845907),d^=e}d^=a.length;d=x(d);return d>>>0};t.x86.hash128=function(a,c){a=a||"";c=c||0;for(var b=a.length%16,p=
a.length-b,d=c,e=c,f=c,h=c,m=0,n=0,g=0,q=0,k=0;k<p;k+=16)m=a.charCodeAt(k)&255|(a.charCodeAt(k+1)&255)<<8|(a.charCodeAt(k+2)&255)<<16|(a.charCodeAt(k+3)&255)<<24,n=a.charCodeAt(k+4)&255|(a.charCodeAt(k+5)&255)<<8|(a.charCodeAt(k+6)&255)<<16|(a.charCodeAt(k+7)&255)<<24,g=a.charCodeAt(k+8)&255|(a.charCodeAt(k+9)&255)<<8|(a.charCodeAt(k+10)&255)<<16|(a.charCodeAt(k+11)&255)<<24,q=a.charCodeAt(k+12)&255|(a.charCodeAt(k+13)&255)<<8|(a.charCodeAt(k+14)&255)<<16|(a.charCodeAt(k+15)&255)<<24,m=l(m,597399067),
m=r(m,15),m=l(m,2869860233),d^=m,d=r(d,19),d+=e,d=l(d,5)+1444728091,n=l(n,2869860233),n=r(n,16),n=l(n,951274213),e^=n,e=r(e,17),e+=f,e=l(e,5)+197830471,g=l(g,951274213),g=r(g,17),g=l(g,2716044179),f^=g,f=r(f,15),f+=h,f=l(f,5)+2530024501,q=l(q,2716044179),q=r(q,18),q=l(q,597399067),h^=q,h=r(h,13),h+=d,h=l(h,5)+850148119;q=g=n=m=0;switch(b){case 15:q^=a.charCodeAt(k+14)<<16;case 14:q^=a.charCodeAt(k+13)<<8;case 13:q^=a.charCodeAt(k+12),q=l(q,2716044179),q=r(q,18),q=l(q,597399067),h^=q;case 12:g^=a.charCodeAt(k+
11)<<24;case 11:g^=a.charCodeAt(k+10)<<16;case 10:g^=a.charCodeAt(k+9)<<8;case 9:g^=a.charCodeAt(k+8),g=l(g,951274213),g=r(g,17),g=l(g,2716044179),f^=g;case 8:n^=a.charCodeAt(k+7)<<24;case 7:n^=a.charCodeAt(k+6)<<16;case 6:n^=a.charCodeAt(k+5)<<8;case 5:n^=a.charCodeAt(k+4),n=l(n,2869860233),n=r(n,16),n=l(n,951274213),e^=n;case 4:m^=a.charCodeAt(k+3)<<24;case 3:m^=a.charCodeAt(k+2)<<16;case 2:m^=a.charCodeAt(k+1)<<8;case 1:m^=a.charCodeAt(k),m=l(m,597399067),m=r(m,15),m=l(m,2869860233),d^=m}d^=a.length;
e^=a.length;f^=a.length;h^=a.length;d=d+e+f;d+=h;e+=d;f+=d;h+=d;d=x(d);e=x(e);f=x(f);h=x(h);d+=e;d+=f;d+=h;e+=d;f+=d;h+=d;return("00000000"+(d>>>0).toString(16)).slice(-8)+("00000000"+(e>>>0).toString(16)).slice(-8)+("00000000"+(f>>>0).toString(16)).slice(-8)+("00000000"+(h>>>0).toString(16)).slice(-8)};t.x64.hash128=function(a,c){a=a||"";c=c||0;for(var b=a.length%16,l=a.length-b,d=[0,c],e=[0,c],f=[0,0],h=[0,0],m=[2277735313,289559509],n=[1291169091,658871167],g=0;g<l;g+=16)f=[a.charCodeAt(g+4)&255|
(a.charCodeAt(g+5)&255)<<8|(a.charCodeAt(g+6)&255)<<16|(a.charCodeAt(g+7)&255)<<24,a.charCodeAt(g)&255|(a.charCodeAt(g+1)&255)<<8|(a.charCodeAt(g+2)&255)<<16|(a.charCodeAt(g+3)&255)<<24],h=[a.charCodeAt(g+12)&255|(a.charCodeAt(g+13)&255)<<8|(a.charCodeAt(g+14)&255)<<16|(a.charCodeAt(g+15)&255)<<24,a.charCodeAt(g+8)&255|(a.charCodeAt(g+9)&255)<<8|(a.charCodeAt(g+10)&255)<<16|(a.charCodeAt(g+11)&255)<<24],f=u(f,m),f=w(f,31),f=u(f,n),d=p(d,f),d=w(d,27),d=v(d,e),d=v(u(d,[0,5]),[0,1390208809]),h=u(h,n),
h=w(h,33),h=u(h,m),e=p(e,h),e=w(e,31),e=v(e,d),e=v(u(e,[0,5]),[0,944331445]);f=[0,0];h=[0,0];switch(b){case 15:h=p(h,s([0,a.charCodeAt(g+14)],48));case 14:h=p(h,s([0,a.charCodeAt(g+13)],40));case 13:h=p(h,s([0,a.charCodeAt(g+12)],32));case 12:h=p(h,s([0,a.charCodeAt(g+11)],24));case 11:h=p(h,s([0,a.charCodeAt(g+10)],16));case 10:h=p(h,s([0,a.charCodeAt(g+9)],8));case 9:h=p(h,[0,a.charCodeAt(g+8)]),h=u(h,n),h=w(h,33),h=u(h,m),e=p(e,h);case 8:f=p(f,s([0,a.charCodeAt(g+7)],56));case 7:f=p(f,s([0,a.charCodeAt(g+
6)],48));case 6:f=p(f,s([0,a.charCodeAt(g+5)],40));case 5:f=p(f,s([0,a.charCodeAt(g+4)],32));case 4:f=p(f,s([0,a.charCodeAt(g+3)],24));case 3:f=p(f,s([0,a.charCodeAt(g+2)],16));case 2:f=p(f,s([0,a.charCodeAt(g+1)],8));case 1:f=p(f,[0,a.charCodeAt(g)]),f=u(f,m),f=w(f,31),f=u(f,n),d=p(d,f)}d=p(d,[0,a.length]);e=p(e,[0,a.length]);d=v(d,e);e=v(e,d);d=A(d);e=A(e);d=v(d,e);e=v(e,d);return("00000000"+(d[0]>>>0).toString(16)).slice(-8)+("00000000"+(d[1]>>>0).toString(16)).slice(-8)+("00000000"+(e[0]>>>0).toString(16)).slice(-8)+
("00000000"+(e[1]>>>0).toString(16)).slice(-8)};"undefined"!==typeof exports?("undefined"!==typeof module&&module.exports&&(exports=module.exports=t),exports.murmurHash3=t):"function"===typeof define&&define.amd?define([],function(){return t}):(t._murmurHash3=y.murmurHash3,t.noConflict=function(){y.murmurHash3=t._murmurHash3;t._murmurHash3=z;t.noConflict=z;return t},y.murmurHash3=t)})(this);

/*
 * ImprintJs
 */
(function(scope) {

  	'use strict';

	// Test holder
	var _tests = {};

	var imprint = scope.imprint || {

		test: function(tests){
			var self = this;
			return Promise.all(tests.map(function(x){
				if (!_tests.hasOwnProperty(x))
					throw "No test registered with the alias " + x;
				return _tests[x]();
			})).then(function(values){
				//console.log(values);
				return murmurHash3.x86.hash128(values.join("~"));
			})
		},

		registerTest: function(alias, test)
		{
			// Add test factory to tests collection
			_tests[alias] = test;
		}

	}

	// Export the imprint class
	if (typeof module === 'object' && typeof exports !== "undefined") {
		module.exports = imprintJs;
	}

	scope.imprint = imprint;

})(window);


(function(scope){

	'use strict';

	imprint.registerTest("adBlocker", function(){
		return new Promise(function(resolve) {
      var adsbox = document.createElement('div');
      adsbox.innerHTML = '&nbsp;';
      adsbox.className = 'adsbox';
      adsbox.style.display = 'block';
      adsbox.style.position = 'absolute';
      adsbox.style.top = '0px';
      adsbox.style.left = '-9999px';
      try
      { 
        // body may not exist, that's why we need try/catch
        document.body.appendChild(adsbox);
        window.setTimeout(function() {
          var result = adsbox.offsetHeight === 0;
          document.body.removeChild(adsbox);
          return resolve(result);
        }, 10);
      } catch (e) {
        return resolve(false);
      }
		});
	});

})(window);

/*
 * Original Source: https://github.com/Song-Li/cross_browser/blob/master/client/fingerprint/js/audio.js
 * Copyright: Yinzhi Cao, Song Li, Erik Wijmans
 * License: GNU v3
 * Changes:
 *  - Wrapped in an ImprintJs promise
 */

(function(scope){

	'use strict';

	imprint.registerTest("audio", function(){
		return new Promise(function(resolve) {
			try 
			{
				var audioCtx = new (window.AudioContext || window.webkitAudioContext),
					oscillator = audioCtx.createOscillator(),
					analyser = audioCtx.createAnalyser(),
					gainNode = audioCtx.createGain(),
					scriptProcessor = audioCtx.createScriptProcessor(4096,1,1);
				var destination = audioCtx.destination;
				var val = (audioCtx.sampleRate).toString() + '_' + destination.maxChannelCount + "_" + destination.numberOfInputs + '_' + destination.numberOfOutputs + '_' + destination.channelCount + '_' + destination.channelCountMode + '_' + destination.channelInterpretation;
				return resolve(val);
			} 
			catch (e) 
			{
				return resolve("");
			}
		});
	});

})(window);
(function(scope){

	'use strict';

	imprint.registerTest("availableScreenResolution", function(){
		return new Promise(function(resolve) {
			var val = (screen.availHeight > screen.availWidth) 
				? [screen.availHeight, screen.availWidth] 
				: [screen.availWidth, screen.availHeight];
			return resolve(val.join("x"));
		});
	});

})(window);

/*
 * Original Source: https://github.com/Valve/fingerprintjs2/blob/master/fingerprint2.js
 * Copyright: Valentin Vasilyev (valentin.vasilyev@outlook.com)
 * License: MIT
 * Changes:
 *  - Wrapped in an ImprintJs promise
 */

(function(scope){

	'use strict';

	imprint.registerTest("canvas", function(){
		return new Promise(function(resolve) {

			var result = [];

			// Very simple now, need to make it more complex (geo shapes etc)
			var canvas = document.createElement("canvas");
			canvas.width = 2000;
			canvas.height = 200;
			canvas.style.display = "inline";

			var ctx = canvas.getContext("2d");

			// detect browser support of canvas winding
			// http://blogs.adobe.com/webplatform/2013/01/30/winding-rules-in-canvas/
			// https://github.com/Modernizr/Modernizr/blob/master/feature-detects/canvas/winding.js
			ctx.rect(0, 0, 10, 10);
			ctx.rect(2, 2, 6, 6);
			result.push("canvas winding:" + ((ctx.isPointInPath(5, 5, "evenodd") === false) ? "yes" : "no"));

			ctx.textBaseline = "alphabetic";
			ctx.fillStyle = "#f60";
			ctx.fillRect(125, 1, 62, 20);
			ctx.fillStyle = "#069";

			// https://github.com/Valve/fingerprintjs2/issues/66
			ctx.font = "11pt no-real-font-123";
			ctx.fillText("Cwm fjordbank glyphs vext quiz, \ud83d\ude03", 2, 15);
			ctx.fillStyle = "rgba(102, 204, 0, 0.2)";
			ctx.font = "18pt Arial";
			ctx.fillText("Cwm fjordbank glyphs vext quiz, \ud83d\ude03", 4, 45);

			// canvas blending
			// http://blogs.adobe.com/webplatform/2013/01/28/blending-features-in-canvas/
			// http://jsfiddle.net/NDYV8/16/
			ctx.globalCompositeOperation = "multiply";
			ctx.fillStyle = "rgb(255,0,255)";
			ctx.beginPath();
			ctx.arc(50, 50, 50, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();
			ctx.fillStyle = "rgb(0,255,255)";
			ctx.beginPath();
			ctx.arc(100, 50, 50, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();
			ctx.fillStyle = "rgb(255,255,0)";
			ctx.beginPath();
			ctx.arc(75, 100, 50, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();
			ctx.fillStyle = "rgb(255,0,255)";

			// canvas winding
			// http://blogs.adobe.com/webplatform/2013/01/30/winding-rules-in-canvas/
			// http://jsfiddle.net/NDYV8/19/
			ctx.arc(75, 75, 75, 0, Math.PI * 2, true);
			ctx.arc(75, 75, 25, 0, Math.PI * 2, true);
			ctx.fill("evenodd");

			result.push("canvas fp:" + canvas.toDataURL());
			
			return resolve(result.join("~"));
		});
	});

})(window);
(function(scope){

	'use strict';

	imprint.registerTest("colorDepth", function(){
		return new Promise(function(resolve) {
			var cd = screen.colorDepth;

			// Some browsers return 24 rather than 32 as 32 is really
			// 24 bit color depth + 8 bits alpha, so they see the alpha
			// as not really being "color" so report 24 instead. 
			// For consistancy, treat all 32 color depths as 24.
			if (cd === 32) {
				cd = 24;
			}

			return resolve(cd || "");
		});
	});

})(window);

(function(scope){

	'use strict';

	imprint.registerTest("cookies", function(){
		return new Promise(function(resolve) {
			return resolve(navigator.cookieEnabled);
		});
	});

})(window);
(function(scope){

	'use strict';

	imprint.registerTest("cpuClass", function(){
		return new Promise(function(resolve) {
			return resolve(navigator.cpuClass || "");
		});
	});

})(window);
(function(scope){

	'use strict';

	imprint.registerTest("deviceDpi", function(){
		return new Promise(function(resolve) {
			return resolve((screen.deviceXDPI || 0) + "x" + (screen.deviceYDPI || 0));
		});
	});

})(window);
(function(scope){

	'use strict';

	imprint.registerTest("doNotTrack", function(){
		return new Promise(function(resolve) {
			return resolve(navigator.doNotTrack || navigator.msDoNotTrack || window.doNotTrack || "");
		});
	});

})(window);
(function(scope){

	'use strict';

	imprint.registerTest("indexedDb", function(){
		return new Promise(function(resolve) {
			try
			{
				return resolve(!!window.indexedDB);
			} 
			catch (e) 
			{
				return resolve(true); // SecurityError when referencing it means it exists
			}
		});
	});

})(window);
/**
 * JavaScript code to detect available availability of a
 * particular font in a browser using JavaScript and CSS.
 *
 * Author : Lalit Patel
 * Website: http://www.lalit.org/lab/javascript-css-font-detect/
 * License: Apache Software License 2.0
 *          http://www.apache.org/licenses/LICENSE-2.0
 * Version: 0.15 (21 Sep 2009)
 *          Changed comparision font to default from sans-default-default,
 *          as in FF3.0 font of child element didn't fallback
 *          to parent element if the font is missing.
 * Version: 0.2 (04 Mar 2012)
 *          Comparing font against all the 3 generic font families ie,
 *          'monospace', 'sans-serif' and 'sans'. If it doesn't match all 3
 *          then that font is 100% not available in the system
 * Version: 0.3 (24 Mar 2012)
 *          Replaced sans with serif in the list of baseFonts
 */
var FontDetector = function() {
	
    // a font will be compared against all the three default fonts.
    // and if it doesn't match all 3 then that font is not available.
    var baseFonts = ['monospace', 'sans-serif', 'serif'];

    //we use m or w because these two characters take up the maximum width.
    // And we use a LLi so that the same matching fonts can get separated
    var testString = "mmmmmmmmmmlli";

    //we test using 72px font size, we may use any size. I guess larger the better.
    var testSize = '201px';

    var h = document.getElementsByTagName("body")[0];

    // create a SPAN in the document to get the width of the text we use to test
    var s = document.createElement("span");
    s.style.fontSize = testSize;
    s.innerHTML = testString;
    var defaultWidth = {};
    var defaultHeight = {};
    for (var index in baseFonts) {
        //get the default width for the three base fonts
        s.style.fontFamily = baseFonts[index];
        h.appendChild(s);
        defaultWidth[baseFonts[index]] = s.offsetWidth; //width for the default font
        defaultHeight[baseFonts[index]] = s.offsetHeight; //height for the defualt font
        h.removeChild(s);
    }

    function detect(font) {
        var detected = true;
        for (var index in baseFonts) {
            s.style.fontFamily = font + ',' + baseFonts[index]; // name of the font along with the base font for fallback.
            h.appendChild(s);
            var matched = (s.offsetWidth != defaultWidth[baseFonts[index]] || s.offsetHeight != defaultHeight[baseFonts[index]]);
            h.removeChild(s);
            detected = detected && matched;
        }
        return detected;
    }

    this.detect = detect;
};

(function(scope){

	'use strict';

	imprint.registerTest("installedFonts", function(){
		return new Promise(function(resolve) {
			var fontDetective = new FontDetector();
            // Firefox doesn't like fonts ending in "bold", "heavy", "light", "transparent" or anything vaguely css related so we make sure the list doesn't contain any such fonts
            var fontArray = ["ADOBE CASLON PRO","ADOBE GARAMOND PRO","AVENIR","Adobe Fangsong Std","Adobe Ming Std","Agency FB","Aharoni","Amazone BT","AngsanaUPC","Antique Olive","Apple Chancery","Apple Color Emoji","Apple SD Gothic Neo","Arab","Arial Baltic","Arial CE","Arial CYR","Arial Greek","Arial MT","Arial Unicode MS","Arrus BT","AvantGarde Bk BT","AvantGarde Md BT","Ayuthaya","Baskerville Old Face","Bell MT","Benguiat Bk BT","Berlin Sans FB","BernhardFashion BT","BernhardMod BT","Big Caslon","Bitstream Vera Sans Mono","Bitstream Vera Serif","BlairMdITC TT","Bodoni 72 Smallcaps","Bodoni MT Poster Compressed","Boulder","Bradley Hand","Broadway","Browallia New","BrowalliaUPC","Calisto MT","Cambria Math","Centaur","Chalkboard","Chalkboard SE","Chalkduster","Charter BT","ChelthmITC Bk BT","Chiller","Comic Sans MS","Constantia","Copperplate","Corbel","Cordia New","CordiaUPC","Coronet","Courier New Baltic","Courier New CE","Courier New CYR","Courier New TUR","Cuckoo","DFKai-SB","DaunPenh","Dauphin","David","DejaVu LGC Sans Mono","Denmark","Desdemona","DokChampa","Dotum","Ebrima","Edwardian Script ITC","Eras Bold ITC","EucrosiaUPC","Euphemia","Eurostile","FRUTIGER","FangSong","Felix Titling","Forte","Fransiscan","FreesiaUPC","French Script MT","FrnkGothITC Bk BT","Fruitger","Futura Bk BT","Futura Md BT","Futura ZBlk BT","FuturaBlack BT","Galliard BT","Garamond","Gautami","Geeza Pro","Geneva","GeoSlab 703 Lt BT","Geometr231 BT","Geometr231 Hv BT","Gigi","Gill Sans","GoudyOLSt BT","GulimChe","GungSeo","Gurmukhi MN","Harlow Solid Italic","Heather","HeiT","High Tower Text","Hiragino Kaku Gothic ProN","Hiragino Mincho ProN","Hiragino Sans GB","Hoefler Text","Humanst521 BT","Humanst521 Lt BT","Impact","Imprint MT Shadow","Incised901 BT","Incised901 Lt BT","Informal Roman","Informal011 BT","IrisUPC","Kabel Bk BT","KacstOne","KaiTi","Khmer UI","Kokila","LUCIDA GRANDE","Latha","Leelawadee","Lohit Gujarati","Long Island","Lucida Calligraphy","Lucida Console","Lucida Sans","Lucida Sans Typewriter","Lydian BT","MS Gothic","MS Mincho","MS PGothic","MS Reference Sans Serif","MS Reference Specialty","MS Serif","MUSEO","MYRIAD","Malgun Gothic","Mangal","Marigold","Market","Marlett","Meiryo","Meiryo UI","Menlo","Microsoft PhagsPa","Microsoft Uighur","MingLiU","MingLiU_HKSCS","Minion","Miriam Fixed","Mona Lisa Solid ITC TT","Monaco","Monotype Corsiva","NEVIS","News Gothic","News GothicMT","NewsGoth BT","Nyala","Old Century","Old English Text MT","Onyx","Oriya Sangam MN","PMingLiU","Palatino","Parchment","Pegasus","Perpetua","Perpetua Titling MT","Pickwick","Poster","Pristina","Raavi","Rage Italic","Rockwell","Roman","Sakkal Majalla","Savoye LET","Sawasdee","Segoe UI Symbol","Serifa BT","Serifa Th BT","Showcard Gothic","Shruti","Signboard","SimHei","SimSun","SimSun-ExtB","Simplified Arabic","Simplified Arabic Fixed","Sinhala Sangam MN","Sketch Rockwell","Socket","Stencil","Styllo","Swis721 BlkEx BT","Swiss911 XCm BT","Symbol","Synchro LET","System","TRAJAN PRO","Technical","Teletype","Tempus Sans ITC","Thonburi","Times","Times New Roman Baltic","Times New Roman CYR","Times New Roman PS","Trebuchet MS","Tubular","Tunga","Tw Cen MT","TypoUpright BT","Ubuntu","Unicorn","Utopia","Viner Hand ITC","Vivaldi","Vrinda","Westminster","Wide Latin","Zurich BlkEx BT"];
            // Extend the fontArray to cover the following for a larger list of fonts, however it will take loger to calculate the fingerprint
            /*"ARCHER","ARNO PRO","Academy Engraved LET","Adobe Garamond","Adobe Hebrew","Algerian","AmerType Md BT","American Typewriter","Andale Mono","Andalus","Angsana New","Aparajita","Arabic Typesetting","Arial","Arial Hebrew","Arial TUR","Aurora Cn BT","Bandy","Bangla Sangam MN","Bank Gothic","BankGothic Md BT","Baskerville","Batang","BatangChe","Bauer Bodoni","Bembo","BinnerD","Blackadder ITC","Bodoni MT","Bradley Hand ITC","Braggadocio","Bremen Bd BT","Brush Script MT","CG Omega","CG Times","Calibri","Californian FB","Calligrapher","Cambria","Candara","CaslonOpnface BT","Castellar","Casual","Century","Century Gothic","Century Schoolbook","Cezanne","Charlesworth","Chaucer","Clarendon","CloisterBlack BT","Cochin","Colonna MT","Comic Sans","CopperplGoth Bd BT","Copperplate Gothic","Cornerstone","Courier New Greek","Curlz MT","DB LCD Temp","Didot","DilleniaUPC","DotumChe","Elephant","English 111 Vivace BT","Engravers MT","EngraversGothic BT","Eras Demi ITC","Estrangelo Edessa","Euphemia UCAS","Exotc350 Bd BT","FONTIN","Fixedsys","FrankRuehl","Freefrm721 Blk BT","Futura","Futura Lt BT","GOTHAM","Gabriola","GeoSlab 703 XBd BT","Geometr231 Lt BT","Georgia","Gill Sans MT","Gisha","Goudy Stout","GoudyHandtooled BT","Gujarati Sangam MN","Gulim","Gungsuh","GungsuhChe","Haettenschweiler","Harrington","Hei S","Heisei Kaku Gothic","Heiti SC","Heiti TC","Helvetica","Helvetica Neue","Herald","Humanst 521 Cn BT","Incised901 Bd BT","Iskoola Pota","JasmineUPC","Jazz LET","Jenson","Jester","Jokerman","Juice ITC","Kailasa","Kalinga","Kannada Sangam MN","Kartika","Kaufmann BT","Kaufmann Bd BT","Kino MT","KodchiangUPC","Korinna BT","Kozuka Gothic Pr6N","Kristen ITC","Krungthep","Lao UI","Letter Gothic","Levenim MT","LilyUPC","Lithograph","Loma","Lucida Handwriting","Lucida Sans Unicode","MS LineDraw","MS Outlook","MS PMincho","MS Sans Serif","MS UI Gothic","MT Extra","MV Boli","MYRIAD PRO","Maiandra GD","Malayalam Sangam MN","Marion","Marker Felt","Matisse ITC","Matura MT Script Capitals","Microsoft Himalaya","Microsoft JhengHei","Microsoft New Tai Lue","Microsoft Sans Serif","Microsoft Tai Le","Microsoft YaHei","Microsoft Yi Baiti","MingLiU-ExtB","MingLiU_HKSCS-ExtB","Minion Pro","Miriam","Mistral","Modern","Mongolian Baiti","MoolBoran","Mrs Eaves","NSimSun","Nadeem","Narkisim","News Gothic MT","Niagara Engraved","Niagara Solid","Noteworthy","OCR A Extended","Onyx BT","OzHandicraft BT","PMingLiU-ExtB","PRINCETOWN LET","PTBarnum BT","Palace Script MT","Palatino Linotype","Papyrus","Party LET","Plantagenet Cherokee","Playbill","Poor Richard","PosterBodoni BT","Pythagoras","Rachana","Ravie","Ribbon131 Bd BT","Rod","Santa Fe LET","Sceptre","Segoe Print","Segoe UI","Serifa","ShelleyVolante BT","Sherwood","Shonar Bangla","Skia","Small Fonts","Snap ITC","Snell Roundhand","Souvenir Lt BT","Staccato222 BT","Steamer","Storybook","Subway","Sylfaen","Tahoma","Tamil Sangam MN","Telugu Sangam MN","Terminal","Times New Roman","Times New Roman CE","Times New Roman Greek","Times New Roman TUR","TlwgMono","Traditional Arabic","Trajan","Tristan","Umpush","Univers","Utsaah","Vagabond","Vani","Verdana","Vijaya","VisualUI","WHITNEY","Webdings","ZWAdobeF","ZapfEllipt BT","ZapfHumnst BT","ZapfHumnst Dm BT","Zapfino","Zurich Ex BT"];*/
			var installedFontsArray = [];

			for (var i = 0; i < fontArray.length; i++) {
				if (fontDetective.detect(fontArray[i])) {
					installedFontsArray.push(fontArray[i]);
				}
			}

            //console.log(installedFontsArray.join(", "))
			
            return resolve(installedFontsArray.join("~"));
		});
	});

})(window);
/*
 * Original Source: https://github.com/Song-Li/cross_browser/blob/master/client/fingerprint/js/languageDetector.js
 * Copyright: Yinzhi Cao, Song Li, Erik Wijmans
 * License: GNU v3
 * Changes:
 *  - Icreased font size
 *  - Use span + inline styles for measurement div
 *  - Inserted comments
 *  - Wrapped in an ImprintJs promise
 */

/* 
	This test renders to a canvas a whole bunch of words in 36 different
	alphabets to test which alphabets the user has installed on their computer.
	The words are kept in the 2D array called codes in their UTF-16 format
	to ensure that they aren't interpreted before it is time to render them
	The 37th string in codes is a single character that we are hoping will
	always show up as a cannot be displayed character.

	While wether the alphabet can be displayed or not is deteremined by the
	operating system, the symbol used to represent cannot be displayed is
	deteremined by the browser.  However, it does seem like it is always some
	sort of box
*/

(function(scope){

	'use strict';

	var LanguageDetector, safeParseJSON;

	safeParseJSON = function(s) {
		try {
		return JSON.parse(s);
		} catch (error) {
		return false;
		}
	};

	LanguageDetector = (function() {
		function LanguageDetector() {
			this.names = safeParseJSON('[ "Latin", "Chinese", "Arabic", "Devanagari", "Cyrillic", "Bengali/Assamese", "Kana", "Gurmukhi", "Javanese", "Hangul", "Telugu", "Tamil", "Malayalam", "Burmese", "Thai", "Sundanese", "Kannada", "Gujarati", "Lao", "Odia", "Ge-ez", "Sinhala", "Armenian", "Khmer", "Greek", "Lontara", "Hebrew", "Tibetan", "Georgian", "Modern Yi", "Mongolian", "Tifinagh", "Syriac", "Thaana", "Inuktitut", "Cherokee" ]');
			this.codes = safeParseJSON("[[76,97,116,105,110], [27721,23383], [1575,1604,1593,1585,1576,1610,1577], [2342,2375,2357,2344,2366,2327,2352,2368], [1050,1080,1088,1080,1083,1080,1094,1072], [2476,2494,2434,2482,2494,32,47,32,2437,2488,2478,2496,2479,2492,2494], [20206,21517], [2583,2625,2608,2606,2625,2582,2624], [43415,43438], [54620,44544], [3108,3142,3122,3137,3095,3137], [2980,2990,3007,2996,3021], [3374,3378,3375,3390,3379,3330], [4121,4156,4116,4154,4121,4140], [3652,3607,3618], [7070,7077,7060,7082,7059], [3221,3240,3277,3240,3233], [2711,2753,2716,2736,2750,2724,2752], [3749,3762,3751], [2825,2852,2893,2837,2867], [4877,4821,4829], [3523,3538,3458,3524,3517], [1344,1377,1397,1400,1409], [6017,6098,6040,6082,6042], [917,955,955,951,957,953,954,972], [6674,6682,6664,6673], [1488,1500,1508,1489,1497,1514], [3926,3964,3921,3851], [4325,4304,4320,4311,4323,4314,4312], [41352,41760], [6190,6179,6185,6189,6179,6191], [11612,11593,11580,11593,11599,11568,11606], [1808,1834,1825,1821,1808], [1931,1960,1928,1964,1920,1960], [5123,5316,5251,5198,5200,5222], [5091,5043,5033], [55295, 7077]]");
			this.fontSize = 401;
			this.fontFace = "Verdana";
			this.extraHeigth = 15;
			this.res = [];
		}

		LanguageDetector.prototype.begin = function() {
			var c, code, h, height, i, j, k, l, len, len1, len2, len3, len4, len5, len6, len7, m, n, o, p, ref, ref1, ref2, ref3, round, s, w, width;
			round = 0;
			this.widths = [];
			this.heights = [];
			this.support = [];
			this.test_div = document.createElement("div");
			document.body.appendChild(this.test_div);
			this.test_div.id = "WritingTest";
			ref = this.codes;
			for (i = 0, len = ref.length; i < len; i++) {
				code = ref[i];
				this.height = [];
				this.width = [];
				this.div = document.createElement("div");
				this.test_div.appendChild(this.div);
				round += 1;
				this.div.id = round;
				this.div.style.display = "inline-block";
				for (j = 0, len1 = code.length; j < len1; j++) {
					c = code[j];
					this.div.innerHTML = "<span style = 'font-family:" + this.fontFace + "; font-size:" + this.fontSize + "px;'>&#" + c + "</span>";
					this.height.push(document.getElementById(round).clientHeight);
					this.width.push(document.getElementById(round).clientWidth);
				}
				this.div.innerHTML = "";
				for (k = 0, len2 = code.length; k < len2; k++) {
					c = code[k];
					this.div.innerHTML += "<span style = 'font-family:" + this.fontFace + "; font-size:" + this.fontSize + "px;'>&#" + c + "</span>";
				}
				this.test_div.innerHTML += this.height + ";" + this.width + "<br>";
				this.heights.push(this.height);
				this.widths.push(this.width);
			}

			// standard width
			// maybe with a circle
			this.tw = this.widths.pop();
			this.sw1 = this.tw[0];
			this.sw2 = this.tw[1];

			// Standard height
			this.sh = this.heights.pop()[0];

			// Check the height
			ref1 = this.heights;
			for (l = 0, len3 = ref1.length; l < len3; l++) {
				height = ref1[l];
				this.passed = 0;
				for (m = 0, len4 = height.length; m < len4; m++) {
					h = height[m];
					if (h !== this.sh) {
						this.support.push(true);
						this.passed = 1;
						break; 
					}
				}
				if (this.passed === 0) {
					this.support.push(false);
				}
			}

			// Check the width
			this.writing_scripts_index = 0;
			ref2 = this.widths;
			for (n = 0, len5 = ref2.length; n < len5; n++) {
				width = ref2[n];
				for (o = 0, len6 = width.length; o < len6; o++) {
					w = width[o];
					if (this.support[this.writing_scripts_index] === false) {
						if (w !== this.sw1 && w !== this.sw2) {
							this.support[this.writing_scripts_index] = true;
						}
					}
				}
				this.writing_scripts_index += 1;
			}

			this.res = [];
			this.writing_scripts_index = 0;
			ref3 = this.support;
			for (p = 0, len7 = ref3.length; p < len7; p++) {
				s = ref3[p];
				this.test_div.innerHTML += this.names[this.writing_scripts_index] + ": " + s + " <br>";
				if (s === true) {
					this.res.push(this.names[this.writing_scripts_index]);
				}
				this.writing_scripts_index += 1;
			}
			this.test_div.remove();
			return this.res;
		};

		return LanguageDetector;

	})();

	imprint.registerTest("installedLanguages", function(){
		return new Promise(function(resolve) {
			try 
			{
				var detector = new LanguageDetector();
				return resolve(detector.begin().join("~"));
			} 
			catch (e) 
			{
				return resolve("");
			}
		});
	});

})(window);
(function(scope){

	'use strict';

	imprint.registerTest("language", function(){
		return new Promise(function(resolve) {
			return resolve(navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || "");
		});
	});

})(window);
(function(scope){

	'use strict';

	imprint.registerTest("localIp", function(){
		return new Promise(function(resolve) {
			try 
			{
				var RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;   //compatibility for firefox and chrome
				var pc = new RTCPeerConnection({iceServers:[]}), noop = function(){};      
				pc.createDataChannel("");    //create a bogus data channel
				pc.createOffer(pc.setLocalDescription.bind(pc), noop);    // create offer and set local description
				pc.onicecandidate = function(ice) //listen for candidate events
				{  
					pc.onicecandidate = noop;

					if(!ice || !ice.candidate || !ice.candidate.candidate)  
					{
						return resolve("");
					} 

					var val = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
					return resolve(val);			
				};
			} 
			catch (e) 
			{
				return resolve("");
			}
		});
	});

})(window);
(function(scope){

	'use strict';

	imprint.registerTest("localStorage", function(){
		return new Promise(function(resolve) {
			try 
			{
				return resolve(!!window.localStorage);
			} 
			catch (e) 
			{
				return resolve(true); // SecurityError when referencing it means it exists
			}
		});
	});

})(window);
(function(scope){

	'use strict';

	imprint.registerTest("mediaDevices", function(){
		return new Promise(function(resolve) {

			if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
			  return resolve(cd || "");
			}

			navigator.mediaDevices.enumerateDevices()
				.then(function(devices) {
					var results = devices.map(function(device){
						return device.kind + ":" + device.label + " id = " + device.deviceId;
					});
					return resolve(results.join(","));
				})
				.catch(function(err) {
					return resolve("");
				});		
		});
	});

})(window);

(function(scope){

	'use strict';

	imprint.registerTest("pixelRatio", function(){
		return new Promise(function(resolve) {
			return resolve(window.devicePixelRatio || "");
		});
	});

})(window);
(function(scope){

	'use strict';

	imprint.registerTest("platform", function(){
		return new Promise(function(resolve) {
			return resolve(navigator.platform || "");
		});
	});

})(window);
/*
 * Original Source: https://github.com/Valve/fingerprintjs2/blob/master/fingerprint2.js
 * Copyright: Valentin Vasilyev (valentin.vasilyev@outlook.com)
 * License: MIT
 * Changes:
 *  - Wrapped in an ImprintJs promise
 */

(function(scope){

	'use strict';

	imprint.registerTest("plugins", function(){
		return new Promise(function(resolve) {
			
			var results = [];

			// IE
			if((Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, "ActiveXObject")) || ("ActiveXObject" in window)) 
			{
				var names = [
					"AcroPDF.PDF", // Adobe PDF reader 7+
					"Adodb.Stream",
					"AgControl.AgControl", // Silverlight
					"DevalVRXCtrl.DevalVRXCtrl.1",
					"MacromediaFlashPaper.MacromediaFlashPaper",
					"Msxml2.DOMDocument",
					"Msxml2.XMLHTTP",
					"PDF.PdfCtrl", // Adobe PDF reader 6 and earlier, brrr
					"QuickTime.QuickTime", // QuickTime
					"QuickTimeCheckObject.QuickTimeCheck.1",
					"RealPlayer",
					"RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)",
					"RealVideo.RealVideo(tm) ActiveX Control (32-bit)",
					"Scripting.Dictionary",
					"SWCtl.SWCtl", // ShockWave player
					"Shell.UIHelper",
					"ShockwaveFlash.ShockwaveFlash", //flash plugin
					"Skype.Detection",
					"TDCCtl.TDCCtl",
					"WMPlayer.OCX", // Windows media player
					"rmocx.RealPlayer G2 Control",
					"rmocx.RealPlayer G2 Control.1"
				];

				// starting to detect plugins in IE
				results = names.map(function(name) 
				{
					try 
					{
						new ActiveXObject(name); // eslint-disable-no-new
						return name;
					} 
					catch(e) 
					{
						return null;
					}
				});

			}

			// None IE
			if(navigator.plugins) {

				var plugins = [];

				for(var i = 0, l = navigator.plugins.length; i < l; i++) {
					plugins.push(navigator.plugins[i]);
				}

				// sorting plugins only for those user agents, that we know randomize the plugins
				// every time we try to enumerate them
				if(navigator.userAgent.match(/palemoon/i)) {
					plugins = plugins.sort(function(a, b) {
						if(a.name > b.name){ return 1; }
						if(a.name < b.name){ return -1; }
						return 0;
					});
				}

				var t = plugins.map(function (p) {
					var mimeTypes = [];
					for(var i = 0; i < p.length; i++){
						var mt = p[i];
						mimeTypes.push([mt.type, mt.suffixes].join("~"));
					}
					results.push([p.name, p.description, mimeTypes.join(",")].join("::"));
				});
			}

			return resolve(results.join("~"));

		});
	});

})(window);

(function(scope){

	'use strict';

	imprint.registerTest("processorCores", function(){
		return new Promise(function(resolve) {
			return resolve(navigator.hardwareConcurrency);
		});
	});

})(window);

(function(scope){

	'use strict';

	imprint.registerTest("publicIp", function(){
		return new Promise(function(resolve) {
			var xmlHttp = new XMLHttpRequest();
			xmlHttp.onreadystatechange = function() { 
				if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
					resolve(xmlHttp.responseText);
			}
			xmlHttp.open("GET", "https://api.ipify.org", true); // true for asynchronous 
			xmlHttp.send(null);	
		});
	});

})(window);
(function(scope){

	'use strict';

	imprint.registerTest("screenResolution", function(){
		return new Promise(function(resolve) {
			var val = (screen.height > screen.width) 
				? [screen.height, screen.width] 
				: [screen.width, screen.height];
			return resolve(val.join("x"));
		});
	});

})(window);

(function(scope){

	'use strict';

	imprint.registerTest("sessionStorage", function(){
		return new Promise(function(resolve) {
			try 
			{
				return resolve(!!window.sessionStorage);
			} 
			catch (e) 
			{
				return resolve(true); // SecurityError when referencing it means it exists
			}
		});
	});

})(window);
(function(scope){

	'use strict';

	imprint.registerTest("timezoneOffset", function(){
		return new Promise(function(resolve) {
			return resolve(new Date().getTimezoneOffset());
		});
	});

})(window);
(function(scope){

	'use strict';

	imprint.registerTest("touchSupport", function(){
		return new Promise(function(resolve) {
			
			var maxTouchPoints = 0;
			var touchEvent = false;

			if (typeof navigator.maxTouchPoints !== "undefined") 
			{
				maxTouchPoints = navigator.maxTouchPoints;
			} 
			else if (typeof navigator.msMaxTouchPoints !== "undefined") 
			{
				maxTouchPoints = navigator.msMaxTouchPoints;
			}

			try 
			{
				document.createEvent("TouchEvent");
				touchEvent = true;
			} 
			catch(e) 
			{ 
				/* squelch */ 
			}

			var touchStart = "ontouchstart" in window;

			return resolve([maxTouchPoints, touchEvent, touchStart].join("~"));

		});
	});

})(window);
(function(scope){

	'use strict';

	imprint.registerTest("userAgent", function(){
		return new Promise(function(resolve) {
			return resolve(navigator.userAgent);
		});
	});

})(window);
/*
 * Original Source: https://github.com/Valve/fingerprintjs2/blob/master/fingerprint2.js
 * Copyright: Valentin Vasilyev (valentin.vasilyev@outlook.com)
 * License: MIT
 * Changes:
 *  - Wrapped in an ImprintJs promise
 */

(function(scope){

	'use strict';

	imprint.registerTest("webGl", function(){
		return new Promise(function(resolve) {
			try 
			{
				var fa2s = function(fa) {
					gl.clearColor(0.0, 0.0, 0.0, 1.0);
					gl.enable(gl.DEPTH_TEST);
					gl.depthFunc(gl.LEQUAL);
					gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
					return "[" + fa[0] + ", " + fa[1] + "]";
				};
				var maxAnisotropy = function(gl) {
				var anisotropy, ext = gl.getExtension("EXT_texture_filter_anisotropic") || gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || gl.getExtension("MOZ_EXT_texture_filter_anisotropic");
					return ext ? (anisotropy = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT), 0 === anisotropy && (anisotropy = 2), anisotropy) : null;
				};

				var canvas = document.createElement("canvas");
				var gl = null;

				try 
				{
					gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
				} 
				catch(e) 
				{ 
					/* squelch */ 
				}

				if(!gl) 
					return resolve("");

				// WebGL fingerprinting is a combination of techniques, found in MaxMind antifraud script & Augur fingerprinting.
				// First it draws a gradient object with shaders and convers the image to the Base64 string.
				// Then it enumerates all WebGL extensions & capabilities and appends them to the Base64 string, resulting in a huge WebGL string, potentially very unique on each device
				// Since iOS supports webgl starting from version 8.1 and 8.1 runs on several graphics chips, the results may be different across ios devices, but we need to verify it.
				var result = [];
				var vShaderTemplate = "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}";
				var fShaderTemplate = "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}";
				var vertexPosBuffer = gl.createBuffer();
				gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
				
				var vertices = new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .732134444, 0]);
				gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
				vertexPosBuffer.itemSize = 3;
				vertexPosBuffer.numItems = 3;
				
				var program = gl.createProgram(), vshader = gl.createShader(gl.VERTEX_SHADER);
				gl.shaderSource(vshader, vShaderTemplate);
				gl.compileShader(vshader);
				
				var fshader = gl.createShader(gl.FRAGMENT_SHADER);
				gl.shaderSource(fshader, fShaderTemplate);
				gl.compileShader(fshader);
				gl.attachShader(program, vshader);
				gl.attachShader(program, fshader);
				gl.linkProgram(program);
				gl.useProgram(program);
				program.vertexPosAttrib = gl.getAttribLocation(program, "attrVertex");
				program.offsetUniform = gl.getUniformLocation(program, "uniformOffset");
				gl.enableVertexAttribArray(program.vertexPosArray);
				gl.vertexAttribPointer(program.vertexPosAttrib, vertexPosBuffer.itemSize, gl.FLOAT, !1, 0, 0);
				gl.uniform2f(program.offsetUniform, 1, 1);
				gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexPosBuffer.numItems);

				if (gl.canvas != null) 
				{ 
					result.push(gl.canvas.toDataURL()); 
				}

				result.push("extensions:" + gl.getSupportedExtensions().join(";"));
				result.push("webgl aliased line width range:" + fa2s(gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE)));
				result.push("webgl aliased point size range:" + fa2s(gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)));
				result.push("webgl alpha bits:" + gl.getParameter(gl.ALPHA_BITS));
				result.push("webgl antialiasing:" + (gl.getContextAttributes().antialias ? "yes" : "no"));
				result.push("webgl blue bits:" + gl.getParameter(gl.BLUE_BITS));
				result.push("webgl depth bits:" + gl.getParameter(gl.DEPTH_BITS));
				result.push("webgl green bits:" + gl.getParameter(gl.GREEN_BITS));
				result.push("webgl max anisotropy:" + maxAnisotropy(gl));
				result.push("webgl max combined texture image units:" + gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS));
				result.push("webgl max cube map texture size:" + gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE));
				result.push("webgl max fragment uniform vectors:" + gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS));
				result.push("webgl max render buffer size:" + gl.getParameter(gl.MAX_RENDERBUFFER_SIZE));
				result.push("webgl max texture image units:" + gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS));
				result.push("webgl max texture size:" + gl.getParameter(gl.MAX_TEXTURE_SIZE));
				result.push("webgl max varying vectors:" + gl.getParameter(gl.MAX_VARYING_VECTORS));
				result.push("webgl max vertex attribs:" + gl.getParameter(gl.MAX_VERTEX_ATTRIBS));
				result.push("webgl max vertex texture image units:" + gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS));
				result.push("webgl max vertex uniform vectors:" + gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS));
				result.push("webgl max viewport dims:" + fa2s(gl.getParameter(gl.MAX_VIEWPORT_DIMS)));
				result.push("webgl red bits:" + gl.getParameter(gl.RED_BITS));
				result.push("webgl renderer:" + gl.getParameter(gl.RENDERER));
				result.push("webgl shading language version:" + gl.getParameter(gl.SHADING_LANGUAGE_VERSION));
				result.push("webgl stencil bits:" + gl.getParameter(gl.STENCIL_BITS));
				result.push("webgl vendor:" + gl.getParameter(gl.VENDOR));
				result.push("webgl version:" + gl.getParameter(gl.VERSION));

				try 
				{
					// Add the unmasked vendor and unmasked renderer if the debug_renderer_info extension is available
					var extensionDebugRendererInfo = gl.getExtension("WEBGL_debug_renderer_info");
					if (extensionDebugRendererInfo) 
					{
						result.push("webgl unmasked vendor:" + gl.getParameter(extensionDebugRendererInfo.UNMASKED_VENDOR_WEBGL));
						result.push("webgl unmasked renderer:" + gl.getParameter(extensionDebugRendererInfo.UNMASKED_RENDERER_WEBGL));
					}
				} 
				catch(e) 
				{ 
					/* squelch */ 
				}
				
				if (!gl.getShaderPrecisionFormat) 
					return resolve(result.join("~"));

				result.push("webgl vertex shader high float precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT ).precision);
				result.push("webgl vertex shader high float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT ).rangeMin);
				result.push("webgl vertex shader high float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT ).rangeMax);
				result.push("webgl vertex shader medium float precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT ).precision);
				result.push("webgl vertex shader medium float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT ).rangeMin);
				result.push("webgl vertex shader medium float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT ).rangeMax);
				result.push("webgl vertex shader low float precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT ).precision);
				result.push("webgl vertex shader low float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT ).rangeMin);
				result.push("webgl vertex shader low float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT ).rangeMax);
				result.push("webgl fragment shader high float precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT ).precision);
				result.push("webgl fragment shader high float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT ).rangeMin);
				result.push("webgl fragment shader high float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT ).rangeMax);
				result.push("webgl fragment shader medium float precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT ).precision);
				result.push("webgl fragment shader medium float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT ).rangeMin);
				result.push("webgl fragment shader medium float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT ).rangeMax);
				result.push("webgl fragment shader low float precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT ).precision);
				result.push("webgl fragment shader low float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT ).rangeMin);
				result.push("webgl fragment shader low float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT ).rangeMax);
				result.push("webgl vertex shader high int precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_INT ).precision);
				result.push("webgl vertex shader high int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_INT ).rangeMin);
				result.push("webgl vertex shader high int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_INT ).rangeMax);
				result.push("webgl vertex shader medium int precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_INT ).precision);
				result.push("webgl vertex shader medium int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_INT ).rangeMin);
				result.push("webgl vertex shader medium int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_INT ).rangeMax);
				result.push("webgl vertex shader low int precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_INT ).precision);
				result.push("webgl vertex shader low int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_INT ).rangeMin);
				result.push("webgl vertex shader low int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_INT ).rangeMax);
				result.push("webgl fragment shader high int precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT ).precision);
				result.push("webgl fragment shader high int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT ).rangeMin);
				result.push("webgl fragment shader high int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT ).rangeMax);
				result.push("webgl fragment shader medium int precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT ).precision);
				result.push("webgl fragment shader medium int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT ).rangeMin);
				result.push("webgl fragment shader medium int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT ).rangeMax);
				result.push("webgl fragment shader low int precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT ).precision);
				result.push("webgl fragment shader low int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT ).rangeMin);
				result.push("webgl fragment shader low int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT ).rangeMax);
				
				return resolve(result.join("~"));
			} 
			catch (e) 
			{
				return resolve("");
			}
		});
	});

})(window);
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
	})
}

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
}

/**
 * Should we use cookies for tracking
 * @returns {boolean}
 */
let burst_use_cookies = () => {
	if ( !navigator.cookieEnabled ) return false; // cookies blocked by browser
	if ( burst_cookieless_option == '1' && window.burst_enable_cookieless_tracking == '1' ) return false; // cookieless is enabled by user or consent plugin
	return true; // cookies are enabled
}

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
}

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
}

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
				obj.uid = cookie_uid
				obj.first_time_visit = false;
				resolve( obj )
			}).catch( () => {
				// if no cookie, generate a uid and set it
				obj.uid  = burst_generate_uid();
				obj.first_time_visit = true;
				burst_set_cookie('burst_uid', obj.uid);
				resolve( obj )
			})
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
			})
		}
	})
}

/**
 * Generate a fingerprint
 * @returns {Promise}
 */
const burst_fingerprint = () => {
	return new Promise( (resolve, reject) => {
		// Imprint library
		!function(e){function t(){}function r(e,t){return function(){e.apply(t,arguments)}}function i(e){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],u(e,this)}function n(e,t){for(;3===e._state;)e=e._value;return 0===e._state?void e._deferreds.push(t):(e._handled=!0,void i._immediateFn(function(){var r=1===e._state?t.onFulfilled:t.onRejected;if(null===r)return void(1===e._state?a:o)(t.promise,e._value);var i;try{i=r(e._value)}catch(e){return void o(t.promise,e)}a(t.promise,i)}))}function a(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var n=t.then;if(t instanceof i)return e._state=3,e._value=t,void s(e);if("function"==typeof n)return void u(r(n,t),e)}e._state=1,e._value=t,s(e)}catch(t){o(e,t)}}function o(e,t){e._state=2,e._value=t,s(e)}function s(e){2===e._state&&0===e._deferreds.length&&i._immediateFn(function(){e._handled||i._unhandledRejectionFn(e._value)});for(var t=0,r=e._deferreds.length;t<r;t++)n(e,e._deferreds[t]);e._deferreds=null}function c(e,t,r){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=r}function u(e,t){var r=!1;try{e(function(e){r||(r=!0,a(t,e))},function(e){r||(r=!0,o(t,e))})}catch(e){if(r)return;r=!0,o(t,e)}}var h=setTimeout;i.prototype.catch=function(e){return this.then(null,e)},i.prototype.then=function(e,r){var i=new this.constructor(t);return n(this,new c(e,r,i)),i},i.all=function(e){var t=Array.prototype.slice.call(e);return new i(function(e,r){function i(a,o){try{if(o&&("object"==typeof o||"function"==typeof o)){var s=o.then;if("function"==typeof s)return void s.call(o,function(e){i(a,e)},r)}t[a]=o,0==--n&&e(t)}catch(e){r(e)}}if(0===t.length)return e([]);for(var n=t.length,a=0;a<t.length;a++)i(a,t[a])})},i.resolve=function(e){return e&&"object"==typeof e&&e.constructor===i?e:new i(function(t){t(e)})},i.reject=function(e){return new i(function(t,r){r(e)})},i.race=function(e){return new i(function(t,r){for(var i=0,n=e.length;i<n;i++)e[i].then(t,r)})},i._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){h(e,0)},i._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},i._setImmediateFn=function(e){i._immediateFn=e},i._setUnhandledRejectionFn=function(e){i._unhandledRejectionFn=e},"undefined"!=typeof module&&module.exports?module.exports=i:e.Promise||(e.Promise=i)}(this),function(e,t){function r(e,t){return(65535&e)*t+(((e>>>16)*t&65535)<<16)}function i(e,t){return e<<t|e>>>32-t}function n(e){return e=r(e^e>>>16,2246822507),e^=e>>>13,e=r(e,3266489909),e^=e>>>16}function a(e,t){e=[e[0]>>>16,65535&e[0],e[1]>>>16,65535&e[1]],t=[t[0]>>>16,65535&t[0],t[1]>>>16,65535&t[1]];var r=[0,0,0,0];return r[3]+=e[3]+t[3],r[2]+=r[3]>>>16,r[3]&=65535,r[2]+=e[2]+t[2],r[1]+=r[2]>>>16,r[2]&=65535,r[1]+=e[1]+t[1],r[0]+=r[1]>>>16,r[1]&=65535,r[0]+=e[0]+t[0],r[0]&=65535,[r[0]<<16|r[1],r[2]<<16|r[3]]}function o(e,t){e=[e[0]>>>16,65535&e[0],e[1]>>>16,65535&e[1]],t=[t[0]>>>16,65535&t[0],t[1]>>>16,65535&t[1]];var r=[0,0,0,0];return r[3]+=e[3]*t[3],r[2]+=r[3]>>>16,r[3]&=65535,r[2]+=e[2]*t[3],r[1]+=r[2]>>>16,r[2]&=65535,r[2]+=e[3]*t[2],r[1]+=r[2]>>>16,r[2]&=65535,r[1]+=e[1]*t[3],r[0]+=r[1]>>>16,r[1]&=65535,r[1]+=e[2]*t[2],r[0]+=r[1]>>>16,r[1]&=65535,r[1]+=e[3]*t[1],r[0]+=r[1]>>>16,r[1]&=65535,r[0]+=e[0]*t[3]+e[1]*t[2]+e[2]*t[1]+e[3]*t[0],r[0]&=65535,[r[0]<<16|r[1],r[2]<<16|r[3]]}function s(e,t){return 32===(t%=64)?[e[1],e[0]]:32>t?[e[0]<<t|e[1]>>>32-t,e[1]<<t|e[0]>>>32-t]:(t-=32,[e[1]<<t|e[0]>>>32-t,e[0]<<t|e[1]>>>32-t])}function c(e,t){return t%=64,0===t?e:32>t?[e[0]<<t|e[1]>>>32-t,e[1]<<t]:[e[1]<<t-32,0]}function u(e,t){return[e[0]^t[0],e[1]^t[1]]}function h(e){return e=u(e,[0,e[0]>>>1]),e=o(e,[4283543511,3981806797]),e=u(e,[0,e[0]>>>1]),e=o(e,[3301882366,444984403]),e=u(e,[0,e[0]>>>1])}var d={version:"2.1.2",x86:{},x64:{}};d.x86.hash32=function(e,t){e=e||"";for(var a=e.length%4,o=e.length-a,s=t||0,c=0,u=0;u<o;u+=4)c=255&e.charCodeAt(u)|(255&e.charCodeAt(u+1))<<8|(255&e.charCodeAt(u+2))<<16|(255&e.charCodeAt(u+3))<<24,c=r(c,3432918353),c=i(c,15),c=r(c,461845907),s^=c,s=i(s,13),s=r(s,5)+3864292196;switch(c=0,a){case 3:c^=(255&e.charCodeAt(u+2))<<16;case 2:c^=(255&e.charCodeAt(u+1))<<8;case 1:c^=255&e.charCodeAt(u),c=r(c,3432918353),c=i(c,15),c=r(c,461845907),s^=c}return s^=e.length,(s=n(s))>>>0},d.x86.hash128=function(e,t){e=e||"",t=t||0;for(var a=e.length%16,o=e.length-a,s=t,c=t,u=t,h=t,d=0,l=0,g=0,m=0,f=0;f<o;f+=16)d=255&e.charCodeAt(f)|(255&e.charCodeAt(f+1))<<8|(255&e.charCodeAt(f+2))<<16|(255&e.charCodeAt(f+3))<<24,l=255&e.charCodeAt(f+4)|(255&e.charCodeAt(f+5))<<8|(255&e.charCodeAt(f+6))<<16|(255&e.charCodeAt(f+7))<<24,g=255&e.charCodeAt(f+8)|(255&e.charCodeAt(f+9))<<8|(255&e.charCodeAt(f+10))<<16|(255&e.charCodeAt(f+11))<<24,m=255&e.charCodeAt(f+12)|(255&e.charCodeAt(f+13))<<8|(255&e.charCodeAt(f+14))<<16|(255&e.charCodeAt(f+15))<<24,d=r(d,597399067),d=i(d,15),d=r(d,2869860233),s^=d,s=i(s,19),s+=c,s=r(s,5)+1444728091,l=r(l,2869860233),l=i(l,16),l=r(l,951274213),c^=l,c=i(c,17),c+=u,c=r(c,5)+197830471,g=r(g,951274213),g=i(g,17),g=r(g,2716044179),u^=g,u=i(u,15),u+=h,u=r(u,5)+2530024501,m=r(m,2716044179),m=i(m,18),m=r(m,597399067),h^=m,h=i(h,13),h+=s,h=r(h,5)+850148119;switch(m=g=l=d=0,a){case 15:m^=e.charCodeAt(f+14)<<16;case 14:m^=e.charCodeAt(f+13)<<8;case 13:m^=e.charCodeAt(f+12),m=r(m,2716044179),m=i(m,18),m=r(m,597399067),h^=m;case 12:g^=e.charCodeAt(f+11)<<24;case 11:g^=e.charCodeAt(f+10)<<16;case 10:g^=e.charCodeAt(f+9)<<8;case 9:g^=e.charCodeAt(f+8),g=r(g,951274213),g=i(g,17),g=r(g,2716044179),u^=g;case 8:l^=e.charCodeAt(f+7)<<24;case 7:l^=e.charCodeAt(f+6)<<16;case 6:l^=e.charCodeAt(f+5)<<8;case 5:l^=e.charCodeAt(f+4),l=r(l,2869860233),l=i(l,16),l=r(l,951274213),c^=l;case 4:d^=e.charCodeAt(f+3)<<24;case 3:d^=e.charCodeAt(f+2)<<16;case 2:d^=e.charCodeAt(f+1)<<8;case 1:d^=e.charCodeAt(f),d=r(d,597399067),d=i(d,15),d=r(d,2869860233),s^=d}return s^=e.length,c^=e.length,u^=e.length,h^=e.length,s=s+c+u,s+=h,c+=s,u+=s,h+=s,s=n(s),c=n(c),u=n(u),h=n(h),s+=c,s+=u,s+=h,c+=s,u+=s,h+=s,("00000000"+(s>>>0).toString(16)).slice(-8)+("00000000"+(c>>>0).toString(16)).slice(-8)+("00000000"+(u>>>0).toString(16)).slice(-8)+("00000000"+(h>>>0).toString(16)).slice(-8)},d.x64.hash128=function(e,t){e=e||"",t=t||0;for(var r=e.length%16,i=e.length-r,n=[0,t],d=[0,t],l=[0,0],g=[0,0],m=[2277735313,289559509],f=[1291169091,658871167],p=0;p<i;p+=16)l=[255&e.charCodeAt(p+4)|(255&e.charCodeAt(p+5))<<8|(255&e.charCodeAt(p+6))<<16|(255&e.charCodeAt(p+7))<<24,255&e.charCodeAt(p)|(255&e.charCodeAt(p+1))<<8|(255&e.charCodeAt(p+2))<<16|(255&e.charCodeAt(p+3))<<24],g=[255&e.charCodeAt(p+12)|(255&e.charCodeAt(p+13))<<8|(255&e.charCodeAt(p+14))<<16|(255&e.charCodeAt(p+15))<<24,255&e.charCodeAt(p+8)|(255&e.charCodeAt(p+9))<<8|(255&e.charCodeAt(p+10))<<16|(255&e.charCodeAt(p+11))<<24],l=o(l,m),l=s(l,31),l=o(l,f),n=u(n,l),n=s(n,27),n=a(n,d),n=a(o(n,[0,5]),[0,1390208809]),g=o(g,f),g=s(g,33),g=o(g,m),d=u(d,g),d=s(d,31),d=a(d,n),d=a(o(d,[0,5]),[0,944331445]);switch(l=[0,0],g=[0,0],r){case 15:g=u(g,c([0,e.charCodeAt(p+14)],48));case 14:g=u(g,c([0,e.charCodeAt(p+13)],40));case 13:g=u(g,c([0,e.charCodeAt(p+12)],32));case 12:g=u(g,c([0,e.charCodeAt(p+11)],24));case 11:g=u(g,c([0,e.charCodeAt(p+10)],16));case 10:g=u(g,c([0,e.charCodeAt(p+9)],8));case 9:g=u(g,[0,e.charCodeAt(p+8)]),g=o(g,f),g=s(g,33),g=o(g,m),d=u(d,g);case 8:l=u(l,c([0,e.charCodeAt(p+7)],56));case 7:l=u(l,c([0,e.charCodeAt(p+6)],48));case 6:l=u(l,c([0,e.charCodeAt(p+5)],40));case 5:l=u(l,c([0,e.charCodeAt(p+4)],32));case 4:l=u(l,c([0,e.charCodeAt(p+3)],24));case 3:l=u(l,c([0,e.charCodeAt(p+2)],16));case 2:l=u(l,c([0,e.charCodeAt(p+1)],8));case 1:l=u(l,[0,e.charCodeAt(p)]),l=o(l,m),l=s(l,31),l=o(l,f),n=u(n,l)}return n=u(n,[0,e.length]),d=u(d,[0,e.length]),n=a(n,d),d=a(d,n),n=h(n),d=h(d),n=a(n,d),d=a(d,n),("00000000"+(n[0]>>>0).toString(16)).slice(-8)+("00000000"+(n[1]>>>0).toString(16)).slice(-8)+("00000000"+(d[0]>>>0).toString(16)).slice(-8)+("00000000"+(d[1]>>>0).toString(16)).slice(-8)},"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=d),exports.murmurHash3=d):"function"==typeof define&&define.amd?define([],function(){return d}):(d._murmurHash3=e.murmurHash3,d.noConflict=function(){return e.murmurHash3=d._murmurHash3,d._murmurHash3=t,d.noConflict=t,d},e.murmurHash3=d)}(this),function(e){"use strict";var t={},r=e.imprint||{test:function(e){return Promise.all(e.map(function(e){if(!t.hasOwnProperty(e))throw"No test registered with the alias "+e;return t[e]()})).then(function(e){return murmurHash3.x86.hash128(e.join("~"))})},registerTest:function(e,r){t[e]=r}};"object"==typeof module&&"undefined"!=typeof exports&&(module.exports=imprintJs),e.imprint=r}(window),function(e){"use strict";imprint.registerTest("adBlocker",function(){return new Promise(function(e){var t=document.createElement("div");t.innerHTML="&nbsp;",t.className="adsbox",t.style.display="block",t.style.position="absolute",t.style.top="0px",t.style.left="-9999px";try{document.body.appendChild(t),window.setTimeout(function(){var r=0===t.offsetHeight;return document.body.removeChild(t),e(r)},10)}catch(t){return e(!1)}})})}(window),function(e){"use strict";imprint.registerTest("audio",function(){return new Promise(function(e){try{var t=new(window.AudioContext||window.webkitAudioContext),r=(t.createOscillator(),t.createAnalyser(),t.createGain(),t.createScriptProcessor(4096,1,1),t.destination),i=t.sampleRate.toString()+"_"+r.maxChannelCount+"_"+r.numberOfInputs+"_"+r.numberOfOutputs+"_"+r.channelCount+"_"+r.channelCountMode+"_"+r.channelInterpretation;return e(i)}catch(t){return e("")}})})}(window),function(e){"use strict";imprint.registerTest("availableScreenResolution",function(){return new Promise(function(e){return e((screen.availHeight>screen.availWidth?[screen.availHeight,screen.availWidth]:[screen.availWidth,screen.availHeight]).join("x"))})})}(window),function(e){"use strict";imprint.registerTest("canvas",function(){return new Promise(function(e){var t=[],r=document.createElement("canvas");r.width=2e3,r.height=200,r.style.display="inline";var i=r.getContext("2d");return i.rect(0,0,10,10),i.rect(2,2,6,6),t.push("canvas winding:"+(!1===i.isPointInPath(5,5,"evenodd")?"yes":"no")),i.textBaseline="alphabetic",i.fillStyle="#f60",i.fillRect(125,1,62,20),i.fillStyle="#069",i.font="11pt no-real-font-123",i.fillText("Cwm fjordbank glyphs vext quiz, 😃",2,15),i.fillStyle="rgba(102, 204, 0, 0.2)",i.font="18pt Arial",i.fillText("Cwm fjordbank glyphs vext quiz, 😃",4,45),i.globalCompositeOperation="multiply",i.fillStyle="rgb(255,0,255)",i.beginPath(),i.arc(50,50,50,0,2*Math.PI,!0),i.closePath(),i.fill(),i.fillStyle="rgb(0,255,255)",i.beginPath(),i.arc(100,50,50,0,2*Math.PI,!0),i.closePath(),i.fill(),i.fillStyle="rgb(255,255,0)",i.beginPath(),i.arc(75,100,50,0,2*Math.PI,!0),i.closePath(),i.fill(),i.fillStyle="rgb(255,0,255)",i.arc(75,75,75,0,2*Math.PI,!0),i.arc(75,75,25,0,2*Math.PI,!0),i.fill("evenodd"),t.push("canvas fp:"+r.toDataURL()),e(t.join("~"))})})}(window),function(e){"use strict";imprint.registerTest("colorDepth",function(){return new Promise(function(e){var t=screen.colorDepth;return 32===t&&(t=24),e(t||"")})})}(window),function(e){"use strict";imprint.registerTest("cookies",function(){return new Promise(function(e){return e(navigator.cookieEnabled)})})}(window),function(e){"use strict";imprint.registerTest("cpuClass",function(){return new Promise(function(e){return e(navigator.cpuClass||"")})})}(window),function(e){"use strict";imprint.registerTest("deviceDpi",function(){return new Promise(function(e){return e((screen.deviceXDPI||0)+"x"+(screen.deviceYDPI||0))})})}(window),function(e){"use strict";imprint.registerTest("doNotTrack",function(){return new Promise(function(e){return e(navigator.doNotTrack||navigator.msDoNotTrack||window.doNotTrack||"")})})}(window),function(e){"use strict";imprint.registerTest("indexedDb",function(){return new Promise(function(e){try{return e(!!window.indexedDB)}catch(t){return e(!0)}})})}(window);var FontDetector=function(){function e(e){var o=!0;for(var s in t){i.style.fontFamily=e+","+t[s],r.appendChild(i);var c=i.offsetWidth!=n[t[s]]||i.offsetHeight!=a[t[s]];r.removeChild(i),o=o&&c}return o}var t=["monospace","sans-serif","serif"],r=document.getElementsByTagName("body")[0],i=document.createElement("span");i.style.fontSize="201px",i.innerHTML="mmmmmmmmmmlli";var n={},a={};for(var o in t)i.style.fontFamily=t[o],r.appendChild(i),n[t[o]]=i.offsetWidth,a[t[o]]=i.offsetHeight,r.removeChild(i);this.detect=e};!function(e){"use strict";imprint.registerTest("installedFonts",function(){return new Promise(function(e){for(var t=new FontDetector,r=["ADOBE CASLON PRO","ADOBE GARAMOND PRO","AVENIR","Adobe Fangsong Std","Adobe Ming Std","Agency FB","Aharoni","Amazone BT","AngsanaUPC","Antique Olive","Apple Chancery","Apple Color Emoji","Apple SD Gothic Neo","Arab","Arial Baltic","Arial CE","Arial CYR","Arial Greek","Arial MT","Arial Unicode MS","Arrus BT","AvantGarde Bk BT","AvantGarde Md BT","Ayuthaya","Baskerville Old Face","Bell MT","Benguiat Bk BT","Berlin Sans FB","BernhardFashion BT","BernhardMod BT","Big Caslon","Bitstream Vera Sans Mono","Bitstream Vera Serif","BlairMdITC TT","Bodoni 72 Smallcaps","Bodoni MT Poster Compressed","Boulder","Bradley Hand","Broadway","Browallia New","BrowalliaUPC","Calisto MT","Cambria Math","Centaur","Chalkboard","Chalkboard SE","Chalkduster","Charter BT","ChelthmITC Bk BT","Chiller","Comic Sans MS","Constantia","Copperplate","Corbel","Cordia New","CordiaUPC","Coronet","Courier New Baltic","Courier New CE","Courier New CYR","Courier New TUR","Cuckoo","DFKai-SB","DaunPenh","Dauphin","David","DejaVu LGC Sans Mono","Denmark","Desdemona","DokChampa","Dotum","Ebrima","Edwardian Script ITC","Eras Bold ITC","EucrosiaUPC","Euphemia","Eurostile","FRUTIGER","FangSong","Felix Titling","Forte","Fransiscan","FreesiaUPC","French Script MT","FrnkGothITC Bk BT","Fruitger","Futura Bk BT","Futura Md BT","Futura ZBlk BT","FuturaBlack BT","Galliard BT","Garamond","Gautami","Geeza Pro","Geneva","GeoSlab 703 Lt BT","Geometr231 BT","Geometr231 Hv BT","Gigi","Gill Sans","GoudyOLSt BT","GulimChe","GungSeo","Gurmukhi MN","Harlow Solid Italic","Heather","HeiT","High Tower Text","Hiragino Kaku Gothic ProN","Hiragino Mincho ProN","Hiragino Sans GB","Hoefler Text","Humanst521 BT","Humanst521 Lt BT","Impact","Imprint MT Shadow","Incised901 BT","Incised901 Lt BT","Informal Roman","Informal011 BT","IrisUPC","Kabel Bk BT","KacstOne","KaiTi","Khmer UI","Kokila","LUCIDA GRANDE","Latha","Leelawadee","Lohit Gujarati","Long Island","Lucida Calligraphy","Lucida Console","Lucida Sans","Lucida Sans Typewriter","Lydian BT","MS Gothic","MS Mincho","MS PGothic","MS Reference Sans Serif","MS Reference Specialty","MS Serif","MUSEO","MYRIAD","Malgun Gothic","Mangal","Marigold","Market","Marlett","Meiryo","Meiryo UI","Menlo","Microsoft PhagsPa","Microsoft Uighur","MingLiU","MingLiU_HKSCS","Minion","Miriam Fixed","Mona Lisa Solid ITC TT","Monaco","Monotype Corsiva","NEVIS","News Gothic","News GothicMT","NewsGoth BT","Nyala","Old Century","Old English Text MT","Onyx","Oriya Sangam MN","PMingLiU","Palatino","Parchment","Pegasus","Perpetua","Perpetua Titling MT","Pickwick","Poster","Pristina","Raavi","Rage Italic","Rockwell","Roman","Sakkal Majalla","Savoye LET","Sawasdee","Segoe UI Symbol","Serifa BT","Serifa Th BT","Showcard Gothic","Shruti","Signboard","SimHei","SimSun","SimSun-ExtB","Simplified Arabic","Simplified Arabic Fixed","Sinhala Sangam MN","Sketch Rockwell","Socket","Stencil","Styllo","Swis721 BlkEx BT","Swiss911 XCm BT","Symbol","Synchro LET","System","TRAJAN PRO","Technical","Teletype","Tempus Sans ITC","Thonburi","Times","Times New Roman Baltic","Times New Roman CYR","Times New Roman PS","Trebuchet MS","Tubular","Tunga","Tw Cen MT","TypoUpright BT","Ubuntu","Unicorn","Utopia","Viner Hand ITC","Vivaldi","Vrinda","Westminster","Wide Latin","Zurich BlkEx BT"],i=[],n=0;n<r.length;n++)t.detect(r[n])&&i.push(r[n]);return e(i.join("~"))})})}(window),function(e){"use strict";var t,r;r=function(e){try{return JSON.parse(e)}catch(e){return!1}},t=function(){function e(){this.names=r('[ "Latin", "Chinese", "Arabic", "Devanagari", "Cyrillic", "Bengali/Assamese", "Kana", "Gurmukhi", "Javanese", "Hangul", "Telugu", "Tamil", "Malayalam", "Burmese", "Thai", "Sundanese", "Kannada", "Gujarati", "Lao", "Odia", "Ge-ez", "Sinhala", "Armenian", "Khmer", "Greek", "Lontara", "Hebrew", "Tibetan", "Georgian", "Modern Yi", "Mongolian", "Tifinagh", "Syriac", "Thaana", "Inuktitut", "Cherokee" ]'),this.codes=r("[[76,97,116,105,110], [27721,23383], [1575,1604,1593,1585,1576,1610,1577], [2342,2375,2357,2344,2366,2327,2352,2368], [1050,1080,1088,1080,1083,1080,1094,1072], [2476,2494,2434,2482,2494,32,47,32,2437,2488,2478,2496,2479,2492,2494], [20206,21517], [2583,2625,2608,2606,2625,2582,2624], [43415,43438], [54620,44544], [3108,3142,3122,3137,3095,3137], [2980,2990,3007,2996,3021], [3374,3378,3375,3390,3379,3330], [4121,4156,4116,4154,4121,4140], [3652,3607,3618], [7070,7077,7060,7082,7059], [3221,3240,3277,3240,3233], [2711,2753,2716,2736,2750,2724,2752], [3749,3762,3751], [2825,2852,2893,2837,2867], [4877,4821,4829], [3523,3538,3458,3524,3517], [1344,1377,1397,1400,1409], [6017,6098,6040,6082,6042], [917,955,955,951,957,953,954,972], [6674,6682,6664,6673], [1488,1500,1508,1489,1497,1514], [3926,3964,3921,3851], [4325,4304,4320,4311,4323,4314,4312], [41352,41760], [6190,6179,6185,6189,6179,6191], [11612,11593,11580,11593,11599,11568,11606], [1808,1834,1825,1821,1808], [1931,1960,1928,1964,1920,1960], [5123,5316,5251,5198,5200,5222], [5091,5043,5033], [55295, 7077]]"),this.fontSize=401,this.fontFace="Verdana",this.extraHeigth=15,this.res=[]}return e.prototype.begin=function(){var e,t,r,i,n,a,o,s,c,u,h,d,l,g,m,f,p,w,T,A,S,E,_,v,M,C,P;for(v=0,this.widths=[],this.heights=[],this.support=[],this.test_div=document.createElement("div"),document.body.appendChild(this.test_div),this.test_div.id="WritingTest",A=this.codes,i=0,s=A.length;i<s;i++){for(t=A[i],this.height=[],this.width=[],this.div=document.createElement("div"),this.test_div.appendChild(this.div),v+=1,this.div.id=v,this.div.style.display="inline-block",n=0,c=t.length;n<c;n++)e=t[n],this.div.innerHTML="<span style = 'font-family:"+this.fontFace+"; font-size:"+this.fontSize+"px;'>&#"+e+"</span>",this.height.push(document.getElementById(v).clientHeight),this.width.push(document.getElementById(v).clientWidth);for(this.div.innerHTML="",a=0,u=t.length;a<u;a++)e=t[a],this.div.innerHTML+="<span style = 'font-family:"+this.fontFace+"; font-size:"+this.fontSize+"px;'>&#"+e+"</span>";this.test_div.innerHTML+=this.height+";"+this.width+"<br>",this.heights.push(this.height),this.widths.push(this.width)}for(this.tw=this.widths.pop(),this.sw1=this.tw[0],this.sw2=this.tw[1],this.sh=this.heights.pop()[0],S=this.heights,o=0,h=S.length;o<h;o++){for(r=S[o],this.passed=0,f=0,d=r.length;f<d;f++)if(r[f]!==this.sh){this.support.push(!0),this.passed=1;break}0===this.passed&&this.support.push(!1)}for(this.writing_scripts_index=0,E=this.widths,p=0,l=E.length;p<l;p++){for(P=E[p],w=0,g=P.length;w<g;w++)C=P[w],!1===this.support[this.writing_scripts_index]&&C!==this.sw1&&C!==this.sw2&&(this.support[this.writing_scripts_index]=!0);this.writing_scripts_index+=1}for(this.res=[],this.writing_scripts_index=0,_=this.support,T=0,m=_.length;T<m;T++)M=_[T],this.test_div.innerHTML+=this.names[this.writing_scripts_index]+": "+M+" <br>",!0===M&&this.res.push(this.names[this.writing_scripts_index]),this.writing_scripts_index+=1;return this.test_div.remove(),this.res},e}(),imprint.registerTest("installedLanguages",function(){return new Promise(function(e){try{var r=new t;return e(r.begin().join("~"))}catch(t){return e("")}})})}(window),function(e){"use strict";imprint.registerTest("language",function(){return new Promise(function(e){return e(navigator.language||navigator.userLanguage||navigator.browserLanguage||navigator.systemLanguage||"")})})}(window),function(e){"use strict";imprint.registerTest("localIp",function(){return new Promise(function(e){try{var t=window.RTCPeerConnection||window.mozRTCPeerConnection||window.webkitRTCPeerConnection,r=new t({iceServers:[]}),i=function(){};r.createDataChannel(""),r.createOffer(r.setLocalDescription.bind(r),i),r.onicecandidate=function(t){if(r.onicecandidate=i,!t||!t.candidate||!t.candidate.candidate)return e("");var n=/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(t.candidate.candidate)[1];return e(n)}}catch(t){return e("")}})})}(window),function(e){"use strict";imprint.registerTest("localStorage",function(){return new Promise(function(e){try{return e(!!window.localStorage)}catch(t){return e(!0)}})})}(window),function(e){"use strict";imprint.registerTest("mediaDevices",function(){return new Promise(function(e){if(!navigator.mediaDevices||!navigator.mediaDevices.enumerateDevices)return e(cd||"");navigator.mediaDevices.enumerateDevices().then(function(t){var r=t.map(function(e){return e.kind+":"+e.label+" id = "+e.deviceId});return e(r.join(","))}).catch(function(t){return e("")})})})}(window),function(e){"use strict";imprint.registerTest("pixelRatio",function(){return new Promise(function(e){return e(window.devicePixelRatio||"")})})}(window),function(e){"use strict";imprint.registerTest("platform",function(){return new Promise(function(e){return e(navigator.platform||"")})})}(window),function(e){"use strict";imprint.registerTest("plugins",function(){return new Promise(function(e){var t=[];if(Object.getOwnPropertyDescriptor&&Object.getOwnPropertyDescriptor(window,"ActiveXObject")||"ActiveXObject"in window){t=["AcroPDF.PDF","Adodb.Stream","AgControl.AgControl","DevalVRXCtrl.DevalVRXCtrl.1","MacromediaFlashPaper.MacromediaFlashPaper","Msxml2.DOMDocument","Msxml2.XMLHTTP","PDF.PdfCtrl","QuickTime.QuickTime","QuickTimeCheckObject.QuickTimeCheck.1","RealPlayer","RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)","RealVideo.RealVideo(tm) ActiveX Control (32-bit)","Scripting.Dictionary","SWCtl.SWCtl","Shell.UIHelper","ShockwaveFlash.ShockwaveFlash","Skype.Detection","TDCCtl.TDCCtl","WMPlayer.OCX","rmocx.RealPlayer G2 Control","rmocx.RealPlayer G2 Control.1"].map(function(e){try{return new ActiveXObject(e),e}catch(e){return null}})}if(navigator.plugins){for(var r=[],i=0,n=navigator.plugins.length;i<n;i++)r.push(navigator.plugins[i]);navigator.userAgent.match(/palemoon/i)&&(r=r.sort(function(e,t){return e.name>t.name?1:e.name<t.name?-1:0}));r.map(function(e){for(var r=[],i=0;i<e.length;i++){var n=e[i];r.push([n.type,n.suffixes].join("~"))}t.push([e.name,e.description,r.join(",")].join("::"))})}return e(t.join("~"))})})}(window),function(e){"use strict";imprint.registerTest("processorCores",function(){return new Promise(function(e){return e(navigator.hardwareConcurrency)})})}(window),function(e){"use strict";imprint.registerTest("publicIp",function(){return new Promise(function(e){var t=new XMLHttpRequest;t.onreadystatechange=function(){4==t.readyState&&200==t.status&&e(t.responseText)},t.open("GET","https://api.ipify.org",!0),t.send(null)})})}(window),function(e){"use strict";imprint.registerTest("screenResolution",function(){return new Promise(function(e){return e((screen.height>screen.width?[screen.height,screen.width]:[screen.width,screen.height]).join("x"))})})}(window),function(e){"use strict";imprint.registerTest("sessionStorage",function(){return new Promise(function(e){try{return e(!!window.sessionStorage)}catch(t){return e(!0)}})})}(window),function(e){"use strict";imprint.registerTest("timezoneOffset",function(){return new Promise(function(e){return e((new Date).getTimezoneOffset())})})}(window),function(e){"use strict";imprint.registerTest("touchSupport",function(){return new Promise(function(e){var t=0,r=!1;void 0!==navigator.maxTouchPoints?t=navigator.maxTouchPoints:void 0!==navigator.msMaxTouchPoints&&(t=navigator.msMaxTouchPoints);try{document.createEvent("TouchEvent"),r=!0}catch(e){}return e([t,r,"ontouchstart"in window].join("~"))})})}(window),function(e){"use strict";imprint.registerTest("userAgent",function(){return new Promise(function(e){return e(navigator.userAgent)})})}(window),function(e){"use strict";imprint.registerTest("webGl",function(){return new Promise(function(e){try{var t=function(e){return i.clearColor(0,0,0,1),i.enable(i.DEPTH_TEST),i.depthFunc(i.LEQUAL),i.clear(i.COLOR_BUFFER_BIT|i.DEPTH_BUFFER_BIT),"["+e[0]+", "+e[1]+"]"},r=document.createElement("canvas"),i=null;try{i=r.getContext("webgl")||r.getContext("experimental-webgl")}catch(e){}if(!i)return e("");var n=[],a=i.createBuffer();i.bindBuffer(i.ARRAY_BUFFER,a);var o=new Float32Array([-.2,-.9,0,.4,-.26,0,0,.732134444,0]);i.bufferData(i.ARRAY_BUFFER,o,i.STATIC_DRAW),a.itemSize=3,a.numItems=3;var s=i.createProgram(),c=i.createShader(i.VERTEX_SHADER);i.shaderSource(c,"attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}"),i.compileShader(c);var u=i.createShader(i.FRAGMENT_SHADER);i.shaderSource(u,"precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}"),i.compileShader(u),i.attachShader(s,c),i.attachShader(s,u),i.linkProgram(s),i.useProgram(s),s.vertexPosAttrib=i.getAttribLocation(s,"attrVertex"),s.offsetUniform=i.getUniformLocation(s,"uniformOffset"),i.enableVertexAttribArray(s.vertexPosArray),i.vertexAttribPointer(s.vertexPosAttrib,a.itemSize,i.FLOAT,!1,0,0),i.uniform2f(s.offsetUniform,1,1),i.drawArrays(i.TRIANGLE_STRIP,0,a.numItems),null!=i.canvas&&n.push(i.canvas.toDataURL()),n.push("extensions:"+i.getSupportedExtensions().join(";")),n.push("webgl aliased line width range:"+t(i.getParameter(i.ALIASED_LINE_WIDTH_RANGE))),n.push("webgl aliased point size range:"+t(i.getParameter(i.ALIASED_POINT_SIZE_RANGE))),n.push("webgl alpha bits:"+i.getParameter(i.ALPHA_BITS)),n.push("webgl antialiasing:"+(i.getContextAttributes().antialias?"yes":"no")),n.push("webgl blue bits:"+i.getParameter(i.BLUE_BITS)),n.push("webgl depth bits:"+i.getParameter(i.DEPTH_BITS)),n.push("webgl green bits:"+i.getParameter(i.GREEN_BITS)),n.push("webgl max anisotropy:"+function(e){var t,r=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic");return r?(t=e.getParameter(r.MAX_TEXTURE_MAX_ANISOTROPY_EXT),0===t&&(t=2),t):null}(i)),n.push("webgl max combined texture image units:"+i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS)),n.push("webgl max cube map texture size:"+i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE)),n.push("webgl max fragment uniform vectors:"+i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS)),n.push("webgl max render buffer size:"+i.getParameter(i.MAX_RENDERBUFFER_SIZE)),n.push("webgl max texture image units:"+i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS)),n.push("webgl max texture size:"+i.getParameter(i.MAX_TEXTURE_SIZE)),n.push("webgl max varying vectors:"+i.getParameter(i.MAX_VARYING_VECTORS)),n.push("webgl max vertex attribs:"+i.getParameter(i.MAX_VERTEX_ATTRIBS)),n.push("webgl max vertex texture image units:"+i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS)),n.push("webgl max vertex uniform vectors:"+i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS)),n.push("webgl max viewport dims:"+t(i.getParameter(i.MAX_VIEWPORT_DIMS))),n.push("webgl red bits:"+i.getParameter(i.RED_BITS)),n.push("webgl renderer:"+i.getParameter(i.RENDERER)),n.push("webgl shading language version:"+i.getParameter(i.SHADING_LANGUAGE_VERSION)),n.push("webgl stencil bits:"+i.getParameter(i.STENCIL_BITS)),n.push("webgl vendor:"+i.getParameter(i.VENDOR)),n.push("webgl version:"+i.getParameter(i.VERSION));try{var h=i.getExtension("WEBGL_debug_renderer_info");h&&(n.push("webgl unmasked vendor:"+i.getParameter(h.UNMASKED_VENDOR_WEBGL)),n.push("webgl unmasked renderer:"+i.getParameter(h.UNMASKED_RENDERER_WEBGL)))}catch(e){}return i.getShaderPrecisionFormat?(n.push("webgl vertex shader high float precision:"+i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision),n.push("webgl vertex shader high float precision rangeMin:"+i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).rangeMin),n.push("webgl vertex shader high float precision rangeMax:"+i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).rangeMax),n.push("webgl vertex shader medium float precision:"+i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision),n.push("webgl vertex shader medium float precision rangeMin:"+i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).rangeMin),n.push("webgl vertex shader medium float precision rangeMax:"+i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).rangeMax),n.push("webgl vertex shader low float precision:"+i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.LOW_FLOAT).precision),n.push("webgl vertex shader low float precision rangeMin:"+i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.LOW_FLOAT).rangeMin),n.push("webgl vertex shader low float precision rangeMax:"+i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.LOW_FLOAT).rangeMax),n.push("webgl fragment shader high float precision:"+i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision),n.push("webgl fragment shader high float precision rangeMin:"+i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).rangeMin),n.push("webgl fragment shader high float precision rangeMax:"+i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).rangeMax),n.push("webgl fragment shader medium float precision:"+i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision),n.push("webgl fragment shader medium float precision rangeMin:"+i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).rangeMin),n.push("webgl fragment shader medium float precision rangeMax:"+i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).rangeMax),n.push("webgl fragment shader low float precision:"+i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.LOW_FLOAT).precision),n.push("webgl fragment shader low float precision rangeMin:"+i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.LOW_FLOAT).rangeMin),n.push("webgl fragment shader low float precision rangeMax:"+i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.LOW_FLOAT).rangeMax),n.push("webgl vertex shader high int precision:"+i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_INT).precision),n.push("webgl vertex shader high int precision rangeMin:"+i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_INT).rangeMin),n.push("webgl vertex shader high int precision rangeMax:"+i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_INT).rangeMax),n.push("webgl vertex shader medium int precision:"+i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_INT).precision),n.push("webgl vertex shader medium int precision rangeMin:"+i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_INT).rangeMin),n.push("webgl vertex shader medium int precision rangeMax:"+i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_INT).rangeMax),n.push("webgl vertex shader low int precision:"+i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.LOW_INT).precision),n.push("webgl vertex shader low int precision rangeMin:"+i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.LOW_INT).rangeMin),n.push("webgl vertex shader low int precision rangeMax:"+i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.LOW_INT).rangeMax),n.push("webgl fragment shader high int precision:"+i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_INT).precision),n.push("webgl fragment shader high int precision rangeMin:"+i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_INT).rangeMin), n.push("webgl fragment shader high int precision rangeMax:"+i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_INT).rangeMax),n.push("webgl fragment shader medium int precision:"+i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_INT).precision),n.push("webgl fragment shader medium int precision rangeMin:"+i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_INT).rangeMin),n.push("webgl fragment shader medium int precision rangeMax:"+i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_INT).rangeMax),n.push("webgl fragment shader low int precision:"+i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.LOW_INT).precision),n.push("webgl fragment shader low int precision rangeMin:"+i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.LOW_INT).rangeMin),n.push("webgl fragment shader low int precision rangeMax:"+i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.LOW_INT).rangeMax),e(n.join("~"))):e(n.join("~"))}catch(t){return e("")}})})}(window);
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

		imprint.test(browserTests)
		.then(function (fingerprint) {
			resolve(fingerprint);
		}).catch( (error) => {
			reject(error);
		} )

	})
}

let burst_get_time_on_page = () => {
	return new Promise((resolve) => {
		let current_time_on_page = TimeMe.getTimeOnCurrentPageInMilliseconds();
		if ( burst_last_time_update + 1000 < current_time_on_page) {
			burst_last_time_update = current_time_on_page;
			resolve(current_time_on_page)
		}
		resolve(0)
	})
}

/**
 * Check if this is a user agent
 * @returns {boolean}
 */
let burst_is_user_agent = () => {
	const botPattern = "(googlebot\/|bot|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)";
	let re = new RegExp(botPattern, 'i');
	let userAgent = navigator.userAgent;

	return re.test(userAgent);
}

/**
 * Make a XMLHttpRequest and return a promise
 * @param obj
 * @returns {Promise<unknown>}
 */
let burst_api_request = obj => {
	return new Promise((resolve, reject) => {

		let request = new XMLHttpRequest();
		request.open(obj.method || "POST", obj.url, true)
		request.setRequestHeader('Content-type', 'application/json')
		request.send(obj.data)
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

	if ( data.time_on_page > 0  || data.uid !== false ) {
		await burst_api_request({
			url: burst.url + 'update' + burst_token,
			data: JSON.stringify(data)
		}).catch( error => {
			console.log(error)
		} );
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
		data.first_time_visit = obj.first_time_visit
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
			console.log(error)
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