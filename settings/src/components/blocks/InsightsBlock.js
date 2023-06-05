import {__} from '@wordpress/i18n';
import GridItem from '../common/GridItem';
import InsightsHeader from './InsightsHeader';
import {useInsightsStore} from '../../store/useInsightsStore';
import {useEffect, useState} from "react";

const InsightsBlock = ({filters}) => {
  const data = useInsightsStore((state) => state.data);
  const metrics = useInsightsStore((state) => state.metrics);
  const loading = useInsightsStore((state) => state.loading);
  const [InsightsGraph, setInsightsGraph] = useState(null);

  useEffect(() => {
    if (!InsightsGraph){
        import ('./InsightsGraph').then(({default: InsightsGraph}) => {
            setInsightsGraph(() => InsightsGraph);
        });
    }
  }, []);

  return (
      <GridItem
          className={'burst-column-2'}
          title={__('Insights', 'burst-statistics')}
          controls={<InsightsHeader metrics={metrics} filters={filters}/>}
      >
          { data && InsightsGraph && <InsightsGraph loading={loading} data={data}/> }
      </GridItem>
  );
};

export default InsightsBlock;