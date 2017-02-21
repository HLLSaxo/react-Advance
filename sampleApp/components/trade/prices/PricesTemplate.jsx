import React from 'react';
import Column from '../../utils/Column';
import { Row } from 'react-bootstrap';

export default ({ props : { instrumentSelected }, instrumentPrices }) => {
  return (
    <div className='pad-box'>
      {instrumentSelected && (
        <div>
          <Row>
            <Column data={instrumentPrices} header='Basic Info' size={6} />
            <Column data={instrumentPrices.InstrumentPriceDetails} header='Price Details' size={6} />
          </Row>
          <Row>
            <Column data={instrumentPrices.PriceInfoDetails} header='Price Info Details' size={6} />
            <Column data={instrumentPrices.DisplayAndFormat} header='Display And Format' size={6} />
          </Row>
          <Row>
            <Column data={instrumentPrices.Greeks} header='Greeks' size={6} />
            <Column data={instrumentPrices.Commissions} header='Commissions' size={6} />
          </Row>
          <Row>
            <Column data={instrumentPrices.PriceInfo} header='Price Info' size={6} />
            <Column data={instrumentPrices.Quote} header='Quote' size={6} />
          </Row>
          <Row>
            <Column data={instrumentPrices.MarginImpact} header='Margin Impact' size={6} />
            <Column data={instrumentPrices.MarketDepth} header='Market Depth' size={6} />
          </Row>
        </div>
      )}
    </div>)
};
