import { __ } from '@wordpress/i18n';
import {
    useEffect,
    useState,
} from '@wordpress/element';
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
    const dateRange = props.dateRange;
    const selectedMetrics = props.insightsMetrics.metrics;
    const startDate = dateRange.startDate;
    const endDate = dateRange.endDate;
    const range = dateRange.range;
    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState(
        {
            labels: ['', '', '', '', '', '', ''],
            datasets: [
              {
                label: __('Unique visitors', 'burst-statistics'),
                data: [0, 0, 0, 0, 0, 0, 0],
                borderColor: 'rgba(0,159,255, 1)',
                backgroundColor: 'rgba(0,159,255, 0.2)',
              },
              {
                label: __('Pageviews', 'burst-statistics'),
                data: [0, 0, 0, 0, 0, 0, 0],
                borderColor: 'rgba(244, 191, 62, 1)',
                backgroundColor: 'rgba(244, 191, 62, 0.2)',
              },
            ],
          }
    );


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

    useEffect(() => {
        // if startDate and endDate are less than two days apart, show hours as interval
        const startDateObj = parseISO(startDate);
        const endDateObj = parseISO(endDate);
        const diffDays = differenceInCalendarDays(endDateObj, startDateObj) + 1;
        let interval = 'hour';
        if (diffDays >= 3) {
            interval = 'day';
        }


        let args = {
            metrics: selectedMetrics,
            interval: interval,
        }
        getInsightsData(startDate, endDate, args).then((response) => {
            setChartData(response);
        }).catch((error) => {
            console.error(error);
        });
      }, [dateRange, props.insightsMetrics]);

    function getInsightsData(startDate, endDate, args){
      setLoading(true);
        return burst_api.getData('insights', startDate, endDate, range, args).then( ( response ) => {
            setLoading(false);
            return response;
        });
    }
    
    let loadingClass = loading ? 'burst-loading' : '';
    return(
          <Line className={"burst-loading-container " + loadingClass} options={options} data={chartData} />
    );
}

export default InsightsBlock;

