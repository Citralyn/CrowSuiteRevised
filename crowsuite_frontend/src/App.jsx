import { BrowserRouter, Routes, Route } from "react-router";

import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import WaitingRoom from "./pages/WaitingRoom.jsx";
import Game from "./pages/Game.jsx";
import Results from "./pages/Results.jsx";
import Tutorial from "./pages/Tutorial.jsx";
import "./scss/global.scss"

export default function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} >
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="waiting_room" element={<WaitingRoom />} />
          <Route path="game" element={<Game />} />
          <Route path="results" element={<Results />} />
          <Route path="tutorial" element={<Tutorial />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

/*

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} >
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="waiting_room" element={<WaitingRoom />} />
          <Route path="game" element={<Game />} />
          <Route path="results" element={<Results />} />
          <Route path="tutorial" element={<Tutorial />} />
        </Route>
      </Routes>
    </BrowserRouter>

*/