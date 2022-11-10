import {
    TextControl,
    RadioControl,
    SelectControl,
    TextareaControl,
    __experimentalNumberControl as NumberControl,
    ToggleControl,
    Button,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import * as burst_api from "../utils/api";
import Hyperlink from "../utils/Hyperlink";
import {
    Component,
    useRef
} from '@wordpress/element';
import IpBlock from "./IpBlock";
import UserRoleBlock from "./UserRoleBlock";

/*
 * https://react-data-table-component.netlify.app
 */
import DataTable from "react-data-table-component";


class Field extends Component {
    constructor() {
        super( ...arguments );
        this.highLightClass = this.props.highLightedField===this.props.field.id ? 'burst-field-wrap burst-highlight' : 'burst-field-wrap';
        this.onChangeHandlerDataTableStatus = this.onChangeHandlerDataTableStatus.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.state = {
            warning: false,
        }
    }

    onChangeHandler(fieldValue) {
        let fields = this.props.fields;
        let field = this.props.field;
        fields[this.props.index]['value'] = fieldValue;
        this.props.saveChangedFields( field.id )
    }

    /*
     * Handle data update for a datatable, for the status only (true/false)
     * @param enabled
     * @param clickedItem
     * @param type
     */
    onChangeHandlerDataTableStatus(enabled, clickedItem, type ) {

        let field=this.props.field;
        enabled = enabled==1 ? 0 : 1;
        if (typeof field.value === 'object') {
            field.value = Object.values(field.value);
        }
        //find this item in the field list
        for (const item of field.value){
            if (item.id === clickedItem.id) {
                item[type] = enabled;
            }
            delete item.valueControl;
            delete item.statusControl;
            delete item.deleteControl;
        }
        //the updateItemId allows us to update one specific item in a field set.
        field.updateItemId = clickedItem.id;
        let saveFields = [];
        saveFields.push(field);
        this.props.updateField(field.id, field.value);
        burst_api.setFields(saveFields).then(( response ) => {
            this.props.showSavedSettingsNotice();
        });
    }
    onCloseTaskHandler(){

    }

    render(){
        let field = this.props.field;
        let fieldValue = this.state.value;
        let fields = this.props.fields;
        let disabled = field.disabled;
        let options = [];
        if ( field.options ) {
            for (var key in field.options) {
                if (field.options.hasOwnProperty(key)) {
                    let item = {};
                    item.label = field.options[key];
                    item.value = key;
                    options.push(item);
                }
            }
        }

        //if a feature can only be used on networkwide or single site setups, pass that info here.
        if ( !burst_settings.networkwide_active && field.networkwide_required ) {
            disabled = true;
            field.comment = <>{__("This feature is only available networkwide.","burst-statistics")}<Hyperlink target="_blank" text={__("Network settings","burst-statistics")} url={burst_settings.network_link}/></>
        }

        if ( field.conditionallyDisabled ) {
            disabled = true;
        }

        if ( !field.visible ) {
            return (
                <></>
            );
        }

        if ( field.type==='checkbox' ){
            return (
                <div className={this.highLightClass}>
                    <ToggleControl
                        disabled = {disabled}
                        checked= { field.value==1 }
                        label={ field.label }
                        onChange={ ( fieldValue ) => this.onChangeHandler(fieldValue) }
                    />
                    {field.comment && <div dangerouslySetInnerHTML={{__html:field.comment}}></div>}
                </div>
            );
        }

        if ( field.type==='hidden' ){
            return (
                <input type="hidden" value={field.value}/>
            );
        }

        if ( field.type==='radio' ){
            return (
                <div className={this.highLightClass}>
                    <RadioControl
                        label={ field.label }
                        onChange={ ( fieldValue ) => this.onChangeHandler(fieldValue) }
                        selected={ fieldValue }
                        options={ options }
                    />
                </div>
            );
        }

        if ( field.type==='text' || field.type==='email' ){
            return (
                <div className={this.highLightClass}>
                    <TextControl
                        help={ field.comment }
                        label={ field.label }
                        onChange={ ( fieldValue ) => this.onChangeHandler(fieldValue) }
                        value= { fieldValue }
                    />
                </div>
            );
        }

        if ( field.type==='button' ){
            return (
                <div className={'burst-field-button ' + this.highLightClass}>
                    <label>{field.label}</label>
                    <Hyperlink className="button button-default" text={field.button_text} url={field.url}/>
                </div>
            );
        }

        if ( field.type==='textarea' ){
            return (
                <div className={this.highLightClass}>
                    <TextareaControl
                        label={ field.label }
                        help={ field.comment }
                        value= { fieldValue }
                        onChange={ ( fieldValue ) => this.onChangeHandler(fieldValue) }
                    />
                </div>
            );
        }
        if ( field.type==='number' ){
            return (
                <div className={this.highLightClass}>
                    <NumberControl
                        onChange={ ( fieldValue ) => this.onChangeHandler(fieldValue) }
                        help={ field.comment }
                        label={ field.label }
                        value= { fieldValue }
                    />
                </div>
            );
        }
        if ( field.type==='email' ){
            return (
                <div className={this.highLightClass}>
                    <TextControl
                        help={ field.comment }
                        label={ field.label }
                        onChange={ ( fieldValue ) => this.onChangeHandler(fieldValue) }
                        value= { fieldValue }
                    />
                </div>
            );
        }

        if ( field.type==='select') {
            return (
                <div className={this.highLightClass}>
                    <SelectControl
                        disabled={ disabled }
                        help={ field.comment }
                        label={ field.label }
                        onChange={ ( fieldValue ) => this.onChangeHandler(fieldValue) }
                        value= { fieldValue }
                        options={ options }
                    />
                </div>
            )
        }

        if ( field.type==='ip_blocklist' ){

            return (
                <div className={this.highLightClass}>
                    <IpBlock
                        disabled={disabled}
                        field={this.props.field}
                        label={ field.label }
                        help={ field.comment }
                        value= { fieldValue }
                        onChangeHandler={this.onChangeHandler}
                        id="ip_address"
                    />
                </div>

            );
        }

        if ( field.type==='user_role_blocklist' ){

            return (
                <div className={this.highLightClass}>
                    <UserRoleBlock
                        disabled={disabled}
                        field={this.props.field}
                        label={ field.label }
                        help={ field.comment }
                        value= { fieldValue }
                        onChangeHandler={this.onChangeHandler}
                        id="user_role_block"
                    />
                </div>

            );
        }

        return (
            'not found field type '+field.type
        );
    }
}

export default Field;