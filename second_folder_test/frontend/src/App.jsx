import { BrowserRouter, Routes, Route } from "react-router";

import MainLayout from './layouts/MainLayout.jsx';

import Home from './pages/Home.jsx';
import Game from './pages/Game.jsx';
import Tutorial from './pages/Tutorial.jsx';
import Waiting from './pages/Waiting.jsx';
import Login from './pages/Login.jsx';
import Results from "./pages/Results.jsx";

import './global.scss'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="waiting" element={<Waiting />} />
          <Route path="game" element={<Game />} />
          <Route path="tutorial" element={<Tutorial />} />
          <Route path="results" element={<Results />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
