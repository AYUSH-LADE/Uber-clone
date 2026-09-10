import React, { useState } from 'react'

const ConfirmRidePopUp = ({ ride, onSubmitOtp, onCancel, loading, error }) => {
    const [otp, setOtp] = useState('')

    if (!ride) return null

    return (
        <div>
            <h3 className='text-2xl font-semibold mb-5 text-center'>Confirm this ride to Start</h3>

            <div className='flex items-center justify-between p-3 bg-yellow-50 rounded-lg mb-5'>
                <h2 className='text-lg font-medium capitalize'>{ride.user?.fullname?.firstname} {ride.user?.fullname?.lastname}</h2>
            </div>

            <div className='w-full mt-3 mb-5'>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                    <span>📍</span>
                    <p className='text-sm text-gray-600'>{ride.pickup}</p>
                </div>
                <div className='flex items-center gap-5 p-3'>
                    <span>🏁</span>
                    <p className='text-sm text-gray-600'>{ride.destination}</p>
                </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); onSubmitOtp(otp) }}>
                <input
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    type="text"
                    maxLength={6}
                    className='bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mb-4 tracking-widest text-center'
                    placeholder='Enter OTP from rider'
                />

                {error && <p className='text-red-600 text-sm mb-3'>{error}</p>}

                <button disabled={loading} className='w-full bg-green-600 text-white font-semibold p-3 rounded-lg mb-3 disabled:opacity-50'>
                    {loading ? 'Verifying...' : 'Confirm'}
                </button>
                <button type='button' onClick={onCancel} className='w-full bg-gray-200 text-gray-800 font-semibold p-3 rounded-lg'>
                    Cancel
                </button>
            </form>
        </div>
    )
}

export default ConfirmRidePopUp
