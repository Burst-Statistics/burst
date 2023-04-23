import {doAction} from "../../../utils/api";
import { __ } from '@wordpress/i18n';
import {useFields} from '../../../store/useFieldsStore';
import useLicenseStore from "../../../store/useLicenseStore";
import {useState, useEffect} from "@wordpress/element";
import TaskElement from "../TaskElement";
const License = (props) => {
    const {fields, setChangedField, updateField} = useFields();
    const {licenseStatus, setLicenseStatus} = useLicenseStore();
    const [noticesLoaded, setNoticesLoaded] = useState(false);
    const [notices, setNotices] = useState(false);
    const getLicenseNotices = () => {
        return doAction('license_notices', {}).then( ( response ) => {
            return response;
        });
    }

    useEffect( () => {
        getLicenseNotices().then(( response ) => {
            setLicenseStatus(response.licenseStatus);
            setNotices(response.notices);
            setNoticesLoaded(true);
        });
    }, [fields] );

    const onChangeHandler = (fieldValue) => {
        setChangedField( field.id, fieldValue )
        updateField(field.id, fieldValue);
    }

    const toggleActivation = () => {
         setNoticesLoaded(false);
        if ( licenseStatus==='valid' ) {
            doAction('deactivate_license').then( ( response ) => {
                setLicenseStatus(response.licenseStatus);
                setNotices(response.notices);
                setNoticesLoaded(true);
            });
        } else {
            let data = {};
            data.license = props.field.value;

			doAction('activate_license', data).then( ( response ) => {
                setLicenseStatus(response.licenseStatus);
                setNotices(response.notices);
                setNoticesLoaded(true);
            });
        }
    }

    let field = props.field;
	/**
     * There is no "PasswordControl" in WordPress react yet, so we create our own license field.
     */
    return (
            <div className="components-base-control">
             <div className="components-base-control__field">
                 <label
                     className="components-base-control__label"
                     htmlFor={field.id}>{field.label}</label>
                  <div className="rsssl-license-field">
                     <input className="components-text-control__input"
                            type="password"
                            id={field.id}
                            value={field.value}
                            onChange={ ( e ) => onChangeHandler(e.target.value) }
                     />
                     <button className="button button-default" onClick={ () => toggleActivation() }>
                     {licenseStatus==='valid' && <>{__("Deactivate","really-simple-ssl")}</>}
                     {licenseStatus!=='valid' && <>{__("Activate","really-simple-ssl")}</>}
                     </button>
                 </div>
             </div>
                {!noticesLoaded && <>Loading...</>}
                {noticesLoaded && notices.map((notice, i) => <TaskElement key={i} index={i} notice={notice} highLightField=""/>)}
            </div>
    );
}

export default License;
