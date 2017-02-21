import React from 'react';
import { isNumber, isEmpty } from 'lodash';
import { bindHandlers } from 'react-bind-handlers';
import { Button } from 'react-bootstrap';
import API from '../../utils/API';
import DropDown from '../../utils/DropDown';
import Instrument from '../../ref/instruments/Instruments';
import CustomTable from '../../utils/CustomTable';

const Horizon = [1, 5, 10, 15, 30, 60, 120, 240, 360, 480, 1440, 10080, 43200];
const CandleCount = [200, 400, 600, 800, 1000, 1200];

class ChartPolling extends React.PureComponent {
  constructor(props) {
    super(props);
    this.instrument = {};
    this.chartResponse = {};
    this.state = {
      instrumentSelected: false,
      horizon: 'Horizon',
      candleCount : 200
    };
  }

  handleInstrumentSelected(instrument) {
    this.setState({
      instrumentSelected: false
    });
    this.instrument = instrument;
  }

  handleChartData() {
    if (isNumber(this.state.horizon) && !isEmpty(this.instrument)){
      API.getChartData({
        AssetType: this.instrument.AssetType,
        Uic: this.instrument.Identifier,
        Horizon: this.state.horizon,
        Count: this.state.candleCount
      }, this.handleChartDataDisplay);
    }
  }

  handleChartDataDisplay(response) {
    this.chartResponse = response;
    this.setState({
      instrumentSelected: true
    })
  }

  handleHorizonSelection(eventKey) {
    this.setState({
      horizon: eventKey
    });
  }

  handleCandleCount(eventKey) {
    this.setState({
      candleCount: eventKey
    });
  }

  render() {
    return (
      <div>
        <Instrument onInstrumentSelected= {this.handleInstrumentSelected} />
        <div className='pad-box'>
          <DropDown
            title = {this.state.horizon}
            handleSelect = {this.handleHorizonSelection}
            data = {Horizon}
          /> &nbsp;

          <DropDown
            title = {this.state.candleCount}
            handleSelect = {this.handleCandleCount}
            data = {CandleCount}
          /> &nbsp;

          <Button
            bsStyle='primary'
            onClick={this.handleChartData}>
            Get Chart Data
          </Button>
          { this.state.instrumentSelected &&
            <CustomTable
              data = { this.chartResponse.Data }
              keyField = { 'Time' }
              dataSortFields = { ['Time'] }
              width = {'150'}
              decimals={this.chartResponse.DisplayAndFormat.Decimals} />
          }
        </div>
      </div>
    );
  }
}

export default bindHandlers(ChartPolling);
