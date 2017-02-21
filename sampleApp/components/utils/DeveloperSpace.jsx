import React from 'react'
import { Button, Panel, Row, Col, FormControl, ControlLabel } from 'react-bootstrap'
import { bindHandlers } from 'react-bind-handlers';

class DeveloperSpace extends React.PureComponent {
  constructor () {
    super();
    this.state = {
      requestText: '',
      responseText:''
    };
  }

  action () {
    this.props.onAction(this.requestText)
  }

  onChangeRequestParams (event) {
    this.setState({
      requestText: this.prettyJSON(event.target.value)
    });
  }

  prettyJSON(order) {
    if (!order) return;
    return `${JSON.stringify(order, null, 3)
      .replace(/&/g, '&amp;')
      .replace(/\\'/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')}\n`;
  }

  componentWillMount(){
    this.setState({
      requestText: this.prettyJSON(this.props.requestParams),
      responseText: this.prettyJSON(this.props.responsData)
    });
  }

  componentWillReceiveProps(nextprops) {
    this.setState({
      requestText: this.prettyJSON(nextprops.requestParams),
      responseText: this.prettyJSON(nextprops.responsData)
    });
  }

  render () {
    return (
      <Panel header="Developer's Space" className='panel-primary' collapsible>
        <Row>
          <div className='pad-box' >
          <Col sm={6}>
            <ControlLabel>Request Parameters</ControlLabel>
            <FormControl componentClass='textarea' placeholder='Request Parameter' rows={8} value={this.state.requestText} onChange={this.onChangeRequestParams} />
          </Col>
          <Col sm={6}>
            <ControlLabel>Response Data</ControlLabel>
            <FormControl componentClass='textarea' placeholder='Response Data' readOnly rows={8} value={this.state.responseText} />
          </Col>
          </div>
        </Row>
        <Row>
         <div className='pad-box'>
          <Col sm={6}>
            <Button bsStyle='primary' block onClick={this.action}>{this.props.actionText}</Button>
          </Col>
          </div>
        </Row>
      </Panel>
    )
  }
};

DeveloperSpace.propTypes = {
  actionText: React.PropTypes.string.isRequired,
  onAction: React.PropTypes.func.isRequired,
  requestParams: React.PropTypes.object.isRequired,
  response: React.PropTypes.object.isRequired
}

export default bindHandlers(DeveloperSpace);
