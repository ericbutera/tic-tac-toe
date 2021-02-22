/*
https://reactjs.org/tutorial/tutorial.html#setup-for-the-tutorial
TODO next steps:
- Display the location for each move in the format (col, row) in the move history list.
- Bold the currently selected item in the move list.
- Rewrite Board to use two loops to make the squares instead of hardcoding them.
- Add a toggle button that lets you sort the moves in either ascending or descending order.
- When someone wins, highlight the three squares that caused the win.
- When no one wins, display a message about the result being a draw.

class State {
    constructor(stepNumber, history, column, row) {
        this.stepNumber = stepNumber
        this.history = [];
        this.move = {
            column: 0,
            row: 0
        }
    }
}
*/

import React from 'react';
import './TicTacToe.css';

const PLAYER_1 = 'X';
const PLAYER_2 = 'O';

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
 * Render the game board
 */
class Board extends React.Component {
    /**
     * Return structure representing rows & columns
     */
    board() {
        return [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8]
        ];
    }

    render() {
        return (
            <div>
                {this.board().map((columns, index) => 
                    <div className="board-row" key={index}>
                        {columns.map((cell) =>
                            <Square 
                                key={cell}
                                value={this.props.squares[cell]}
                                onClick={() => this.props.onClick(cell)}
                             />
                        )}
                    </div>
                )}
            </div>
        );
    }
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
            stepNumber: 0,
            xIsNext: true
        };
    }

    /**
     * Perform a move for the current player 
     * @param {number} i 
     */
    move(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice(); // clone squares

        if (calculateWinner(squares) || squares[i])
            return; // guard against game won or square already filled

        squares[i] = this.state.xIsNext ? PLAYER_1 : PLAYER_2;

        this.setState({
            history: history.concat([{ // do not mutate original array
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    /**
     * Return to a previous move
     * @param {number} step 
     */
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={current.squares}
                        onClick={(i) => this.move(i)} />
                </div>
                <div className="game-info">
                    <TurnStatus 
                        winner={winner}
                        xIsNext={this.state.xIsNext} />
                    <History 
                        history={history} 
                        jumpTo={(move) => this.jumpTo(move)} />
                </div>
            </div>
        );
    }
}

/**
 * Current game status
 * @param {*} props 
 */
function TurnStatus(props) {

    if (props.winner)
        return <Winner winner={props.winner} />

    return <CurrentPlayer xIsNext={props.xIsNext} />
}

function Winner(props){
    return <h1>{props.player} Wins!</h1>
}

function CurrentPlayer(props) {
    const player = props.xIsNext ? PLAYER_1 : PLAYER_2;
    return <h1>Current Turn {player}</h1>
}

/**
 * History of game moves
 * @param {any} props 
 */
function History(props) {
    return (
        <div className="history">
            <h2>History</h2>
            <ul className="history-list">
                {props.history.map((step, move) =>
                    <HistoryRow
                        key={move} 
                        move={move}
                        jumpTo={props.jumpTo} />
                )}
            </ul>
        </div>
    );
}

/**
 * Specific historical record
 * @param {*} props 
 */
function HistoryRow(props) {
    const desc = props.move
        ? 'move #' + props.move
        : 'game start';

    return (
        <li key={props.move}>
            <button onClick={() => props.jumpTo(props.move)}>
                {desc}
            </button>
        </li>
    );
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

export default Game;
