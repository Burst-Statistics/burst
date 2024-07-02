export const in_array = ( needle, haystack ) => {
  let length = haystack.length;
  for ( let i = 0; i < length; i++ ) {
    if ( haystack[i] == needle ) {
      return true;
    }

  }
  return false;
};

export const burst_get_website_url = ( url = '/', params = {}) => {
  const baseUrl = 'https://burst-statistics.com/';
  url = url.replace( /^\//, '' );

  // make sure the url ends with a slash
  url = url.replace( /\/?$/, '/' );
  const version = burst_settings.burst_pro ? 'pro' : 'free';

  const versionNr = burst_settings.burst_version.replace( /#.*$/, '' );
  const defaultParams = {
    burst_campaign: `burst-${version}-${versionNr}`
  };

  params = Object.assign( defaultParams, params );
  const queryString = new URLSearchParams( params ).toString();
  return baseUrl + url + ( queryString ? '?' + queryString : '' );
};


