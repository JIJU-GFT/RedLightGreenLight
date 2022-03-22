import React from 'react';
import { shallow } from 'enzyme';

import Game from '../views/Game';
import { render } from '@testing-library/react';

const mockedUsedNavigate = jest.fn();
const ZERO = 0;
const ONE = 1;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

const wrapper = shallow(<Game />)
  .dive()
  .instance();

test('game screen renders left, right and exit buttons', () => {
  const wrapper = render(<Game />);
  expect(wrapper.getByText('Left')).toBeInTheDocument();
  expect(wrapper.getByText('Right')).toBeInTheDocument();
  expect(wrapper.getByText('Exit')).toBeInTheDocument();
});

test('game screen triggers timer on state change', () => {
  jest.spyOn(global, 'setTimeout');
  wrapper.setState({ isGreen: false });
  wrapper.setState({ isGreen: true });
  expect(setTimeout).toHaveBeenCalled();
});

test('game screen handles clicks', () => {
  wrapper.handleClick(ONE);
  expect(wrapper.state.score).toBe(ONE);
  wrapper.handleClick(ONE);
  expect(wrapper.state.score).toBe(ZERO);
  wrapper.setState({ isGreen: false });
  wrapper.handleClick(ONE);
  expect(wrapper.state.score).toBe(ZERO);
});

test('game screen handles localStorage item inputs', () => {
  let eventGreenLight = {
    target: {
      key: 'greenLight',
      value: false,
    },
  };
  wrapper.storageChanged(eventGreenLight);
  expect(wrapper.state.isGreen).toBe(false);
});
