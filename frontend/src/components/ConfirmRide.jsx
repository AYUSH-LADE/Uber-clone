import React from 'react'

const vehicleLabel = { car: 'UberGo', motorcycle: 'Moto', auto: 'Auto' }

const ConfirmRide = ({ pickup, destination, vehicleType, fare, onConfirm, onBack, loading }) => {
    return (
        <div>
            <h5 onClick={onBack} className='p-1 text-center w-[93%] absolute top-0 cursor-pointer'>
                <span className='text-2xl'>⌄</span>
            </h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm your ride</h3>

            <div className='flex items-center gap-2 justify-between flex-col'>
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
                        <div>
                            <h3 className='text-lg font-medium'>₹{fare} &middot; {vehicleLabel[vehicleType]}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash / Card</p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={onConfirm}
                    disabled={loading}
                    className='w-full mt-5 bg-green-600 text-white font-semibold p-3 rounded-lg disabled:opacity-50'
                >
                    {loading ? 'Booking...' : 'Confirm'}
                </button>
            </div>
        </div>
    )
}

export default ConfirmRide
