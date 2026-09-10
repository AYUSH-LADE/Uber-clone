import React from 'react'

const WaitingForDriver = ({ ride }) => {
    if (!ride) return null

    const captain = ride.captain

    return (
        <div>
            <h3 className='text-2xl font-semibold mb-5 text-center'>Your driver is on the way</h3>

            <div className='flex items-center justify-between mb-5 p-2 bg-gray-50 rounded-lg'>
                <div>
                    <h2 className='text-lg font-medium capitalize'>{captain?.fullname?.firstname} {captain?.fullname?.lastname}</h2>
                    <h4 className='text-xl font-semibold -mt-1 uppercase'>{captain?.vehicle?.plate}</h4>
                    <p className='text-sm text-gray-600 capitalize'>{captain?.vehicle?.color} {captain?.vehicle?.vehicleType}</p>
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
            <div className='flex items-center gap-5 p-3 border-b-2'>
                <span>💵</span>
                <h3 className='text-lg font-medium'>₹{ride.fare}</h3>
            </div>

            <div className='mt-4 text-center bg-yellow-50 border border-yellow-200 rounded-lg p-3'>
                <p className='text-sm text-gray-600'>Share this OTP with your driver to start the ride</p>
                <h1 className='text-3xl font-bold tracking-widest mt-1'>{ride.otp}</h1>
            </div>
        </div>
    )
}

export default WaitingForDriver
