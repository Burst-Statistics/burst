import apiFetch from '@wordpress/api-fetch';
import axios from 'axios';
import {__} from '@wordpress/i18n';

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
	return '&nonce='+burst_settings.burst_nonce+'&token='+Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
};
burst_settings.countRequests = []; // @todo remove this
const makeRequest = async (path, method = 'GET', data) => {
	try {
		burst_settings.countRequests.push({path, method, data});
		const config = {
			headers: {
				'X-WP-Nonce': burst_settings.nonce,
			}
		}
		if (usesPlainPermalinks()) {
			const url = burst_settings.site_url + path;
			const response = await axios[method.toLowerCase()](url, data, config);
			return response.data;
		} else {
			const response = await apiFetch({
				path,
				method,
				data
			});
			return response;
		}
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export const getFields = () => makeRequest('burst/v1/fields/get'+glue()+getNonce());
export const setFields = (data) => makeRequest('burst/v1/fields/set'+glue(), 'POST', [...data, { nonce: burst_settings.burst_nonce }]);
export const getGoalFields = () => makeRequest('burst/v1/goal_fields/get'+glue()+getNonce());
export const setGoalFields = (data) => makeRequest('burst/v1/goal_fields/set'+glue()+getNonce(), 'POST', [...data, { nonce: burst_settings.burst_nonce }]);
export const getBlock = (block) => makeRequest('burst/v1/block/'+block+glue()+getNonce());
export const runTest = (test, state, data) => makeRequest(`burst/v1/tests/${test}${glue()}state=${state}${getNonce()}&data=${encodeURIComponent(JSON.stringify(data))}`);
export const doAction = (action, data = {}) => makeRequest(`burst/v1/do_action/${action}`, 'POST', {...data, nonce: burst_settings.burst_nonce});
export const getData = (type, startDate, endDate, range, args) => { return makeRequest(`burst/v1/data/${type}${glue()}date_start=${startDate}&date_end=${endDate}&date_range=${range}&args=${encodeURIComponent(JSON.stringify(args))}`);};
export const getMenu = () => makeRequest('burst/v1/menu/'+glue()+getNonce());
export const getPosts = (search) => makeRequest(`burst/v1/posts/${glue()}search=${search}${getNonce()}`);