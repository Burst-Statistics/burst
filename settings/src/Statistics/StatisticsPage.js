import {Filters} from './Filters';
import GridBlock from '../GridBlock';
import {useEffect} from 'react';

const StatisticsPage = (props) => {
  let blocks = burst_settings.blocks.statistics;
  useEffect(() => {
    //
    return;
  }, []);
  return (
      <>
        <Filters/>
        {blocks.map((block, i) => <GridBlock
                key={i}
                block={block}
                isApiLoaded={props.isAPILoaded}
                fields={props.fields}
                highLightField={props.highLightField}
                selectMainMenu={props.selectMainMenu}
                dateRange={props.dateRange}
                insightsMetrics={props.insightsMetrics}
                setInsightsMetrics={props.setInsightsMetrics}
            />,
        )}
      </>
  );
};
export default StatisticsPage;