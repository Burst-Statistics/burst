import getAnchor from "./getAnchor";
import axios from 'axios';
import apiFetch from '@wordpress/api-fetch';

/*
 * Makes a get request to the fields list
 *
 * @param {string|boolean} restBase - rest base for the query.
 * @param {object} args
 * @returns {AxiosPromise<any>}
 */

export const getRandomToken = () => {
	return '&token='+Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
};

const usesPlainPermalinks = () => {
	return burst_settings.site_url.indexOf('?') !==-1;
};

const config = () => {
	return {
		headers: {
			'X-WP-Nonce': burst_settings.wp_rest_nonce,
		}
	}
}

export const getFields = () => {
	//we pass the anchor, so we know when LE is loaded
	let glue = usesPlainPermalinks() ? '&' : '?';
	if ( usesPlainPermalinks() ) {
		return axios.get(burst_settings.site_url+'burst/v1/fields/get'+glue+'nonce='+burst_settings.burst_nonce+getRandomToken() , config() ).then( ( response ) => {return response.data;})
	} else {
		return apiFetch( { path: '/burst/v1/fields/get'+glue+'nonce='+burst_settings.burst_nonce+getRandomToken() } );
	}
};

/*
 * Post our data to the back-end
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const setFields = async (data) => {
	let nonce = {'nonce':burst_settings.burst_nonce};
	data.push(nonce);
	if ( usesPlainPermalinks() ) {
		return axios.post(burst_settings.site_url+'burst/v1/fields/set/', data, config() ).then( ( response ) => {return response.data;});
	} else {
		let response = await apiFetch( {
			path: 'burst/v1/fields/set/',
			method: 'POST',
			data: data,
		} );
		return response;
	}

};

export const getBlock = (block) => {
	let glue = burst_settings.site_url.indexOf('?')!==-1 ? '&' : '?';
	if ( usesPlainPermalinks() ) {
		return axios.get(burst_settings.site_url+'burst/v1/block/'+block+glue+'nonce='+burst_settings.burst_nonce+getRandomToken(), config()).then( ( response ) => {return response.data;})
	} else {
		return apiFetch( { path: 'burst/v1/block/'+block+glue+'nonce='+burst_settings.burst_nonce+getRandomToken() } );
	}
};

export const runTest = (test, state, data ) => {
	if (data) {
		data = encodeURIComponent(JSON.stringify(data));
	}
	let glue = burst_settings.site_url.indexOf('?')!==-1 ? '&' : '?';
	if ( usesPlainPermalinks() ) {
		return axios.get(burst_settings.site_url+'burst/v1/tests/'+test+glue+'state='+state+'&nonce='+burst_settings.burst_nonce+getRandomToken()+'&data='+data, config()).then( ( response ) => {return response.data; })
	} else {
		return apiFetch( { path: 'burst/v1/tests/'+test+glue+'state='+state+'&nonce='+burst_settings.burst_nonce+getRandomToken()+'&data='+data } );
	}
};

export const doAction = (action, data) => {
	data.nonce = burst_settings.burst_nonce;
	if ( usesPlainPermalinks() ) {
		return axios.post(burst_settings.site_url+'burst/v1/do_action/'+action, data, config ).then( ( response ) => {return response.data;});
	} else {
		return apiFetch( {
			path: 'burst/v1/do_action/'+action,
			method: 'POST',
			data: data,
		} );
	}

}

export const getData = (type, startDate, endDate, range, args ) => {
	if (args) {
		args = encodeURIComponent(JSON.stringify(args));
	}
	let glue = burst_settings.site_url.indexOf('?')!==-1 ? '&' : '?';
	if ( usesPlainPermalinks() ) {
		return axios.get(burst_settings.site_url+'burst/v1/data/'+type+glue+'date_start='+startDate+'&date_end='+endDate+'&date_range='+range+'&args='+args+'&nonce='+burst_settings.burst_nonce+getRandomToken(), config()).then( ( response ) => {return response.data; })
	} else {
		return apiFetch( { path: 'burst/v1/data/'+type+glue+'date_start='+startDate+'&date_end='+endDate+'&date_range='+range+'&args='+args+'&nonce='+burst_settings.burst_nonce+getRandomToken() } );
	}
};