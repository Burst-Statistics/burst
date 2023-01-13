import { __ } from '@wordpress/i18n';
import {useMenu} from '../../data/menu';

const MenuItem = (props) => {
   	const {selectedSubMenuItem, setSelectedSidebarMenuItem, selectedMainMenuItem, subMenu} = useMenu();
    const handleClick = () => {
    	//if there's a submenu item, we don't make the parent one clickable
    	if ( !props.menuItem.menu_items ) {
   	        setSelectedSidebarMenuItem(props.menuItem.id);
    	}
	}

	/*
	 * Menu is selected if the item is the same, or if it is a child.
	 */
	let menuIsSelected = selectedSubMenuItem===props.menuItem.id;
	if (props.menuItem.menu_items) {
		for (const item of props.menuItem.menu_items){
			if (item.id === selectedSubMenuItem ){
				menuIsSelected=true;
			}
		}
	}
	let menuClass = menuIsSelected ? ' burst-active' : '';
	menuClass += props.menuItem.featured ? ' burst-featured' : '';
	menuClass += props.menuItem.premium && !burst_settings.is_premium ? ' burst-premium' : '';

	//make main clickable if it doesn't have a submenu, OR if the submenu is not selected
	const attributes = {}
	let selectedMenuItemIsChildOfThisItem = false;
	if (Array.isArray(props.menuItem.menu_items) ){
		selectedMenuItemIsChildOfThisItem = props.menuItem.menu_items.filter(item => item.id === selectedSubMenuItem ).length>0;
	}
	if( !props.menuItem.menu_items || !selectedMenuItemIsChildOfThisItem ){
		attributes.href = '#'+selectedMainMenuItem+'/'+props.menuItem.id;;
	}
	return (
		<>
		{props.menuItem.visible && <div className={"burst-menu-item" + menuClass}>
			<a { ...attributes }  onClick={() => handleClick() } >
				<span>{props.menuItem.title}</span>
				{props.menuItem.featured && <><span className='burst-menu-item-featured-pill'>{__('New', 'burst-statistics')}</span></>}
			</a>
			{ ( props.menuItem.menu_items && menuIsSelected ) && <div className="burst-submenu-item">
				{ props.menuItem.menu_items.map(
					(subMenuItem, i) => subMenuItem.visible && <MenuItem key={i} menuItem={subMenuItem} />
				) }
			</div>}
		</div>}
		</>
	)
}

export default MenuItem
