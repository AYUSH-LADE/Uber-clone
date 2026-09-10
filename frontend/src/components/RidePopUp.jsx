import React from 'react'

const RidePopUp = ({ ride, onAccept, onIgnore, loading }) => {
    if (!ride) return null

    return (
        <div>
            <h3 className='text-2xl font-semibold mb-5 text-center'>New Ride Available!</h3>

            <div className='flex items-center justify-between p-3 bg-yellow-50 rounded-lg mb-5'>
                <div>
                    <h2 className='text-lg font-medium capitalize'>{ride.user?.fullname?.firstname} {ride.user?.fullname?.lastname}</h2>
                </div>
                <h5 className='text-lg font-semibold'>₹{ride.fare}</h5>
            </div>

            <div className='w-full mt-3'>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                    <span>📍</span>
                    <div>
                        <h3 className='text-lg font-medium'>Pickup</h3>
                        <p className='text-sm -mt-1 text-gray-600'>{ride.pickup}</p>
                    </div>
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

            <div className='mt-5 w-full flex gap-3'>
                <button onClick={onIgnore} className='w-1/2 bg-gray-200 text-gray-800 font-semibold p-3 rounded-lg'>
                    Ignore
                </button>
                <button onClick={onAccept} disabled={loading} className='w-1/2 bg-green-600 text-white font-semibold p-3 rounded-lg disabled:opacity-50'>
                    {loading ? 'Accepting...' : 'Accept'}
                </button>
            </div>
        </div>
    )
}

export default RidePopUp
