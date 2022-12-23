import {useState} from "react";
import Field from "./Field";
import Hyperlink from "../utils/Hyperlink";
import { __ } from '@wordpress/i18n';
import getAnchor from "../utils/getAnchor";

/**
 * Render a grouped block of settings
 */
const SettingsGroup = (props) => {

    const getLicenseStatus = () => {
        if (props.pageProps.hasOwnProperty('licenseStatus') ){
            return props.pageProps['licenseStatus'];
        }
        return 'invalid';
    }

    let upgrade = 'https://burst-statistics.com/pro';
    let selectedMenuItem = props.selectedMenuItem;
    let selectedFields = [];
    //get all fields with group_id props.group_id
    for (const selectedField of props.fields){
        if (selectedField.group_id === props.group ){
            selectedFields.push(selectedField);
        }
    }

    let activeGroup;
    for (const item of props.menu.menu_items){
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
        let currentGroup = selectedMenuItem.groups.filter(group => group.id === props.group);
        if (currentGroup.length>0) {
            activeGroup = currentGroup[0];
        }
    }

    let status = 'invalid';
    let msg = activeGroup.premium_text ? activeGroup.premium_text : __("Learn more about %sPremium%s", "burst-statistics");
    if ( burst_settings.pro_plugin_active ) {
        status = getLicenseStatus();
        if ( status === 'empty' || status === 'deactivated' ) {
            msg = burst_settings.messageInactive;
        } else {
            msg = burst_settings.messageInvalid;
        }
    }

    let disabled = status !=='valid' && activeGroup.premium;
    //if a feature can only be used on networkwide or single site setups, pass that info here.
    let networkwide_error = !burst_settings.networkwide_active && activeGroup.networkwide;
    upgrade = activeGroup.upgrade ? activeGroup.upgrade : upgrade;
    let helplinkText = activeGroup.helpLink_text ? activeGroup.helpLink_text : __("Instructions manual","burst-statistics");
    let disabledClass = disabled || networkwide_error ? 'burst-disabled' : '';





        return (
            <div className={"burst-grid-item burst-"+activeGroup.id + ' ' +  disabledClass}>
                {activeGroup.title && <div className="burst-grid-item-header">
                    <h3 className="burst-h4">{activeGroup.title}</h3>
                    {activeGroup.helpLink && <div className="burst-grid-item-controls"><Hyperlink target="_blank" className="burst-helplink" text={helplinkText} url={activeGroup.helpLink}/></div>}
                </div>}
                <div className="burst-grid-item-content">
                    {activeGroup.intro && <div className="burst-settings-block-intro">{activeGroup.intro}</div>}
                    {selectedFields.map((field, i) =>
                        <Field key={i} index={i}
                               props={props}
                               field={field}
                               fields={selectedFields}
                        />)}
                </div>
                {disabled && !networkwide_error && <div className="burst-locked">
                    <div className="burst-locked-overlay">
                        <span className="burst-task-status burst-premium">{__("Upgrade","burst-statistics")}</span>
                        <span>
                            { burst_settings.pro_plugin_active && <span>{msg}&nbsp;<a className="burst-locked-link" href="#settings/license">{__("Check license", "burst-statistics")}</a></span>}
                            { !burst_settings.pro_plugin_active && <Hyperlink target="_blank" text={msg} url={upgrade}/> }
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

export default SettingsGroup