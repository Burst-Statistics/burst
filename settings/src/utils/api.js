import apiFetch from '@wordpress/api-fetch';
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
	let glue = burst_settings.site_url.indexOf('?')!==-1 ? '&' : '?';
	return apiFetch( {
		path: 'burst/v1/fields/get'+glue+anchor+'&nonce='+burst_settings.burst_nonce,
		method: 'GET',
	});
};

/*
 * Post our data to the back-end
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const setFields = (data) => {
	//we pass the anchor, so we know when LE is loaded
	let anchor = getAnchor('main');
	let nonce = {'nonce':burst_settings.burst_nonce};
	data.push(nonce);
	let glue = burst_settings.site_url.indexOf('?')!==-1 ? '&' : '?';
	return apiFetch( {
		path: 'burst/v1/fields/set'+glue+anchor,
		method: 'POST',
		data: data,
	} );
}

export const getBlock = (block) => {
	let glue = burst_settings.site_url.indexOf('?')!==-1 ? '&' : '?';
	return apiFetch( {
		path: 'burst/v1/block/'+block+glue+'nonce='+burst_settings.burst_nonce,
		method: 'GET',
	} );
};

export const runTest = (test, state, data ) => {
	if (data) {
		data = encodeURIComponent(JSON.stringify(data));
	}

	let glue = burst_settings.site_url.indexOf('?')!==-1 ? '&' : '?';
	return apiFetch( {
		path: 'burst/v1/tests/'+test+glue+'state='+state+'&data='+data,
		method: 'GET',
		data: data,
	} );
};

export const doAction = (action, data) => {
	data.nonce = burst_settings.burst_nonce;
	return apiFetch( {
		path: 'burst/v1/do_action/'+action,
		method: 'POST',
		data: data,
	} );
}

export const getData = (type, startDate, endDate, range, args ) => {
	if (args) {
		args = encodeURIComponent(JSON.stringify(args));
	}
	let glue = burst_settings.site_url.indexOf('?')!==-1 ? '&' : '?';
	return apiFetch( {
		path: 'burst/v1/data/'+type+glue+'date_start='+startDate+'&date_end='+endDate+'&date_range='+range+'&args='+args,
		method: 'GET',
	} );
};