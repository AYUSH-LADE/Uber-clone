import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/userlogin'
import userSignup from './pages/userSignup'
import Captainlogin from './pages/Captainlogin'
import CaptainSignup from './pages/CaptainSignup'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<userSignup />} />
        <Route path='/captain-login' element={<Captainlogin />} />
        <Route path='/captain-Signup' element={<CaptainSignup />} />
      </Routes>
    </div>
  );
}

export default App;