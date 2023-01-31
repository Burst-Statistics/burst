import {Component} from "@wordpress/element";
import * as burst_api from "./utils/api";
import Header from "./Header";
import DashboardPage from "./Dashboard/DashboardPage";
import StatisticsPage from "./Statistics/StatisticsPage";
import SettingsPage from "./Settings/SettingsPage";
import Modal from "./Modal/Modal";
import PagePlaceholder from './Placeholder/PagePlaceholder';
import getAnchor from "./utils/getAnchor";
import Tour from "./Tour";
import {__} from "@wordpress/i18n";
import {format, subDays, addDays, startOfDay, endOfDay, getUnixTime, parse} from 'date-fns'

class Page extends Component {
    constructor() {
        super( ...arguments );
        this.pageProps=[];
        this.pageProps['licenseStatus'] = burst_settings.licenseStatus;

        this.updateFields = this.updateFields.bind(this);
        this.updateProgress = this.updateProgress.bind(this);
        this.getFields = this.getFields.bind(this);
        this.selectMenu = this.selectMenu.bind(this);
        this.getSelectedMenu = this.getSelectedMenu.bind(this);
        this.selectStep = this.selectStep.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.highLightField = this.highLightField.bind(this);
        this.updateField = this.updateField.bind(this);
        this.getFieldValue = this.getFieldValue.bind(this);
        this.addHelp = this.addHelp.bind(this);
        this.selectMainMenu = this.selectMainMenu.bind(this);
        this.setPageProps = this.setPageProps.bind(this);
        this.getPreviousAndNextMenuItems = this.getPreviousAndNextMenuItems.bind(this);
        this.state = {
            selectedMainMenuItem: '',
            showOnBoardingModal: false,
            selectedMenuItem: '',
            selectedStep: 1,
            highLightedField: '',
            fields: '',
            menu: [],
            progress: '',
            isAPILoaded: false,
            pageProps: this.pageProps,
            showModal: false,
            modalData: [],
            dropItemFromModal: false,
            nextMenuItem: '',
            previousMenuItem: '',
            dateRange: {
                'startDate': format(startOfDay(subDays(new Date(), 7)),
                    'yyyy-MM-dd'),
                'endDate': format(endOfDay(subDays(new Date(), 1)),
                    'yyyy-MM-dd'),
                'range': 'last-7-days',
            },
            insightsMetrics: {
                metrics: ['visitors', 'pageviews']
            },
        };
            this.getFields();
    }

    updateFields(fields){
        this.fields = fields;
        this.setState({
            fields: fields,
        });
    }

    updateProgress(progress){
        this.progress = progress;
        this.setState({
            progress: progress,
        });
    }

    componentDidMount(){
        window.addEventListener('hashchange', () => {
            let selectedMainMenuItem =  getAnchor('main') || 'dashboard';
            this.menu = this.getSelectedMenu(this.superMenu, selectedMainMenuItem);
            this.setState({
                selectedMainMenuItem: selectedMainMenuItem,
                selectedMenuItem: this.getDefaultMenuItem(),
                menu:this.menu,
            }, () => {
                this.getPreviousAndNextMenuItems();
            });
        });
    }

     /*
    * filter sidebar menu from complete menu structure
    */

     getSelectedMenu(superMenu, selectedMainMenuItem){
        for (const key in superMenu) {
            if ( superMenu.hasOwnProperty(key) ){
                if ( superMenu[key] && superMenu[key].id === selectedMainMenuItem) {
                    return superMenu[key];
                }
            }
        }
    }

    getFields(){
        return burst_api.getFields().then( ( response ) => {
            this.superMenu = response.menu;
            let selectedMainMenuItem =  getAnchor('main') || 'dashboard';
            this.menu = this.getSelectedMenu(this.superMenu, selectedMainMenuItem);

            this.fields = response.fields;
            this.progress = response.progress;
            this.setState({
                isAPILoaded: true,
                fields: this.fields,
                progress: this.progress,
                menu: this.menu,
                selectedMenuItem: this.getDefaultMenuItem(),
                selectedMainMenuItem: selectedMainMenuItem,
            }, () => {
                this.getPreviousAndNextMenuItems();
            });
        });
    }
    /**
     * Allow child blocks to set data on the gridblock
     * @param key
     * @param value
     */
    setPageProps(key, value){
        this.pageProps[key] = value;
        this.setState({
            pageProps: this.pageProps,
        })
    }

