// this file lists API's from client lib and explains the request parameters
// for further details please refer reference documentation at https://developer.saxobank.com/sim/openapi/help/refdoc/v1
import DataService from './DataService';

export default {
  // fetch instruments from client lib based on AssetType
  // eg: Query Params : { AssetType: 'FxSpot' }
  getInstruments: (instrumentData, successCallback, errorCallback) => {
    const data = {
      method: 'get',
      serviceGroup: 'ref',
      endPoint: 'v1/instruments',
      queryParams: instrumentData,
    };
    DataService.getData(data, successCallback, errorCallback);
  },
  // fetch instrument details from client lib based on Uic and AssetType
  // eg: Query Params : { AssetType: 'FxSpot', Uic: 21 }
  getInstrumentDetails: (instrumentData, successCallback, errorCallback) => {
    const data = {
      method: 'get',
      serviceGroup: 'ref',
      endPoint: 'v1/instruments/details/{Uic}/{AssetType}',
      queryParams: instrumentData,
    };
    DataService.getData(data, successCallback, errorCallback);
  },
  // fetch Info Prices for a particular instrument based on AssetType and Uic
  // eg: Query Params : { AssetType: 'FxSpot', Uic: 21 }
  getInfoPrices: (instrumentData, successCallback, errorCallback) => {
    const data = {
      method: 'get',
      serviceGroup: 'trade',
      endPoint: 'v1/infoprices',
      queryParams: {
        AssetType: instrumentData.AssetType,
        Uic: instrumentData.Uic,
        FieldGroups: [
          'DisplayAndFormat',
          'InstrumentPriceDetails',
          'MarketDepth',
          'PriceInfo',
          'PriceInfoDetails',
          'Quote',
        ],
      },
    };
    DataService.getData(data, successCallback, errorCallback);
  },
  // fetch Info Prices for a set of instruments based on AssetType and Uics
  // eg: Query Params : { AssetType: 'FxSpot', Uics: 21,2 }
  getInfoPricesList: (instrumentData, successCallback, errorCallback) => {
    const data = {
      method: 'get',
      serviceGroup: 'trade',
      endPoint: 'v1/infoprices/list',
      queryParams: {
        AssetType: instrumentData.AssetType,
        Uics: instrumentData.Uics,
        FieldGroups: [
          'DisplayAndFormat',
          'InstrumentPriceDetails',
          'MarketDepth',
          'PriceInfo',
          'PriceInfoDetails',
          'Quote',
        ],
      },
    };
    DataService.getData(data, successCallback, errorCallback);
  },
  /*  subscribe to Info prices for a set of instruments based on AssetType and Uics.
      eg: Query Params : {
          Arguments: {
              AssetType: 'FxSpot',
              Uics: 21,2
          },
          RefreshRate: 5
      }
  */
  subscribeInfoPrices: (instrumentData, successCallback, errorCallback) => {
    const data = {
      serviceGroup: 'trade',
      endPoint: 'v1/infoPrices/subscriptions',
      queryParams: {
        Arguments: {
          AssetType: instrumentData.AssetType,
          Uics: instrumentData.Uics,
          FieldGroups: [
            'DisplayAndFormat',
            'InstrumentPriceDetails',
            'MarketDepth',
            'PriceInfo',
            'PriceInfoDetails',
            'Quote',
          ],
        },
        RefreshRate: 5,
      },
    };
    return DataService.subscribe(data, successCallback, errorCallback);
  },
  /*  subscribe to Prices for a single instrument based on AssetType and Uic.
      eg: Query Params : {
          Arguments: {
              AssetType: 'FxSpot',
              Uic: 21
          },
          RefreshRate: 5
      }
  */
  subscribePrices: (instrumentData, successCallback, errorCallback) => {
    const data = {
      serviceGroup: 'trade',
      endPoint: 'v1/Prices/subscriptions',
      queryParams: {
        Arguments: {
          AssetType: instrumentData.AssetType,
          Uic: instrumentData.uic,
          FieldGroups: [
            'Commissions',
            'DisplayAndFormat',
            'Greeks',
            'InstrumentPriceDetails',
            'MarginImpact',
            'MarketDepth',
            'PriceInfo',
            'PriceInfoDetails',
            'Quote',
          ],
        },
        RefreshRate: 5,
      },
    };
    return DataService.subscribe(data, successCallback, errorCallback);
  },
  // delete subscriptions
  disposeSubscription: (successCallback, errorCallback) => {
    DataService.disposeSubscription(successCallback, errorCallback);
  },
  // dispose individual subscription
  disposeIndividualSubscription: (subscription, successCallback, errorCallback) => {
    DataService.disposeIndividualSubscription(subscription, successCallback, errorCallback);
  },
  // fetch Account details
  getAccountInfo: (successCallback, errorCallback) => {
    const data = {
      method: 'get',
      serviceGroup: 'port',
      endPoint: 'v1/accounts/me',
      queryParams: null,
    };
    DataService.getData(data, successCallback, errorCallback);
  },
  // place order
  placeOrder: (order, successCallback, errorCallback) => {
    const data = {
      method: 'post',
      serviceGroup: 'trade',
      endPoint: 'v1/orders',
      queryParams: null,
      body: order,
    };
    // describes how to call OpenApi using open source Iit library
    DataService.getData(data, successCallback, errorCallback);
  },
  // create order subscription
  createOrderSubscription: (subscriptionArgs, successCallback, errorCallback) => {
    const data = {
      serviceGroup: 'port',
      endPoint: 'v1/orders/subscriptions',
      queryParams: subscriptionArgs,
    };
    return DataService.subscribe(data, successCallback, errorCallback);
  },
  // create positions subscription
  createPositionSubscription: (subscriptionArgs, successCallback, errorCallback) => {
    const data = {
      serviceGroup: 'port',
      endPoint: 'v1/positions/subscriptions',
      queryParams: subscriptionArgs,
    };
    return DataService.subscribe(data, successCallback, errorCallback);
  },
  // fetch client details
  getClientInfo: (successCallback, errorCallback) => {
    const data = {
      method: 'get',
      serviceGroup: 'port',
      endPoint: 'v1/clients/me',
      queryParams: null,
    };
    DataService.getData(data, successCallback, errorCallback);
  },
  // fetch option chain based on AssetType
  // eg: Query Params : { OptionRootId: 19 }
  getOptionChain: (instrumentData, successCallback, errorCallback) => {
    const data = {
      method: 'get',
      serviceGroup: 'ref',
      endPoint: 'v1/instruments/contractoptionspaces/{OptionRootId}',
      queryParams: instrumentData,
    };
    DataService.getData(data, successCallback, errorCallback);
  },
  // fetch chart data
  getChartData: (chartData, successCallback, errorCallback) => {
    const data = {
      method: 'get',
      serviceGroup: 'chart',
      endPoint: 'v1/charts',
       queryParams: {
        AssetType: chartData.AssetType,
        Uic: chartData.Uic,
        Horizon: chartData.Horizon,
        Count: chartData.Count,
        FieldGroups: [
          'ChartInfo',
          'Data',
          'DisplayAndFormat',
        ],
      },
    };
    DataService.getData(data, successCallback, errorCallback);
  },
  // creates chart subscription
  createChartSubscription: (subscriptionArgs, successCallback, errorCallback) => {
    const data = {
      serviceGroup: 'chart',
      endPoint: 'v1/charts/subscriptions',
      queryParams: subscriptionArgs,
    };
    return DataService.subscribe(data, successCallback, errorCallback);
  },
  // returns formatted price
  formatPrice: (price, decimal, formatFlags) => {
    return DataService.formatPrice(price, decimal, formatFlags);
  },
};
