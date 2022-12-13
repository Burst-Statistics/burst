import {Component} from "@wordpress/element";
import Field from "./Field";
import Hyperlink from "../utils/Hyperlink";
import { __ } from '@wordpress/i18n';
import getAnchor from "../utils/getAnchor";

/**
 * Render a grouped block of settings
 */
class SettingsGroup extends Component {
    constructor() {
        super( ...arguments );
        this.state = {
            fields:this.props.fields,
            isAPILoaded: this.props.isAPILoaded,
        };
        this.upgrade='https://burst-statistics.com/pro';
        this.fields = this.props.fields;
    }

    componentDidMount() {
        this.getLicenseStatus = this.getLicenseStatus.bind(this);
    }

    getLicenseStatus(){
        if (this.props.pageProps.hasOwnProperty('licenseStatus') ){
            return this.props.pageProps['licenseStatus'];
        }
        return 'invalid';
    }

    handleMenuLink(id){
        this.props.selectMenu(id);
    }

    render(){
        let selectedMenuItem = this.props.selectedMenuItem;

        let selectedFields = [];
        //get all fields with group_id this.props.group_id
        for (const selectedField of this.props.fields){
            if (selectedField.group_id === this.props.group ){
                selectedFields.push(selectedField);
            }
        }

        let activeGroup;
        for (const item of this.props.menu.menu_items){
            if (item.id === selectedMenuItem ) {
                activeGroup = item;
            } else if (item.menu_items) {
                activeGroup = item.menu_items.filter(menuItem => menuItem.id === selectedMenuItem)[0];
            }
            if ( activeGroup ) {
                break;
            }
        }

        if ( selectedMenuItem && selectedMenuItem.hasOwnProperty('groups') ) {
            let currentGroup = selectedMenuItem.groups.filter(group => group.id === this.props.group);
            if (currentGroup.length>0) {
                activeGroup = currentGroup[0];
            }
        }



        let status = 'invalid';
        let msg = activeGroup.premium_text ? activeGroup.premium_text : __("Learn more about %sPremium%s", "burst-statistics");
        if ( burst_settings.pro_plugin_active ) {
            status = this.getLicenseStatus();
            if ( status === 'empty' || status === 'deactivated' ) {
                msg = burst_settings.messageInactive;
            } else {
                msg = burst_settings.messageInvalid;
            }
        }

        let disabled = status !=='valid' && activeGroup.premium;
        //if a feature can only be used on networkwide or single site setups, pass that info here.
        let networkwide_error = !burst_settings.networkwide_active && activeGroup.networkwide;
        this.upgrade = activeGroup.upgrade ? activeGroup.upgrade : this.upgrade;
        let helplinkText = activeGroup.helpLink_text ? activeGroup.helpLink_text : __("Instructions manual","burst-statistics");
        let anchor = getAnchor('main');
        let disabledClass = disabled || networkwide_error ? 'burst-disabled' : '';

        return (
            <div className={"burst-grid-item burst-"+activeGroup.id + ' ' +  disabledClass}>
                {activeGroup.title && <div className="burst-grid-item-header">
                    <h3 className="burst-h4">{activeGroup.title}</h3>
                    {activeGroup.helpLink && anchor!=='letsencrypt'&& <div className="burst-grid-item-controls"><Hyperlink target="_blank" className="burst-helplink" text={helplinkText} url={activeGroup.helpLink}/></div>}
                </div>}
                <div className="burst-grid-item-content">
                    {activeGroup.intro && <div className="burst-settings-block-intro">{activeGroup.intro}</div>}
                    {selectedFields.map((field, i) =>
                        <Field key={i} index={i}
                               updateFields={this.props.updateFields}
                               selectMenu={this.props.selectMenu}
                               selectMainMenu={this.props.selectMainMenu}
                               dropItemFromModal={this.props.dropItemFromModal}
                               handleNextButtonDisabled={this.props.handleNextButtonDisabled}
                               handleModal={this.props.handleModal}
                               showSavedSettingsNotice={this.props.showSavedSettingsNotice}
                               updateField={this.props.updateField}
                               getFieldValue={this.props.getFieldValue}
                               refreshTests={this.props.refreshTests}
                               resetRefreshTests={this.props.resetRefreshTests}
                               addHelp={this.props.addHelp}
                               setPageProps={this.props.setPageProps}
                               fieldsUpdateComplete = {this.props.fieldsUpdateComplete}
                               highLightField={this.props.highLightField}
                               highLightedField={this.props.highLightedField}
                               saveChangedFields={this.props.saveChangedFields}
                               field={field}
                               fields={selectedFields}
                        />)}
                </div>
                {disabled && !networkwide_error && <div className="burst-locked">
                    <div className="burst-locked-overlay">
                        <span className="burst-task-status burst-premium">{__("Upgrade","burst-statistics")}</span>
                        <span>
                            { burst_settings.pro_plugin_active && <span>{msg}&nbsp;<a className="burst-locked-link" href="#settings/license">{__("Check license", "burst-statistics")}</a></span>}
                            { !burst_settings.pro_plugin_active && <Hyperlink target="_blank" text={msg} url={this.upgrade}/> }
                        </span>
                    </div>
                </div>}
                {networkwide_error && <div className="burst-locked">
                    <div className="burst-locked-overlay">
                        <span className="burst-task-status burst-warning">{__("Network feature","burst-statistics")}</span>
                        <span>{__("This feature is only available networkwide.","burst-statistics")}<Hyperlink target="_blank" text={__("Network settings","burst-statistics")} url={burst_settings.network_link}/></span>
                    </div>
                </div>}

            </div>
        )
    }
}

export default SettingsGroup