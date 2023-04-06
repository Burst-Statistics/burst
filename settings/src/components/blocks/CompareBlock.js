import Icon from '../../utils/Icon';
import {useEffect, useRef} from 'react';
import {useCompareStore} from '../../store/useCompareStore';
import {useFiltersStore} from '../../store/useFiltersStore';
import {useDate} from '../../store/useDateStore';
import ExplanationAndStatsItem from '../common/ExplanationAndStatsItem';
import {__} from '@wordpress/i18n';
import GridItem from '../common/GridItem';
import CompareFooter from './CompareFooter';

const CompareBlock = (props) => {
  const { startDate, endDate } = props;
  const {data, loading } = useCompareStore((state) => ({
    data: state.data,
    loading: state.loading,
  }));

  let loadingClass = loading ? 'burst-loading' : '';
  return (
      <GridItem
          title={__('Compare', 'burst-statistics')}
          footer={<CompareFooter startDate={startDate} endDate={endDate} />}
      >
      <div className={'burst-loading-container ' + loadingClass}>
        {Object.keys(data).map((key, i) => {
          let m = data[key];
          return (
              <ExplanationAndStatsItem
                  key={i}
                  iconKey={key}
                  title={m.title}
                  subtitle={m.subtitle}
                  value={m.value}
                  change={m.change}
                  changeStatus={m.changeStatus}
              />
          );
        })}
      </div>
      </GridItem>
  );
};

export default CompareBlock;

