import React from 'react';
import { FormControl, Panel, Button } from 'react-bootstrap';
import { bindHandlers } from 'react-bind-handlers';
import Details from './Details';
import DataService from './utils/DataService';

class Home extends React.PureComponent {
  constructor() {
    super();
    this.token = '';
  }

  handleChange(event) {
    this.token = event.target.value;
  }

  handleCreateTransport() {
    DataService.createTransport(`Bearer ${this.token}`);
    DataService.createStreamingObject(`Bearer ${this.token}`);
  }

  render() {
    return (
      <div className='pad-box'>
        <h3> Set Access Token </h3>
        <h2>
          <small>Please copy authorization token from
            <a
              href='https://developer.saxobank.com/sim/openapi/portal/'
              target='_blank'>
              Developer's Portal
            </a>.
          </small>
        </h2>
        <Panel header='Access Token' bsStyle='primary'>
          <FormControl
            componentClass='textarea'
            placeholder='Paste authorization token here'
            onChange={this.handleChange} />
          <br />
          <Button bsStyle='primary' onClick={this.handleCreateTransport}>Save</Button>
        </Panel>
      </div>
    );
  }
}

export default bindHandlers(Home);
