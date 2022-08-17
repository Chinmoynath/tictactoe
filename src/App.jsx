import React,{ useState } from 'react';
import Board from './components/Board';
import History from './components/History';
import StatusMessage from './components/StatusMessage';
import { calculateWinner } from './helpers';
import "./styles/root.scss";

const NEW_GAME = [
  { board: Array(9).fill(null), isXNext: true },
];

const App = () => {
  
  const [history, setHistory]=useState(NEW_GAME);
  const [currentMove, setCurrentMove] = useState(0);

  const current = history[currentMove];
  

  const {winner, winningSquares} = calculateWinner(current.board);

  //logic under logic

  const handleSquareClick = (position) =>{
   
    if(current.board[position] || winner){  //if our x or o already exist of we have the winner, then return nothing.
      return;
    }

    setHistory(prev => {

      const last = prev[prev.length - 1]; //it give last element in previous array

      const newBoard = last.board.map((square, pos) => {
        if(pos === position) {
          return last.isXNext ?'X': 'O';
        }
        return square;
      });
      return prev.concat({ board: newBoard, isXNext: !last.isXNext});
    });

    setCurrentMove(prev => prev + 1);  //to increment the current move counter
    
  };
  
  const moveTo = move => {
    setCurrentMove(move);
  };

  const onNewGame = () => {
    setHistory(NEW_GAME);
    setCurrentMove(0);
  };

  return (
    <div className="app">
    <h1>TIC<span className="text-green">TAC</span> TOE</h1>
    <StatusMessage winner={winner} current = {current}  />
    <Board board={current.board} handleSquareClick={handleSquareClick} winningSquares= {winningSquares} />
    <button type="button" onClick={onNewGame} 
      className={`btn-reset ${winner ? 'active' : ''}`}
    >
      Start new game
      </button>
    <h2 style={{ fontWeight: 'normal' }}>Current game history</h2>  
    <History history = {history} moveTo = {moveTo} currentMove ={currentMove} />
    <div className="bg-balls" />
  </div>
  );
};

export default App;
