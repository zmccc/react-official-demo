export default function Square({ value, onSquareClick, isRed }) {
    return (
        <button className={`square ${isRed ? "red" : ""}`} onClick={onSquareClick}>
            {value}
        </button>
    );
}
