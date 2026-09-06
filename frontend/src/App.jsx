import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import login from './pages/userlogin'
import Captainlogin from './pages/Captainlogin'
import CaptainSignup from './pages/CaptainSignup'


const App = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<userlogin />} /> 
            <Route path='/signup' element={<userSignup />} />
            <Route path='/captain-login' element={<Captainlogin />} />
            <Route path='/captain-Signup' element={<CaptainSignup />} />
        </Routes>
    </div>
  );
}

export default App;