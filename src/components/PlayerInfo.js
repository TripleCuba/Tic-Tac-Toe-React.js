import React from "react";

const PlayerInfo = ({ currentPlayers }) => {
  return (
    <div className="flex w-full">
      {currentPlayers.map((player) => (
        <div className="w-3/6 text-center border" key={player.player}>
          <div>
            <h3>Player{player.player}</h3>
            {player.player === 1 ? (
              <img src="/imgs/cross.png" alt="cross" />
            ) : (
              <img src="/imgs/zero.png" alt="zero" />
            )}
            <h3>Username</h3>
            <p>{player.data.username}</p>
            <h3>Total wins:</h3>
            <p>{player.data.score}</p>
            <h3>Games Played</h3>
            <p>{player.data.gamesPlayed}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerInfo;
