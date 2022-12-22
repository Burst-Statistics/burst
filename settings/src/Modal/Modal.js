import {Component} from "@wordpress/element";
import { __ } from '@wordpress/i18n';
import * as burst_api from "../utils/api";

class Modal extends Component {
    constructor() {
        super( ...arguments );
        this.state = {
            data:[],
            buttonsDisabled:false,
        };
    }

    dismissModal(dropItem){
        this.props.handleModal(false, null, dropItem);
    }
    componentDidMount() {
        this.setState({
            data:this.props.data,
            buttonsDisabled:false,
        });
    }

    handleFix(e){
        //set to disabled
        let action = this.props.data.action;
        this.setState({
            buttonsDisabled:true
        });
        burst_api.runTest(action, 'refresh', this.props.data ).then( ( response ) => {
            this.props.data
            let {
                data,
            } = this.state;
            data.description = response.msg;
            data.subtitle = '';
            this.setState({
                data: data,
            });
            let item = this.props.data;
            if (response.success) {
                this.dismissModal(this.props.data);
            }
        });
    }

    render(){
        const {
            data,
            buttonsDisabled,
        } = this.state;
        let disabled = buttonsDisabled ? 'disabled' : '';
        let description = data.description;

        return (
            <div>
                <div className="burst-modal-backdrop" onClick={ (e) => this.dismissModal(e) }>&nbsp;</div>
                <div className="burst-modal" id="{id}">
                    <div className="burst-modal-header">
                        <h2 className="modal-title">
                            {data.title}
                        </h2>
                        <button type="button" className="burst-modal-close" data-dismiss="modal" aria-label="Close" onClick={ (e) => this.dismissModal(e) }>
                            <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" height="24" >
                                <path fill="#000000" d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/>
                            </svg>
                        </button>
                    </div>
                    <div className="burst-modal-content">
                        {data.subtitle && <div className="burst-modal-subtitle">{data.subtitle}</div>}
                        { Array.isArray(description) && description.map(s=><div className="burst-modal-description">{s}</div>) }
                    </div>
                    <div className="burst-modal-footer">
                        { data.edit && <a href={data.edit} target="_blank" className="button button-secondary">{__("Edit", "burst-statistics")}</a>}
                        { data.help && <a href={data.help} target="_blank"  className="button burst-button-help">{__("Help", "burst-statistics")}</a>}
                        { (!data.ignored && data.action==='ignore_url') && <button disabled={disabled} className="button button-primary" onClick={ (e) => this.handleFix(e) }>{ __("Ignore", "burst-statistics")}</button>}
                        { data.action!=='ignore_url' &&  <button disabled={disabled} className="button button-primary" onClick={ (e) => this.handleFix(e) }>{__("Fix", "burst-statistics")}</button> }
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;