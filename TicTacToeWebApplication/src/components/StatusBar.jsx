import React from 'react';

/**
 * StatusBar component: Displays current status, winner/draw messages,
 * and invalid move feedback using ARIA live regions.
 * @param {Object} props
 * @param {string} props.statusMessage
 * @param {string|null} props.invalidMessage
 * @param {'X'|'O'|null} props.winner
 * @param {'X'|'O'} props.currentPlayer
 * @param {boolean} props.isDraw
 */
// PUBLIC_INTERFACE
export default function StatusBar({ statusMessage, invalidMessage, winner, currentPlayer, isDraw }) {
  return (
    <div className="status" aria-live="off">
      <div
        className={`line ${winner ? 'winner' : isDraw ? 'draw' : 'current'}`}
        role="status"
        aria-live="polite"
        data-testid="status-message"
      >
        {statusMessage}
      </div>
      <div
        className="line invalid"
        role="alert"
        aria-live="assertive"
        style={{ display: invalidMessage ? 'block' : 'none' }}
        data-testid="invalid-message"
      >
        {invalidMessage}
      </div>
      <div className="line" style={{ display: winner || isDraw ? 'block' : 'none' }}>
        {winner && <strong data-testid="winner-message">🎉 {winner} wins!</strong>}
        {isDraw && <strong data-testid="draw-message">🤝 It&apos;s a draw.</strong>}
      </div>
      <div className="line" aria-hidden="true" style={{ color: 'var(--muted)' }}>
        Current Player: <strong data-testid="current-player">{currentPlayer}</strong>
      </div>
    </div>
  );
}
