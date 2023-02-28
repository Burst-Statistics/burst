import {__} from '@wordpress/i18n';
import {
  useState,
} from 'react';

import * as burst_api from './utils/api';

import ProgressHeader from './Dashboard/ProgressHeader';
import ProgressBlock from './Dashboard/ProgressBlock';
import ProgressFooter from './Dashboard/ProgressFooter';
import OtherPlugins from './Dashboard/OtherPlugins';

import TodayBlock from './Dashboard/TodayBlock';
import GoalsHeader from './Dashboard/GoalsHeader';
import GoalsBlock from './Dashboard/GoalsBlock';

import CompareBlock from './Statistics/CompareBlock';
import CompareFooter from './Statistics/CompareFooter';
import InsightsHeader from './Statistics/InsightsHeader';
import InsightsBlock from './Statistics/InsightsBlock';
import DevicesBlock from './Statistics/DevicesBlock';

import PagesBlock from './Statistics/PagesBlock';
import ReferrersBlock from './Statistics/ReferrersBlock';
import {useEffect} from 'react';

const GridBlock = (props) => {
  let blockData = props.block;
  let content = props.block.content;
  let footer = props.block.footer;
  let footerHtml = props.block.footer.data;

  if (content.type === 'html') {
    content = content.data;
  }
  if (footer.type === 'html') {
    footer = footer.data;
  }
  if (content.type === 'react') {
    content = content.data;
  }
  if (footer.type === 'react') {
    footer = footer.data;
  }

  /**
   * Mapping of components, for use in the config array
   * @type {{ProgressFooter: JSX.Element}}
   */
  let dynamicComponents = {
    'ProgressHeader': ProgressHeader,
    'ProgressBlock': ProgressBlock,
    'ProgressFooter': ProgressFooter,
    'TodayBlock': TodayBlock,
    'GoalsHeader': GoalsHeader,
    'GoalsBlock': GoalsBlock,
    'OtherPlugins': OtherPlugins,
    'CompareBlock': CompareBlock,
    'CompareFooter': CompareFooter,
    'InsightsHeader': InsightsHeader,
    'InsightsBlock': InsightsBlock,
    'DevicesBlock': DevicesBlock,
    'PagesBlock': PagesBlock,
    'ReferrersBlock': ReferrersBlock,
  };

  let className = 'burst-grid-item ' + blockData.class + ' burst-' + blockData.id;
  let DynamicBlockProps = {
    saveChangedFields: props.saveChangedFields,
    fields: props.fields,
    selectMainMenu: props.selectMainMenu,
    dateRange: props.dateRange,
    insightsMetrics: props.insightsMetrics,
    setInsightsMetrics: props.setInsightsMetrics,
  };
  return (
      <div className={className}>
        <div className="burst-grid-item-header">
          <h3 className="burst-grid-title burst-h4">{blockData.title}</h3>
          <div className="burst-grid-item-controls">
            {blockData.controls && blockData.controls.type === 'url' &&
                <a href={blockData.controls.data}>
                  {__('Instructions', 'burst-statistics')}
                </a>
            }
            {blockData.controls && blockData.controls.type === 'html' &&
                <span className="burst-header-html" dangerouslySetInnerHTML={{__html: blockData.controls.data}}></span>
            }
            {blockData.controls && blockData.controls.type === 'react' &&
                wp.element.createElement( dynamicComponents[blockData.controls.data], DynamicBlockProps)
            }
          </div>
        </div>
        {blockData.content.type !== 'react' &&
            <div className="burst-grid-item-content" dangerouslySetInnerHTML={{__html: content}}></div>
        }
        {blockData.content.type === 'react' &&
            <div className="burst-grid-item-content">
              {wp.element.createElement(dynamicComponents[content], DynamicBlockProps)}
            </div>
        }

        {blockData.footer.type === 'html' &&
            <div className="burst-grid-item-footer" dangerouslySetInnerHTML={{__html: footerHtml}}></div>
        }
        {blockData.footer.type === 'react' &&
            <div className="burst-grid-item-footer">
              {wp.element.createElement(dynamicComponents[footer], DynamicBlockProps)}
            </div>
        }

      </div>
  );
};
export default GridBlock;