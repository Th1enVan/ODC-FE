import { useState } from 'react'

type Board = (null | 'X' | 'O')[];

function App() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<null | 'X' | 'O'>(null);
  const [isDraw, setIsDraw] = useState<boolean>(false);

  const handleMove = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const winning = checkWinner(newBoard);
    if (winning) {
      setWinner(currentPlayer);
    } else if (newBoard.every(cell => cell)) {
      setIsDraw(true);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }

  }

  // Winning Conditions
  const winningLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  const checkWinner = (board: Board): boolean => {
    for (const line of winningLines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
    }
    return false;
  }

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setIsDraw(false);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Tic-Tac-Toe</h1>
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, index) => (
          <div
            key={index}
            className="w-16 h-16 flex items-center justify-center border border-cyan-500 text-2xl font-bold cursor-pointer"
            onClick={() => handleMove(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      {winner && <p className="mt-4 text-xl">Winner: {winner}</p>}
      {isDraw && <p className="mt-4 text-xl">It's a Draw!</p>}
      {(winner || isDraw) && (
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={restartGame}
        >
          Restart Game
        </button>
      )}
    </div>
  )
}

export default App
