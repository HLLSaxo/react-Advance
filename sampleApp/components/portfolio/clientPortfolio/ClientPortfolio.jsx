import React from 'react';
import { bindHandlers } from 'react-bind-handlers';
import { forEach, find } from 'lodash';
import { Row, Col, Tabs, Tab, Panel} from 'react-bootstrap';
import ClientPortfolioTemplate from './ClientPortfolioTemplate';
import API from '../../utils/API';
import TradeSubscriptions from '../../subscriptions/TradeSubscriptions';

class ClientPortfolio extends React.PureComponent {
	constructor (props) {
		super(props);
		let accountsInfo = {};
		this.state = {
			clientName: '',
			currentAccountId: '',
			accountUpdated: false
		};
		this.accounts = [];
		this.currentAccountInformation = {};
	}

	componentDidMount() {
		API.getClientInfo(this.handleClientAccounts);
	}

	handleAccountSelection(eventKey, key) {
		this.currentAccountInformation = find(this.accountsInfo, (account) => account.AccountId === eventKey);
		this.setState({
			currentAccountId: eventKey
		});
	}

	handleClientAccounts(response) {
		this.clientInformation = response;
		API.getAccountInfo(this.handleAccountInfo);
		this.setState({
			clientName: response.Name,
			currentAccountId: response.DefaultAccountId
		});
	}

	// callback: successfully got account information
	handleAccountInfo(response) {
		this.accountsInfo = response.Data;
		forEach(this.accountsInfo, (individualAccount) => this.accounts.push(individualAccount.AccountId));
		this.currentAccountInformation = find(this.accountsInfo, (account) => account.AccountId === this.state.currentAccountId);
		this.setState({
			accountUpdated: true
		});
	}

	render() {
		return (
			<div className='pad-box'>
				<ClientPortfolioTemplate
					clientInformation = {this.clientInformation}
					state={this.state} accounts={this.accounts}
					currentAccountInfo = {this.currentAccountInformation}
					onAccountSelection ={this.handleAccountSelection} />
				<Row>
					<Col sm={10}>
						<Panel header='Orders/Positions' className='panel-primary'>
							<Tabs className='primary' defaultActiveKey={1} animation={false} id='noanim-tab-example'>
								<Tab eventKey={1} title='Orders'>
									<TradeSubscriptions currentAccountInformation = {this.currentAccountInformation} tradeType = 'Order' fieldGroups = {['DisplayAndFormat', 'ExchangeInfo']} />
								</Tab>
								<Tab eventKey={2} title='Positions'>
								  <TradeSubscriptions currentAccountInformation = {this.currentAccountInformation} tradeType = 'Position' fieldGroups = {['DisplayAndFormat', 'PositionBase', 'PositionView']} />
								</Tab>
							</Tabs>
						</Panel>
					</Col>
				</Row>
			</div>
		);
	}
}
export default bindHandlers(ClientPortfolio);
