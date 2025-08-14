import { useCallback, useMemo, useState } from 'react';
import { checkWinner, isDraw as isDrawUtil, getNextPlayer } from '../utils/gameLogic';

/**
 * useTicTacToe custom hook manages the in-memory state and logic for a tic tac toe game.
 * Exposes board state, current player, feedback messages, and actions (handleMove, resetGame).
 */
// PUBLIC_INTERFACE
export default function useTicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState(null);
  const [invalidMessage, setInvalidMessage] = useState(null);
  const [invalidIndex, setInvalidIndex] = useState(null);

  const isDraw = useMemo(() => isDrawUtil(board) && !winner, [board, winner]);

  const statusMessage = useMemo(() => {
    if (winner) return `${winner} wins!`;
    if (isDraw) return "It's a draw.";
    return `Player ${currentPlayer}'s turn.`;
  }, [winner, isDraw, currentPlayer]);

  const handleMove = useCallback((index) => {
    // Disallow moves if game is over
    if (winner) {
      setInvalidMessage('Game over. Please reset to play again.');
      return false;
    }
    // Validate index and occupancy
    if (index < 0 || index > 8) {
      setInvalidMessage('Invalid move: out of bounds.');
      setInvalidIndex(index);
      setTimeout(() => setInvalidIndex(null), 200);
      return false;
    }
    if (board[index] !== null) {
      setInvalidMessage('Invalid move: cell already occupied.');
      setInvalidIndex(index);
      setTimeout(() => setInvalidIndex(null), 200);
      return false;
    }

    setInvalidMessage(null);
    setBoard(prev => {
      const next = prev.slice();
      next[index] = currentPlayer;

      const result = checkWinner(next);
      if (result.winner) {
        setWinner(result.winner);
        setWinningLine(result.line);
      } else if (!isDrawUtil(next)) {
        setCurrentPlayer(getNextPlayer(currentPlayer));
      }

      return next;
    });

    return true;
  }, [board, currentPlayer, winner]);

  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setWinningLine(null);
    setInvalidMessage(null);
    setInvalidIndex(null);
  }, []);

  return {
    board,
    currentPlayer,
    winner,
    winningLine,
    isDraw,
    statusMessage,
    invalidMessage,
    handleMove,
    resetGame,
    invalidIndex,
  };
}
