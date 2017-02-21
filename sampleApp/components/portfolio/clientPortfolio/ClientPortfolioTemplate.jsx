import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Row} from 'react-bootstrap';
import {forEach, map, isArray} from 'lodash';
import Column from '../../utils/Column';
import DropDown from '../../utils/DropDown';

export default (props) => {
	const { state: {clientName, currentAccountId},  clientInformation, currentAccountInfo, onAccountSelection, accounts } = props;
	return (
		<div>
			<Form inline>
				<FormGroup controlId='formInlineName'>
					<ControlLabel>Client Name</ControlLabel> &nbsp;
					<FormControl type='text' placeholder='Test' value={clientName} readOnly />
				</FormGroup> &nbsp;
				<FormGroup>
					<ControlLabel>Accounts</ControlLabel> &nbsp;
					<DropDown
            title={currentAccountId}
            handleSelect={onAccountSelection}
            data={accounts}
           />
				</FormGroup>
			</Form>
			<br />
			<Row>
				<Column size={10} header='Client Info: openapi/port/v1/clients/me' data={clientInformation} />
			</Row>
			<Row>
				<Column size={10} header='Account Info: openapi/port/v1/accounts/me' data={currentAccountInfo} />
			</Row>
		</div>
	);
};
