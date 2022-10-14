import {Component, Fragment} from "@wordpress/element";
import GridBlock from "../GridBlock";

class StatisticsPage extends Component {
    constructor() {
        super( ...arguments );
    }

    render() {
        let blocks = burst_settings.blocks.statistics;
        return (
            <>
                {blocks.map((block, i) => <GridBlock
                    key={i}
                    block={block}
                    isApiLoaded={this.props.isAPILoaded}
                    fields={this.props.fields}
                    highLightField={this.props.highLightField}
                    selectMainMenu={this.props.selectMainMenu}
                    dateRange = {this.props.dateRange}
                    insightsMetrics = {this.props.insightsMetrics}
                    setInsightsMetrics = {this.props.setInsightsMetrics}
                />
                )}
            </>
        );
    }
}
export default StatisticsPage