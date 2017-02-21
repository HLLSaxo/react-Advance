import React from 'react';

function Details({ title, description, children }) {
  return (
    <div className='details'>
      <div className='details-header'>
        <div className='details-title'>
          {title}
        </div>
      </div>
      <div className='details-banner'>
        {description}
      </div>
      {children}
    </div>
  );
}

export default Details;
