import MenuItem from './MenuItem';
import { __ } from '@wordpress/i18n';
import {useMenu} from "../../../store/useMenuStore";
import {useEffect} from "@wordpress/element";
import {useFields} from '../../../store/useFieldsStore';

/**
 * Menu block, rendering the entire menu
 */
const Menu = (props) => {
  const subMenuLoaded = useMenu((state) => state.subMenuLoaded);
  const subMenu = useMenu((state) => state.subMenu);
  const hasPremiumItems = useMenu((state) => state.hasPremiumItems);
  const fields = useFields((state) => state.fields);

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
                <div className="burst-premium-menu-item"><div><a target="_blank" href={burst_settings.upgrade_link} className='burst-button burst-button--black'>{__('Go Pro', 'burst-statistics')}</a></div></div>
            }
          </div>
        </div>
        <div className="burst-grid-item-footer">

        </div>
      </div>
  )

}

export default Menu;
