import {__} from '@wordpress/i18n';
import {useMenu} from './data/menu';

const Header = (props) => {
  let plugin_url = burst_settings.plugin_url;
  const {setSelectedMainMenuItem, selectedMainMenuItem, menu} = useMenu();
  let menu_values = Object.values(menu);

  return (
      <div className="burst-header-container">
        <div className="burst-header">
          <img className="burst-logo"
               src={plugin_url + 'assets/img/burst-logo.svg'}
               alt="Burst Statistics Logo"/>
          <div className="burst-header-left">
            <nav className="burst-header-menu">
              <ul>
                {menu_values.map((menu_item, i) => <li key={i}>
                  <a className={selectedMainMenuItem === menu_item.id ? 'active': ''}
                     onClick={() => setSelectedMainMenuItem(menu_item.id)}
                     href={'#' + menu_item.id.toString()}
                  >
                    {menu_item.title}
                  </a>
                </li>)}
              </ul>
            </nav>
          </div>
          <div className="burst-header-right">
            <a href="https://wordpress.org/support/plugin/burst-statistics/"
               className="button button-black"
               target="_blank">{__('Support', 'burst-statistics')}</a>
          </div>
        </div>
      </div>
  );
};
export default Header;