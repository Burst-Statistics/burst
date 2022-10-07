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
import {format, parseISO, differenceInDays} from 'date-fns'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
// @todo if less than 2 days, show hours



const InsightsBlock  = (props) => {
    const dateRange = props.dateRange;
    const startDate = dateRange.startDate;
    const endDate = dateRange.endDate;
    const [chartData, setChartData] = useState(
        {
            labels: ['', '', '', '', '', '', ''],
            datasets: [
              {
                label: '',
                data: [0, 0, 0, 0, 0, 0, 0],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
              {
                label: '',
                data: [0, 0, 0, 0, 0, 0, 0],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
              },
            ],
          }
    );
    
    const [metrics, setMetrics] = useState(['visitors', 'pageviews', 'bounces', 'sessions']);

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
                    stepSize: 1,
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
        const diffDays = differenceInDays(endDateObj, startDateObj);
        const interval = diffDays < 3 ? 'hour' : 'day';

        let args = {
            metrics: metrics,
            interval: interval,
        }
        getInsightsData(startDate, endDate, args).then((response) => {
            setChartData(response);
        }).catch((error) => {
            console.error(error);
        });
      }, [dateRange, metrics]
    )

    function getInsightsData(startDate, endDate, args){
        return burst_api.getData('insights', startDate, endDate, args).then( ( response ) => {
            return response.data;
        });
    }
    

    return(
        <Line options={options} data={chartData} />
    );
}

export default InsightsBlock;

