import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Absensi from './pages/Absensi'
import ListAbsen from './pages/ListAbsen'
import Home from './pages/Home'

function App() {

  return (
    <>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/absensi" element={<Absensi />} />
        <Route path="/listabsen" element={<ListAbsen />} />
    </Routes>
    </>
  )
}

export default App
