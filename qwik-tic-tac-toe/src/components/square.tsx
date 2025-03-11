import { component$ } from '@builder.io/qwik';

interface SquareProps {
  value: string | null;
  onClick$: () => void;
}

export const Square = component$<SquareProps>(({ value, onClick$ }) => {
  return (
    <button class="square" onClick$={onClick$}>
      {value}
    </button>
  );
});
