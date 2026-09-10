import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { CaptainDataContext } from '../context/CaptainContext';

const Captainlogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { setCaptain } = useContext(CaptainDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const response = await api.post('/captain/login', { email, password })
      const { token, captain } = response.data
      localStorage.setItem('captain-token', token)
      setCaptain(captain)
      navigate('/captain-home')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
      setPassword('')
    }
  }

  return (
    <div className=' h-screen p-7 flex flex-col justify-between'>
    <div>
       <img className='w-16 ml-8 mg-4 mb-3 ' src="https://freelogopng.com/images/all_img/1659761425uber-driver-logo-png.png" alt="Uber" />
      <form onSubmit={submitHandler} >

        <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
        <input required value={email} onChange={(e)=>{setEmail(e.target.value)}}  className='bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-xm' type="email" placeholder='Enter your email' />

        <h3 className='text-lg font-medium mb-2'>What's your password?</h3>
        <input required value={password} onChange={(e)=>{setPassword(e.target.value)}}  className='bg-[#eeeeee] mb-7 rounded px-4 py-2  w-full text-lg placeholder:text-xm' type="password" placeholder='Enter your password' />

        {error && <p className='text-red-600 mb-4'>{error}</p>}

        <button disabled={loading} className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-xm disabled:opacity-50'>
          {loading ? 'Logging in...' : 'Login'}
        </button>

      </form>

      <p className='text-centre'>Want to join a fleet? <Link to='/captain-Signup' className='text-blue-600'>Register as a Captain</Link> </p>
    </div>
    <Link to='/login' className='bg-[#2196F3] text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-xm text-center'>Sign in as user</Link>
    </div>
  );
}

export default Captainlogin;
