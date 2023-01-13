import Icon from '../../utils/Icon';
import { useState } from 'react';
import { __ } from '@wordpress/i18n';

const ClassId = (props) => {
  const { disabled, field, goal_id, label, help, value, onChangeHandler } = props;
  const [classId, setClassId] = useState('');
  const [icon, setIcon] = useState('period');

  const handleChange = e => {
    const value = e.target.value;
    if (value.startsWith('.')) {
      setIcon('period');
    }
    else if (value.startsWith('#')) {
      setIcon('hashtag');
    }
    if (value.match(/^[.#]?[a-z0-9-_]+$/i) || value === '') {
      setClassId(value);
    }
  };

  const handleClick = () => {
    if (icon === 'period') {
      setIcon('hashtag')
    }
    else {
      setIcon('period')
    }
  }

  return (
      <div className={`burst-class-id-field`}>
        <p className="burst-label">{label}</p>
        <div className="burst-class-id-field__input">
          <button  onClick={handleClick}> <Icon name={icon}/></button>
          <input
              type="text"
              placeholder={icon === 'period' ? __('Add class', 'burst-statistics') : __('Add id', 'burst-statistics')}
              value={classId}
              onChange={handleChange}
          />
        </div>
      </div>
  );
};

export default ClassId;
