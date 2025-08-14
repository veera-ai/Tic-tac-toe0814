import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders Tic Tac Toe title and 9 squares', () => {
  render(<App />);
  expect(screen.getByTestId('app-title')).toHaveTextContent(/tic tac toe/i);

  const squares = Array.from({ length: 9 }, (_, i) => screen.getByTestId(`square-${i}`));
  expect(squares).toHaveLength(9);

  expect(screen.getByTestId('reset-button')).toBeInTheDocument();
});

test('allows a player to make a move and shows status', async () => {
  render(<App />);
  const user = userEvent.setup();
  const firstSquare = screen.getByTestId('square-0');
  await user.click(firstSquare);

  // After first click, X should be placed and it's now O's turn
  expect(firstSquare).toHaveTextContent('X');
  expect(screen.getByTestId('status-message')).toHaveTextContent(/player o's turn/i);
});
