import { __ } from '@wordpress/i18n';
import {
    useState,
    useEffect
} from '@wordpress/element';
import Placeholder from '../Placeholder/Placeholder';

import * as burst_api from "../utils/api";
import { getPercentage} from '../utils/formatting';
import Icon from '../utils/Icon';

const DevicesBlock = (props) => {
    const dateRange = props.dateRange;
    const startDate = dateRange.startDate;
    const endDate = dateRange.endDate;
    const range = dateRange.range;
    const deviceNames = {
        'desktop': __('Desktop', 'burst-statistics'),
        'tablet': __('Tablet', 'burst-statistics'),
        'mobile': __('Mobile', 'burst-statistics'),
        'other': __('Other', 'burst-statistics'),
    };
    let [loading, setLoading] = useState(true);
    let defaultData = {};
    // loop through metrics and set default values
    Object.keys(deviceNames).forEach(function (key) {
        defaultData[key] = {
            'title': deviceNames[key],
            'subtitle': '-',
            'value': '-%',
        };
    })
    const [devices, setDevicesData] = useState(defaultData);


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
        setLoading(true);
        return burst_api.getData('devices', startDate, endDate, range, args).then( ( response ) => {
            setLoading(false);
            return response;
        });
    }

    let loadingClass = loading ? 'burst-loading' : '';
    if (devices) {
        return(
            <div className={"burst-loading-container " + loadingClass}>
                {Object.keys(devices).map((key, i) => {
                    let m = devices[key];
                    return <div className="block__explanation-and-stats" key={i}>
                        <Icon name={key} />
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
            </div>
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

