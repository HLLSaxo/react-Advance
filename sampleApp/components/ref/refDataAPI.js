// this file lists API's from client lib and explains the request parameters
// for further details please refer reference documentation at https://developer.saxobank.com/sim/openapi/help/refdoc/v1
import DataService from '../utils/DataService';

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
   // fetch option chain based on AssetType
  // eg: Query Params : { OptionRootId: 19 }
  getOptionRootData: (rootId, successCallback, errorCallback) => {
    const data = {
      method: 'get',
      serviceGroup: 'ref',
      endPoint: 'v1/instruments/contractoptionspaces/{OptionRootId}',
      queryParams: {OptionRootId: rootId},
    };
    DataService.getData(data, successCallback, errorCallback);
  }
};