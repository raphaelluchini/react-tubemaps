import React from 'react';
import ReactDOM from 'react-dom';
import { GMaps } from './GMaps';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GMaps />, div);
  ReactDOM.unmountComponentAtNode(div);
});
