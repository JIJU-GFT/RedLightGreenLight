import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import GameButton from '../GameButton';

test('renders game button', () => {
  const container = render(<GameButton title="button1" buttonType="Game-button" onClick={() => {}} />);
  const button = container.getByText('button1');
  expect(button).toBeInTheDocument();
});

test('button triggers onClick', () => {
  const handleClick = jest.fn();
  const container = render(<GameButton title="button1" buttonType="Game-button" onClick={handleClick} />);
  const button = container.getByText('button1');
  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalled();
});
