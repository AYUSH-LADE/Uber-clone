import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import api from '../api/axios'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import LiveTracking from '../components/LiveTracking'
import RidePopUp from '../components/RidePopUp'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'

const captainAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('captain-token')}` }
})

const CaptainHome = () => {
    const { captain, setCaptain } = useContext(CaptainDataContext)
    const { socket, sendMessage, receiveMessage } = useContext(SocketContext)
    const navigate = useNavigate()

    const [online, setOnline] = useState(captain?.status === 'active')
    const [incomingRide, setIncomingRide] = useState(null)
    const [confirmedRide, setConfirmedRide] = useState(null)
    const [stage, setStage] = useState('idle') // idle | incoming | confirmed
    const [acceptLoading, setAcceptLoading] = useState(false)
    const [otpLoading, setOtpLoading] = useState(false)
    const [otpError, setOtpError] = useState('')

    useEffect(() => {
        if (captain?._id) {
            sendMessage('join', { userId: captain._id, userType: 'captain' })
        }
    }, [captain])

    // Push live location periodically while online
    useEffect(() => {
        if (!online || !captain?._id) return

        const pushLocation = () => {
            if (!navigator.geolocation) return
            navigator.geolocation.getCurrentPosition((position) => {
                sendMessage('update-location-captain', {
                    userId: captain._id,
                    location: { ltd: position.coords.latitude, lng: position.coords.longitude }
                })
            })
        }

        pushLocation()
        const interval = setInterval(pushLocation, 10000)
        return () => clearInterval(interval)
    }, [online, captain])

    useEffect(() => {
        const unsubscribe = receiveMessage('new-ride', (data) => {
            if (stage === 'idle') {
                setIncomingRide(data)
                setStage('incoming')
            }
        })
        return unsubscribe
    }, [socket, stage])

    const toggleOnline = async () => {
        const nextStatus = online ? 'inactive' : 'active'
        try {
            await api.patch('/captain/update-status', { status: nextStatus }, captainAuthHeader())
            setOnline(!online)
            setCaptain({ ...captain, status: nextStatus })
        } catch (err) {
            console.log('Could not update status', err.message)
        }
    }

    const acceptRide = async () => {
        setAcceptLoading(true)
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
                { rideId: incomingRide._id },
                captainAuthHeader()
            )
            setConfirmedRide(response.data)
            setStage('confirmed')
        } catch (err) {
            console.log('Could not accept ride', err.message)
            setStage('idle')
        } finally {
            setAcceptLoading(false)
        }
    }

    const ignoreRide = () => {
        setIncomingRide(null)
        setStage('idle')
    }

    const submitOtp = async (otp) => {
        setOtpLoading(true)
        setOtpError('')
        try {
            await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
                ...captainAuthHeader(),
                params: { rideId: confirmedRide._id, otp }
            })
            navigate('/captain-riding', { state: { ride: confirmedRide } })
        } catch (err) {
            setOtpError(err.response?.data?.message || 'Invalid OTP')
        } finally {
            setOtpLoading(false)
        }
    }

    return (
        <div className='h-screen relative'>
            <div className='flex items-center justify-between p-4 absolute top-0 w-full z-10 bg-white/90'>
                <img className='w-14' src="https://freelogopng.com/images/all_img/1659761425uber-driver-logo-png.png" alt="Uber" />
                <button
                    onClick={toggleOnline}
                    className={`px-4 py-2 rounded-full font-semibold text-sm ${online ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                    {online ? '🟢 Online' : '⚪ Offline'}
                </button>
            </div>

            <div className='h-2/3 pt-16'>
                <LiveTracking />
            </div>

            <div className='h-1/3 p-4 bg-white overflow-y-auto'>
                {stage === 'idle' && (
                    <div className='text-center text-gray-600 mt-4'>
                        <p className='text-lg font-medium'>
                            {online ? "You're online — waiting for ride requests..." : 'Go online to start receiving rides'}
                        </p>
                        <p className='text-sm mt-1 capitalize'>
                            {captain?.vehicle?.vehicleType} &middot; {captain?.vehicle?.plate}
                        </p>
                    </div>
                )}

                {stage === 'incoming' && (
                    <RidePopUp ride={incomingRide} onAccept={acceptRide} onIgnore={ignoreRide} loading={acceptLoading} />
                )}

                {stage === 'confirmed' && (
                    <ConfirmRidePopUp
                        ride={confirmedRide}
                        onSubmitOtp={submitOtp}
                        onCancel={() => { setStage('idle'); setConfirmedRide(null) }}
                        loading={otpLoading}
                        error={otpError}
                    />
                )}
            </div>
        </div>
    )
}

export default CaptainHome
