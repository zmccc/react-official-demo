import { useState } from "react";
import Board from "./Board";

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill("")]);
    const [curMove, setCurmove] = useState(0);
    const [isAsc, setIsAsc] = useState(true);
    const currentSquares = history[curMove];
    let xIsNext = curMove % 2 === 0;

    const handlePlay = (nextSquares) => {
        setHistory([...history.slice(0, curMove + 1), nextSquares]);
        setCurmove(curMove + 1);
    };

    const jumpTo = (i) => {
        setCurmove(i);
    };

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                {curMove ? <div>{`You are at move #${curMove}`}</div> : null}
                <ol>
                    {history
                        .slice()
                        .sort(() => (isAsc ? 1 : -1))
                        .map((item, i) => (
                            <li key={i}>
                                <button onClick={() => jumpTo(i === 0 ? 0 : isAsc ? i : history.length - i)}>
                                    {i === 0 ? `Go to game start` : `Go to move #${isAsc ? i : history.length - i}`}
                                </button>
                            </li>
                        ))}
                </ol>
                <button onClick={() => setIsAsc(!isAsc)}>{isAsc ? "降序" : "升序"}</button>
            </div>
        </div>
    );
}
