import React,{ useState } from 'react';
import Board from './components/Board';
import { calculateWinner } from './helpers';
import "./styles/root.scss";

const App = () => {
  
  const [board, setBoard]=useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(false);

  const winner = calculateWinner(board);

  const message = winner 
  ? `winner is ${winner}` 
  : `Next player is ${isXNext ? 'X' : 'O'}`;  //logic under logic

  const handleSquareClick = (position) =>{
   
    if(board[position] || winner){  //if our x or o already exist of we have the winner, then return nothing.
      return;
    }

    setBoard( (prev) => {
      return prev.map((square, pos) => {
        if(pos === position) {
          return isXNext ?'x': 'O';
        }
        return square;
      });
    });
    setIsXNext( (prev) => !prev)
  };
  return (
    <div className="app">
    <h1>TIC TAC TOE</h1>
    <h2 >{ message }</h2>
    <Board board={board} handleSquareClick={handleSquareClick} />
  </div>
  );
};

export default App;
