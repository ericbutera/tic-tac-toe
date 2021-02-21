// $ yarn test

import { render, screen } from '@testing-library/react';
import Game from './TicTacToe';

test('renders next player X default', () => {
  render(<Game />);
  const el = screen.getByText(/Next player: X/i);
  expect(el).toBeInTheDocument();
});
