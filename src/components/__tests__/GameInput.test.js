import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import GameInput from '../GameInput';

test('render game button', () => {
  const container = render(<GameInput sendDataToParent={() => {}} />);
  const input = container.getByPlaceholderText('Username');
  expect(input).toBeInTheDocument();
});

test('input triggers onChange', () => {
  const handleChange = jest.fn();
  const container = render(<GameInput sendDataToParent={handleChange} />);
  const input = container.getByPlaceholderText('Username');
  fireEvent.change(input, { target: { value: 'new text' } });

  expect(handleChange).toHaveBeenCalled();
});
