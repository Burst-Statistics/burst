import apiFetch from '@wordpress/api-fetch';
import axios from 'axios';

const apiGet = (path) => {
	if ( usesPlainPermalinks() ) {
		let config = {
			headers: {
				'X-WP-Nonce': burst_settings.nonce,
			}
		}
		return axios.get(burst_settings.site_url+path, config ).then( ( response ) => {return response.data;})
	} else {
		return apiFetch( { path: path } );
	}
}

const apiPost = (path, data) => {
	if ( usesPlainPermalinks() ) {
		let config = {
			headers: {
				'X-WP-Nonce': burst_settings.nonce,
			}
		}
		return axios.post(burst_settings.site_url+path, data, config ).then( ( response ) => {return response.data;});
	} else {
		return apiFetch( {
			path: path,
			method: 'POST',
			data: data,
		} );
	}
}

/*
 * Makes a get request to the fields list
 *
 * @param {string|boolean} restBase - rest base for the query.
 * @param {object} args
 */

export const getFields = () => {
	return apiGet('burst/v1/fields/get'+glue()+getNonce(), 'GET');
};

/*
 * Post our data to the back-end
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const setFields = (data) => {
	//we pass the anchor, so we know when LE is loaded
	let nonce = {'nonce':burst_settings.burst_nonce};
	data.push(nonce);
	return apiPost('burst/v1/fields/set'+glue(), data);
};


/*
 * Makes a get request to the fields list
 *
 * @param {string|boolean} restBase - rest base for the query.
 * @param {object} args
 */

export const getGoalFields = () => {
	return apiGet('burst/v1/goal_fields/get'+glue()+getNonce(), 'GET');
};

/*
 * Makes a get request to the fields list
 *
 * @param {string|boolean} restBase - rest base for the query.
 * @param {object} args
 */

export const getGoalValues = () => {
	return apiGet('burst/v1/goal_values/get'+glue()+getNonce(), 'GET');
};

/*
 * Post our data to the back-end
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const setGoalFields = (data) => {
	//we pass the anchor, so we know when LE is loaded
	let nonce = {'nonce':burst_settings.burst_nonce};
	data.push(nonce);
	return apiPost('burst/v1/goal_fields/set'+glue(), data);
};

export const getBlock = (block) => {
	return apiGet('burst/v1/block/'+block+glue()+getNonce());
};

export const runTest = (test, state, data ) => {
	if ( data ) {
		data = encodeURIComponent(JSON.stringify(data));
	}
	return apiGet('burst/v1/tests/'+test+glue()+'state='+state+getNonce()+'&data='+data)
};

export const doAction = (action, data) => {
	if (typeof data === 'undefined') data = {};
	data.nonce = burst_settings.burst_nonce;
	return apiPost('burst/v1/do_action/'+action, data);
}

export const getData = (type, startDate, endDate, range, args )  => {
	if ( args ) {
		args = encodeURIComponent(JSON.stringify(args));
	}
	return apiGet('burst/v1/data/'+type+glue()+'date_start='+startDate+'&date_end='+endDate+'&date_range='+range+'&args='+args)
};

export const getMenu = () => {
	return apiGet('burst/v1/menu/'+glue()+getNonce() )
};

const usesPlainPermalinks = () => {
	return burst_settings.site_url.indexOf('?') !==-1;
};

const glue = () => {
	return usesPlainPermalinks() ? '&' : '?'
}

const getNonce = () => {
	return '&nonce='+burst_settings.burst_nonce+'&token='+Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
};
