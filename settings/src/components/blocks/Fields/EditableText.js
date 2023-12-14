import React, { useState, useRef, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {useGoalFieldsStore} from "../../../store/useGoalFieldsStore";
import Tooltip from '../../common/Tooltip';

export default function EditableText({ value, id, onChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  const saveGoalTitle = useGoalFieldsStore((state) => state.saveGoalTitle);


  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  function handleClick(e) {
    e.preventDefault();
    setIsEditing(true);
  }

  async function handleBlur() {
    setIsEditing(false);
    await saveGoalTitle(id, value);

  }

  function handleKeyDown(event) {
    if (event.key === ' ') {
      event.preventDefault();
      // add space to input
      onChange(value + ' ');
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      setIsEditing(false);
    }
  }

  function handleTextChange(event) {
    event.preventDefault();
    onChange(event.target.value);
  }

  function handleFocus() {
    setIsEditing(true);
  }

  return (
      <div className={'burst-click-to-edit'}>
        {isEditing ? (
            <input
                type="text"
                value={value} // Use temporary value
                onChange={handleTextChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                ref={inputRef}
            />
        ) : (
            <Tooltip content={__('Click to edit', 'burst-statistics')}>
              <h5 className="burst-tooltip-clicktoedit" tabIndex="0"
                  onClick={handleClick} onFocus={handleFocus}
                 >
                {value}
              </h5>
            </Tooltip>
        )}
      </div>
  );
}
