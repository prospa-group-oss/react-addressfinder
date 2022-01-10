import React from 'react';

import { render } from '@testing-library/react';

import WidgetInput from '../WidgetInput';

const props = {
  id: 'testId',
  addressFinderKey: 'testId',
  onSelected: console.log,
};

describe('WidgetInput', () => {
  it('render', () => {
    const { container } = render(<WidgetInput {...props} />);
    expect(container.querySelector('#testId')).toBeTruthy();
  });

  it('snapshot', () => {
    const { container } = render(<WidgetInput {...props} />);
    expect(container).toMatchSnapshot();
  });
});
