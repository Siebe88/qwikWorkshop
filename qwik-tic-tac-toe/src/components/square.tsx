import { component$, type QRL, $ } from '@builder.io/qwik';

interface SquareProps {
  value: string | null;
  onClick$: QRL<() => void>;
}

export const Square = component$<SquareProps>(({ value, onClick$ }) => {
  const squareStyle = {
    background: 'white',
    border: '1px solid #999',
    fontSize: '48px',
    fontWeight: 'bold',
    lineHeight: '100px',
    height: '100px',
    textAlign: 'center' as const,
    width: '100px',
    cursor: 'pointer',
  };

  const handleMouseOver = $((e: MouseEvent) => {
    (e.target as HTMLElement).style.backgroundColor = '#f0f0f0';
  });

  const handleMouseOut = $((e: MouseEvent) => {
    (e.target as HTMLElement).style.backgroundColor = 'white';
  });

  return (
    <button
      style={squareStyle}
      preventdefault:click
      onClick$={onClick$}
      onMouseOver$={handleMouseOver}
      onMouseOut$={handleMouseOut}
    >
      {value}
    </button>
  );
});
