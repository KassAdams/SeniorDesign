import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  const classname = "square ".concat(`${props.name}`);
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
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i, name) {
    return (
      <Square
        name={name}
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    var spans = [];
    for (var i = 0; i < 9; i++) {
      spans.push(<span className="single-game" id={getGameId(i)}>
        <div className="board-row">
          {this.renderSquare((0+(i*9)), "zero")}
          {this.renderSquare(1+(i*9), "one")}
          {this.renderSquare(2+(i*9), "two")}
        </div>
        <div className="board-row">
          {this.renderSquare(3+(i*9), "three")}
          {this.renderSquare(4+(i*9), "four")}
          {this.renderSquare(5+(i*9), "five")}
        </div>
        <div className="board-row">
          {this.renderSquare(6+(i*9), "six")}
          {this.renderSquare(7+(i*9), "seven")}
          {this.renderSquare(8+(i*9), "eight")}
        </div>
      </span>)
      // spans.push(<span class='vertical-line'/>)
      if (i % 3 == 2) {
        spans.push(<div></div>);
      }
    }

    return (
      <div>
      <div className="status">{status}</div>
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

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

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

function getGameId(number) {
  var ids = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
  return ids[number];
}
