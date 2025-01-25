import { useState } from 'react'
import Layout from './Layout'
import Camera from './components/Camera'
import Playlist from './components/Playlist'
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

  return (
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Camera />} />
        <Route path="/playlist" element={<Playlist />} />
        </Route>
      </Routes>
    )
}

export default App;
