import React from 'react';
import { shallow } from 'enzyme';

import App from '../App';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

test('basename is correct', () => {
  shallow(<App />);
  let url = window.location.url;
  window.open(url);
  console.warn(url);
  expect(window.location.pathname).toBe('/RedLightGreenLight/Home');
});
