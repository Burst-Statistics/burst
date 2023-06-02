import apiFetch from '@wordpress/api-fetch';
import axios from 'axios';
import {__} from '@wordpress/i18n';
import {toast} from 'react-toastify';

const usesPlainPermalinks = () => {
	return burst_settings.site_url.indexOf('?') !==-1;
};

const glue = () => {
	return usesPlainPermalinks() ? '&' : '?'
}
/**
 * Get nonce for burst api. Add random string so requests don't get cached
 * @returns {string}
 */
const getNonce = () => {
	return 'nonce='+burst_settings.burst_nonce+'&token='+Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
};
const makeRequest = (path, method = 'GET', data) => {
	if (!data) data= {};
	if (method==='POST') data.nonce = burst_settings.burst_nonce;
	return new Promise(async (resolve, reject) => {
		try {
			const config = {
				headers: {
					'X-WP-Nonce': burst_settings.nonce,
				}
			}
			if ( usesPlainPermalinks() ) {
				const url = burst_settings.site_url + path;
				let response = method=== 'POST' ? await axios.post(url, data, config) : await axios.get(url, config);
				if (!response.request_success) {
					response = method ==='GET' ? await ajaxGet(path) : await ajaxPost(path, data);
					resolve(response);
				} else {
					delete response.request_success;
					resolve(response);
				}
			} else {
				const response = await apiFetch({
					path,
					method,
					data
				});
				delete response.request_success;
				resolve(response);
			}
		} catch (error) {
			try {
				let response = method === 'GET' ? await ajaxGet(path) : await ajaxPost(path, data);
				resolve(response);
			} catch (error) {
				console.log(error);
				reject(error);
			}
		}
	});
}
export const setOption = (option, value) => makeRequest('burst/v1/options/set'+glue()+getNonce(), 'POST', {option: {option, value} });

export const getFields = () => makeRequest('burst/v1/fields/get'+glue()+getNonce());
export const setFields = (data) => {
	return makeRequest('burst/v1/fields/set'+glue(), 'POST', {fields:data});
}

export const getGoalFields = () => makeRequest('burst/v1/goal_fields/get'+glue()+getNonce());
export const setGoalFields = (data) => { return makeRequest('burst/v1/goal_fields/set'+glue()+getNonce(), 'POST', {fields:data} )};

export const getGoals = () => makeRequest('burst/v1/goals/get'+glue()+getNonce());
export const deleteGoal = (id) => makeRequest('burst/v1/goals/delete'+glue()+getNonce(), 'POST', {id:id});
export const addGoal = () => makeRequest('burst/v1/goals/add'+glue()+getNonce(), 'POST', {});

export const getBlock = (block) => makeRequest('burst/v1/block/'+block+glue()+getNonce());
export const doAction = (action, data = {}) => makeRequest(`burst/v1/do_action/${action}`, 'POST', {action_data:data}).then(response => {
	return response.hasOwnProperty('data') ? response.data : [];
});
export const getData = (type, startDate, endDate, range, args) => {
	return makeRequest(`burst/v1/data/${type}${glue()+getNonce()}&date_start=${startDate}&date_end=${endDate}&date_range=${range}&args=${encodeURIComponent(JSON.stringify(args))}`);
};
export const getMenu = () => makeRequest('burst/v1/menu/'+glue()+getNonce());
export const getPosts = (search) => makeRequest(`burst/v1/posts/${glue()}${getNonce()}&search=${search}`).then(response => {
	return response.hasOwnProperty('posts') ? response.posts : [];
});

const ajaxGet = (path) => {
	return new Promise(function (resolve, reject) {
		let url = siteUrl('ajax');
		url+='&rest_action='+path.replace('?', '&');
		let xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.onload = function () {
			let response;
			try {
				response = JSON.parse(xhr.response);
			} catch (error) {
				generateError(false, xhr.statusText);
				reject(xhr.statusText);
			}

			if ( xhr.status >= 200 && xhr.status < 300 ) {
				if ( !response.data || !response.data.hasOwnProperty('request_success') ) {
					generateError(response);
					reject('invalid data error');
				} else {
					delete response.data.request_success;
					resolve(response.data);
				}
			} else {
				reject(xhr.statusText);
			}
		};
		xhr.onerror = function () {
			generateError(false, xhr.statusText);
			reject(xhr.statusText);
		};
		xhr.send();
	});

}

const ajaxPost = (path, requestData) => {
	return new Promise(function (resolve, reject) {
		let url = siteUrl('ajax');
		let xhr = new XMLHttpRequest();
		xhr.open('POST', url );
		xhr.onload = function () {
			let response;
			try {
				response = JSON.parse(xhr.response);
			} catch (error) {
				generateError(false, xhr.statusText);
				reject(xhr.statusText);
			}
			if (xhr.status >= 200 && xhr.status < 300) {
				if ( !response.data || !response.data.hasOwnProperty('request_success') ) {
					generateError(response);
					reject('invalid data error');
				} else {
					delete response.data.request_success;
					resolve(response.data);
				}
			}
		};
		xhr.onerror = function () {
			generateError(false, xhr.statusText);
			reject(xhr.statusText);
		};

		let data = {};
		data['path'] = path;
		data['data'] = requestData;
		data = JSON.stringify(data, stripControls);
		xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		xhr.send(data);
	});
}

/**
 * All data elements with 'Control' in the name are dropped, to prevent:
 * TypeError: Converting circular structure to JSON
 * @param key
 * @param value
 * @returns {any|undefined}
 */
const stripControls = (key, value) => {
	if (!key){return value}
	if (key && key.includes("Control")) {
		return undefined;
	}
	if (typeof value === "object") {
		return JSON.parse(JSON.stringify(value, stripControls));
	}
	return value;
}


/**
 * if the site is loaded over https, but the site url is not https, force to use https anyway, because otherwise we get mixed content issues.
 * @returns {*}
 */
const siteUrl = (type) => {
	let url;
	if (typeof type ==='undefined') {
		url = burst_settings.site_url;
	} else {
		url = burst_settings.admin_ajax_url
	}
	if ( window.location.protocol === "https:" && url.indexOf('https://')===-1 ) {
		return url.replace('http://', 'https://');
	}
	return  url;
}

const generateError = (response, errorMsg) => {
	let error = __("Unexpected data", "burst-statistics");
	if (response && response.errors) {
		//get first entry of the errors object.
		//This is the error message
		for (let key in response.errors) {
			if (response.errors.hasOwnProperty(key)) {
				error = response.errors[key];
				break;
			}
		}
	} else if (errorMsg) {
		error = errorMsg;
	}

	toast.error(
	__('Server error', 'burst-statistics') + ': ' + error,
	{
		autoClose: 15000,
	});
}