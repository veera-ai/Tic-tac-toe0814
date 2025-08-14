import React from 'react';
import Board from './Board';
import StatusBar from './StatusBar';
import Controls from './Controls';
import useTicTacToe from '../hooks/useTicTacToe';

/**
 * Game component: orchestrates the Tic Tac Toe board, status feedback, and controls.
 * Uses in-memory state via useTicTacToe hook.
 */
// PUBLIC_INTERFACE
export default function Game() {
  const {
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
  } = useTicTacToe();

  return (
    <section className="game" aria-label="Tic Tac Toe Game">
      <div className="panel" aria-labelledby="board-label">
        <h2 id="board-label" className="visually-hidden">Board</h2>
        <Board
          board={board}
          onMove={handleMove}
          disabled={Boolean(winner) || isDraw}
          winningLine={winningLine}
          invalidIndex={invalidIndex}
        />
      </div>

      <div className="panel" aria-labelledby="status-controls-label">
        <h2 id="status-controls-label" className="visually-hidden">Status and Controls</h2>
        <StatusBar
          statusMessage={statusMessage}
          invalidMessage={invalidMessage}
          winner={winner}
          currentPlayer={currentPlayer}
          isDraw={isDraw}
        />
        <Controls
          onReset={resetGame}
        />
        <div className="description" style={{ textAlign: 'left', marginTop: 12, color: 'var(--muted)', fontSize: '0.95rem' }}>
          <p>
            Keyboard tips: Use arrow keys to move focus across the grid. Press Enter or Space to place your mark.
          </p>
        </div>
      </div>
    </section>
  );
}
