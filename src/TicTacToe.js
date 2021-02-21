import React from 'react';
import './TicTacToe.css';

/**
 * Function component. No state, one render method.
 * Less tedious to write than classes.
 * @param {*} props 
 */
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

/**
 * 
 */
class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)} // use parent provided click handler
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

/**
 * Given an array of 9 squares, this function will check for a winner.
 * @param {Array} squares current move state
 * @returns {string|null} 'X', 'O', or null as appropriate
 */
function calculateWinner(squares) {
    /**
     * Contains all winning combinations
     */
    const lines = [
        [0, 1, 2], // horiz 1st row
        [3, 4, 5], // horiz 2nd row
        [6, 7, 8], // horiz 3rd row
        [0, 3, 6], // vert 1st col
        [1, 4, 7], // vert 2nd col
        [2, 5, 8], // vert 3rd col
        [0, 4, 8], // diag top left to bottom right
        [2, 4, 6], // diag top right to bottom left
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

/**
 * Tic Tac Toe game 
 */
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true
        };
    }

    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice(); // clone squares

        if (calculateWinner(squares) || squares[i])
            return; // guard against game won or square already filled

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            history: history.concat([{ // do not mutate original array
                squares: squares,
            }]),
            xIsNext: !this.state.xIsNext
        });
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);

        let status = winner
            ? 'Winner: ' + winner
            : 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

export default Game;