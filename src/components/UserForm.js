import React from "react";
import { useParams } from "react-router";
import { useState } from "react";
import { postData, getPlayerByName } from "../utilities/apiCalls";
import { redirect, useNavigate } from "react-router-dom";

const UserForm = ({ currentPlayers, setCurrentPlayers }) => {
  let navigate = useNavigate();
  let { playerId } = useParams();
  let playerIdNumb = Number(playerId);
  const [userName, setUserName] = useState();
  const createPlayer = async (e) => {
    e.preventDefault();
    const fetchedPlayers = await getPlayerByName(userName);
    if (fetchedPlayers.length) {
      const fetchedPlayer = fetchedPlayers[0];
      const playerObj = {
        player: playerIdNumb,
        data: fetchedPlayer,
      };

      console.log("fetched player", playerObj);
      setCurrentPlayers([...currentPlayers, playerObj]);
    } else {
      const resp = await postData({ username: userName });
      const playerObj = {
        player: playerIdNumb,
        data: resp,
      };
      console.log("posted player", playerObj);
      setCurrentPlayers([...currentPlayers, playerObj]);
    }
    console.log(currentPlayers);
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
  return (
    <div>
      <form
        method="post"
        className="flex flex-col border text-center bg-slate-200"
      >
        <label htmlFor="Username">Player Username</label>
        <input
          className="text-center"
          type="text"
          required
          placeholder={`Player${playerId}`}
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />

        <button onClick={createPlayer}>
          {playerIdNumb === 1 ? "Add Player1" : "Let's Play!"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
