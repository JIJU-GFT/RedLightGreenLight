import React from 'react';
import { shallow } from 'enzyme';

import App from '../App';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

test('app is loaded with correct basename', () => {
  const wrapper = shallow(<App />);
  let url = wrapper.getElement().props.basename;

  expect(url).toBe('/RedLightGreenLight');
});
