import React from 'react';
import { Button, Form, FormGroup, FormControl, ControlLabel, Col, Row, Panel, DropdownButton, MenuItem, Tabs, Tab } from 'react-bootstrap';
import { bindHandlers } from 'react-bind-handlers';
import API from '../../utils/API';
import DeveloperSpace from '../../utils/DeveloperSpace';
import Instruments from '../../ref/instruments/Instruments';
import { forEach } from 'lodash';
import DropDown from '../../utils/DropDown';
import TradeSubscriptions from '../../subscriptions/TradeSubscriptions';
import FormGroupTemplate from '../../utils/FormGroupTemplate'

const OrderTypes = ['Market', 'Limit'];
const OrderDurationTypes = ['DayOrder', 'GoodTillCancel', 'ImmediateOrCancel'];
const CALL = 'Call';
const PUT = 'Put';

class Order extends React.PureComponent {
  constructor(props) {
    super(props);
    debugger;
    // currentOrder contains mim required parameters for placing an order
    this.currentOrder = {
      // default values on UI.
      Uic: '',
      AssetType: '',
      OrderType: 'Market',
      OrderPrice: 0.0,
      OrderDuration: { DurationType: 'DayOrder' },
      Amount: 0,
      AccountKey: '',
      BuySell: 'Buy',
      /* possible order relations
         IfDoneMaster   -   If Done Orders is a combination of an entry order and conditional orders
                            If the order is filled, then a (slave) stop loss, limit or trailing stop will automatically be attached to the new open position
         IfDoneSlave    -   If Done Orders is a combination of an entry order and conditional orders
                            If the order is filled, then a (slave) stop loss, limit or trailing stop will automatically be attached to the new open position
         IfDoneSlaveOco -   Slave order with OCO. See OCO.
         Oco            -   One-Cancels-the-Other Order (OCO). A pair of orders stipulating that if one order is executed, then the other order is automatically canceled
         StandAlone     -   No relation to other order
      */
      OrderRelation: 'StandAlone',
      ToOpenClose:''
      // currently sample works for StandAlone orders only. Work to be done for other OrderRelations
    };

    this.state = { 
      updated: false,
      responsData:{},
      selectedOptionSpace: undefined,
      selectedAccount: undefined,
      accounts: [],
      instrumentInfo: undefined
     };

     this.optionRootData = {};
  }
  // react Event: Get Account information on mount\loading component
  componentDidMount() {
    API.getAccountInfo(this.handleAccountInfo.bind(this));
  }

  // calback: successfully got account information
  handleAccountInfo(response) {
    let accountArray = [];
    forEach(response.Data, (individualAccount) => accountArray.push(individualAccount));
    this.setState({accounts: accountArray});
  }
  
  handleInstrumentChange(instrument) {
    API.getInfoPrices({
      AssetType: instrument.AssetType,
      Uic: instrument.Uic,
    }, this.handleInstrumentPrice,
    result => console.log(result));
  }
  // callback on successful inforprice call
  handleInstrumentPrice(response) {
    this.currentOrder.Amount = response.Quote.Amount;
    this.currentOrder.Uic = response.Uic;
    this.currentOrder.AssetType = response.AssetType;
    this.currentOrder.OrderPrice = response.Quote.Ask ? response.Quote.Ask : 0.0;
    this.setState({ instrumentInfo: response });
  }

  handlePlaceOrder() {
    API.placeOrder(this.currentOrder, this.onPlaceOrderCallBack.bind(this), this.onPlaceOrderCallBack.bind(this));
  }

  onPlaceOrderCallBack(result) {
    this.setState({ responsData: result });
  }

  handleDeveloperAction (params) {
    API.placeOrder(params, this.onPlaceOrderCallBack, this.onPlaceOrderCallBack)
  }

