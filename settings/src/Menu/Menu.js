import Placeholder from '../Placeholder/Placeholder';
import MenuItem from './MenuItem';
import {__} from '@wordpress/i18n';

import {
  Component,
} from '@wordpress/element';

/**
 * Menu block, rendering th entire menu
 */
/**
 * Menu block, rendering th entire menu
 */
class Menu extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    let hasPremiumItems = this.props.menu.menu_items.filter((item) => {
      return (item.premium === true);
    }).length > 0;
    if (!this.props.isAPILoaded) {
      return (
          <Placeholder></Placeholder>
      );
    }
    return (
        <div className="burst-wizard-menu burst-grid-item">
          <div className="burst-grid-item-header">
            <h1 className="burst-h4">{this.props.menu.title}</h1>
          </div>
          <div className="burst-grid-item-content">
            <div className="burst-wizard-menu-items">
              {
                this.props.menu.menu_items.map((menuItem, i) =>
                    <MenuItem
                        key={i}
                        isAPILoaded={this.props.isAPILoaded}
                        menuItem={menuItem}
                        selectMenu={this.props.selectMenu}
                        selectStep={this.props.selectStep}
                        selectedMenuItem={this.props.selectedMenuItem}
                        selectedMainMenuItem={this.props.selectedMainMenuItem}
                        getPreviousAndNextMenuItems={this.props.getPreviousAndNextMenuItems}
                    />,
                )
              }
            </div>
          </div>
          <div className="burst-grid-item-footer">

          </div>
        </div>
    );
  }
}

export default Menu;