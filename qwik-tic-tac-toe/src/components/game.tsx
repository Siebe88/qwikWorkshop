import { component$, useStore, $ } from '@builder.io/qwik';
import { Board } from './board';

interface GameState {
  squares: (string | null)[];
  xIsNext: boolean;
}

export const Game = component$(() => {
  // Use a single store instead of multiple signals
  const gameState = useStore<GameState>({
    squares: Array(9).fill(null),
    xIsNext: true,
  });

  // Handle click - optimized to avoid unnecessary array copying
  const handleClick = $((i: number) => {
    // Calculate winner directly
    const currentWinner = calculateWinner(gameState.squares);

    // If square is already filled or there's a winner, do nothing
    if (currentWinner || gameState.squares[i]) {
      return;
    }

    // Update the square directly
    gameState.squares[i] = gameState.xIsNext ? 'X' : 'O';
    gameState.xIsNext = !gameState.xIsNext;
  });

  // Handle restart
  const handleRestart = $(() => {
    gameState.squares = Array(9).fill(null);
    gameState.xIsNext = true;
  });

  // Calculate winner directly in the render function
  const winner = calculateWinner(gameState.squares);

  // Calculate status directly in the render function
  let status: string;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (gameState.squares.every((square) => square !== null)) {
    status = 'Draw!';
  } else {
    status = `Next player: ${gameState.xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1
        style={{
          marginBottom: '20px',
          color: '#333',
          fontSize: '2rem',
        }}
      >
        Qwik Tic Tac Toe
      </h1>
      <div
        style={{
          marginBottom: '10px',
          fontSize: '18px',
          fontWeight: 'bold',
        }}
      >
        {status}
      </div>
      <Board squares={gameState.squares} onClick$={handleClick} />
      <button
        onClick$={handleRestart}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4caf50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '10px',
        }}
        onMouseOver$={(e) => ((e.target as HTMLElement).style.backgroundColor = '#45a049')}
        onMouseOut$={(e) => ((e.target as HTMLElement).style.backgroundColor = '#4caf50')}
      >
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
