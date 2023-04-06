import {__} from '@wordpress/i18n';
import GridItem from '../common/GridItem';
import InsightsGraph from './InsightsGraph';
import InsightsHeader from './InsightsHeader';
import {useInsightsStore} from '../../store/useInsightsStore';
import {useEffectAfterMount} from '../../hooks/useEffectAfterMount';

const InsightsBlock = ({filters}) => {
  const data = useInsightsStore((state) => state.data);
  const metrics = useInsightsStore((state) => state.metrics);
  const loading = useInsightsStore((state) => state.loading);

  return (
      <GridItem
          className={'burst-column-2'}
          title={__('Insights', 'burst-statistics')}
          controls={<InsightsHeader metrics={metrics} filters={filters}/>}
      >
          { data && <InsightsGraph loading={loading} data={data}/> }
      </GridItem>
  );
};

export default InsightsBlock;