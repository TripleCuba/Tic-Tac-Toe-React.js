import React from "react";

const PlayerInfo = ({ currentPlayers, getCurrentPlayerFromLocal }) => {
  const removePlayer = (player) => {
    localStorage.removeItem(`Player${player.player}`);
  };
  return (
    <div className="my-4 flex w-full justify-around">
      {currentPlayers.map((player) => (
        <div
          className="w-2/5 text-center border rounded-lg p-2 font-mono shadow-md"
          key={player.player}
        >
          <h3>Player{player.player}</h3>
          <img
            className="mx-auto"
            alt="zero/cross"
            src={player.player === 1 ? "/imgs/cross.png" : "/imgs/zero.png"}
          />

          <h3>Username</h3>
          <p>{player.data.username}</p>
          <h3>Total wins:</h3>
          <p>{player.data.score}</p>
          <h3>Games Played</h3>
          <p>{player.data.gamesPlayed}</p>
          <button
            className="w-full my-5 border rounded-md p-2 text-xs hover:bg-red-600"
            onClick={() => {
              removePlayer(player);
              getCurrentPlayerFromLocal();
            }}
          >
            Remove player {player.player}
          </button>
        </div>
      ))}
    </div>
  );
};

export default PlayerInfo;
