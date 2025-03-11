import { component$, useSignal, useComputed$, $ } from '@builder.io/qwik';
import { Board } from './board';

// Using inline styles to avoid extra CSS downloads
const gameStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const titleStyle = {
  marginBottom: '20px',
  color: '#333',
  fontSize: '2rem',
};

const statusStyle = {
  marginBottom: '10px',
  fontSize: '18px',
  fontWeight: 'bold',
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#4caf50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginTop: '10px',
};

// Pre-compute winning lines to avoid recreating them on each calculation
const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const Game = component$(() => {
  // State
  const squares = useSignal<(string | null)[]>(Array(9).fill(null));
  const xIsNext = useSignal<boolean>(true);

  // Calculate winner
  const winner = useComputed$(() => calculateWinner(squares.value));

  // Calculate status
  const status = useComputed$(() => {
    if (winner.value) {
      return `Winner: ${winner.value}`;
    } else if (squares.value.every((square) => square !== null)) {
      return 'Draw!';
    } else {
      return `Next player: ${xIsNext.value ? 'X' : 'O'}`;
    }
  });

  // Handle click
  const handleClick = $((i: number) => {
    // If square is already filled or there's a winner, do nothing
    if (winner.value || squares.value[i]) {
      return;
    }

    // Update the board
    const newSquares = [...squares.value];
    newSquares[i] = xIsNext.value ? 'X' : 'O';
    squares.value = newSquares;
    xIsNext.value = !xIsNext.value;
  });

  // Handle restart
  const handleRestart = $(() => {
    squares.value = Array(9).fill(null);
    xIsNext.value = true;
  });

  return (
    <div class="game">
      <h1 class="game-title">Qwik Tic Tac Toe</h1>
      <div class="status">{status.value}</div>
      <Board squares={squares.value} onClick$={handleClick} />
      <button class="restart-button" onClick$={handleRestart}>
        Restart Game
      </button>
    </div>
  );
});

// Helper function to calculate winner
function calculateWinner(squares: (string | null)[]): string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
