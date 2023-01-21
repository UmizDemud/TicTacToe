import { useState } from 'react'
import './index.css'

let turn = 0;

export function TicTacToe() {
  const [history, setHistory] = useState([
    [
      null, null, null, null, null, null, null, null, null,
    ]
  ]);

  const resetTo = (move) => {
    turn = move;

    setHistory(history.slice(0, move + 1))
  }

  const pushToHistory = (board, index, player) => {
    if(calculateWinner(board) || board[index]) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = player;

    turn += 1;
    setHistory([...history, newBoard]);
  }

  const board = history[history.length - 1];
  const moves = history.map((_squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => resetTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="App game">
      <div className="game-board">
        <div className="status">{getStatus(board, getPlayer())}</div>
        <Board pushToHistory={pushToHistory} board={board} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function calculateWinner(squares) {
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

function getStatus(board, player) {
  const winner = calculateWinner(board);

  if (winner) {
    return "Winner: " + winner;
  } else {
    return "Next player: " + player;
  }
}

const getPlayer = () => turn % 2 ? 'O' : 'X';

function Board({board, pushToHistory}) {
  return (
    <>
      <div className="board-row">
        <button onClick={() => pushToHistory(board, 0, getPlayer(turn))} className="square">
          {board[0]}
        </button>
        <button onClick={() => pushToHistory(board, 1, getPlayer(turn))} className="square">
          {board[1]}
        </button>
        <button onClick={() => pushToHistory(board, 2, getPlayer(turn))} className="square">
          {board[2]}
        </button>
      </div>
      <div className="board-row">
        <button onClick={() => pushToHistory(board, 3, getPlayer(turn))} className="square">
          {board[3]}
        </button>
        <button onClick={() => pushToHistory(board, 4, getPlayer(turn))} className="square">
          {board[4]}
        </button>
        <button onClick={() => pushToHistory(board, 5, getPlayer(turn))} className="square">
          {board[5]}
        </button>
      </div>
      <div className="board-row">
        <button onClick={() => pushToHistory(board, 6, getPlayer(turn))} className="square">
          {board[6]}
        </button>
        <button onClick={() => pushToHistory(board, 7, getPlayer(turn))} className="square">
          {board[7]}
        </button>
        <button onClick={() => pushToHistory(board, 8, getPlayer(turn))} className="square">
          {board[8]}
        </button>
      </div>
    </>
  )
}
