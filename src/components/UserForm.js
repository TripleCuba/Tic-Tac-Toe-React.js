import React from "react";
import { useParams } from "react-router";
import { useState } from "react";
import { postData, getPlayerByName } from "../utilities/apiCalls";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const UserForm = ({ currentPlayers, setCurrentPlayers }) => {
  let navigate = useNavigate();
  let { playerId } = useParams();
  let playerIdNumb = Number(playerId);
  useEffect(() => {
    validateLogin();
  });

  const [userName, setUserName] = useState();
  const createPlayer = async (e) => {
    e.preventDefault();
    let playerObj;
    const fetchedPlayers = await getPlayerByName(userName);
    if (fetchedPlayers.length) {
      const fetchedPlayer = fetchedPlayers[0];
      playerObj = {
        player: playerIdNumb,
        data: fetchedPlayer,
      };

      console.log("fetched player", playerObj);
      setCurrentPlayers([...currentPlayers, playerObj]);
    } else {
      const resp = await postData({ username: userName });
      playerObj = {
        player: playerIdNumb,
        data: resp,
      };

      setCurrentPlayers([...currentPlayers, playerObj]);
    }
    localStorage.setItem(`Player${playerIdNumb}`, JSON.stringify(playerObj));
    redirectAfterSubmit();
    setUserName("");
  };

  const redirectAfterSubmit = () => {
    if (playerIdNumb === 1) {
      return navigate("/playerLogin/2");
    } else {
      return navigate("/game");
    }
  };

  const validateLogin = () => {
    if (playerIdNumb !== 1) {
      if (playerIdNumb !== 2) {
        navigate("/");
      }
    }
    if (currentPlayers.length >= 2) {
      navigate("/game");
    }
    if (currentPlayers.length === 1) {
      if (currentPlayers[0].player === playerIdNumb) {
        playerIdNumb === 1
          ? navigate("/playerLogin/2")
          : navigate("/playerLogin/1");
      }
    }
  };

  return (
    <div className="text-center">
      <h1 className="font-BRS text-4xl my-10 ">
        Enter {playerIdNumb === 1 ? "Player1" : "Player2"} username
      </h1>
      <form
        method="post"
        className="flex flex-col font-mono gap-5 text-xl my-10 "
      >
        <label htmlFor="Username">Player Username</label>
        <input
          className="text-center w-4/6 mx-auto shadow-md"
          type="text"
          required
          placeholder={`Player${playerId}`}
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />

        <button
          className="p-4 border rounded-2xl font-BRS text-3xl w-4/6 mx-auto my-8 bg-slate-50 hover:bg-slate-300"
          onClick={createPlayer}
        >
          {playerIdNumb === 1 ? "Add Player1" : "Add Player2"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
