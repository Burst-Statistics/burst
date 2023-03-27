import {useState, useEffect, useRef} from "@wordpress/element";
import { __ } from '@wordpress/i18n';
import * as burst_api from "../utils/api";
import Placeholder from '../Placeholder/Placeholder';

const OtherPlugins = (props) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [dataUpdated, setDataUpdated] = useState('');
  const [pluginData, setPluginData] = useState(false);

  useEffect(()=>{
    if ( !dataLoaded ) {
      burst_api.runTest('otherpluginsdata').then( ( response ) => {
        response.forEach(function(pluginItem, i) {
          response[i].pluginActionNice = pluginActionNice(pluginItem.pluginAction);
        });

        setPluginData(response);
        setDataLoaded(true);
      })
    }
  })

  const PluginActions = (slug, pluginAction, e) => {
    if (e) e.preventDefault();
    let data = {};
    data.slug = slug;
    data.pluginAction = pluginAction;
    let pluginItem = getPluginData(slug);
    if ( pluginAction==='download' ) {
      pluginItem.pluginAction = "downloading";
    } else if (pluginAction==='activate') {
      pluginItem.pluginAction = "activating";
    }
    pluginItem.pluginActionNice = pluginActionNice(pluginItem.pluginAction);
    updatePluginData(slug, pluginItem);
    if (pluginAction==='installed' || pluginAction === 'upgrade-to-premium') {
      return;
    }
    burst_api.doAction('plugin_actions', data).then( ( response ) => {
      pluginItem = response;
      updatePluginData(slug, pluginItem);
      PluginActions(slug, pluginItem.pluginAction);
    })
  }

  const getPluginData = (slug) => {
    return pluginData.filter((pluginItem) => {
      return (pluginItem.slug===slug)
    })[0];
  }

  const updatePluginData = (slug, newPluginItem) => {

    pluginData.forEach(function(pluginItem, i) {
      if (pluginItem.slug===slug) {
        pluginData[i] = newPluginItem;
      }
    });
    setPluginData(pluginData);
    setDataUpdated(slug+newPluginItem.pluginAction);

  }

  const pluginActionNice = (pluginAction) => {
    const statuses = {
      'download': __("Install", "burst-statistics"),
      'activate': __("Activate", "burst-statistics"),
      'activating': __("Activating...", "burst-statistics"),
      'downloading': __("Downloading...", "burst-statistics"),
      'upgrade-to-premium': __("Downloading...", "burst-statistics"),
    };
    return statuses[pluginAction];
  }

  const otherPluginElement = (plugin) => {

    return (
        <div key={plugin.slug} className={"burst-other-plugins-element burst-"+plugin.slug}>
          <a href={plugin.wordpress_url} target="_blank" title={plugin.title}>
            <div className="burst-bullet"></div>
            <div className="burst-other-plugins-content">{plugin.title}</div>
          </a>
          <div className="burst-other-plugin-status">
            {plugin.pluginAction==='upgrade-to-premium' && <><a target="_blank" href={plugin.upgrade_url}>{__("Upgrade", "burst-statistics")}</a></>}
            {plugin.pluginAction!=='upgrade-to-premium' && plugin.pluginAction!=='installed' && <>
              <a href="#" onClick={ (e) => PluginActions(plugin.slug, plugin.pluginAction, e) } >{plugin.pluginActionNice}</a></>}
            {plugin.pluginAction==='installed' && <>{__("Installed", "burst-statistics")}</>}
          </div>
        </div>
    )
  }
  if ( !dataLoaded ) {
    const n = 3;
    return (
        <div className="burst-other-plugins-container">
          {[...Array(n)].map((e, i) =>
          <div key={i} className={"burst-other-plugins-element"}>
              <a>
                <div className="burst-bullet"></div>
                <div className="burst-other-plugins-content">{__('Loading..', 'burst-statistics')}</div>
              </a>
              <div className="burst-other-plugin-status">{__("Activate", "burst-statistics")}</div>
            </div>
          )}
        </div>
      )
  }

  return (
        <div className="burst-other-plugins-container">
          { pluginData.map((plugin, i) => otherPluginElement(plugin, i)) }
        </div>
  )
}

export default OtherPlugins;
