import React from 'react';
import { bindHandlers } from 'react-bind-handlers';
import { isEmpty, isEqual, merge } from 'lodash';
import API from '../utils/API';
import CustomTable from '../utils/CustomTable';

class TradeSubscriptions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tradeUpdated: false
    }
    this.trades = {};
    this.tradeSubscription = {};
    this.currentAccountInformation = {};
    this.tradeTypeId = `${this.props.tradeType}Id`;
  }

  componentWillReceiveProps(newProps) {
    if (!isEmpty(newProps.currentAccountInformation)) {
      this.currentAccountInformation = newProps.currentAccountInformation;
      this.createTradeSubscription();
    }
  }

  componentWillUnmount() {
    this.disposeSubscription();
  }

  createTradeSubscription() {
    this.setState({
      tradeUpdated: false
    });
    let tradeType = this.props.tradeType;
    let apiName = `create${tradeType}Subscription`;
    let subscriptionArgs = {
      'Arguments': {
        'AccountKey': this.currentAccountInformation.AccountKey,
        'ClientKey': this.currentAccountInformation.ClientKey,
        'FieldGroups': this.props.fieldGroups
      }
    };
    this.disposeSubscription();
    this.tradeSubscription = API[apiName](subscriptionArgs, this.handleTradeUpdate);
  }

  handleTradeUpdate(response) {
    let data = response.Data;
    let tradeTypeId = this.tradeTypeId;
    this.setState({
      tradeUpdated: false
    });
    for (let index in data) {
      let tradeId = data[index][tradeTypeId];
      if (this.trades[tradeId]) {
        merge(this.trades[tradeId], data[index]);
      } else {
        this.trades[tradeId] = data[index];
      }
    }
    this.setState({
      tradeUpdated: true
    });
  }

  disposeSubscription() {
    if (isEmpty(this.tradeSubscription)) { return; }
    API.disposeIndividualSubscription(this.tradeSubscription);
    this.trades = {};
    this.tradeSubscription = {};
  }

  render() {
    return (
      <CustomTable
        data = { this.trades }
        keyField = { this.tradeTypeId }
        dataSortFields = { ['{this.tradeTypeId}'] }
        width = {'150'} />
    )
  }
}

TradeSubscriptions.propTypes = {
  currentAccountInformation: React.PropTypes.object.isRequired,
  tradeType: React.PropTypes.string.isRequired,
  fieldGroups: React.PropTypes.array.isRequired
};

export default bindHandlers(TradeSubscriptions);
