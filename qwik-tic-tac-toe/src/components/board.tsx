import { component$, $ } from '@builder.io/qwik';
import { Square } from './square';

interface BoardProps {
  squares: (string | null)[];
  onClick$: (i: number) => void;
}

export const Board = component$<BoardProps>(({ squares, onClick$ }) => {
  // Pre-define the indices to avoid recreating the array on each render
  const indices = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  // Properly wrap the click handler to avoid serialization warning
  const handleSquareClick = $((i: number) => {
    onClick$(i);
  });

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 100px)',
        gridTemplateRows: 'repeat(3, 100px)',
        gap: '5px',
        marginBottom: '20px',
      }}
    >
      {indices.map((i) => (
        <Square key={i} value={squares[i]} onClick$={() => handleSquareClick(i)} />
      ))}
    </div>
  );
});
