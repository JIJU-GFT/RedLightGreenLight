import React from 'react';
import { shallow } from 'enzyme';

import GameText from '../components/GameText';

let dummyText = 'test';
let defaultText = 'defaultText';
let customStyles = 'customStyles';

test('render text with correct text', () => {
  const wrapper = shallow(<GameText text={dummyText} />);
  expect(wrapper.find('p').text()).toBe(dummyText);
});

test('render the default styles if non are provided', () => {
  const wrapper = shallow(<GameText text={dummyText} />);
  expect(wrapper.find('p').hasClass(defaultText)).toBe(true);
});

test('render proper styles when provided', () => {
  const wrapper = shallow(
    <GameText text={dummyText} textStyles={customStyles} />
  );
  expect(wrapper.find('p').hasClass(customStyles)).toBe(true);
});
