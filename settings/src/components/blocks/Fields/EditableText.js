import React, { useState, useRef, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import Tooltip from '@mui/material/Tooltip';

export default function EditableText({ value, defaultValue, onChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value); // Temporary value
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  function handleClick(e) {
    e.preventDefault();
    setIsEditing(true);
  }

  function handleBlur() {
    if (tempValue === '') {
      onChange(defaultValue);
    } else {
      onChange(tempValue); // Update the actual value when focus is lost
    }
    setIsEditing(false);
  }

  function handleKeyDown(event) {
    if (event.key === ' ') {
      event.preventDefault();
      setTempValue(tempValue + ' '); // Update temporary value
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      setIsEditing(false);
    }
  }

  function handleTextChange(event) {
    event.preventDefault();
    setTempValue(event.target.value); // Update temporary value
  }

  function handleFocus() {
    setIsEditing(true);
  }

  return (
      <div className={'burst-click-to-edit'}>
        {isEditing ? (
            <input
                type="text"
                value={tempValue} // Use temporary value
                onChange={handleTextChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                ref={inputRef}
            />
        ) : (
            <Tooltip title={__('Click to edit', 'burst-statistics')} arrow>
              <h5 tabIndex="0" onClick={handleClick} onFocus={handleFocus}>
                {value}
              </h5>
            </Tooltip>
        )}
      </div>
  );
}
