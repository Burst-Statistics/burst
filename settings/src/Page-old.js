import {useState} from 'react';
import * as burst_api from './utils/api';
import Header from './Header';
import DashboardPage from './Dashboard/DashboardPage';
import StatisticsPage from './Statistics/StatisticsPage';
import SettingsPage from './Settings/SettingsPage';
import PagePlaceholder from './Placeholder/PagePlaceholder';
import getAnchor from './utils/getAnchor';
import Tour from './Tour';
import {__} from '@wordpress/i18n';
import {
  format,
  subDays,
  addDays,
  startOfDay,
  endOfDay,
  getUnixTime,
  parse,
} from 'date-fns';

const Page = () => {
  const [isAPILoaded, setIsAPILoaded] = useState(false);
  const [pageProps, setPageProps] = useState({
    licenseStatus: burst_settings.licenseStatus,
  });
  const [selectedMainMenuItem, setSelectedMainMenuItem] = useState('');
  const [selectedMenuItem, setSelectedMenuItem] = useState('');
  const [selectedStep, setSelectedStep] = useState(1);
  const [menu, setMenu] = useState([]);
  const [fields, setFields] = useState(getFields());
  const [highLightedField, setHighLightedField] = useState('');
  let nextMenuItem = '';
  let prevMenuItem = '';
  const [dateRange, setDateRange] = useState({
    startDate: format(startOfDay(subDays(new Date(), 7)), 'yyyy-MM-dd'),
    endDate: format(endOfDay(subDays(new Date(), 1)), 'yyyy-MM-dd'),
    range: 'last-7-days',
  });
  const [insightsMetrics, setInsightsMetrics] = useState({
    metrics: ['visitors', 'pageviews'],
  });

  window.addEventListener('hashchange', () => {
    let selectedMainMenuItem = getAnchor('main') || 'dashboard';
    menu = getSelectedMenu(superMenu, selectedMainMenuItem);
    setSelectedMainMenuItem(selectedMainMenuItem);
    setSelectedMenuItem(getDefaultMenuItem());
    setMenu(menu);
    getPreviousAndNextMenuItems;
  });

  const updateFields = (fields) => {
    setFields(fields); // @todo simplify
  };

  /*
 * filter sidebar menu from complete menu structure
 */

  const getSelectedMenu = (superMenu, selectedMainMenuItem) => {
    for (const key in superMenu) {
      if (superMenu.hasOwnProperty(key)) {
        if (superMenu[key] && superMenu[key].id === selectedMainMenuItem) {
          return superMenu[key];
        }
      }
    }
  };

  function getFields () {
    return burst_api.getFields().then((response) => {
      let superMenu = response.menu;
      let selectedMainMenuItem = getAnchor('main') || 'dashboard';
      setMenu(getSelectedMenu(superMenu, selectedMainMenuItem));
      setSelectedMainMenuItem(selectedMainMenuItem);
      setSelectedMenuItem(getDefaultMenuItem());
      setFields(response.fields);
      setIsAPILoaded(true);

      getPreviousAndNextMenuItems();
    });
  }
  /**
   * Allow child blocks to set data on the gridblock
   * @param key
   * @param value
   */
  const setPagePropsx = (key, value) => {
    setPageProps(...pageProps[key] = value);
  };

  // const setDateRange = (dateRange) => {
  //   setState({
  //     dateRange: {
  //       startDate: format(dateRange.startDate, 'yyyy-MM-dd'),
  //       endDate: format(dateRange.endDate, 'yyyy-MM-dd'),
  //       range: dateRange.range,
  //     },
  //   });
  // };

  // const setInsightsMetrics = (metrics) => {
  //   setState({
  //     insightsMetrics: {
  //       metrics: metrics,
  //     },
  //   });
  // };

  function selectMenu(selectedMenuItem) {
    setState({
      selectedMenuItem: selectedMenuItem,
    });
  }

  function selectStep(selectedStep) {
    setState({
      selectedStep: selectedStep,
    });
  }

  function getDefaultMenuItem() {
    let fallBackMenuItem = menu && menu.menu_items.hasOwnProperty(0)
        ? menu.menu_items[0].id
        : 'general';
    let anchor = getAnchor('menu');
    let foundAnchorInMenu = false;
    //check if this anchor actually exists in our current submenu. If not,
    // clear it
    for (const key in menu.menu_items) {
      if (menu.menu_items.hasOwnProperty(key) && menu.menu_items[key].id ===
          anchor) {
        foundAnchorInMenu = true;
      }
    }
    if (!foundAnchorInMenu) {
      anchor = false;
    }
    return anchor ? anchor : fallBackMenuItem;
  }

  function selectMainMenu(selectedMainMenuItem) {
    menu = getSelectedMenu(superMenu, selectedMainMenuItem);
    let selectedMenuItem = getDefaultMenuItem();
    setState({
      menu: menu,
      selectedMainMenuItem: selectedMainMenuItem,
      selectedMenuItem: selectedMenuItem,
    });
  }

  /*
   * Update a field
   * @param field
   */
  function updateField(id, value) {
    let fields = fields;
    for (const fieldItem of fields) {
      if (fieldItem.id === id) {
        fieldItem.value = value;
      }
    }
    fields = fields;
    setState({
      fields: fields,
    });
  }

  /*
* Allow children to check a field value from another page (in a page, only visible fields are know)
*/
  function getFieldValue(id) {
    let fields = fields;
    for (const fieldItem of fields) {
      if (fieldItem.id === id) {
        return fieldItem.value;
      }
    }
    return false;
  }

  function addHelp(id, label, text, title) {
    //create help object
    let help = {};
    help.label = label;
    help.text = text;
    if (title) {
      help.title = title;
    }
    let fields = fields;

    //add to selected field
    for (const fieldItem of fields) {
      if (fieldItem.id === id && !fieldItem.help) {
        fieldItem.help = help;
        fields = fields;
        setState({
          fields: fields,
        });
      }
    }
  }

  function highLightField(fieldId) {
    //switch to settings page
    selectMainMenu('settings');
    //get menu item based on fieldId
    let selectedField = null;
    let fields = fields.filter(field => field.id === fieldId);
    if (fields.length) {
      selectedField = fields[0];
      selectMenu(selectedField.menu_id);
    }
    setHighLightedField(fieldId);
  }

  // Parses menu items and nested items in single array
  function menuItemParser(parsedMenuItems, menuItems) {

    menuItems.forEach((menuItem) => {
      if (menuItem.visible) {
        parsedMenuItems.push(menuItem.id);
        if (menuItem.hasOwnProperty('menu_items')) {
          menuItemParser(parsedMenuItems, menuItem.menu_items);
        }
      }
    });

    return parsedMenuItems;
  }

  function getPreviousAndNextMenuItems() {
    let prevMenuItem;
    let nextMenuItem;
    const {menu_items: menuItems} = state.menu;

    const parsedMenuItems = [];
    menuItemParser(parsedMenuItems, menuItems);

    // Finds current menu item index
    const currentMenuItemIndex = parsedMenuItems.findIndex(
        (menuItem) => menuItem === state.selectedMenuItem);

    if (currentMenuItemIndex !== -1) {
      prevMenuItem = parsedMenuItems[currentMenuItemIndex === 0
          ? ''
          : currentMenuItemIndex - 1];
      nextMenuItem = parsedMenuItems[currentMenuItemIndex ===
      parsedMenuItems.length - 1 ? '' : currentMenuItemIndex + 1];

      setState({
        prevMenuItem: prevMenuItem ? prevMenuItem : parsedMenuItems[0],
        nextMenuItem: nextMenuItem
            ? nextMenuItem
            : parsedMenuItems[parsedMenuItems.length - 1],
      });
    }

    return {nextMenuItem, prevMenuItem};
  }

  return (

      <div className="burst-wrapper">
        {!isAPILoaded && <PagePlaceholder></PagePlaceholder>}
        {isAPILoaded &&
            (
                <>
                  <Header
                      selectedMainMenuItem={selectedMainMenuItem}
                      selectMainMenu={selectMainMenu}
                      superMenu={superMenu}
                      dateRange={state.dateRange}
                      setDateRange={setDateRange}
                      fields={fields}/>
                  <div className={'burst-content-area burst-grid burst-' +
                      selectedMainMenuItem}>
                    {(!burst_settings.tour_shown ||
                        (getAnchor() === 'dashboard' && getAnchor('menu') ===
                            'tour')) && <Tour/>}
                    {selectedMainMenuItem === 'dashboard' &&
                        <DashboardPage
                            isAPILoaded={isAPILoaded}
                            fields={fields}
                            selectMainMenu={selectMainMenu}
                            highLightField={highLightField}
                            pageProps={pageProps}
                        />
                    }
                    {/*{ selectedMainMenuItem === 'statistics' &&*/}
                    {/*    <StatisticsPage*/}
                    {/*        isAPILoaded={isAPILoaded}*/}
                    {/*        fields={fields}*/}
                    {/*        selectMainMenu={selectMainMenu}*/}
                    {/*        highLightField={highLightField}*/}
                    {/*        pageProps={pageProps}*/}
                    {/*        dateRange = {state.dateRange}*/}
                    {/*        insightsMetrics = {state.insightsMetrics}*/}
                    {/*        setInsightsMetrics = {setInsightsMetrics}*/}
                    {/*    />*/}
                    {/*}*/}
                    {/*{ selectedMainMenuItem === 'settings' &&*/}
                    {/*    <SettingsPage*/}
                    {/*        updateFields={updateFields}*/}
                    {/*        updateProgress={updateProgress}*/}
                    {/*        pageProps={pageProps}*/}
                    {/*        getDefaultMenuItem={getDefaultMenuItem}*/}
                    {/*        updateField={updateField}*/}
                    {/*        getFieldValue={getFieldValue}*/}
                    {/*        addHelp={addHelp}*/}
                    {/*        setPageProps={setPageProps}*/}
                    {/*        selectMenu={selectMenu}*/}
                    {/*        selectStep={selectStep}*/}
                    {/*        selectedStep={state.selectedStep}*/}
                    {/*        highLightField={highLightField}*/}
                    {/*        highLightedField={highLightedField}*/}
                    {/*        selectedMenuItem={selectedMenuItem}*/}
                    {/*        selectedMainMenuItem={selectedMainMenuItem}*/}
                    {/*        selectMainMenu={selectMainMenu}*/}
                    {/*        isAPILoaded={isAPILoaded}*/}
                    {/*        fields={fields}*/}
                    {/*        goal_fields={goal_fields}*/}
                    {/*        menu={menu}*/}
                    {/*        getPreviousAndNextMenuItems={getPreviousAndNextMenuItems}*/}
                    {/*        nextMenuItem={state.nextMenuItem}*/}
                    {/*        prevMenuItem={state.prevMenuItem} />*/}
                    {/*}*/}
                  </div>
                </>
            )
        }
      </div>
  );
}
export default Page