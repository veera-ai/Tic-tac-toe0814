const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // cols
  [0, 4, 8],
  [2, 4, 6]  // diagonals
];

/**
 * Determine if the given board has a winning state.
 * Returns an object with the winner ('X'|'O') and the winning line, or {winner:null, line:null}.
 * @param {Array<('X'|'O'|null)>} board
 * @returns {{winner: ('X'|'O'|null), line: number[]|null}}
 */
// PUBLIC_INTERFACE
export function checkWinner(board) {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: null };
}

/**
 * Check if the board is full with no winner (draw).
 * @param {Array<('X'|'O'|null)>} board
 * @returns {boolean}
 */
// PUBLIC_INTERFACE
export function isDraw(board) {
  return board.every(cell => cell !== null);
}

/**
 * Get the next player symbol.
 * @param {'X'|'O'} current
 * @returns {'X'|'O'}
 */
// PUBLIC_INTERFACE
export function getNextPlayer(current) {
  return current === 'X' ? 'O' : 'X';
}
