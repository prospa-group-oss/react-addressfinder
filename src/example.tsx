import React from 'react';
import ReactDOM from 'react-dom';

import { WidgetInput } from './index';

// https://addressfinder.com.au/api/au/address/autocomplete/
const addressFinderKey = 'ADDRESSFINDER_DEMO_KEY';

const AddressFinder = () => (
  <WidgetInput
    addressFinderKey={addressFinderKey}
    id="office-place"
    placeholder="Street address, suburb, state"
    onSelected={console.log}
    onChange={console.log}
  />
);

const node = document.querySelector('#root');

ReactDOM.render(<AddressFinder />, node);
