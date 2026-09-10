import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainSignup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [vehicleColor, setVehicleColor] = useState('')
    const [vehiclePlate, setVehiclePlate] = useState('')
    const [vehicleCapacity, setVehicleCapacity] = useState('')
    const [vehicleType, setVehicleType] = useState('car')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const { setCaptain } = useContext(CaptainDataContext)

   const submitHandler = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const newCaptain = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: Number(vehicleCapacity),
        vehicleType: vehicleType
      }
    }

    try {
      const response = await api.post('/captain/register', newCaptain)
      const { token, captain } = response.data
      localStorage.setItem('captain-token', token)
      setCaptain(captain)
      navigate('/captain-home')
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
    <div className=' h-screen p-7 flex flex-col justify-between overflow-y-auto'>
    <div>
       <img className='w-16 ml-8 mg-4 mb-10 ' src="https://freelogopng.com/images/all_img/1659761425uber-driver-logo-png.png" alt="Uber" />
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

        <h3 className='text-lg font-medium mb-6'>Vehicle Information</h3>
        <div className='flex gap-3 mb-6'>
          <input required className='w-1/2 bg-[#eeeeee] rounded px-4 py-2 text-base placeholder:text-base' type="text" placeholder='Vehicle Color' value={vehicleColor} onChange={(e)=>setVehicleColor(e.target.value)} />
          <input required className='w-1/2 bg-[#eeeeee] rounded px-4 py-2 text-base placeholder:text-base' type="text" placeholder='Vehicle Plate' value={vehiclePlate} onChange={(e)=>setVehiclePlate(e.target.value)} />
        </div>
        <div className='flex gap-3 mb-7'>
          <input required className='w-1/2 bg-[#eeeeee] rounded px-4 py-2 text-base placeholder:text-base' type="number" min="1" placeholder='Capacity' value={vehicleCapacity} onChange={(e)=>setVehicleCapacity(e.target.value)} />
          <select required className='w-1/2 bg-[#eeeeee] rounded px-4 py-2 text-base' value={vehicleType} onChange={(e)=>setVehicleType(e.target.value)}>
            <option value="car">Car</option>
            <option value="motorcycle">Motorcycle</option>
            <option value="auto">Auto</option>
          </select>
        </div>

        {error && <p className='text-red-600 mb-4'>{error}</p>}

        <button disabled={loading} className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-xm disabled:opacity-50'>
          {loading ? 'Creating account...' : 'Create Captain Account'}
        </button>

      </form>

      <p className='text-centre mb-10 '>Already have a account? <Link to='/captain-login' className='text-blue-600'>Login here</Link> </p>
    </div>
    < p className='text-[10px] leading-tight'>By proceeding your contents to get call , Whatsapp messages or SMS messages , including by automated means , from Uber and it afilitates to the number provided</p>
    </div>
  );
}

export default CaptainSignup;
