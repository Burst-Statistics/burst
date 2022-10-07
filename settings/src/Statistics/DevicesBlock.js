import { __ } from '@wordpress/i18n';
import {
    useState,
    useEffect
} from '@wordpress/element';
import Placeholder from '../Placeholder/Placeholder';

import * as burst_api from "../utils/api";

const DevicesBlock = (props) => {
    const dateRange = props.dateRange;
    const startDate = dateRange.startDate;
    const endDate = dateRange.endDate;
    const [devices, setDevicesData] = useState(false);
    const deviceNames = {
        'desktop': __('Desktop', 'burst-statistics'),
        'tablet': __('Tablet', 'burst-statistics'),
        'mobile': __('Mobile', 'burst-statistics'),
        'other': __('Other', 'burst-statistics'),
    };

    useEffect(() => {
            getDevicesData(startDate, endDate).then((response) => {
                // loop through object deviceNames and place and edit data to be ready for display
                let data = {};
                for (const [key, value] of Object.entries(deviceNames)) {
                    let os = response[key].os ? response[key].os : '-';
                    let browser = response[key].browser ? response[key].browser : 'unknown';

                    Object.assign(data, {
                        [key]: {
                            'title': value,
                            'subtitle': os + ' / ' + browser,
                            'value': getPercentage(response[key].count, response['all'].count),
                        }
                    });
                }

                setDevicesData(data);
            }).catch((error) => {
                console.error(error);
            });
        }, [startDate, endDate]
    )

    function getDevicesData(startDate, endDate, args){
        return burst_api.getData('devices', startDate, endDate, args).then( ( response ) => {
            return response.data;
        });
    }

    function getPercentage(val, total){
        val = Number(val);
        total = Number(total);
        let percentage =  val / total;
        if (isNaN(percentage) || !isFinite(percentage)) {
            percentage = 0;
        }
        return new Intl.NumberFormat(
            undefined,
            {
                style: 'percent',
                maximumFractionDigits: 1,
            }).format(percentage);
    }

    if (devices) {
        return(
            <>
                {Object.keys(devices).map((key, i) => {
                    let m = devices[key];
                    return <div className="block__explanation-and-stats" key={i}>
                        <div className="block__explanation-and-stats__left">
                            <h3 className="burst-h5">{m.title}</h3>
                            <p>{m.subtitle}</p>
                        </div>
                        <div className="block__explanation-and-stats__right">
                            <span className="burst-h4">{m.value}</span>
                            <p className={'uplift ' + m.changeStatus}>
                                {m.change}
                            </p>
                        </div>
                    </div>
                })}
            </>
        );
    } else {
        return (
            <Placeholder lines = '10'/>
        )
    }
}


export default DevicesBlock;



// import { __ } from '@wordpress/i18n';
// import {
//     Component,
// } from '@wordpress/element';
//
// class DevicesBlock extends Component {
//     render(){
//         let title = __('Desktop', 'burst-statistics');
//         let subtitle = 'Windows / Chrome';
//         let number = '52%';
//         let uplift = ''
//         let uplift_status = '';
//
//         return(
//             <>
//                 <div className="block__explanation-and-stats">
//                     <div className="block__explanation-and-stats__left">
//                         <h3 className="burst-h5">{title}</h3>
//                         <p>{subtitle}</p>
//                     </div>
//                     <div className="block__explanation-and-stats__right">
//                         <span className="burst-h4">{number}</span>
//                         <p className={uplift_status}>{uplift}</p>
//                     </div>
//                 </div>
//                 <div className="block__explanation-and-stats">
//                     <div className="block__explanation-and-stats__left">
//                         <h3 className="burst-h5">{title}</h3>
//                         <p>{subtitle}</p>
//                     </div>
//                     <div className="block__explanation-and-stats__right">
//                         <span className="burst-h4">{number}</span>
//                         <p className={uplift_status}>{uplift}</p>
//                     </div>
//                 </div>
//                 <div className="block__explanation-and-stats">
//                     <div className="block__explanation-and-stats__left">
//                         <h3 className="burst-h5">{title}</h3>
//                         <p>{subtitle}</p>
//                     </div>
//                     <div className="block__explanation-and-stats__right">
//                         <span className="burst-h4">{number}</span>
//                         <p className={uplift_status}>{uplift}</p>
//                     </div>
//                 </div>
//                 <div className="block__explanation-and-stats">
//                     <div className="block__explanation-and-stats__left">
//                         <h3 className="burst-h5">{title}</h3>
//                         <p>{subtitle}</p>
//                     </div>
//                     <div className="block__explanation-and-stats__right">
//                         <span className="burst-h4">{number}</span>
//                         <p className={uplift_status}>{uplift}</p>
//                     </div>
//                 </div>
//             </>
//         );
//     }
// }
//
// export default DevicesBlock;