    setDateRange = (dateRange) => {
        this.setState({
            dateRange : {
                startDate: format(dateRange.startDate, 'yyyy-MM-dd'),
                endDate: format(dateRange.endDate, 'yyyy-MM-dd'),
                range: dateRange.range,
            }
        });
    }

    setInsightsMetrics = (metrics) => {
        this.setState({
            insightsMetrics: {
                metrics: metrics
            }
        });
    }

    /**
     * Handle instantiation of a modal window
     * @param showModal
     * @param data
     * @param dropItem
     */
    handleModal(showModal, data, dropItem) {
        this.setState({
            showModal: showModal,
            modalData : data,
            dropItemFromModal : dropItem
        })
    }

    selectMenu(selectedMenuItem){
        this.setState({
            selectedMenuItem: selectedMenuItem
        });
    }

    selectStep(selectedStep){
        this.setState({
            selectedStep: selectedStep
        });
    }

    getDefaultMenuItem(){
        let fallBackMenuItem = this.menu && this.menu.menu_items.hasOwnProperty(0) ? this.menu.menu_items[0].id : 'general';
        let anchor = getAnchor('menu');
        let foundAnchorInMenu = false;
        //check if this anchor actually exists in our current submenu. If not, clear it
        for (const key in this.menu.menu_items) {
            if ( this.menu.menu_items.hasOwnProperty(key) &&  this.menu.menu_items[key].id === anchor ){
                foundAnchorInMenu=true;
            }
        }
        if ( !foundAnchorInMenu ) anchor = false;
        return anchor ? anchor : fallBackMenuItem;
    }

    selectMainMenu(selectedMainMenuItem){
        this.menu = this.getSelectedMenu(this.superMenu, selectedMainMenuItem);
        let selectedMenuItem = this.getDefaultMenuItem();
        this.setState({
            menu : this.menu,
            selectedMainMenuItem :selectedMainMenuItem,
            selectedMenuItem :selectedMenuItem
        });
    }

    /*
     * Update a field
     * @param field
     */
    updateField(id, value) {
        let fields = this.fields;
        for (const fieldItem of fields){
            if (fieldItem.id === id ){
                fieldItem.value = value;
            }
        }
        this.fields = fields;
        this.setState({
            fields :fields
        });
    }

    /*
* Allow children to check a field value from another page (in a page, only visible fields are know)
*/
    getFieldValue(id) {
        let fields = this.fields;
        for (const fieldItem of fields){
            if (fieldItem.id === id ){
                return fieldItem.value;
            }
        }
        return false;
    }

    addHelp(id, label, text, title) {
        //create help object
        let help = {};
        help.label=label;
        help.text=text;
        if (title) help.title=title;
        let fields = this.fields;

        //add to selected field
        for (const fieldItem of fields){
            if (fieldItem.id === id && !fieldItem.help ){
                fieldItem.help = help
                this.fields = fields;
                this.setState({
                    fields :fields
                });
            }
        }
    }

    highLightField(fieldId){
        //switch to settings page
        this.selectMainMenu('settings');
        //get menu item based on fieldId
        let selectedField = null;
        let fields = this.fields.filter(field => field.id === fieldId);
        if (fields.length) {
            selectedField = fields[0];
            this.selectMenu(selectedField.menu_id);
        }
        this.highLightedField = fieldId;
    }

    // Parses menu items and nested items in single array
    menuItemParser (parsedMenuItems, menuItems) {

        menuItems.forEach((menuItem) => {
            if(menuItem.visible) {
                parsedMenuItems.push(menuItem.id);
                if(menuItem.hasOwnProperty('menu_items')) {
                    this.menuItemParser(parsedMenuItems, menuItem.menu_items);
                }
            }
        });

        return parsedMenuItems;
    }