  handleValueChange(event) {
    debugger;
    let value = event.target.value;
    switch(event.target.id) {
      case 'BuySell':
        this.currentOrder.BuySell = value;
        this.currentOrder.OrderPrice = this.currentOrder.BuySell === 'Buy' ? this.Ask : this.Bid;
        break;
      case 'OrderDuration':
        this.currentOrder.OrderDuration.DurationType = value;
        break;
      case 'OrderAmount':
        this.currentOrder.Amount = value;
        break;
      case 'OrderPrice':
        this.currentOrder.OrderPrice = value;
        break;
      case 'Account':
        this.currentOrder.AccountKey = value;
        break;
      case 'ToOpenClose':
        this.currentOrder.ToOpenClose = value;
        break;
      case 'OrderType':
        this.currentOrder.OrderType = value;
        break;
    }
    this.setState({ updated: !this.state.updated });
  }

  handleSelectedAccount(account) {
    this.currentOrder.AccountKey = account.AccountKey;
    this.setState({ selectedAccount: account });
  }

  render() {

    var askPrice = this.state.instrumentInfo ? this.state.instrumentInfo.Quote.Ask : 0.0,
    bidPrice = this.state.instrumentInfo ? this.state.instrumentInfo.Quote.Bid : 0.0,
    symbol = this.state.instrumentInfo ? this.state.instrumentInfo.DisplayAndFormat.Symbol :'';

    //Define Form
    let symbolAssestTypeAskBid = [{label:`Instrument (UIC: ${this.currentOrder.Uic})`, value:symbol, componentClass:'text'},
      {label:'AssetType', value: this.currentOrder.AssetType, componentClass:'text'},
      {label:'AskPrice', value: askPrice, componentClass:'text'},
      {label:'BidPrice', value: bidPrice, componentClass:'text'}];

    let buySellPriceAmount = [{label:'BuySell', value:['Buy', 'Sell'], componentClass:'select'},
      {label:'OrderPrice', value:this.currentOrder.OrderPrice, componentClass:'text'},
      {label:'OrderAmount', value:this.currentOrder.Amount, componentClass:'text'}];
          
    let orderTypeOrderDurationsAccounts = [{label:'OrderType', value:OrderTypes, componentClass:'select'},
      {label:'OrderDuration', value:OrderDurationTypes, componentClass:'select'}];
    
    return (
      <div className='pad-box' >
        <Row>
        <Col sm={6}>
            <Instruments onInstrumentSelected={this.handleInstrumentChange} />
        </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <DropDown title='Select Account' handleSelect={this.handleSelectedAccount} data={this.state.accounts} itemKey='AccountId' value='AccountId'/>
            <Panel header='Order Details' className='panel-primary'>
              <Form>
                <FormGroupTemplate readOnly="true" data = {symbolAssestTypeAskBid} onChange={this.handleValueChange} />
                <FormGroupTemplate data = {buySellPriceAmount} onChange={this.handleValueChange} />
                <FormGroupTemplate data = {orderTypeOrderDurationsAccounts} onChange={this.handleValueChange} />
                <FormGroup bsSize='large'>
                  <Row>
                    <Col sm={3}><Button bsStyle='primary' block onClick={this.handlePlaceOrder}>Place Order</Button></Col>
                  </Row>
                </FormGroup>
              </Form>
            </Panel>
          </Col>
          <Col sm={6}>
            <DeveloperSpace actionText="Place sOrder" onAction={this.handleDeveloperAction} requestParams={this.orderRequestParams} responseText={this.responsText}></DeveloperSpace>
        </Col>
        </Row>
				<Row>
					<Col sm={12}>
						<Panel header='Orders/Positions' className='panel-primary'>
							<Tabs className='primary' defaultActiveKey={1} animation={false} id='noanim-tab-example'>
								<Tab eventKey={1} title='Orders'>
									<TradeSubscriptions currentAccountInformation = {this.state.selectedAccount} tradeType = 'Order' fieldGroups = {['DisplayAndFormat', 'ExchangeInfo']} />
								</Tab>
								<Tab eventKey={2} title='Positions'>
								  <TradeSubscriptions currentAccountInformation = {this.state.selectedAccount} tradeType = 'Position' fieldGroups = {['DisplayAndFormat', 'PositionBase', 'PositionView']} />
								</Tab>
							</Tabs>
						</Panel>
					</Col>
				</Row>
      </div>);
  }
}

export default bindHandlers(Order);