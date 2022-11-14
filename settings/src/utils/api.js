import axios from 'axios';
import getAnchor from "./getAnchor";

/*
 * Makes a get request to the fields list
 *
 * @param {string|boolean} restBase - rest base for the query.
 * @param {object} args
 * @returns {AxiosPromise<any>}
 */

export const getFields = () => {
	//we pass the anchor, so we know when LE is loaded
	let anchor = getAnchor('main');
	let config = {
		headers: {
			'X-WP-Nonce': burst_settings.nonce,
		}
	}
	let glue = burst_settings.site_url.indexOf('?')!==-1 ? '&' : '?';
	return axios.get(burst_settings.site_url+'burst/v1/fields/get'+glue+anchor+'&nonce='+burst_settings.burst_nonce, config);
};

/*
 * Post our data to the back-end
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const setFields = (data) => {
	//we pass the anchor, so we know when LE is loaded
	let anchor = getAnchor('main');
	let config = {
		headers: {
			'X-WP-Nonce': burst_settings.nonce,
			'burst-nonce': burst_settings.nonce,
		}
	}
	let nonce = {'nonce':burst_settings.burst_nonce};
	data.push(nonce);
	let glue = burst_settings.site_url.indexOf('?')!==-1 ? '&' : '?';
	return axios.post(burst_settings.site_url+'burst/v1/fields/set'+glue+anchor, data, config );
}

export const getBlock = (block) => {
	let config = {
		headers: {
			'X-WP-Nonce': burst_settings.nonce,
		}
	}
	let glue = burst_settings.site_url.indexOf('?')!==-1 ? '&' : '?';
	return axios.get(burst_settings.site_url+'burst/v1/block/'+block+glue+'nonce='+burst_settings.burst_nonce, config);
};

export const runTest = (test, state, data ) => {
	let config = {
		headers: {
			'X-WP-Nonce': burst_settings.nonce,
		}
	}
	if (data) {
		data = encodeURIComponent(JSON.stringify(data));
	}
	let glue = burst_settings.site_url.indexOf('?')!==-1 ? '&' : '?';
	return axios.get(burst_settings.site_url+'burst/v1/tests/'+test+glue+'state='+state+'&data='+data, config);
};

export const doAction = (action, data) => {
	let config = {
		headers: {
			'X-WP-Nonce': burst_settings.nonce,
		}
	}
	data.nonce = burst_settings.burst_nonce;
	return axios.post(burst_settings.site_url+'burst/v1/do_action/'+action, data, config );
}

export const getData = (type, startDate, endDate, range, args ) => {
	let config = {
		headers: {
			'X-WP-Nonce': burst_settings.nonce,
		}
	}
	if (args) {
		args = encodeURIComponent(JSON.stringify(args));
	}
	let glue = burst_settings.site_url.indexOf('?')!==-1 ? '&' : '?';
	return axios.get(burst_settings.site_url+'burst/v1/data/'+type+glue+'date_start='+startDate+'&date_end='+endDate+'&date_range='+range+'&args='+args, config);
};