import { __ } from '@wordpress/i18n';
import {
    useEffect,
    useState,
} from 'react';
import * as burst_api from "../utils/api";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';
import {parseISO, differenceInCalendarDays} from 'date-fns'
import {useInsightsStats} from '../data/statistics/insights';
import {useFilters} from '../data/statistics/filters';
import {useDate} from '../data/statistics/date';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const InsightsBlock  = (props) => {
  const {chartData, loading, fetchChartData, insightsMetrics} = useInsightsStats(state => state);
    const {filters} = useFilters();
    const {startDate, endDate, range} = useDate();

    useEffect(() => {
        let args = {
            filters: filters,
            metrics: insightsMetrics,
        };
        fetchChartData(startDate, endDate, range, args);
    }, [startDate, endDate, range, insightsMetrics, filters]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cubicInterpolationMode: 'monotone',
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    padding: 15,
                    font: {
                        size: 13,
                        weight: 400,
                    },
                },
            },
        },
        scales: {
            y: {
                ticks: {
                    beginAtZero: true,
                    stepSize: 20,
                    maxTicksLimit: 6,
                }
            },
            x: {
                ticks: {
                    maxTicksLimit: 8,
                }
            }
        },
        layout: {
            padding: 0,
        },
      };
    
    let loadingClass = loading ? 'burst-loading' : '';
    return(
          <Line className={"burst-loading-container " + loadingClass} options={options} data={chartData} />
    );
}

export default InsightsBlock;

