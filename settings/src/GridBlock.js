import { __ } from '@wordpress/i18n';
import {
    Component,
} from '@wordpress/element';

import * as burst_api from "./utils/api";
import ProgressBlock from "./Dashboard/ProgressBlock";
import TodayBlock from "./Dashboard/TodayBlock";
import ProgressHeader from "./Dashboard/ProgressBlockHeader";
import CompareBlock from './Statistics/CompareBlock'; // @todo Overleggen rogier grdiblock en dsahboardpage standardiseren
import InsightsBlock from './Statistics/InsightsBlock'; // @todo Overleggen rogier grdiblock en dsahboardpage standardiseren
import DevicesBlock from './Statistics/DevicesBlock'; // @todo Overleggen rogier grdiblock en dsahboardpage standardiseren

import PagesBlock from './Statistics/PagesBlock';
import ReferrersBlock from './Statistics/ReferrersBlock';
import Placeholder from './Placeholder/Placeholder';


/**
 * using the gridbutton generates a button which will refresh the gridblock when clicked
 * The onclick action triggers the getBlockData method
 *
 */
class GridButton extends Component {
    constructor() {
        super( ...arguments );
    }
    render(){
        let disabled = this.props.disabled ? 'disabled' : '';
        return (
            <button className="button-primary" disabled={disabled} onClick={this.props.onClick}>{this.props.text}</button>
        );
    }
}

/**
 * Mapping of components, for use in the config array
 * @type {{SslLabs: JSX.Element}}
 */
var dynamicComponents = {
    "ProgressBlock": ProgressBlock,
    "TodayBlock": TodayBlock,
    "ProgressHeader": ProgressHeader,
    "CompareBlock": CompareBlock,
    "InsightsBlock": InsightsBlock,
    "DevicesBlock": DevicesBlock,
    "PagesBlock": PagesBlock,
    "ReferrersBlock": ReferrersBlock,
};

class GridBlock extends Component {
    constructor() {
        super( ...arguments );
        this.footerHtml = this.props.block.footer.data;
        this.getBlockData = this.getBlockData.bind(this);
        this.highLightField = this.highLightField.bind(this);
        this.setBlockProps = this.setBlockProps.bind(this);
        this.state = {
            isAPILoaded: false,
            content:'',
            testDisabled:false,
            footerHtml:this.props.block.footer.html,
            progress:0,
            testRunning:false,
            BlockProps: [],
        };
        this.dynamicComponents = {
            "getBlockData": this.getBlockData,
        };
        if (this.props.block.content.type==='test') {
            this.getBlockData('initial');
        } else {
            this.content = this.props.block.content.data;
        }
    }

    /**
     * Get block data for this grid block, in object format, as defined in settings/config/config.php
     * @param state
     * @returns {Promise<AxiosResponse<any>>}
     */
    getBlockData(state){
        let setState='clearcache';
        if (state==='initial' || state==='refresh') {
            setState = state;
        }
        let test = this.props.block.content.data;
        return burst_api.runTest(test, setState).then((response) => {
            this.content = response.data.html
            this.testDisabled = response.data.disabled
            this.progress = response.data.progress
            this.testRunning = this.progress<100
            this.footerHtml = response.data.footerHtml
            this.setState({
                testRunning:this.testRunning,
                content:this.content,
                testDisabled:this.testDisabled,
                footerHtml:this.footerHtml,
                progress:this.progress,
                isAPILoaded: true,
            })
        });
    }

    componentDidMount() {
        if ( this.props.block.content.type==='html' || this.props.block.content.type==='react' ) {
            let content = this.props.block.content.data;
            this.content = content;
            this.setState({
                isAPILoaded: true,
                content:content,
                progress:100,
            })
        }
        if ( this.props.block.footer.type==='html' || this.props.block.footer.type==='react' ) {
            let footer = this.props.block.footer.data;
            this.content = footer;
            this.setState({
                isAPILoaded: true,
                footer:footer,
                progress:100,
            })
        }
    }

    /**
     * Allow child blocks to set data on the gridblock
     * @param key
     * @param value
     */
    setBlockProps(key, value){
        let {
            BlockProps,
        } = this.state;

        if (!BlockProps.hasOwnProperty(key) || BlockProps[key]!==value) {
            BlockProps[key] = value;
            this.setState({
                BlockProps: BlockProps,
            })
        }
    }

    highLightField(fieldId){
        this.props.highLightField(fieldId);
    }

    render(){
        let {
            isAPILoaded,
            content,
            footer,
            BlockProps,
        } = this.state;
        let blockData = this.props.block;
        let className = "burst-grid-item "+blockData.class+" burst-"+blockData.id;
        if ( this.props.block.content.type==='react') {
            content = this.props.block.content.data;
        }
        if ( this.props.block.footer.type==='react') {
            footer = this.props.block.footer.data;
        }
        if ( this.testRunning ){
            const timer = setTimeout(() => {
                this.getBlockData('refresh');
            }, blockData.content.interval );
        }


        let DynamicBlockProps = { saveChangedFields: this.props.saveChangedFields, setBlockProps: this.setBlockProps, BlockProps: BlockProps, runTest: this.runTest, fields: this.props.fields, isApiLoaded: this.props.isApiLoaded, highLightField: this.highLightField, selectMainMenu: this.props.selectMainMenu, dateRange: this.props.dateRange };
        return (
            <div className={className}>
                <div className="burst-grid-item-header">
                    <h3 className="burst-grid-title burst-h4">{ blockData.title }</h3>
                    <div className="burst-grid-item-controls">
                        {blockData.controls && blockData.controls.type==='url' && <a href={blockData.controls.data}>{__("Instructions", "burst-statistics")}</a>}
                        {blockData.controls && blockData.controls.type==='html' && <span className="burst-header-html" dangerouslySetInnerHTML={{__html: blockData.controls.data}}></span>}
                        {blockData.controls && blockData.controls.type==='react' && wp.element.createElement(dynamicComponents[blockData.controls.data], DynamicBlockProps)}
                    </div>
                </div>
                {!isAPILoaded && <Placeholder lines="4"></Placeholder>}
                {blockData.content.type!=='react' && <div className="burst-grid-item-content" dangerouslySetInnerHTML={{__html: content}}></div>}
                {blockData.content.type==='react' && <div className="burst-grid-item-content">{wp.element.createElement(dynamicComponents[content], DynamicBlockProps)}</div>}

                { blockData.footer.hasOwnProperty('button') && <div className="burst-grid-item-footer"><GridButton text={blockData.footer.button.text} onClick={this.getBlockData} disabled={this.testDisabled}/></div>}
                { blockData.footer.type==='html' && <div className="burst-grid-item-footer" dangerouslySetInnerHTML={{__html: this.footerHtml}}></div>}

            </div>
        );
    }
}

export default GridBlock;