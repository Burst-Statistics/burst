import { __ } from '@wordpress/i18n';
import {
    Component,
} from '@wordpress/element';

import * as burst_api from "./utils/api";

import ProgressHeader from "./Dashboard/ProgressHeader";
import ProgressBlock from "./Dashboard/ProgressBlock";
import ProgressFooter from "./Dashboard/ProgressFooter";
import OtherPlugins from "./Dashboard/OtherPlugins";

import TodayBlock from "./Dashboard/TodayBlock";
import GoalsBlock from "./Dashboard/GoalsBlock";

import CompareBlock from './Statistics/CompareBlock';
import CompareFooter from './Statistics/CompareFooter';
import InsightsHeader from './Statistics/InsightsHeader';
import InsightsBlock from './Statistics/InsightsBlock';
import DevicesBlock from './Statistics/DevicesBlock';

import PagesBlock from './Statistics/PagesBlock';
import ReferrersBlock from './Statistics/ReferrersBlock';
import Placeholder from './Placeholder/Placeholder';

/**
 * Mapping of components, for use in the config array
 * @type {{SslLabs: JSX.Element}}
 */
var dynamicComponents = {
    "ProgressHeader": ProgressHeader,
    "ProgressBlock": ProgressBlock,
    "ProgressFooter": ProgressFooter,
    "TodayBlock": TodayBlock,
    "GoalsBlock": GoalsBlock,
    "OtherPlugins": OtherPlugins,
    "CompareBlock": CompareBlock,
    "CompareFooter": CompareFooter,
    "InsightsHeader": InsightsHeader,
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
        let content = this.props.block.content.data;
        let footer = this.props.block.footer.data;
        this.state = {
            testDisabled:false,
            footerHtml:this.props.block.footer.html,
            BlockProps:[],
            content: content,
            footer: footer,
        };
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
            this.content = response.html
            this.testDisabled = response.disabled
            this.progress = response.progress
            this.testRunning = this.progress<100
            this.footerHtml = response.footerHtml
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


        let DynamicBlockProps = {
            saveChangedFields: this.props.saveChangedFields,
            setBlockProps: this.setBlockProps,
            BlockProps: BlockProps,
            runTest: this.runTest,
            fields: this.props.fields,
            isApiLoaded: this.props.isApiLoaded,
            highLightField: this.highLightField,
            selectMainMenu: this.props.selectMainMenu,
            dateRange: this.props.dateRange,
            insightsMetrics: this.props.insightsMetrics,
            setInsightsMetrics: this.props.setInsightsMetrics,
        };
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

                { blockData.footer.type==='html' && <div className="burst-grid-item-footer" dangerouslySetInnerHTML={{__html: this.footerHtml}}></div>}
                { blockData.footer.type==='react' && <div className="burst-grid-item-footer">{wp.element.createElement(dynamicComponents[footer], DynamicBlockProps)}</div>}

            </div>
        );
    }
}

export default GridBlock;