import "./App.css";
import Board from "./components/Board";
import { useState } from "react";
import UserForm from "./components/UserForm";
import { json, Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import PlayerInfo from "./components/PlayerInfo";
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import { useEffect } from "react";

function App() {
  const [newPlayer, setNewPlayer] = useState();
  const [playerScore, setPlayerScore] = useState([]);
  const [currentPlayers, setCurrentPlayers] = useState([]);
  let newList = [];
  const getPlayersFromLocal = () => {
    newList = [];
    for (let i = 1; i <= 2; i++) {
      let newPlayer = JSON.parse(localStorage.getItem(`Player${i}`));
      newPlayer !== null && newList.push(newPlayer);
    }

    console.log(newList);
  };
  const getCurrentPlayerFromLocal = () => {
    getPlayersFromLocal();
    setCurrentPlayers(newList);
  };
  useEffect(() => {
    getCurrentPlayerFromLocal();
  }, []);

  return (
    <div className="w-96 mx-auto ">
      <Routes>
        <Route path="/" element={<Home currentPlayers={currentPlayers} />} />
        <Route
          path="/playerLogin/:playerId"
          element={
            <UserForm
              newPlayer={newPlayer}
              setNewPlayer={setNewPlayer}
              currentPlayers={currentPlayers}
              setCurrentPlayers={setCurrentPlayers}
            />
          }
        />

        <Route
          path="/game"
          element={
            <Board
              setCurrentPlayers={setCurrentPlayers}
              currentPlayers={currentPlayers}
            />
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <PlayerInfo
        currentPlayers={currentPlayers}
        getCurrentPlayerFromLocal={getCurrentPlayerFromLocal}
      />
      <Link className="border bg-slate-500" to="/playerLogin/1">
        Player 1 login
      </Link>
      <Link className="border bg-slate-500" to="/playerLogin/2">
        Player 2 login
      </Link>
      <Link className="border bg-slate-500" to="/">
        home
      </Link>
      <button
        className="p-1 border bg-slate-200"
        onClick={() => console.log(JSON.parse(localStorage.getItem("Player1")))}
      >
        Test
      </button>
    </div>
  );
}

export default App;
