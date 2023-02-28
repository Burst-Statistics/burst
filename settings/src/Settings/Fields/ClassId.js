import RadioButtons from './RadioButtons';
import { __ } from '@wordpress/i18n';
import {useEffect, useState} from 'react';
import TextInput from './TextInput';
const ClassId = (props) => {
  const { field, goal_id, label, help, value, onChangeHandler } = props;
  const [classOrId, setClassOrId] = useState(value.attribute);
  const [classOrIdValue, setClassOrIdValue] = useState(value.value);

  let fields = {...field};
  fields.options = {
    'class': {
      type: 'class',
      icon: 'period',
      label: __('Class', 'burst-statistics'),
      description: __( 'Add a class to the element', 'burst-statistics' )
    },
    'id': {
      type: 'id',
      icon: 'hashtag',
      label: __('ID', 'burst-statistics'),
      description: __('Add an id to the element', 'burst-statistics')
    }
  }
  let search = 'world';

  // useEffect(() => {
  //   if (value) {
  //     setClassOrId(value.attribute);
  //     setClassOrIdValue(value.value);
  //   }
  // }, []);

  const handleRadioButtonChange = (value) => {
    setClassOrId(value);
    onChangeHandler({attribute: value, value: classOrIdValue});
  }

  const handleTextInputChange = (value) => {
    setClassOrIdValue(value);
    onChangeHandler({attribute: classOrId, value: value});
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
      </>
  );
}

export default ClassId;

// import Icon from '../../utils/Icon';
// import {useEffect, useState} from 'react';
// import { __ } from '@wordpress/i18n';
//
// const ClassId = (props) => {
//   const { disabled, field, goal_id, label, help, value, onChangeHandler } = props;
//   const [classId, setClassId] = useState('');
//   const [icon, setIcon] = useState('period');
//
//   const handleChange = e => {
//     const value = e.target.value;
//     if (value.startsWith('.')) {
//       setIcon('period');
//     }
//     else if (value.startsWith('#')) {
//       setIcon('hashtag');
//     }
//     if (value.match(/^[.#]?[a-z0-9-_]+$/i) || value === '') {
//       let periodOrHashtag = icon === 'period' ? '.' : '#';
//       setClassId(value);
//       onChangeHandler(field, periodOrHashtag + value);
//     }
//   };
//   //
//   // useEffect(() => {
//   //   handleChange({target: {value: value}});
//   // }, [icon]);
//
//   const handleClick = () => {
//     if (icon === 'period') {
//       setIcon('hashtag')
//     }
//     else {
//       setIcon('period')
//     }
//
//   }
//
//   return (
//       <div className={`burst-class-id-field`}>
//         <p className="burst-label">{label}</p>
//         <div className="burst-class-id-field__input">
//           <button  onClick={handleClick}> <Icon name={icon}/></button>
//           <input
//               type="text"
//               placeholder={icon === 'period' ? __('Add class', 'burst-statistics') : __('Add id', 'burst-statistics')}
//               value={classId}
//               onChange={handleChange}
//           />
//         </div>
//       </div>
//   );
// };
//
// export default ClassId;