import PagePlaceholder from './Placeholder/PagePlaceholder';
import {useEffect, useState} from 'react';
import Header from './Header';
import getAnchor from './utils/getAnchor';
import Tour from './Tour';
import DashboardPage from './Dashboard/DashboardPage';
import StatisticsPage from './Statistics/StatisticsPage';
import Menu from './Settings/Menu/Menu';
import Settings from './Settings/Settings';
import Notices from './Settings/Notices';

// import data
import {useMenu} from './data/menu';
import {useFields} from './data/settings/fields';
import {useGoals} from './data/settings/goals';

const Page = () => {
  const {fetchSubMenuData, selectedMainMenuItem, menuLoaded} = useMenu();
  const {
    fields,
    changedFields,
    fetchFieldsData,
    updateFieldsData,
    fieldsLoaded,
  } = useFields();
  const {initGoals} = useGoals();


  // change pages
  useEffect(async () => {
    if (fieldsLoaded) {
      await fetchSubMenuData(fields);
    }
    window.addEventListener('hashchange', () => {
      fetchSubMenuData(fields);
    });
  }, [fields]);

  useEffect(async () => {
    let subMenuItem = getAnchor('menu');
    updateFieldsData(subMenuItem);
  }, [changedFields]);

  useEffect(async () => {
    let subMenuItem = getAnchor('menu');
    await fetchFieldsData(subMenuItem);
  }, []);

  // get goals fields & values
  useEffect(async () => {
    await initGoals();
  }, []);

  // without the temp var, it doesn't update in time
  let selectedMainMenu = getAnchor('main');
  return (
      <>
        <Header/>
        {menuLoaded && (<>
          <div className={'burst-content-area burst-grid burst-' +
              selectedMainMenuItem}>
            {(!burst_settings.tour_shown ||
                (getAnchor() === 'dashboard' && getAnchor('menu') ===
                    'tour')) && <Tour/>}
            {selectedMainMenuItem === 'dashboard' && <DashboardPage/>}
            {selectedMainMenuItem === 'statistics' && <StatisticsPage/>}
            {selectedMainMenuItem === 'settings' &&
                <>
                  <Menu/>
                  <Settings/>
                  <Notices className="cmplz-wizard-notices"/>
                </>
            }
          </div>
        </>)}
        {!menuLoaded && <PagePlaceholder/>}
      </>
  );
};

export default Page;