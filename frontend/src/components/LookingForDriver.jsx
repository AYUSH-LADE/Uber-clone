import React from 'react'

const LookingForDriver = ({ pickup, destination, fare, onCancel }) => {
    return (
        <div>
            <h3 className='text-2xl font-semibold mb-5 text-center'>Looking for a driver</h3>

            <div className='flex justify-center my-4'>
                <div className='h-16 w-16 rounded-full border-4 border-gray-200 border-t-black animate-spin'></div>
            </div>

            <div className='w-full mt-3'>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                    <span>📍</span>
                    <div>
                        <h3 className='text-lg font-medium'>Pickup</h3>
                        <p className='text-sm -mt-1 text-gray-600'>{pickup}</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                    <span>🏁</span>
                    <div>
                        <h3 className='text-lg font-medium'>Destination</h3>
                        <p className='text-sm -mt-1 text-gray-600'>{destination}</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3'>
                    <span>💵</span>
                    <h3 className='text-lg font-medium'>₹{fare}</h3>
                </div>
            </div>

            {onCancel && (
                <button onClick={onCancel} className='w-full mt-3 bg-gray-100 text-gray-800 font-semibold p-3 rounded-lg'>
                    Cancel
                </button>
            )}
        </div>
    )
}

export default LookingForDriver
