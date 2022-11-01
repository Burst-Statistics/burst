// import { DatePicker } from "@wordpress/components/build/date-time/date-time";
import {Component} from "@wordpress/element";
import { __ } from '@wordpress/i18n';
import getAnchor from "./utils/getAnchor";
import DateRange from "./Statistics/DateRange/DateRange";

class Header extends Component {
    constructor() {
        super( ...arguments );
    }
    handleClick(menuId){
        this.props.selectMainMenu(menuId);
    }
    componentDidMount() {
        this.handleClick = this.handleClick.bind(this);
    }
    render() {
        let plugin_url = burst_settings.plugin_url;
        let active_menu_item = this.props.selectedMainMenuItem;
        let menu =Object.values(this.props.superMenu);
        menu = menu.filter( item => item!==null );
        //filter out hidden menus if not in the anchor
        let anchor = getAnchor('main');
        menu = menu.filter( item => !item.default_hidden || anchor===item.id);
        return (
            <div className="burst-header-container">
                <div className="burst-header">
                    <img className="burst-logo" src={plugin_url+"assets/img/burst-logo.svg"} alt="Really Simple SSL logo" />
                    <div className="burst-header-left">
                        <nav className="burst-header-menu">
                            <ul>
                                {menu.map((menu_item, i) => <li key={i}><a className={ active_menu_item === menu_item.id ? 'active' : '' } onClick={ () => this.handleClick(menu_item.id) } href={"#" + menu_item.id.toString()} >{menu_item.title}</a></li>)}
                            </ul>
                        </nav>
                    </div>
                    <div className="burst-header-right">
                    {active_menu_item === 'statistics' && <DateRange setDateRange={this.props.setDateRange} dateRange = {this.props.dateRange} />}
                        {/* <a className="burst-knowledge-base-link" href="https://burst-statistics.com/knowledge-base" target="_blank">{__("Documentation", "burst-statistics")}</a> */}
                 
                            <a href="https://wordpress.org/support/plugin/burst-statistics/"
                               className="button button-black"
                               target="_blank">{__("Support", "burst-statistics")}</a>
                    </div>
                </div>
            </div>
        );
    }
}
export default Header