import React from 'react';
import { Alert } from 'react-bootstrap';
import Details from './Details';

function Introduction() {
  return (
    <div className='pad-box'>
      <h2>
        <small>
          This application contains a number of samples to illustrate how to use the different resources and endpoints available in the Saxo Bank OpenAPI.
          <br />
          All samples require a valid access token, which you may obtain from the developer portal
        </small>
      </h2>
      <br /><br /><br />
      <Alert bsStyle='warning'>
        Some responses may return no samples, depending upon actual market data entitlements and the configuration of the logged in user.
      </Alert>
    </div>
  );
}

export default Introduction;
