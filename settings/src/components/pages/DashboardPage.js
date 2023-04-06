// import {Component, Fragment} from 'react';
// import GridBlockOld from '../common/GridBlock';
//
// const DashboardPage = (props) => {
//
//   let blocks = burst_settings.blocks.dashboard;
//   return (
//       <div className={'burst-content-area burst-grid burst-dashboard'}>
//         {blocks.map((block, i) => <GridBlockOld key={i} block={block}
//                                                 props={props}/>)}
//       </div>
//   );
// };
// export default DashboardPage;

import {Filters} from '../blocks/Filters';
import {useEffect} from 'react';
import ProgressBlock from '../blocks/ProgressBlock';
import TodayBlock from '../blocks/TodayBlock';
import GoalsBlock from '../blocks/GoalsBlock';
import TipsTricksBlock from '../blocks/TipsTricksBlock';
import OtherPluginsBlock from '../blocks/OtherPluginsBlock';

import {__} from '@wordpress/i18n';
import {PageFilter} from '../blocks/PageFilter';

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