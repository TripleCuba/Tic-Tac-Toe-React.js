import React from "react";
import { useNavigate } from "react-router";

const Home = ({ currentPlayers }) => {
  let navigate = useNavigate();
  const findMissingPlayer = () => {
    currentPlayers[0].player === 1
      ? navigate("/playerLogin/2")
      : navigate("/playerLogin/1");
  };
  const checkForPlayers = () => {
    currentPlayers.length
      ? currentPlayers.length === 2
        ? navigate("/game")
        : findMissingPlayer()
      : navigate("/playerLogin/1");
  };
  return (
    <div>
      <h1 className="text-4xl font-BRS mt-10">Welcome to Tic Tac Toe game</h1>
      <div className=" font-mono text-xl text-center">
        <p className="my-6">
          To continue you have to enter{" "}
          <span className=" text-blue-500">Player1</span> and{" "}
          <span className=" text-red-500">Player2</span> usernames
        </p>
        <div className="my-4">
          <p>If Player exists </p>
          <p>Player information will be recovered</p>
        </div>
        <div className="my-4">
          <p>If Player does not exist</p>
          <p> it will be created instantly</p>
        </div>
        <p className="my-3">Have fun playing and good luck!</p>
      </div>
      <button
        className="w-full p-4 font-BRS text-3xl border rounded-2xl shadow-md bg-slate-50 hover:bg-slate-400 transition-all "
        onClick={checkForPlayers}
      >
        Let's get started
      </button>
    </div>
  );
};

export default Home;
