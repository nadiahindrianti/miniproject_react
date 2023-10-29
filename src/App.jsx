import React from 'react';
import Landingpage from './pages/Landingpage'
import Jadwallabroom from './pages/Jadwallabroom'
import Jadwalpracticaltools from './pages/Jadwalpracticaltools'
import Login from './pages/Login'
import Register from './pages/Register'
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        {/* <Header></Header> */}
        <Routes>
          <Route path='/' element={<Landingpage />} />
          <Route path='/Jadwallabroom' element={<Jadwallabroom />} />
          <Route path="/Jadwalpracticaltools" element={<Jadwalpracticaltools />} />
          
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App