import React from 'react';
import { ButtonToolbar } from 'react-bootstrap';
import DropDown from '../../utils/DropDown';

function Instrument({ assetTypes, onAssetTypeChange, instruments, onInstrumentChange, title, children }) {
 return (
  <ButtonToolbar>
    <DropDown title='Select AssetType' handleSelect={(event) => onAssetTypeChange(event) } data={assetTypes}/>
    { instruments &&
      (<DropDown title={title} handleSelect={(event) => onInstrumentChange(event)} data={instruments} itemKey='Symbol' value='Description'/>)
    }
  </ButtonToolbar>);
}

export default Instrument;