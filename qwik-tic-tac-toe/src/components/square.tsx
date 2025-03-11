import { component$, type QRL } from '@builder.io/qwik';

// Simplified interface for Square
interface SquareProps {
  value: string | null;
  onClick$: QRL<() => void>;
}

export const Square = component$<SquareProps>(({ value, onClick$ }) => {
  // JSX is similar in both React and Qwik, but Qwik uses $ suffix for event handlers
  return (
    <button class="square" onClick$={onClick$}>
      {value}
    </button>
  );
});
