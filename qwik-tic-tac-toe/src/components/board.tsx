import { component$ } from '@builder.io/qwik';
import { Square } from './square';

interface BoardProps {
  squares: (string | null)[];
  onClick$: (i: number) => void;
}



export const Board = component$<BoardProps>(({ squares, onClick$ }) => {
  return (
    <div class="board">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <Square key={i} value={squares[i]} onClick$={() => onClick$(i)} />
      ))}
    </div>
  );
});
