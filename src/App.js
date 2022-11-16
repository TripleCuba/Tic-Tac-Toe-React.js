import "./App.css";
import Board from "./components/Board";
import { useState } from "react";
import UserForm from "./components/UserForm";
import { Route, Routes } from "react-router";
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import { useEffect } from "react";

function App() {
  const [newPlayer, setNewPlayer] = useState();
  const [currentPlayers, setCurrentPlayers] = useState([]);
  let newList = [];
  const getPlayersFromLocal = () => {
    newList = [];
    for (let i = 1; i <= 2; i++) {
      let newPlayer = JSON.parse(localStorage.getItem(`Player${i}`));
      newPlayer !== null && newList.push(newPlayer);
    }
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
              getCurrentPlayerFromLocal={getCurrentPlayerFromLocal}
            />
          }
        />

        <Route
          path="/game"
          element={
            <Board
              setCurrentPlayers={setCurrentPlayers}
              currentPlayers={currentPlayers}
              getCurrentPlayerFromLocal={getCurrentPlayerFromLocal}
            />
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
