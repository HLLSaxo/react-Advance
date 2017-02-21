import React from 'react';
import { bindHandlers } from 'react-bind-handlers';
import { ButtonToolbar, Form } from 'react-bootstrap';
import { noop, forEach } from 'lodash';
import refDataAPI from '../refDataAPI';
import Instruments from './Instruments'
import FormGroupTemplate from '../../utils/FormGroupTemplate'

const CALL = 'Call';
const PUT = 'Put';

class OptionInstrumentsTemplate extends React.PureComponent {
  constructor(props) {
    super(props);

    this.optionRootData = {}
    this.state = {
      selectedOptionSpace: undefined,
      flag: false 
    };

    this.callPut = '';
    this.strikePrice = 0.0;
    this.expiry = '';

    this.selectedOptionRoot = undefined;
  }

  componentDidMount() {
    this.getOptionRootData(this.props.optionRoot);
  }

  componentWillReceiveProps(newProps) {
    if(this.selectedOptionRoot.Identifier !== newProps.optionRoot.Identifier) {
      this.getOptionRootData(newProps.optionRoot);
    }
  }

  getOptionRootData(optionRoot) {
    this.selectedOptionRoot = optionRoot
    // OptionRoot information - please get underlying instruments from OptionRootId. e.g instrumentInfo.Identifier
    refDataAPI.getOptionRootData(this.selectedOptionRoot.Identifier, this.onSuccess.bind(this));
  }

  onSuccess(response) {
    // response is all options avilable for OptionRootId, see 'handleInstrumentSelection'' function
    this.optionRootData = response;
    // getFormattedExpiry is kind of hack, work is progress to have same expiry format in different places in response json.
    this.expiry = this.getFormattedExpiry(response.DefaultExpiry);

    // select specific option on UI, generally DefaultOption in response json.
    this.strikePrice = response.DefaultOption.StrikePrice;
    this.callPut = response.DefaultOption.PutCall;
    // set option space data for UI.
    this.selectOptionSpace();
   
    this.selectInstrument();
  }

  // format date strinf to YYYY-MM-DD format.
  getFormattedExpiry(dateStr) {
    // getMonth() is zero-based
    let date = new Date(dateStr), mm = date.getMonth() + 1, dd = date.getDate();
    return [date.getFullYear(), (mm > 9 ? '' : '0') + mm, ( dd > 9 ? '' : '0') + dd].join('-');
  }

  selectOptionSpace() {
    forEach(this.optionRootData.OptionSpace, (optionSpace) => {
      if(optionSpace.Expiry === this.expiry) {
        this.setState({selectedOptionSpace: optionSpace });
        return;
      }
    })
  }

  selectInstrument() {
    forEach(this.state.selectedOptionSpace.SpecificOptions, (option)=>{
      if(option.StrikePrice === parseFloat(this.strikePrice) && option.PutCall === this.callPut) {
        this.getInstrumentDetails({ AssetType: this.props.optionRoot.AssetType, Uic: option.Uic });
        return;
      }
    })
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


  handleValueChange(event) {
    let value = event.target.value;
    switch(event.target.id) {
      case 'Expiry':
        this.expiry = value;
        this.selectOptionSpace();
        break;
      case 'Call/Put':
        this.callPut = value;
        this.selectInstrument()
        break;
      case 'StrikePrice':
        this.strikePrice = value;
        this.selectInstrument()
        break;
    }
    this.setState({ flag: !this.state.flag });
  }

  // react : UI to render html.
  render() {
    let specificOptions = [];
    if(this.state.selectedOptionSpace) {
      forEach(this.state.selectedOptionSpace.SpecificOptions, (option) => {
        if(option.PutCall === this.callPut) {
          specificOptions.push(option);
         }
      });
    }

    let expiryStrickCallPut = [{label:'Expiry', value: this.optionRootData.OptionSpace, DisplayField:'Expiry', componentClass:'select'},
    {label:'Call/Put', value: [CALL, PUT], componentClass:'select'},
    {label:'StrikePrice', value: specificOptions, DisplayField:'StrikePrice',  componentClass:'select'}];

    return (
      <div> 
        { this.state.selectedOptionSpace && (
          <Form>
            <FormGroupTemplate data = {expiryStrickCallPut} onChange={this.handleValueChange} />
          </Form>)
        }
      </div>
    );
  }
}

OptionInstrumentsTemplate.propTypes = {
  onInstrumentSelected: React.PropTypes.func
};

OptionInstrumentsTemplate.defaultProps = {
  onInstrumentSelected: noop,
};

export default bindHandlers(OptionInstrumentsTemplate);