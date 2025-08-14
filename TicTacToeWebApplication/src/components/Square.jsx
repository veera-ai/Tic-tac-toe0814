import React, { forwardRef } from 'react';

/**
 * Square component: a single clickable cell in the Tic Tac Toe board.
 * Provides ARIA labels for screen readers and visual affordances for highlights.
 * @param {Object} props
 * @param {'X'|'O'|null} props.value
 * @param {number} props.index
 * @param {number} props.row
 * @param {number} props.col
 * @param {() => void} props.onClick
 * @param {(e:KeyboardEvent) => void} props.onKeyDown
 * @param {boolean} props.disabled
 * @param {boolean} props.highlight
 * @param {boolean} props.invalid
 */
// PUBLIC_INTERFACE
const Square = forwardRef(function Square(
  { value, index, row, col, onClick, onKeyDown, disabled, highlight, invalid },
  ref
) {
  const ariaLabel = `Row ${row + 1}, Column ${col + 1}. ${value ? `Occupied by ${value}` : 'Empty'}`;
  const classNames = ['square'];
  if (highlight) classNames.push('win');
  if (invalid) classNames.push('invalid');

  return (
    <button
      ref={ref}
      type="button"
      className={classNames.join(' ')}
      onClick={onClick}
      onKeyDown={onKeyDown}
      aria-label={ariaLabel}
      aria-disabled={disabled ? 'true' : 'false'}
      data-testid={`square-${index}`}
    >
      {value || ''}
    </button>
  );
});

export default Square;
