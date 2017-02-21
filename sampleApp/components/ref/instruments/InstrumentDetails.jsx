import React from 'react';
import { bindHandlers } from 'react-bind-handlers';
import Instruments from './Instruments';
import CustomTable from '../../utils/CustomTable';
import { Col } from 'react-bootstrap';
import OptionInstrumentsTemplate from './OptionInstrumentsTemplate'

const checkIfOption = (assetType) => assetType === 'FuturesOption' || assetType === 'StockOption' || assetType === 'StockIndexOption';

class InstrumentDetails extends React.Component {
  constructor() {
    super();
    this.state = { 
      instrumentDetails: undefined,
      optionRoot: undefined
    };
  }

  handleOptionRoot(optionRoot) {
    this.setState({ optionRoot: optionRoot,
      instrumentDetails: undefined });
  }

  handleInstrumentSelection(instrumentDetails) {
    this.setState({ instrumentDetails: instrumentDetails });
  }

  handleAssetTypeChange(assetType) {
    if(!checkIfOption(assetType)) {
      this.setState({ optionRoot: undefined,
        instrumentDetails: undefined});
    }
  }

  render() {

    // making array of key-value pairs to show instrument in table.
    let instData = []
    for(let name in this.state.instrumentDetails) {
        instData.push({Data:name, value: this.state.instrumentDetails[name]});
    }

    return (
      <div>
        <Col sm={9} >
          <Instruments onInstrumentSelected={this.handleInstrumentSelection} onOptionRootSelected={this.handleOptionRoot} onAssetTypeSelected={this.handleAssetTypeChange}  />
          { this.state.optionRoot &&
              <OptionInstrumentsTemplate optionRoot={this.state.optionRoot} onInstrumentSelected={this.handleInstrumentSelection}  />
          }
          <CustomTable data={instData} width={'300'} keyField='Data' /></Col>
      </div>
    );
  }
}

export default bindHandlers(InstrumentDetails);