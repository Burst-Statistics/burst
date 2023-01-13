import React, { useState } from 'react';

export default function EditableText({ value, onChange }) {
  const [isEditing, setIsEditing] = useState(false);

  function handleClick() {
    setIsEditing(true);
  }

  function handleBlur() {
    setIsEditing(false);
  }

  function handleTextChange(event) {
    onChange(event.target.value);
  }

  return (
      <div>
        {isEditing ? (
            <input
                type="text"
                value={value}
                onChange={handleTextChange}
                onBlur={handleBlur}
            />
        ) : (
            <h5 onClick={handleClick}>{value}</h5>
        )}
      </div>
  );
}