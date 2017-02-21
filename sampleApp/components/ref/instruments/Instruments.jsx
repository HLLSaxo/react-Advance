import React from 'react';
import { bindHandlers } from 'react-bind-handlers';
import { ButtonToolbar,Row } from 'react-bootstrap';
import { noop } from 'lodash';
import refDataAPI from '../refDataAPI';
import Instrument from './InstrumentTemplates'


const AllAssetTypes = [
  'FxSpot', 'Bond', 'Cash', 'Stock', 'ManagedFund', 'StockIndex', 
  'CfdOnFutures', 'CfdOnIndex', 'CfdOnStock',
  'ContractFutures', 'FuturesStrategy',
  'StockOption', 'StockIndexOption', 'FuturesOption',
  'FxVanillaOption', 'FxKnockInOption', 'FxKnockOutOption', 'FxOneTouchOption', 'FxNoTouchOption'];

const checkIfOption = (assetType) => assetType === 'FuturesOption' || assetType === 'StockOption' || assetType === 'StockIndexOption';

class Instruments extends React.PureComponent {
  constructor(props) {
    super(props);

    // Supported request parameters from '/openapi/ref/v1/instruments/'   
    this.instrumentsRequestParams = {
      $skip: undefined,             // Int,   Query-String, Optional number of elements to skip
      $top: undefined,              // Int,   Query-String, Optional number of elements to retrieve
      AssetTypes: undefined,        // String,Query-String, assest type. its could also be comma separated list of asset types. e.g 'Stock,FxSpot'
      ExchangeId: undefined,        // String,Query-String,	ID of the exchange that the instruments must match
      IncludeNonTradable: undefined,// Bool, 	Query-String	Should the search include instruments, which are not online client tradable?
      Keywords: undefined,          // String	Query-String	Search for matching keywords in the instruments. Separate keywords with spaces
      SectorId: undefined,          // String	Query-String	ID of the sector that the instruments must match
    }

    this.instruments = undefined;
    this.state = {
      hasInstruments: false,
      title: 'Select Instruments'
    };
  }

  handleAssetTypeSelection(eventKey) {
    /* UI
      clear instrument list for UI
    */
    this.instruments = [];
    // notify if any UI component using it and want to listen to asset change
    if (this.props.onAssetTypeSelected) {
      this.props.onAssetTypeSelected(eventKey);
    }

    if(checkIfOption(eventKey) == true) {
      this.setState({ title: 'Select OptionRoot' }); 
    }
    else {
      this.setState({ title: 'Select Instrument' });
    }
    /* Open API 
      first set parameters as required, e.g AssetTypes below
      then call to open api, see API.getInstruments for more details
    */
    this.instrumentsRequestParams.AssetTypes = eventKey;
    refDataAPI.getInstruments(this.instrumentsRequestParams,
     result => this.getInstrumentSuccess(result),
     result => console.log(result)
    );
  }

  // success callback for API.getInstruments
  getInstrumentSuccess(result) {
    // show instruments on UI.
    this.instruments = result.Data;
    // react specific to refresh UI
    this.setState({ hasInstruments: !this.state.hasInstruments });
  }

  // action when user select instrument
  handleInstrumentSelection(instrument) {
      /* checkIfOption
         true  : simply update state to render option component.
         false : get instrument details.
      */
      if(checkIfOption(instrument.AssetType) == true) {
        this.props.onOptionRootSelected(instrument);
      }
      else {
        this.getInstrumentDetails({ Uic: instrument.Identifier, AssetType: instrument.AssetType });
      }
  }
  
  getInstrumentDetails(instrumentDetailsRequestParams) {
    /* Open API 
      first set parameters as required, e.g AssetTypes & Uic
      then call to open api, see API.getInstruments for more details
    */
    refDataAPI.getInstrumentDetails(instrumentDetailsRequestParams, result => this.getInstrumentDetailsCallBack(result));
  }
  
  getInstrumentDetailsCallBack(instrumentDetail) {
    /*
      notify if any UI component using it.
      please note for Options, instrumentDetails will always be error. See OptionInstruments.jsx file
      this is done to avoid un-neccary condition statements
    */
    this.props.onInstrumentSelected(instrumentDetail);
  }

  // react : UI to render html.
  render() {
    return (
      <div className='pad-box'>
        {/*Instrument is child react component, for more details please check './InstrumentTemplates.jsx' file */ }
        <Row>
        <Instrument 
          assetTypes={this.props.assetTypes ? this.props.assetTypes : AllAssetTypes  } 
          onAssetTypeChange={this.handleAssetTypeSelection} 
          instruments={this.instruments} 
          onInstrumentChange={this.handleInstrumentSelection}
          title={this.state.title} >
        </Instrument>
        </Row>
        <Row>{this.props.children}</Row>
      </div>
    );
  }
}

Instruments.propTypes = {
  onInstrumentSelected: React.PropTypes.func,
  onAssetTypeSelected: React.PropTypes.func,
  onOptionRootSelected: React.PropTypes.func,
};

Instruments.defaultProps = {
  onInstrumentSelected: noop,
};

export default bindHandlers(Instruments);
