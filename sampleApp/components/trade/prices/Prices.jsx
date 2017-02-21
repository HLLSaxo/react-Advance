import React from 'react';
import { merge } from 'lodash';
import { bindHandlers } from 'react-bind-handlers';
import API from '../../utils/API';
import Details from '../../Details';
import Instruments from '../../ref/instruments/Instruments';
import PricesTemplate from './PricesTemplate';

class Prices extends React.Component {
  constructor() {
    super();
    this.instrument = {};
    this.state = {
      instrumentSelected: false,
    };
    this.subscription = undefined;
  }

  handleInstrumentSelected(instrument) {
    //TODO : Batch Request
    if(this.subscription) {
      API.disposeIndividualSubscription(this.subscription);
      this.subscription = undefined;
    }

    this.subscription = API.subscribePrices({
      AssetType: instrument.AssetType,
      uic: instrument.Uic,
    }, this.handleUpdateInstrumentData);
  }

  handleUpdateInstrumentData(data) {
    this.setState({
      instrumentSelected: true,
    });
    if (!data.Data) {
      this.instrument = data;
    } else {
      merge(this.instrument, data.Data);
    }
  }

  render() {
    return (
      <div>
        <Instruments onInstrumentSelected={this.handleInstrumentSelected} />
        <PricesTemplate props={this.state} instrumentPrices={this.instrument} />
      </div>
    );
  }
}

export default bindHandlers(Prices);
