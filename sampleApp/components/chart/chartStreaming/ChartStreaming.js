import React from 'react';
import { isNumber, isEmpty , forEach, findIndex } from 'lodash';
import { bindHandlers } from 'react-bind-handlers';
import { Button } from 'react-bootstrap';
import API from '../../utils/API';
import DropDown from '../../utils/DropDown';
import Instrument from '../../ref/instruments/Instruments';
import CustomTable from '../../utils/CustomTable';

const Horizon = [1, 5, 10, 15, 30, 60, 120, 240, 360, 480, 1440, 10080, 43200];
const CandleCount = [200, 400, 600, 800, 1000, 1200];

class ChartStreaming extends React.PureComponent {
  constructor(props) {
    super(props);
    this.instrument = {};
    this.chartResponse = [];
    this.chartSubscription = {};
    this.state = {
      instrumentSelected: false,
      horizon: 'Select Horizon',
      chartDataUpdated: false,
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
      let subscriptionArgs = {
        'Arguments': {
          'AssetType': this.instrument.AssetType,
          'Uic': this.instrument.Identifier,
          'Horizon': this.state.horizon,
          'Count': this.state.candleCount
        }
      };
      this.disposeSubscription();
      this.chartSubscription = API.createChartSubscription(subscriptionArgs, this.handleChartUpdate);
    }
  }

  handleChartUpdate(response) {
    let data = response.Data;
    this.setState({
      chartDataUpdated: false
    });
    if(this.chartResponse.length === 0) {
      this.chartResponse = data;
    } else {
      forEach(data, (value, key) => {
        let alreadyPresent = findIndex(this.chartResponse, (item) => {
            return item.Time === value.Time;
        });
        if(alreadyPresent >= 0) {
          this.chartResponse[alreadyPresent] = value;
        } else {
          this.chartResponse.concat(value);
        }
      })
    }
    this.setState({
      chartDataUpdated: true
    });
  }

  disposeSubscription() {
    if (isEmpty(this.chartSubscription)) { return; }
    API.disposeIndividualSubscription(this.chartSubscription);
    this.chartSubscription = {};
    this.chartData = {};
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
            {'Subscribe Chart'}
          </Button>

          <CustomTable
            data = { this.chartResponse }
            keyField = { 'Time' }
            dataSortFields = { ['Time'] }
            width = '150' />
        </div>
      </div>
    );
  }
}

export default bindHandlers(ChartStreaming);
