import React from 'react';
import { shallow } from 'enzyme';

import ScoreboardEntry from '../components/ScoreboardEntry';

const dummyScore = {
  username: 'John Doe',
  highScore: 130000,
};

test('displays parsed info correctly according to props', () => {
  const wrapper = shallow(<ScoreboardEntry scoreEntry={dummyScore} />);
  expect(wrapper.find('.user').text()).toBe(dummyScore.username);
  expect(wrapper.find('.score').text()).toBe(dummyScore.highScore + ' pts.');
});
