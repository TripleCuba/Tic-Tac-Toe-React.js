import React from "react";
import Button from "./Button";
import { useState } from "react";
import { useEffect } from "react";

const Board = ({
  playerScore,
  setPlayerScore,
  currentPlayers,
  setCurrentPlayers,
}) => {
  const findPlayerByTurn = (data, turn) => {
    const foundPlayer = data.find((item) => item.player === turn);
    return foundPlayer;
  };

  const [turn, setTurn] = useState(1);
  const [activePlayer, setActivePlayer] = useState();
  const [currentWinner, setCurrentWinner] = useState("");

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
  useEffect(() => {
    setActivePlayer(() => findPlayerByTurn(currentPlayers, 1));
  }, []);

  const changeTurn = (turn) => {
    setTurn(turn);
    setActivePlayer(() => findPlayerByTurn(currentPlayers, turn));
  };
  const switchTurns = () => {
    turn === 1 ? changeTurn(2) : changeTurn(1);
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
    const checkEveryValue = (item, i) => item.value === i;

    const setWinnerOjb = (players, turn) => {
      let nextTurn;
      turn === 1 ? (nextTurn = 2) : (nextTurn = 1);

      setCurrentWinner(() => findPlayerByTurn(players, turn));
      const winner = findPlayerByTurn(players, turn);
      const looser = findPlayerByTurn(players, nextTurn);
      winner.data.score++;
      winner.data.gamesPlayed++;
      looser.data.gamesPlayed++;
      let newCurrentPlayers = [winner, looser];
      let sortedPlayers = newCurrentPlayers.sort((a, b) => a.player - b.player);
      setCurrentPlayers(sortedPlayers);
      console.log("winner", winner, "looser", looser);
    };

    const isWinnerRowCol = (element) => {
      element.every((item) => checkEveryValue(item, 1))
        ? setWinnerOjb(currentPlayers, 1)
        : element.every((item) => checkEveryValue(item, 2)) &&
          setWinnerOjb(currentPlayers, 2);
    };
    const isWinnerDiag = (element) => {
      element.every((item) => checkEveryValue(item, 1))
        ? setWinnerOjb(currentPlayers, 1)
        : element.every((item) => checkEveryValue(item, 2)) &&
          setWinnerOjb(currentPlayers, 2);
    };

    rowList.forEach((row) => {
      isWinnerRowCol(row);
    });
    colList.forEach((col) => {
      isWinnerRowCol(col);
    });

    isWinnerDiag(diag1) || isWinnerDiag(diag2);
  };

  const changeScore = (id) => {
    let newScoreBoard = scoreBoard;
    newScoreBoard[id].value = turn;
    setScoreBoard(newScoreBoard);
    switchTurns();
    checkForWinner();
  };

  const reset = () => {
    changeTurn(1);
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
    <div className="  mt-10 bg-slate-400 flex flex-col">
      <div className="flex justify-around "></div>
      <h1 className="text-center text-white p-5">
        {currentWinner
          ? `The winner is ${currentWinner.data.username}`
          : activePlayer && `${activePlayer.data.username} turn!`}
      </h1>
      <div className="grid grid-cols-3">
        {scoreBoard.map((item) => (
          <Button
            item={item}
            changeScore={changeScore}
            currentWinner={currentWinner}
            key={item.id}
          />
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
          }}
        >
          Play Again!
        </button>
      )}
      <button>testy</button>
    </div>
  );
};

export default Board;
