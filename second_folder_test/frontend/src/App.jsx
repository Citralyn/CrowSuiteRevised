import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import './global.scss'

import MainLayout from './layouts/MainLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import CatPage from './pages/CatPage.jsx';

function App() {
  return (
    // routes under the central root path, and routes under /projects
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="cat" element={<CatPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
