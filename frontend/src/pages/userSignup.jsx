import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { UserDataContext } from '../context/UserContext';

const UserSignup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const { setUser } = useContext(UserDataContext)

    const submitHandler = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const newUser = {
            fullname: {
                firstname: firstName,
                lastname: lastName
            },
            email: email,
            password: password
        }

        try {
            const response = await api.post('/user/register', newUser)
            const { token, user } = response.data
            localStorage.setItem('token', token)
            setUser(user)
            navigate('/home')
        } catch (err) {
            if (err.response?.data?.errors) {
                setError(err.response.data.errors[0].msg)
            } else {
                setError(err.response?.data?.message || 'Signup failed. Please try again.')
            }
        } finally {
            setLoading(false)
            setPassword('')
        }
    }

  return (
    <div className=' h-screen p-7 flex flex-col justify-between'>
    <div>
       <img className='w-16 ml-8 mg-4 mb-10 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber" />
      <form onSubmit={submitHandler} >

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

        {error && <p className='text-red-600 mb-4'>{error}</p>}

        <button disabled={loading} className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-xm disabled:opacity-50'>
          {loading ? 'Creating account...' : 'Create New Account'}
        </button>

      </form>

      <p className='text-centre mb-10 '>Already have a account? <Link to='/login' className='text-blue-600'>login here </Link> </p>
    </div>
    < p className='text-[10px] leading-tight'>By proceeding your contents to get call , Whatsapp messages or SMS messages , including by automated means , from Uber and it afilitates to the number provided</p>
    </div>
  );
}

export default UserSignup;
