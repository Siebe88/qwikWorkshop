import { component$, type QRL } from '@builder.io/qwik';

// Similar interface to React, but with $ suffix for event handlers
interface SquareProps {
  value: string | null;
  onClick$: QRL<() => void>; // In React: onClick: () => void
}

export const Square = component$<SquareProps>(({ value, onClick$ }) => {
  // JSX is similar in both React and Qwik, but Qwik uses $ suffix for event handlers
  return (
    <button class="square" onClick$={onClick$}>
      {value}
    </button>
  );
});
