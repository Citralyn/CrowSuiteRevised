import { BrowserRouter, Routes, Route } from "react-router";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import WaitingRoom from "./pages/WaitingRoom";
import Game from "./pages/Game";
import Results from "./pages/Results";
import Tutorial from "./pages/Tutorial";

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

