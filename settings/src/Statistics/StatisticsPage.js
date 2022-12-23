import {Filters} from './Filters';
import GridBlock from "../GridBlock";

const StatisticsPage = (props) => {
        let blocks = burst_settings.blocks.statistics;
        // @todo change to props?
        return (
            <>
               <Filters />
                {blocks.map((block, i) => <GridBlock
                    key={i}
                    block={block}
                    isApiLoaded={props.isAPILoaded}
                    fields={props.fields}
                    highLightField={props.highLightField}
                    selectMainMenu={props.selectMainMenu}
                    dateRange = {props.dateRange}
                    insightsMetrics = {props.insightsMetrics}
                    setInsightsMetrics = {props.setInsightsMetrics}
                />
                )}
            </>
        );
}
export default StatisticsPage