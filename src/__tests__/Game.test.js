import React from 'react';
import { shallow } from 'enzyme';

import Game from '../views/Game';
import { render } from '@testing-library/react';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

const wrapper = shallow(<Game />)
    .dive()
    .instance();

test('game screen renders left, right and eit buttons', () => {
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
  wrapper.handleClick(1);
  expect(wrapper.state.score).toBe(1);
  wrapper.handleClick(1);
  expect(wrapper.state.score).toBe(0);
  wrapper.setState({ isGreen: false });
  wrapper.handleClick(1);
  expect(wrapper.state.score).toBe(0);
});

test('game screen handles localStorage item inputs', () => {
    let eventGreenLight = {target:{key: 'greenLight', value: true}};
    wrapper.storageChanged(eventGreenLight);
    expect(wrapper.state.isGreen).toBe(true);
});