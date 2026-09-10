import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { ride } = location.state || {}
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    if (!ride) {
        return (
            <div className='h-screen flex items-center justify-center flex-col gap-3'>
                <p>No active ride found.</p>
                <button onClick={() => navigate('/captain-home')} className='bg-black text-white px-4 py-2 rounded-lg'>Go home</button>
            </div>
        )
    }

    const completeRide = async () => {
        setLoading(true)
        setError('')
        try {
            await axios.post(
                `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
                { rideId: ride._id },
                { headers: { Authorization: `Bearer ${localStorage.getItem('captain-token')}` } }
            )
            navigate('/captain-home')
        } catch (err) {
            setError(err.response?.data?.message || 'Could not complete ride')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='h-screen relative'>
            <div className='h-2/3'>
                <LiveTracking />
            </div>

            <div className='h-1/3 p-6 bg-white'>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                    <span>📍</span>
                    <p className='text-sm text-gray-600'>{ride.pickup}</p>
                </div>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                    <span>🏁</span>
                    <p className='text-sm text-gray-600'>{ride.destination}</p>
                </div>
                <div className='flex items-center gap-5 p-3'>
                    <span>💵</span>
                    <h3 className='text-lg font-medium'>₹{ride.fare}</h3>
                </div>

                {error && <p className='text-red-600 text-sm mb-2'>{error}</p>}

                <button
                    onClick={completeRide}
                    disabled={loading}
                    className='w-full mt-2 bg-green-600 text-white font-semibold p-3 rounded-lg disabled:opacity-50'
                >
                    {loading ? 'Completing...' : 'Complete Ride'}
                </button>
            </div>
        </div>
    )
}

export default CaptainRiding
