import React from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';
import CustomTable from '../../utils/CustomTable';
import { Panel } from 'react-bootstrap';

export default (props) => {
	return (
		<div className='pad-box' >
		{
			props.instruments && (
			<Panel bsStyle="primary" >
			<ButtonToolbar>
				<Button
					bsStyle='primary'
					onClick= {props.onSubscribeClick}
					disabled = {props.hasSubscription}>
					'Subscribe'
				</Button>
				<Button
					bsStyle='primary'
					onClick= {props.onUnsubscribeClick}
					disabled = {!props.hasSubscription}>
					'UnSubscribe'
				</Button>
				<Button
					bsStyle='primary'
					onClick={props.onGetInfoPricesClick}
					disabled = {props.hasSubscription}>
					Get Prices
				</Button>
			</ButtonToolbar>
			<CustomTable
				data={props.instruments}
				keyField='Uic'
				dataSortFields={['Uic', 'AssetType']}
				width={'150'}
				hidden={['DisplayAndFormat.Decimals', 'DisplayAndFormat.Format', 'DisplayAndFormat.OrderDecimals']}
				formatter={'DisplayAndFormat.Decimals'}
				priceFields={['Quote.Ask', 'Quote.Bid', 'Quote.Mid', 'PriceInfoDetails.LastClose', 'PriceInfoDetails.LastTraded', 'PriceInfo.High', 'PriceInfo.Low']} />
			</Panel>)
		}
		</div>
	)
};