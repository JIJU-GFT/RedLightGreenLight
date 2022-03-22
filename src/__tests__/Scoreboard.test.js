import React from 'react';
import { shallow, } from 'enzyme';

import Scoreboard from '../views/Scoreboard';
import { fireEvent, render } from '@testing-library/react';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

const allHighScoresMock = [
  {
    username: 'dummy1',
    allHighScores: 10,
  },
  {
    username: 'dummy2',
    allHighScores: 20,
  },
  {
    username: 'dummy3',
    allHighScores: 30,
  },
  {
    username: 'dummy4',
    allHighScores: 40,
  },
  {
    username: 'dummy5',
    allHighScores: 50,
  },
];

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

test('Scoreboard should paint as many entries as it gets', () => {
  const wrapper = shallow(<Scoreboard />);
  const wrapperInstance = wrapper.dive().instance();
  wrapperInstance.setState({ allHighScores: allHighScoresMock });
  expect(wrapperInstance.state.allHighScores.length).toBe(allHighScoresMock.length);
});
