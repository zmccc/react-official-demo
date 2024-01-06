import { useMemo } from "react";
import Square from "./Square";

export default function Board({ xIsNext, squares, onPlay }) {
    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [0, 3, 6],
            [0, 4, 8],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6],
            [3, 4, 5],
            [6, 7, 8],
        ];
        for (let i = 0; i < lines.length; i++) {
            let [a, b, c] = lines[i];
            if (squares[a] && squares[b] && squares[c] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return {
                    winner: squares[a],
                    line: lines[i],
                };
            }
        }
        return null;
    };

    const winnerObj = useMemo(() => {
        return calculateWinner(squares);
    }, [squares]);

    const handleClick = (i, info) => {
        if (squares[i] || winnerObj) return;
        const nextSquares = squares.slice();
        nextSquares[i] = xIsNext ? "X" : "O";
        onPlay(nextSquares, info);
    };

    const status = useMemo(() => {
        return winnerObj
            ? `Winner: ${winnerObj.winner}`
            : squares.filter((item) => !item).length !== 0
            ? `Next player: ${xIsNext ? "X" : "O"}`
            : "平局";
    }, [winnerObj, xIsNext]);

    return (
        <>
            <div className="status">{status}</div>
            {Array(3)
                .fill("")
                .map((row, i) => (
                    <div className="board-row" key={i}>
                        {Array(3)
                            .fill("")
                            .map((item, j) => (
                                <Square
                                    isRed={
                                        winnerObj
                                            ? (winnerObj.line[0] === j + 3 * i ? true : false) ||
                                              (winnerObj.line[1] === j + 3 * i ? true : false) ||
                                              (winnerObj.line[2] === j + 3 * i ? true : false)
                                            : false
                                    }
                                    key={j}
                                    onSquareClick={() => handleClick(j + 3 * i, { row: i, col: j })}
                                    value={squares[j + 3 * i]}
                                />
                            ))}
                    </div>
                ))}
        </>
    );
}
