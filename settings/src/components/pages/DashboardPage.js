import ProgressBlock from '../blocks/ProgressBlock';
import TodayBlock from '../blocks/TodayBlock';
import GoalsBlock from '../blocks/GoalsBlock';
import TipsTricksBlock from '../blocks/TipsTricksBlock';
import OtherPluginsBlock from '../blocks/OtherPluginsBlock';

const DashboardPage = () => {
  return (
      <div className={'burst-content-area burst-grid burst-dashboard'}>
        <ProgressBlock />
        <TodayBlock />
        <GoalsBlock />
        <TipsTricksBlock />
        <OtherPluginsBlock />
      </div>
  );
};
export default DashboardPage;