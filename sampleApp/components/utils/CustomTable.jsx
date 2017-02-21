import React from 'react';
import { map, split, last, findIndex, forEach, isEmpty } from 'lodash';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { flatten, noop } from 'flat';
import { bindHandlers } from 'react-bind-handlers';
import API from './API';

class CustomTable extends React.Component {
  constructor() {
    super();
    this.data = [];
  }

  componentWillMount() {
    this.handleData(this.props)
  }

  componentWillReceiveProps(newProps) {
    this.handleData(newProps)
  }

  handleData(props) {
    this.data = [];
    forEach(props.data, (object) => {
      this.data.push((flatten(object, { safe: true })));
    });
  }

  handlePriceFormatter(cell, row, formatExtraData) {
    return API.formatPrice(cell, this.props.decimals || row[this.props.formatter]);
  }

  generateHeaders() {
    return map(this.data[0], (value, key) => {
      const dataSort = findIndex(this.props.dataSortFields, field => field === key) !== -1;
      const keyField = this.props.keyField === key;
      const hidden = findIndex(this.props.hidden, field => field === key) !== -1;
      const dataFormat = findIndex(this.props.priceFields, field => field === key) !== -1 ?  this.handlePriceFormatter : noop;
      return (
        <TableHeaderColumn
          width={this.props.width}
          dataField={key}
          isKey={keyField}
          dataSort={dataSort}
          hidden={hidden}
          dataFormat={dataFormat}>
        {last(split(key, '.'))}
        </TableHeaderColumn>);
    });
  }

  render() {
    return (
      <div>
        {!isEmpty(this.data) && (<BootstrapTable data={this.data} striped condensed hover>
          {this.generateHeaders()}
        </BootstrapTable>)}
      </div>
    );
  }
}

CustomTable.propTypes = {
  keyField: React.PropTypes.string.isRequired,
  data: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]).isRequired,
  width: React.PropTypes.string,
  dataSortFields: React.PropTypes.array,
};

export default bindHandlers(CustomTable);
