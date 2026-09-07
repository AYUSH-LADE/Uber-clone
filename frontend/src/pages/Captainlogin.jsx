import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Captainlogin = () => {
  const [email ,setEmail] = useState('')
  const [password ,setPassword] = useState('')
  const [CaptainData ,setCaptainData] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    setCaptainData({
      email: email,
      password: password 
    })
   setEmail('')
   setPassword('') 
  }
  return (
    <div className=' h-screen p-7 flex flex-col justify-between'>
    <div>
       <img className='w-16 ml-8 mg-4 mb-3 ' src="https://freelogopng.com/images/all_img/1659761425uber-driver-logo-png.png" alt="Uber" />
      <form onSubmit={(e)=>{submitHandler(e)}} >

        <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
        <input required value={email} onChange={(e)=>{setEmail(e.target.value)}}  className='bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-xm' type="email" placeholder='Enter your email' />

        <h3 className='text-lg font-medium mb-2'>What's your password?</h3>
        <input required value={password} onChange={(e)=>{setPassword(e.target.value)}}  className='bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-xm' type="password" placeholder='Enter your password' />

        <button className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-xm'>Login</button>

      </form>

      <p className='text-centre'>Want to join a fleet? <Link to='/captain-Signup' className='text-blue-600'>Register as a Captain</Link> </p>
    </div>
    <Link to='/login' className='bg-[#2196F3] text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-xm '>Sign in as user</Link>
    </div> 

    
  ); 
}

export default Captainlogin;  