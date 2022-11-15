import "./App.css";
import Board from "./components/Board";
import { useState } from "react";
import UserForm from "./components/UserForm";
import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import PlayerInfo from "./components/PlayerInfo";
import Home from "./components/Home";

function App() {
  const [newPlayer, setNewPlayer] = useState();
  const [playerScore, setPlayerScore] = useState([]);
  const [currentPlayers, setCurrentPlayers] = useState([]);

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
      </Routes>
      <PlayerInfo currentPlayers={currentPlayers} />
      <Link className="border bg-slate-500" to="/playerLogin/1">
        Player 1 login
      </Link>
      <Link className="border bg-slate-500" to="/playerLogin/2">
        Player 2 login
      </Link>
      <Link className="border bg-slate-500" to="/">
        home
      </Link>
    </div>
  );
}

export default App;
