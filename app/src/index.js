import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var outerGame = {
  innerGames: [
    {id: 0, squares: Array(9).fill(null), winner: null},
    {id: 1, squares: Array(9).fill(null), winner: null},
    {id: 2, squares: Array(9).fill(null), winner: null},
    {id: 3, squares: Array(9).fill(null), winner: null},
    {id: 4, squares: Array(9).fill(null), winner: null},
    {id: 5, squares: Array(9).fill(null), winner: null},
    {id: 6, squares: Array(9).fill(null), winner: null},
    {id: 7, squares: Array(9).fill(null), winner: null},
    {id: 8, squares: Array(9).fill(null), winner: null}
  ],
  innerGamesWon: 0,
  winner: null
}

/**
 * 
 * @param {*} props 
 */
function Square(props) {
  const classname = "square ".concat(props.name);
  return (
    <button className={classname} onClick={props.onClick}>
      {props.value}
    </button>
  );
}


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //squares is the array that represents the big/outer game?
      outerGame: outerGame,
      xIsNext: true,
    };
  }

  /**
   * 
   * @param {int} i 
   */
  handleClick(innerGameId, squareNum) {
    var outerGame = this.state.outerGame; 
    if (outerGame.winner 
      || outerGame.innerGames[innerGameId].winner 
      || outerGame.innerGames[innerGameId].squares[squareNum]){
        return; //do nothing if shouldnt be able to click this button anymore
      }
    console.log("gameNum:"+innerGameId+" squareNum:"+squareNum)
    //update the square that was clicked first
    outerGame.innerGames[innerGameId].squares[squareNum] = this.state.xIsNext ? 'X' : 'O';
    //then check if we have a winner after this current move
    const innerWinner = calcInnerWinner(outerGame.innerGames[innerGameId].squares);
    if (innerWinner) {
      outerGame.innerGames[innerGameId].winner = innerWinner;
      //increment outerGame winner count AND
      //check for out game winner if at least 3 inner games have been won
      if (++outerGame.innerGamesWon>2){
        outerGame.winner = calcOuterWinner(outerGame);
      }
      //return;
    }

    this.setState({
      outerGame: outerGame,
      xIsNext: !this.state.xIsNext,
    });
  }

  /**
   * A button of an inner game
   * @param {int} i index in the out array
   * @param {string} name relative to the inner game
   */
  renderSquare(innerGameId, squareNum, name) {
    return (
      <Square
        name={name}
        value={this.state.outerGame.innerGames[innerGameId].squares[squareNum]}
        onClick={() => this.handleClick(innerGameId, squareNum)}
      />
    );
  }

  render() {
    const winner = this.state.outerGame.winner
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    // 
    var spans = [];
    for (var i = 0; i < 9; i++) {
      // each push is an inner game
      spans.push(
        <span className="single-game" id={getGameId(i)}>
          <div className="board-row">
            {this.renderSquare(i, 0, "zero")}
            {this.renderSquare(i, 1, "one")}
            {this.renderSquare(i, 2, "two")}
          </div>
          <div className="board-row">
            {this.renderSquare(i, 3, "three")}
            {this.renderSquare(i, 4, "four")}
            {this.renderSquare(i, 5, "five")}
          </div>
          <div className="board-row">
            {this.renderSquare(i, 6, "six")}
            {this.renderSquare(i, 7, "seven")}
            {this.renderSquare(i, 8, "eight")}
          </div>
        </span>
      )
      // spans.push(<span class='vertical-line'/>)
      if (i % 3 === 2) {
        spans.push(<div></div>);
      }
    }

    return (
      <div>
        <div className="status">
          {status}
        </div>
        {spans}
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root') 
  );

// ==========================================  
// ||           HELPER FUNCTIONS           ||
// ==========================================
/**
 * Calculate the winner of an inner game 
 * @param {array} innerGameSquares 
 */
function calcInnerWinner(innerGameSquares) {
  // possible winning scenarios
  const lines = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // top-left to bottom-right
    [2, 4, 6], // top-right to bottom-left
  ];
  //for each winning scenario
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // short circuiting check if postions in winning scenario are all X or all O
    if (innerGameSquares[a] && innerGameSquares[a] === innerGameSquares[b] && innerGameSquares[a] === innerGameSquares[c]) {
      return innerGameSquares[a]; // if was a winner return 'X' or 'O'
    }
  }
  return null; // there is no winner
}

/**
 * Calculate the winner of the outer game, OVERALL WINNER
 * @param {*} number 
 */
function calcOuterWinner(outerGame){
  const lines = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // top-left to bottom-right
    [2, 4, 6], // top-right to bottom-left
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // short circuiting check if postions in winning scenario are all X or all O
    if (outerGame.innerGames[a].winner 
      && outerGame.innerGames[a].winner  === outerGame.innerGames[b].winner  
      && outerGame.innerGames[a].winner  === outerGame.innerGames[c].winner ) {
      return outerGame.innerGames[a].winner; // if was a winner return 'X' or 'O'
    }
  }
  return null; // there is no winner

}

/**
 * Helper method for getting word/string version of a number for the id of spans
 * Takes int, returns word equivalent
 * @param {int} number 
 */
function getGameId(number) {
  var ids = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
  return ids[number];
}