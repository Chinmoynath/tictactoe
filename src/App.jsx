import React,{ useState } from 'react';
import Board from './components/Board';
import History from './components/History';
import { calculateWinner } from './helpers';
import "./styles/root.scss";

const App = () => {
  
  const [history, setHistory]=useState([ 
    {board: Array(9).fill(null), isXNext: true},
  ]);
  const [currentMove, setCurrentMove] = useState(0);

  const current = history[currentMove];
  

  const winner = calculateWinner(current.board);

  const message = winner 
  ? `winner is ${winner}` 
  : `Next player is ${current.isXNext ? 'X' : 'O'}`;  //logic under logic

  const handleSquareClick = (position) =>{
   
    if(current.board[position] || winner){  //if our x or o already exist of we have the winner, then return nothing.
      return;
    }

    setHistory(prev => {

      const last = prev[prev.length - 1]; //it give last element in previous array

      const newBoard = last.board.map((square, pos) => {
        if(pos === position) {
          return last.isXNext ?'x': 'O';
        }
        return square;
      });
      return prev.concat({ board: newBoard, isXNext: !last.isXNext});
    });

    setCurrentMove(prev => prev + 1);  //to increment the current move counter
    
  };
  
  const moveTo = move => {
    setCurrentMove(move);
  }

  return (
    <div className="app">
    <h1>TIC TAC TOE</h1>
    <h2 >{ message }</h2>
    <Board board={current.board} handleSquareClick={handleSquareClick} />
    <History history = {history} moveTo = {moveTo} currentMove ={currentMove} />
  </div>
  );
};

export default App;
