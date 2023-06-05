
import getAnchor from '../utils/getAnchor';
import Header from './common/Header';
import Tour from './common/Tour';
import DashboardPage from './pages/DashboardPage';
import StatisticsPage from './pages/StatisticsPage';
import SettingsPage from './pages/SettingsPage';
import PagePlaceholder from './pages/PagePlaceholder';
import {useMenu} from '../store/useMenuStore';
import {useDate} from '../store/useDateStore';
import {useFiltersStore} from '../store/useFiltersStore';
import {useEffect, useMemo, useState} from 'react';
import {useFields} from '../store/useFieldsStore';
import {useGoalsStore} from '../store/useGoalsStore';
import {LoadData} from './LoadData';
import {useInsightsStore} from '../store/useInsightsStore';
import {useCompareStore, transformCompareData} from '../store/useCompareStore';
import {useDevicesStore,transformDevicesData} from '../store/useDevicesStore';
import {usePagesStore,transformPagesData} from '../store/usePagesStore';
import {useReferrersStore,transformReferrersData} from '../store/useReferrersStore';

const Page = () => {
  const menuLoaded = useMenu((state) => state.menuLoaded);
  const selectedMainMenuItem = useMenu((state) => state.selectedMainMenuItem);
  const fetchSubMenuData = useMenu((state) => state.fetchSubMenuData);
  const fields = useFields((state) => state.fields);
  const fieldsLoaded = useFields((state) => state.fieldsLoaded);
  const fetchFieldsData = useFields((state) => state.fetchFieldsData);
  const [ToastContainer, setToastContainer] = useState(null);

  // change pages
  useEffect(() => {
    const run = async () => {
      if (fieldsLoaded) {
        await fetchSubMenuData(fields);
      }
      window.addEventListener('hashchange', () => {
        fetchSubMenuData(fields);
      });
    }
    run();
  }, [fields]);

  useEffect( () => {
    let subMenuItem = getAnchor('menu');
    fetchFieldsData(subMenuItem);
    // initGoals();
  }, []);

  // async load react-toastify
  useEffect(() => {
    import('react-toastify').then((module) => {
      const ToastContainer = module.ToastContainer;
      setToastContainer(() => ToastContainer);
    });
  }, []);

  let selectedMainMenu = getAnchor('main');
  return (
      <>
        <Header />
        {menuLoaded ? (
            <>
                {(!burst_settings.tour_shown || (getAnchor() === 'dashboard' && getAnchor('menu') === 'tour')) && <Tour />}
                {selectedMainMenuItem === 'dashboard' && <DashboardPage />}
                {selectedMainMenuItem === 'statistics' && <StatisticsPage />}
                {selectedMainMenuItem === 'settings' && <SettingsPage />}
            </>
        ) : (
            <PagePlaceholder />
        )}
        {ToastContainer && (
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                limit={3}
                hideProgressBar
                newestOnTop
                closeOnClick
                pauseOnFocusLoss
                pauseOnHover
                theme="light"
            />
        )}
        <LoadData />
      </>
  );
};

export default Page;