const MenuItem = (props) => {
    console.log(props);
  const handleClick = (e) => {
    // @todo fix
    console.log('click on' + e )
    // props.selectMenu(props.menuItem.id);
  };

  let menuIsSelected = props.selectedMenuItem === props.menuItem.id;
  if (props.menuItem.menu_items) {
    for (const item of props.menuItem.menu_items) {
      if (item.id === props.selectedMenuItem) {
        menuIsSelected = true;
      }
    }
  }

  let menuClass = menuIsSelected ? ' burst-active' : '';
  menuClass += props.menuItem.featured ? ' burst-featured' : '';
  menuClass += props.menuItem.premium && !burst_settings.pro_plugin_active
      ? ' burst-premium'
      : '';
  let href = '#' + props.selectedMainMenuItem + '/' + props.menuItem.id;
  return (
      <>
        {props.menuItem.visible &&
            <div className={'burst-menu-item' + menuClass}>
              <a href={href} onClick={() => handleClick()}>
                <span>{props.menuItem.title}</span>
                {props.menuItem.featured && <span
                    className="burst-menu-item-featured">{props.menuItem.featured}</span>}
              </a>
              {(props.menuItem.menu_items && menuIsSelected) &&
                  <div className="burst-submenu-item">
                    {props.menuItem.menu_items.map(
                        (subMenuItem, i) => subMenuItem.visible &&
                            <MenuItem key={i}
                                      menuItem={subMenuItem}
                                      selectMenu={props.selectMenu}
                                      selectedMenuItem={props.selectedMenuItem}/>,
                    )}
                  </div>}
            </div>}
      </>
  );
};

export default MenuItem;