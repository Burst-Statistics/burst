import Icon from '../../../utils/Icon';
import Tooltip from '../../common/Tooltip';
import {useFields} from "../../../store/useFieldsStore";
import {useEffect, useState} from '@wordpress/element';
import {__} from '@wordpress/i18n';
import {useGoalsStore} from "../../../store/useGoalsStore";

const RadioButtons = ({
  disabled,
  field: {id, options},
  goal_id,
  label,
  value,
  onChangeHandler,
  className,
}) => {
    const getFieldValue = useFields((state) => state.getFieldValue);
    const fieldsLoaded = useFields((state) => state.fieldsLoaded);
    const [cookieless, setCookieless] = useState(false);
    useEffect(() => {
        if (fieldsLoaded) {
            setCookieless(getFieldValue('enable_cookieless_tracking')==1);
        }
    }, [fieldsLoaded, getFieldValue('enable_cookieless_tracking') ]);

    return (
      <div className={`burst-radio-buttons ${className}`}>
        <p className="burst-label">{label}</p>
        <div className="burst-radio-buttons__list">
          {Object.keys(options).map(key => {
            const {type, icon, label, description} = options[key];
            return (
                <Tooltip title={description} arrow key={key} enterDelay={1000}>
                  <div key={`${goal_id}-${id}-${type}`}
                       className='burst-radio-buttons__list__item'>
                    <input
                        type="radio"
                        checked={type === value}
                        name={`${goal_id}-${id}`}
                        id={`${goal_id}-${id}-${type}`}
                        value={type}
                        disabled={disabled || (cookieless && type === 'hook') }
                        onChange={e => {
                          onChangeHandler(e.target.value);
                        }}
                    />
                    <label htmlFor={`${goal_id}-${id}-${type}`} className={ cookieless && type === 'hook' ? 'burst-disabled-radio' : ''}>
                      <Icon name={icon} size={18}/>
                      <h5>{label}</h5>
                      {description && description.length > 1 && (
                          <>
                            <div className="burst-divider"/>
                            <p>{cookieless && type === 'hook' ? __("Not available with cookieless tracking", "burst-statistics") : description}</p>
                          </>
                      )}
                    </label>
                  </div>
                </Tooltip>
            );
          })}
        </div>
      </div>
  );
};

export default RadioButtons;