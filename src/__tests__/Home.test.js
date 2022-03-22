import React from 'react';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';

import Home from '../views/Home';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

const wrapper = shallow(<Home />)
  .dive()
  .instance();

test('home screen should update state on input', () => {
  let usernameEvent = {
    target: {
      value: 'dummy',
    },
  };
  wrapper.updateUsername(usernameEvent);
  expect(wrapper.state.username).toBe(usernameEvent.target.value);
});

test('home screen should handle Join click on successful username', () => {
  wrapper.handleJoinClick();
  expect(wrapper.state.validUsername).toBe(true);
});

test('home screen should handle Join click on unsuccessful username', () => {
  wrapper.setState({username: ' '});
  wrapper.handleJoinClick();
  expect(wrapper.state.validUsername).toBe(false);
});

test('home screen should handle Scoreboard click ', () => {
  wrapper.handleScoreboardClick();
  expect(mockedUsedNavigate).toHaveBeenCalled();
});

test('home screen should render elements ', () => {
  const container = render(<Home />);

  expect(container.getByPlaceholderText('Username')).toBeInTheDocument();
  expect(container.getByText('JOIN')).toBeInTheDocument();
  expect(container.getByText('LEADERBOARD')).toBeInTheDocument();
});

