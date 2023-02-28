import {Component, Fragment} from 'react';
import GridBlock from '../GridBlock';

const DashboardPage = (props) => {

  let blocks = burst_settings.blocks.dashboard;
  return (
      <>
        {blocks.map((block, i) => <GridBlock key={i} block={block}
                                             props={props}/>)}
      </>
  );
};
export default DashboardPage;