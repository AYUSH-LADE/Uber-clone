import React, { useState } from 'react';
import { Link, UNSAFE_getTurboStreamSingleFetchDataStrategy } from 'react-router-dom';

const UserLogin = () => {
  const [email ,setEmail] = useState('')
  const [password ,setPassword] = useState('')
  const [userData ,setUserData] = useState({})

  const submitHandler = (e) => {
    e.preventDefault()
    setUserData({
      email: email,
      password: password 
    })
   setEmail('')
   setPassword('') 
  }
  return (
    <div className=' h-screen p-7 flex flex-col justify-between'>
    <div>
       <img className='w-16 ml-8 mg-4 mb-10 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber" />
      <form onSubmit={(e)=>{submitHandler(e)}} >
        <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
        <input required value={email} onChange={(e)=>{setEmail(e.target.value)}}  className='bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-xm' type="email" placeholder='Enter your email' />
        <h3 className='text-lg font-medium mb-2'>What's your password?</h3>
        <input required value={password} onChange={(e)=>{setPassword(e.target.value)}}  className='bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-xm' type="password" placeholder='Enter your password' />
        <button className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-xm'>Login</button>
      </form>

      <p className='text-centre'>New here?<Link to='/signup' className='text-blue-600'>create a new account</Link> </p>
    </div>
    <Link to='/captain-login' className='bg-[#10b461] text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-xm '>Sign in as captain</Link>
    </div>
  ); 
}

export default UserLogin;   