import { component$, $ } from '@builder.io/qwik';
import { Square } from './square';

// Similar interface to React, but with $ suffix for event handlers
interface BoardProps {
  squares: (string | null)[];
  onClick$: (i: number) => void;
}

export const Board = component$<BoardProps>(({ squares, onClick$ }) => {
  // In React: We directly use onClick in the Square component
  // In Qwik: We need to wrap the click handler with $() for serialization
  const handleSquareClick = $((i: number) => {
    onClick$(i);
  });

  // JSX is similar in both React and Qwik
  return (
    <div class="board">
      {/* In React: We map over an array of indices */}
      {/* In Qwik: Same approach, but we use onClick$ with $ suffix */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <Square key={i} value={squares[i]} onClick$={() => handleSquareClick(i)} />
      ))}
    </div>
  );
});
