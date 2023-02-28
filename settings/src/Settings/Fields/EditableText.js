import React, { useState, useRef, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import Tooltip from '@mui/material/Tooltip';

export default function EditableText({ value, onChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  function handleClick(e) {
    // prevent default click behavior
    e.preventDefault();
    setIsEditing(true);
  }

  function handleBlur() {
    setIsEditing(false);
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
                value={value}
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
