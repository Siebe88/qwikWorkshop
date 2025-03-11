import { component$, $ } from '@builder.io/qwik';
import { Square } from './square';
import { calculateWinner } from './game';

// Define the game state interface
interface GameState {
  squares: (string | null)[];
  xIsNext: boolean;
}

// Updated interface to accept the game state
interface BoardProps {
  gameState: GameState;
}

export const Board = component$<BoardProps>(({ gameState }) => {
  // Handle square click directly in the Board component
  const handleSquareClick = $((index: number) => {
    // If square is already filled or there's a winner, do nothing
    if (calculateWinner(gameState.squares) || gameState.squares[index]) {
      return;
    }

    // Update the square directly
    gameState.squares[index] = gameState.xIsNext ? 'X' : 'O';

    // Toggle the next player
    gameState.xIsNext = !gameState.xIsNext;
  });

  // JSX is similar in both React and Qwik
  return (
    <div class="board">
      {/* In React: We map over an array of indices */}
      {/* In Qwik: Same approach, but we use onClick$ with $ suffix */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <Square key={i} value={gameState.squares[i]} onClick$={() => handleSquareClick(i)} />
      ))}
    </div>
  );
});