    getPreviousAndNextMenuItems () {
        let previousMenuItem;
        let nextMenuItem;
        const { menu_items: menuItems } = this.state.menu;

        const parsedMenuItems = [];
        this.menuItemParser(parsedMenuItems, menuItems);

        // Finds current menu item index
        const currentMenuItemIndex = parsedMenuItems.findIndex((menuItem) => menuItem === this.state.selectedMenuItem)

        if(currentMenuItemIndex !== -1) {
            previousMenuItem = parsedMenuItems[ currentMenuItemIndex === 0 ? '' : currentMenuItemIndex - 1];
            nextMenuItem = parsedMenuItems[ currentMenuItemIndex === parsedMenuItems.length - 1 ? '' : currentMenuItemIndex + 1];

            this.setState({
                previousMenuItem: previousMenuItem ? previousMenuItem : parsedMenuItems[0],
                nextMenuItem: nextMenuItem ? nextMenuItem : parsedMenuItems[parsedMenuItems.length - 1]
            });
        }


        return { nextMenuItem, previousMenuItem };
    }

    render() {
        const {
            pageProps,
            selectedMainMenuItem,
            selectedMenuItem,
            fields,
            menu,
            progress,
            isAPILoaded,
            showModal,
            modalData,
            dateRange,
            insightsMetrics,
            dropItemFromModal,
        } = this.state;

        return (
    
            <div className="burst-wrapper">
                {!isAPILoaded && <PagePlaceholder></PagePlaceholder>}
                {showModal && <Modal handleModal={this.handleModal} data={modalData}/>}
                {isAPILoaded &&
                    (
                        <>
                            <Header
                                selectedMainMenuItem={selectedMainMenuItem}
                                selectMainMenu={this.selectMainMenu}
                                superMenu = {this.superMenu}
                                dateRange = {this.state.dateRange}
                                setDateRange = {this.setDateRange}
                                fields={fields} />
                            <div className={"burst-content-area burst-grid burst-" + selectedMainMenuItem}>
                                { ( ! burst_settings.tour_shown || ( getAnchor() === 'dashboard' && getAnchor('menu') === 'tour') ) &&  <Tour /> }
                                { selectedMainMenuItem === 'dashboard' &&
                                    <DashboardPage
                                        isAPILoaded={isAPILoaded}
                                        fields={fields}
                                        selectMainMenu={this.selectMainMenu}
                                        highLightField={this.highLightField}
                                        pageProps={pageProps}
                                    />
                                }
                                { selectedMainMenuItem === 'statistics' &&
                                    <StatisticsPage
                                        isAPILoaded={isAPILoaded}
                                        fields={fields}
                                        selectMainMenu={this.selectMainMenu}
                                        highLightField={this.highLightField}
                                        pageProps={pageProps}
                                        dateRange = {this.state.dateRange}
                                        insightsMetrics = {this.state.insightsMetrics}
                                        setInsightsMetrics = {this.setInsightsMetrics}
                                    />
                                }
                                { selectedMainMenuItem === 'settings' &&
                                    <SettingsPage
                                        dropItemFromModal={dropItemFromModal}
                                        updateFields={this.updateFields}
                                        updateProgress={this.updateProgress}
                                        pageProps={this.pageProps}
                                        handleModal={this.handleModal}
                                        getDefaultMenuItem={this.getDefaultMenuItem}
                                        updateField={this.updateField}
                                        getFieldValue={this.getFieldValue}
                                        addHelp={this.addHelp}
                                        setPageProps={this.setPageProps}
                                        selectMenu={this.selectMenu}
                                        selectStep={this.selectStep}
                                        selectedStep={this.state.selectedStep}
                                        highLightField={this.highLightField}
                                        highLightedField={this.highLightedField}
                                        selectedMenuItem={selectedMenuItem}
                                        selectedMainMenuItem={selectedMainMenuItem}
                                        selectMainMenu={this.selectMainMenu}
                                        isAPILoaded={isAPILoaded}
                                        fields={fields}
                                        menu={menu}
                                        progress={progress}
                                        getPreviousAndNextMenuItems={this.getPreviousAndNextMenuItems}
                                        nextMenuItem={this.state.nextMenuItem}
                                        previousMenuItem={this.state.previousMenuItem} />
                                }
                            </div>
                        </>
                    )
                }
            </div>
        );
    }
}
export default Page