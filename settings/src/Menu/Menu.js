import MenuItem from './MenuItem';

const Menu = (props) => {
  return (
      <div className="burst-wizard-menu burst-grid-item">
        <div className="burst-grid-item-header">
          <h1 className="burst-h4">{props.menu.title}</h1>
        </div>
        <div className="burst-grid-item-content">
          <div className="burst-wizard-menu-items">
            {
              props.menu.menu_items.map((menuItem, i) =>
                  <MenuItem
                      props={props}
                      key={i}
                      menuItem={menuItem}
                  />,
              )
            }
          </div>
        </div>
        <div className="burst-grid-item-footer">

        </div>
      </div>
  );
};

export default Menu;