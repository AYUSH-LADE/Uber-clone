import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CaptainSignup = () => {
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [firstName , setFirstName] = useState('')
    const [lastName , setLastName] = useState('')
    const [userData , setUserData] = useState('')
   const submitHandler =(e) => {
    e.preventDefault()
    setUserData({
      fullName:{
        firstName:firstName,
        lastname:lastName,
      },
      email:email,
        password: password
    })
    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
   } 
  return (
    <div className=' h-screen p-7 flex flex-col justify-between'>
    <div>
       <img className='w-16 ml-8 mg-4 mb-10 ' src="https://freelogopng.com/images/all_img/1659761425uber-driver-logo-png.png" alt="Uber" />
      <form onSubmit={(e)=>{submitHandler(e)}} >
         
        <h3 className='text-lg font-medium mb-2'>What's your name?</h3>
        <div className='flex gap-3 mb-6 '>
             <input required   className='w-1/2 bg-[#eeeeee] rounded px-4 py-2   text-base  placeholder:text-base' type="text" placeholder='First Name' value={firstName} onChange={(e)=>{
                setFirstName(e.target.value)
             }} />
              <input required   className='w-1/2  bg-[#eeeeee] rounded px-4 py-2   text-base  placeholder:text-base' type="text" placeholder='Last Name'value={lastName} onChange={(e)=>{
                setLastName(e.target.value)
             }} />
        </div>
        <h3 className='text-lg font-medium mb-6'>What's your email?</h3>
        <input required   className='bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full text-base placeholder:text-base' type="email" placeholder='Enter your email' value={email} onChange={(e)=>{
          setEmail(e.target.value)
        }} />

        <h3 className='text-lg font-medium mb-6'>What's your password?</h3>
        <input required  className='bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full text-base placeholder:text-base' type="password" placeholder='Enter your password' value={password} onChange={(e)=>{
          setPassword(e.target.value)
        }} />

        <button className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-xm'>Login</button>

      </form>

      <p className='text-centre mb-10 '>Already have a account? <Link to='/login' className='text-blue-600'>Login here</Link> </p>
    </div>
    < p className='text-[10px] leading-tight'>By proceeding your contents to get call , Whatsapp messages or SMS messages , including by automated means , from Uber and it afilitates to the number provided</p>
    </div>    
  ); 
}

export default CaptainSignup;   