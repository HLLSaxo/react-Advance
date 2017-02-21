import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

function DropDown({ data, value, itemKey, title, handleSelect }) {
  return (
    <DropdownButton
      bsStyle='primary'
      title={title}
      id='dropdown-bs-large'
      onSelect={handleSelect}>
        {data.map(item =>
          <MenuItem eventKey={item}
            key={itemKey ? item[itemKey] : item}>
            {value ? item[value] : item}
          </MenuItem>)
        }
    </DropdownButton>
  )
}

export default DropDown;
