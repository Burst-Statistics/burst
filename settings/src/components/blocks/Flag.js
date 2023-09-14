import { ReactSVG } from 'react-svg'
/**
 * Display a flag with SVG icon from pro/assets/flags/4x3
 * @param country
 * @param countryNiceName
 * @constructor
 */
const Flag = ({country, countryNiceName = ''}) => {
  // country to lowercase
  // check if country is a string
  if (typeof country !== 'string') {
    return (
        <span className={'burst-flag-wrapper'}>{countryNiceName}</span>
    );
  }

  country = country.toLowerCase();
  const src = `${burst_settings.plugin_url}pro/assets/flags/4x3/${country}.svg`;
  return (
      <span className={'burst-flag-wrapper'}><ReactSVG src={src} className={`burst-flag burst-flag-${country}`} title={countryNiceName}/> {countryNiceName}</span>
  );
}
export default Flag;