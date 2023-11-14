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

const generateError = (error, path = false) => {
	let message = __('Server error', 'burst-statistics');
	error = error.replace(/(<([^>]+)>)/gi, "");

	if (path) {
		const urlWithoutQueryParams = path.split('?')[0];

		const urlParts = urlWithoutQueryParams.split('/');
		const index = urlParts.indexOf('v1') + 1;
		message = __('Server error in', 'burst-statistics') + ' ' + urlParts[index] + '/' + urlParts[index + 1];
	}
	message += ': ' + error;
	// wrap the message in a div react component and give it an onclick to copy the text to the clipboard
	// this way the user can easily copy the error message and send it to us
	const messageDiv = <div title={__('Click to copy', 'burst-statistics')} onClick={() => {
		navigator.clipboard.writeText(message);
		toast.success(__('Error copied to clipboard', 'burst-statistics'));
	}}>{message}</div>;

	toast.error(
			messageDiv,
			{
				autoClose: 15000,
			}
	);
}

const makeRequest = async (path, method = 'GET', data = {}) => {
	let args = {
		path,
		method,
	};

	if (method === 'POST') {
		data.nonce = burst_settings.burst_nonce;
		args.data = data;
	}

	return apiFetch(args)
	.then(response => {
		if (!response.request_success) {
			throw new Error('invalid data error');
		}
		if(response.code){
			throw new Error(response.message);
		}
		delete response.request_success;
		return response;
	})
	.catch(error => {
		// If REST API fails, try AJAX request
		return ajaxRequest(method, path, data)
		.catch(() => {
			// If AJAX also fails, generate error
			generateError(error.message, args.path);
			throw error;
		});
	});
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
			throw new Error('Invalid data error');
		}

		delete responseData.data.request_success;
		// return promise with the data object
		return Promise.resolve(responseData.data);
	} catch (error) {
		return Promise.reject(new Error('AJAX request failed'));
	};
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
export const getData = async (type, startDate, endDate, range, args) => {
	return await makeRequest(`burst/v1/data/${type}${glue()+getNonce()}&date_start=${startDate}&date_end=${endDate}&date_range=${range}`, 'POST', args);
};
export const getMenu = () => makeRequest('burst/v1/menu/'+glue()+getNonce());
export const getPosts = (search) => makeRequest(`burst/v1/posts/${glue()}${getNonce()}&search=${search}`).then(response => {
	return response.hasOwnProperty('posts') ? response.posts : [];
});

/**
 * Retrieves a value from local storage with a 'burst_' prefix and parses it as JSON.
 * If the key is not found, returns the provided default value.
 *
 * @param {string} key - The key to retrieve from local storage, without the 'burst_' prefix.
 * @param {*} defaultValue - The value to return if the key is not found in local storage.
 * @returns {*} - The parsed JSON value from local storage or the default value.
 */
export const getLocalStorage = (key, defaultValue) => {
	if (typeof Storage !== "undefined") {
		const storedValue = localStorage.getItem('burst_' + key);
		if (storedValue && storedValue.length > 0) {
			return JSON.parse(storedValue);
		}
	}
	return defaultValue;
};

/**
 * Stringifies a value as JSON and stores it in local storage with a 'burst_' prefix.
 *
 * @param {string} key - The key to store in local storage, without the 'burst_' prefix.
 * @param {*} value - The value to stringify as JSON and store in local storage.
 */
export const setLocalStorage = (key, value) => {
	if (typeof Storage !== "undefined") {
		localStorage.setItem('burst_' + key, JSON.stringify(value));
	}
};
