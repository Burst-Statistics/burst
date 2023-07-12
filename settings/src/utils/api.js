import apiFetch from '@wordpress/api-fetch';
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

const makeRequest = async (path, method = 'GET', data = {}) => {
	let args = {
		path,
		method,
	};

	if (method === 'POST') {
		data.nonce = burst_settings.burst_nonce
		args.data = data;
	}

	try {
		const response = await apiFetch(args);
		if (!response.request_success) {
			// throw error
			throw new Error('invalid data error');
		}
		delete response.request_success;
		return response;
	} catch (error) {
		console.error(error);
		generateError(false, error.message);

		// Fallback to AJAX in case of error in the REST API
		try {
			return ajaxRequest(method, path, data);
		} catch (fallbackError) {
			console.error(fallbackError);
			// if error isset add ro response errors
			let response = {
				errors: [fallbackError]
			};
			generateError(response);
			throw fallbackError;
		}
	}
}

const ajaxRequest = async (method, path, requestData = null) => {
	const url = method === 'GET'
			? `${siteUrl('ajax')}&rest_action=${path.replace('?', '&')}`
			: siteUrl('ajax');

	const options = {
		method,
		headers: { 'Content-Type': 'application/json; charset=UTF-8' },
	};

	if (method === 'POST') {
		options.body = JSON.stringify({ path, data: requestData }, stripControls);
	}

	try {
		const response = await fetch(url, options);
		if (!response.ok) {
			generateError(false, response.statusText);
			throw new Error(response.statusText);
		}

		const responseData = await response.json();

		if (!responseData.data || !responseData.data.hasOwnProperty('request_success')) {
			generateError(responseData);
			throw new Error('Invalid data error');
		}

		delete responseData.data.request_success;
		return responseData.data;
	} catch (error) {
		throw error;
	}
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
	let error = __("Unexpected error", "burst-statistics");

	if (response) {
		if (response.errors) {
			// get first entry of the errors object.
			// this is the error message
			for (let key in response.errors) {
				if (response.errors.hasOwnProperty(key) && typeof response.errors[key] === 'string' && response.errors[key].length > 0) {
					error = response.errors[key];
					break;
				}
			}
		} else if (typeof response === 'string' && response.length > 0) {
			// If the response itself is an error message
			error = response;
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
	return makeRequest(`burst/v1/data/${type}${glue()+getNonce()}&date_start=${startDate}&date_end=${endDate}&date_range=${range}`, 'POST', args);
};
export const getMenu = () => makeRequest('burst/v1/menu/'+glue()+getNonce());
export const getPosts = (search) => makeRequest(`burst/v1/posts/${glue()}${getNonce()}&search=${search}`).then(response => {
	return response.hasOwnProperty('posts') ? response.posts : [];
});
