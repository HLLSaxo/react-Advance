import { forEach } from 'lodash';
import $ from '../../libs/jquery-3.1.1';
import signalR from '../../libs/jquery.signalR-2.2.1';
import sharedjs from '../../libs/iit-openapi';

const transportUrl = 'https://gateway.saxobank.com/sim/openapi';
const streamingUrl = 'https://streaming.saxotrader.com/sim/openapi';

export default {
  transport: {},
  streaming: {},
  subscriptions: [],
  priceFormatter: {},

  createTransport(authToken) {
    this.transport = new sharedjs.openapi.TransportAuth(transportUrl, { token: authToken });
  },

  getData(params, successCallback, errorCallback) {
    this.transport[params.method](params.serviceGroup, params.endPoint, null, {
      queryParams: params.queryParams,
      body: params.body,
    })
    .then(result => successCallback(result.response))
    .catch(errorCallback);
    this.createPriceFormatter();
  },

  createStreamingObject(authToken) {
    this.streaming = new sharedjs.openapi.Streaming(this.transport, streamingUrl, {
      getToken: () => authToken,
    });
  },

  subscribe(params, successCallback, errorCallback) {
    const subscription = this.streaming.createSubscription(params.serviceGroup, params.endPoint,
              params.queryParams, successCallback, errorCallback);
    this.subscriptions.push(subscription);
    return subscription;
  },

  disposeSubscription() {
    forEach(this.subscriptions, subscription => this.streaming.disposeSubscription(subscription));
  },

  disposeIndividualSubscription(subscription) {
    this.streaming.disposeSubscription(subscription);
  },

  createPriceFormatter() {
    this.priceFormatter = new sharedjs.PriceFormatting();
  },

  formatPrice(value, decimals, formatFlags) {
    return this.priceFormatter.format(value, decimals, formatFlags);
  }
};
