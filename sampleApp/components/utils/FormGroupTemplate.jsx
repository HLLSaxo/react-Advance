import React from 'react';
import { FormGroup, FormControl, ControlLabel, Col, Row } from 'react-bootstrap';


export default (props) => {
  const  getSelectCtrl = (item) => {
    return ( 
      <FormControl componentClass='select' id={item.label} onChange={(event)=>props.onChange(event)}>
        {item.DisplayField ? item.value.map(data => <option>{data[item.DisplayField]}</option>):
          item.value.map(data => <option>{data}</option>)}
      </FormControl>
    )
  }

  const getTextCtrl = (item) => <FormControl readOnly={props.readOnly} id={item.label} type='text' value={item.value} onChange={(event)=>props.onChange(event)} />

  return (
    <FormGroup>
      <Row>
      {
        props.data.map((item) => (
            <Col sm={3}>
              <ControlLabel>{item.label}</ControlLabel>
              { item.componentClass ==='select' ? getSelectCtrl(item) : getTextCtrl(item) }
            </Col>)
        )
      }
      </Row>
    </FormGroup>
  );
}
