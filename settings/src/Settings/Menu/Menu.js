import MenuItem from './MenuItem';
import { __ } from '@wordpress/i18n';
import {useMenu} from "../../data/menu";
import {useEffect} from "@wordpress/element";
import {useFields} from '../../data/settings/fields';

/**
 * Menu block, rendering the entire menu
 */
const Menu = (props) => {
  const {subMenuLoaded, subMenu, hasPremiumItems} = useMenu();
  const {fields} = useFields();

  if ( !subMenuLoaded ) {
    return(
        <div className="burst-wizard-menu burst-grid-item">
          <div className="burst-grid-item-header">
            <h1 className="burst-h4"></h1>
          </div>
          <div className="burst-grid-item-content">
          </div>
        </div>
    )
  }

  return (
      <div className="burst-wizard-menu burst-grid-item">
        <div className="burst-grid-item-header">
          <h1 className="burst-h4">{subMenu.title}</h1>
        </div>
        <div className="burst-grid-item-content">
          <div className="burst-wizard-menu-items">
            { subMenu.menu_items.map((menuItem, i) => <MenuItem key={i} menuItem={menuItem} /> ) }
            { hasPremiumItems && !burst_settings.is_premium &&
                <div className="burst-premium-menu-item"><div><a target="_blank" href={burst_settings.upgrade_link} className='button button-black'>{__('Go Pro', 'burst-statistics')}</a></div></div>
            }
          </div>
        </div>
        <div className="burst-grid-item-footer">

        </div>
      </div>
  )

}

export default Menu;