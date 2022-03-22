import React from 'react';
import { shallow } from 'enzyme';

import Scoreboard from '../views/Scoreboard';
import { fireEvent, render } from '@testing-library/react';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

const wrapper = shallow(<Scoreboard />)
  .dive()
  .instance();

test('Scoreboard should have highscores on load', () => {
  expect(wrapper.state.allHighScores).not.toBeNull();
});

test('Scoreboard should have highscores on load', () => {
  wrapper.goBack();
  expect(mockedUsedNavigate).toHaveBeenCalled();
});

test('Scoreboard buttons should work', () => {
  const container = render(<Scoreboard />);
  let exit = container.getByText('Exit');
  fireEvent.click(exit);
  expect(mockedUsedNavigate).toHaveBeenCalled();
});

test('Scoreboard should pain entries', () => {
  const container = render(<Scoreboard />);
  let playerLabel = container.getByText('Player');
  expect(playerLabel).toBeInTheDocument();
});
