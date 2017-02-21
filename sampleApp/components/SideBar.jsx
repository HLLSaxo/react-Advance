import React from 'react';
import { ListGroup, ListGroupItem, Collapse, Glyphicon } from 'react-bootstrap';
import { bindHandlers } from 'react-bind-handlers';
import $ from '../libs/jquery-3.1.1';

class Sidebar extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      tradeOpen: false,
      refOpen: false,
      portfolioOpen: false,
      chartOpen: false,
    };
  }

  getGlyphName(name) {
    return this.state[`${name}Open`] ? 'chevron-up' : 'chevron-down';
  }

  handleCollapse(eventKey) {
    const stateObject = {};
    const name = $(eventKey.target).data('name');
    stateObject[`${name}Open`] = !this.state[`${name}Open`];
    this.setState(stateObject);
  }

  render() {
    return (
      <div className='sidebar'>
        <ListGroup className='sidebar-navs'>
          <ListGroupItem href='#intro'> Introduction </ListGroupItem>
          <ListGroupItem onClick={this.handleCollapse} data-name='trade'>
            Trade Service Group
            <Glyphicon className='glyph pull-right' glyph={this.getGlyphName('trade')} />
          </ListGroupItem>
          <Collapse in={this.state.tradeOpen}>
            <div>
              <ListGroup className='sidebar-navs'>
                <ListGroupItem href='#infoPrices'> InfoPrices </ListGroupItem>
                <ListGroupItem href='#prices'> Prices </ListGroupItem>
                <ListGroupItem href='#options'> Options Chain </ListGroupItem>
                <ListGroupItem href='#orders'> Orders </ListGroupItem>
              </ListGroup>
            </div>
          </Collapse>
          <ListGroupItem onClick={this.handleCollapse} data-name='ref'>
            Ref Data Service Group
            <Glyphicon className='glyph pull-right' glyph={this.getGlyphName('ref')} />
          </ListGroupItem>
          <Collapse in={this.state.refOpen}>
            <div>
              <ListGroup className='sidebar-navs'>
                <ListGroupItem href='#instruments'> Instruments </ListGroupItem>
              </ListGroup>
            </div>
          </Collapse>
          <ListGroupItem onClick = {this.handleCollapse} data-name='portfolio'>
            Portfolio Service Group
            <Glyphicon className = 'glyph pull-right' glyph = { this.getGlyphName('portfolio') }/>
          </ListGroupItem>
          <Collapse in = { this.state.portfolioOpen }>
            <div>
              <ListGroup className = 'sidebar-navs'>
                <ListGroupItem href = '#clientPortfolio'> Client Portfolio </ListGroupItem>
              </ListGroup>
            </div>
          </Collapse>
          <ListGroupItem href = '#' onClick = {this.handleCollapse} data-name='chart'>
            Chart
          <Glyphicon className = 'glyph pull-right' glyph = { this.getGlyphName('chart') } />
          </ListGroupItem>
          <Collapse in = { this.state.chartOpen }>
            <div>
              <ListGroup className = 'sidebar-navs'>
                <ListGroupItem href = '#chartPolling'> Chart Polling </ListGroupItem>
              </ListGroup>
              <ListGroup className = 'sidebar-navs'>
                <ListGroupItem href = '#chartStreaming'> Chart Streaming </ListGroupItem>
              </ListGroup>
            </div>
          </Collapse>
        </ListGroup>
      </div>
    );
  }
}

export default bindHandlers(Sidebar);
