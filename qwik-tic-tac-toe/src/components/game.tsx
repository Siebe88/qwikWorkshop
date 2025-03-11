import { component$, useStore, $ } from '@builder.io/qwik';
import { Board } from './board';

// Define the game state interface (similar to React's state)
interface GameState {
  squares: (string | null)[];
  xIsNext: boolean;
}

export const Game = component$(() => {
  // In React: const [squares, setSquares] = useState(Array(9).fill(null));
  // In React: const [xIsNext, setXIsNext] = useState(true);
  // In Qwik, we use useStore instead of multiple useState calls
  const gameState = useStore<GameState>({
    squares: Array(9).fill(null),
    xIsNext: true,
  });

  // In React: const handleClick = (i) => { ... }
  // In Qwik: We use $() to mark functions that need serialization
  const handleClick = $((i: number) => {
    // If square is already filled or there's a winner, do nothing
    if (calculateWinner(gameState.squares) || gameState.squares[i]) {
      return;
    }

    // In React: const newSquares = squares.slice(); newSquares[i] = xIsNext ? 'X' : 'O';
    // In Qwik: We can mutate the store directly
    gameState.squares[i] = gameState.xIsNext ? 'X' : 'O';

    // In React: setXIsNext(!xIsNext);
    // In Qwik: We update the store property directly
    gameState.xIsNext = !gameState.xIsNext;
  });

  // In React: const handleRestart = () => { ... }
  // In Qwik: We use $() to mark functions that need serialization
  const handleRestart = $(() => {
    // In React: setSquares(Array(9).fill(null)); setXIsNext(true);
    // In Qwik: We update the store properties directly
    gameState.squares = Array(9).fill(null);
    gameState.xIsNext = true;
  });

  // Calculate game status - same logic as React
  const winner = calculateWinner(gameState.squares);
  let status: string;

  if (winner) {
    status = `Winner: ${winner}`;
  } else if (gameState.squares.every((square) => square !== null)) {
    status = 'Draw!';
  } else {
    status = `Next player: ${gameState.xIsNext ? 'X' : 'O'}`;
  }

  // JSX is similar in both React and Qwik, but Qwik uses $ suffix for event handlers
  return (
    <div class="game">
      <h1 class="game-title">Qwik Tic Tac Toe</h1>
      <div class="status">{status}</div>
      <Board squares={gameState.squares} onClick$={handleClick} />
      <button class="restart-button" onClick$={handleRestart}>
        Restart Game
      </button>
    </div>
  );
});

// Helper function to calculate winner - identical to React version
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
