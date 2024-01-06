import { useState } from "react";
import Board from "./Board";

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill("")]);
    const [moveList, setMoveList] = useState([]);
    const [curMove, setCurmove] = useState(0);
    const [isAsc, setIsAsc] = useState(true);
    const currentSquares = history[curMove];
    let xIsNext = curMove % 2 === 0;

    const handlePlay = (nextSquares, info) => {
        setHistory([...history.slice(0, curMove + 1), nextSquares]);
        setMoveList([...moveList.slice(0, curMove), info]);
        setCurmove(curMove + 1);
    };

    const jumpTo = (i) => {
        let move = i === 0 ? 0 : isAsc ? i : history.length - i;
        setCurmove(move);
    };

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                {curMove ? <div>{`You are at move #${curMove}`}</div> : null}
                <ol>
                    {history.map((item, i) => (
                        <li key={i}>
                            <button onClick={() => jumpTo(i)}>
                                {i === 0
                                    ? `Go to game start`
                                    : `Go to move #${isAsc ? i : history.length - i}(${moveList[(isAsc ? i : history.length - i) - 1].row},${
                                          moveList[(isAsc ? i : history.length - i) - 1].col
                                      })`}
                            </button>
                        </li>
                    ))}
                </ol>
                <button onClick={() => setIsAsc(!isAsc)}>{isAsc ? "降序" : "升序"}</button>
            </div>
        </div>
    );
}
