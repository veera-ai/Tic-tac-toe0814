import React from 'react';

/**
 * Controls component: action buttons for the game.
 * @param {Object} props
 * @param {() => void} props.onReset
 */
// PUBLIC_INTERFACE
export default function Controls({ onReset }) {
  return (
    <div className="controls" role="group" aria-label="Game Controls">
      <button
        type="button"
        className="btn btn-primary"
        onClick={onReset}
        data-testid="reset-button"
        aria-label="Reset the game"
      >
        ↺ Reset Game
      </button>
    </div>
  );
}
