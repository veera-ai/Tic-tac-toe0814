import React, { useMemo, useRef, useEffect } from 'react';
import Square from './Square';

/**
 * Board component: renders a 3x3 grid of squares and implements arrow-key navigation.
 * @param {Object} props
 * @param {Array<('X'|'O'|null)>} props.board
 * @param {(index:number) => boolean} props.onMove
 * @param {boolean} props.disabled
 * @param {number[]|null} props.winningLine
 * @param {number|null} props.invalidIndex
 */
// PUBLIC_INTERFACE
export default function Board({ board, onMove, disabled, winningLine, invalidIndex }) {
  const buttonRefs = useRef(Array.from({ length: 9 }, () => React.createRef()));

  // Focus the first empty cell when the game starts or resets
  useEffect(() => {
    const firstEmpty = board.findIndex(v => v === null);
    if (firstEmpty >= 0 && buttonRefs.current[firstEmpty]?.current) {
      buttonRefs.current[firstEmpty].current.focus();
    }
  }, [board]);

  const rows = useMemo(() => {
    return [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8]
    ];
  }, []);

  const handleKeyDown = (e, index) => {
    const col = index % 3;
    const row = Math.floor(index / 3);
    let nextIndex = index;

    switch (e.key) {
      case 'ArrowRight':
        if (col < 2) nextIndex = index + 1;
        else nextIndex = index - 2; // wrap to row start
        e.preventDefault();
        break;
      case 'ArrowLeft':
        if (col > 0) nextIndex = index - 1;
        else nextIndex = index + 2; // wrap to row end
        e.preventDefault();
        break;
      case 'ArrowDown':
        if (row < 2) nextIndex = index + 3;
        else nextIndex = index - 6; // wrap to top
        e.preventDefault();
        break;
      case 'ArrowUp':
        if (row > 0) nextIndex = index - 3;
        else nextIndex = index + 6; // wrap to bottom
        e.preventDefault();
        break;
      case 'Enter':
      case ' ':
        onMove(index);
        e.preventDefault();
        return;
      default:
        return;
    }

    const nextRef = buttonRefs.current[nextIndex]?.current;
    if (nextRef) nextRef.focus();
  };

  return (
    <div
      className="board"
      role="grid"
      aria-label="Tic Tac Toe board with nine squares"
      aria-describedby="board-instructions"
    >
      <span id="board-instructions" className="visually-hidden">
        Use arrow keys to move focus. Press Enter or Space to place your mark.
      </span>
      {rows.map((r, rIdx) => (
        <div role="row" key={`row-${rIdx}`} aria-label={`Row ${rIdx + 1}`}>
          {r.map((idx, cIdx) => (
            <Square
              key={idx}
              ref={buttonRefs.current[idx]}
              value={board[idx]}
              index={idx}
              row={rIdx}
              col={cIdx}
              onClick={() => onMove(idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              disabled={disabled}
              highlight={Array.isArray(winningLine) ? winningLine.includes(idx) : false}
              invalid={invalidIndex === idx}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
