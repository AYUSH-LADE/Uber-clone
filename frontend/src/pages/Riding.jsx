import React, { useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'
import LiveTracking from '../components/LiveTracking'

const Riding = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { ride } = location.state || {}
    const { receiveMessage } = useContext(SocketContext)

    useEffect(() => {
        const unsubscribe = receiveMessage('ride-ended', () => {
            navigate('/home')
        })
        return unsubscribe
    }, [])

    if (!ride) {
        return (
            <div className='h-screen flex items-center justify-center flex-col gap-3'>
                <p>No active ride found.</p>
                <button onClick={() => navigate('/home')} className='bg-black text-white px-4 py-2 rounded-lg'>Go home</button>
            </div>
        )
    }

    const captain = ride.captain

    return (
        <div className='h-screen relative'>
            <div className='h-1/2'>
                <LiveTracking />
            </div>

            <div className='h-1/2 p-6 bg-white'>
                <div className='flex items-center justify-between mb-5 p-2 bg-gray-50 rounded-lg'>
                    <div>
                        <h2 className='text-lg font-medium capitalize'>{captain?.fullname?.firstname} {captain?.fullname?.lastname}</h2>
                        <h4 className='text-xl font-semibold -mt-1 uppercase'>{captain?.vehicle?.plate}</h4>
                    </div>
                    <span className='text-4xl'>🚗</span>
                </div>

                <div className='flex items-center gap-5 p-3 border-b-2'>
                    <span>🏁</span>
                    <div>
                        <h3 className='text-lg font-medium'>Destination</h3>
                        <p className='text-sm -mt-1 text-gray-600'>{ride.destination}</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3'>
                    <span>💵</span>
                    <h3 className='text-lg font-medium'>₹{ride.fare} &middot; Cash</h3>
                </div>
            </div>
        </div>
    )
}

export default Riding
