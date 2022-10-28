import React from "react";
import { useState } from "react";

const Board = () => {
  let updateScore = () => {
    if (currentWinner) {
      let newScore = playerScore;
      let emptyArr = [];
      newScore.forEach((item) => {
        if (item.id === currentWinner) {
          let newObj = { id: item.id, score: item.score + 1 };
          emptyArr.push(newObj);
        } else {
          let newObj = { id: item.id, score: item.score };
          emptyArr.push(newObj);
        }
      });

      setPlayerScore(emptyArr);
    }
  };

  const [turn, setTurn] = useState(1);
  const [currentWinner, setCurrentWinner] = useState("");
  const [playerScore, setPlayerScore] = useState([
    { id: 1, score: 0 },
    { id: 2, score: 0 },
  ]);
  const [scoreBoard, setScoreBoard] = useState([
    { id: 0, row: 1, col: 1, value: 0 },
    { id: 1, row: 1, col: 2, value: 0 },
    { id: 2, row: 1, col: 3, value: 0 },
    { id: 3, row: 2, col: 1, value: 0 },
    { id: 4, row: 2, col: 2, value: 0 },
    { id: 5, row: 2, col: 3, value: 0 },
    { id: 6, row: 3, col: 1, value: 0 },
    { id: 7, row: 3, col: 2, value: 0 },
    { id: 8, row: 3, col: 3, value: 0 },
  ]);
  const switchTurns = () => {
    turn === 1 ? setTurn(2) : setTurn(1);
  };

  const checkForWinner = () => {
    let row1 = scoreBoard.filter((item) => item.row === 1);
    let row2 = scoreBoard.filter((item) => item.row === 2);
    let row3 = scoreBoard.filter((item) => item.row === 3);
    let rowList = [row1, row2, row3];
    let col1 = scoreBoard.filter((item) => item.col === 1);
    let col2 = scoreBoard.filter((item) => item.col === 2);
    let col3 = scoreBoard.filter((item) => item.col === 3);
    let colList = [col1, col2, col3];
    let diag1 = [row1[0], row2[1], row3[2]];
    let diag2 = [row1[2], row2[1], row3[0]];

    rowList.forEach((row) => {
      row.every((item) => item.value === 1)
        ? setCurrentWinner(1)
        : row.every((item) => item.value === 2) && setCurrentWinner(2);
    });
    colList.forEach((col) => {
      col.every((item) => item.value === 1)
        ? setCurrentWinner(1)
        : col.every((item) => item.value === 2) && setCurrentWinner(2);
    });

    diag1.every((item) => item.value === 1)
      ? setCurrentWinner(1)
      : (diag1.every((item) => item.value === 2) && setCurrentWinner(2)) ||
        diag2.every((item) => item.value === 1)
      ? setCurrentWinner(1)
      : diag2.every((item) => item.value === 2) && setCurrentWinner(2);
  };

  const changeScore = (id) => {
    let newScoreBoard = scoreBoard;
    newScoreBoard[id].value = turn;
    setScoreBoard(newScoreBoard);
    console.log(newScoreBoard);
    switchTurns();
    checkForWinner();
    console.log(playerScore);
  };

  const reset = () => {
    setTurn(1);
    setScoreBoard([
      { id: 0, row: 1, col: 1, value: 0 },
      { id: 1, row: 1, col: 2, value: 0 },
      { id: 2, row: 1, col: 3, value: 0 },
      { id: 3, row: 2, col: 1, value: 0 },
      { id: 4, row: 2, col: 2, value: 0 },
      { id: 5, row: 2, col: 3, value: 0 },
      { id: 6, row: 3, col: 1, value: 0 },
      { id: 7, row: 3, col: 2, value: 0 },
      { id: 8, row: 3, col: 3, value: 0 },
    ]);
    setCurrentWinner("");
  };

  return (
    <div className=" w-96 mx-auto mt-10 bg-slate-400 flex flex-col">
      <h1 className="text-center text-white p-5">
        {currentWinner
          ? `The winner is player${currentWinner}`
          : `Player${turn} turn!`}
      </h1>
      <div className="grid grid-cols-3">
        {scoreBoard.map((item) => (
          <button
            key={item.id}
            className="border w-titleW h-titleH"
            onClick={() => changeScore(item.id)}
            value={item}
            disabled={item.value > 0 ? true : currentWinner ? true : false}
          >
            {item.value === 0 ? (
              item.id
            ) : item.value === 1 ? (
              <img
                className=" w-full h-full"
                src="./imgs/cross.png"
                alt="cross"
              ></img>
            ) : (
              <img
                className=" w-full h-full"
                src="./imgs/zero.png"
                alt="zero"
              ></img>
            )}
          </button>
        ))}
      </div>
      {!currentWinner ? (
        <button className="p-10" onClick={reset}>
          Reset!
        </button>
      ) : (
        <button
          className="p-10"
          onClick={() => {
            reset();
            updateScore();
          }}
        >
          Play Again!
        </button>
      )}
    </div>
  );
};

export default Board;
