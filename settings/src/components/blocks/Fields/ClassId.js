import RadioButtons from './RadioButtons';
import { __, sprintf } from '@wordpress/i18n';
import {useEffect, useState, useRef} from 'react';
import TextInput from './TextInput';
const ClassId = (props) => {
  const { field, goal_id, label, help, value, onChangeHandler } = props;
  const [classOrId, setClassOrId] = useState(value.attribute || 'class');
  const [classOrIdValue, setClassOrIdValue] = useState(value.value);
  const [warning, setWarning] = useState('');
  const warningTimeoutRef = useRef(null);

  let fields = {...field};
  fields.options = {
    'class': {
      type: 'class',
      icon: 'period',
      label: __('Class', 'burst-statistics'),
      // description: __( '', 'burst-statistics' )
    },
    'id': {
      type: 'id',
      icon: 'hashtag',
      label: __('ID', 'burst-statistics'),
      // description: __('Add an id to the element', 'burst-statistics')
    }
  }

  const handleRadioButtonChange = (value) => {
    setClassOrId(value);
    onChangeHandler({attribute: value, value: classOrIdValue});
  }

  const handleTextInputChange = (value) => {
    const inputValue = event.target.value;
    const strippedValue = inputValue.replace(/[^a-zA-Z0-9-_]/g, ''); // this regex pattern will strip out all characters except for letters, numbers, hyphens, and underscores
    if (inputValue !== strippedValue) {
      let strippedChar = inputValue.replace(strippedValue, '');
      let warning = sprintf(__(`The character '%s' can not be used.`, 'burst-statistics'), strippedChar );
      if ( strippedChar === '.' || strippedChar === '#') {
        warning = sprintf(__(`You don't need to prefix the input with a '%s' character.`, 'burst-statistics'), strippedChar, strippedChar );
      }
      setWarning(warning);
      clearTimeout(warningTimeoutRef.current);
      warningTimeoutRef.current = setTimeout(() => {
        setWarning('');
      }, 6000); // clear the warning state after 6 seconds
    }
    setClassOrIdValue(strippedValue);
    onChangeHandler({attribute: classOrId, value: strippedValue});
  }



  return (
      <>
      <RadioButtons
          field={fields}
          goal_id={props.goal_id}
          label={props.label}
          value={classOrId}
          onChangeHandler={handleRadioButtonChange}
      />
        <TextInput value={classOrIdValue} onChangeHandler={handleTextInputChange} field={field} label={__('What is the name for the') + ' ' + classOrId + '?' } />
        {warning && <p
            style={{transition: 'opacity 0.5s ease-out', opacity: 1}}
            className="burst-settings-goals__list__item__fields__warning">{warning}</p>}
      </>
  );
}

export default ClassId;
