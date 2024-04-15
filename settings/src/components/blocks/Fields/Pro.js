import {__} from '@wordpress/i18n';

/**
 * Render a premium tag
 */
const Pro = ({pro, id}) => {
  if ( burst_settings.is_pro || ! pro ) {
    return null;
  }

  let url = pro.url ? pro.url : 'https://burst-statistics.com/pricing';
  url += '?src=' + id;
  return (
      <div className="burst-pro">
        <a target="_blank" href={url} rel="noreferrer">
            {__( 'Pro', 'burst-statistics' )}
        </a>
      </div>
  );

};

export default Pro;
