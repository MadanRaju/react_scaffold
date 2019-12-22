import React from 'react';
import FontAwesome from 'react-fontawesome';

export default function buildIconAndClassName(inputClassName, tempIcon) {
  let className = inputClassName;
  let icon;

  if(tempIcon) {
    if(typeof tempIcon === 'string') {
      icon = (
        <FontAwesome
          className="icon"
          name={tempIcon}
        />
      );
    } else {
      icon = tempIcon;
    }
  } else {
    className = `${className} input-spacer`;
  }

  return { className, icon };
}
