import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { SocketContext } from '../context/SocketContext'
import { UserDataContext } from '../context/UserContext'
import LiveTracking from '../components/LiveTracking'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'

// panel stages: 'search' -> 'vehicles' -> 'confirm' -> 'looking' -> 'waiting'
const Home = () => {
    const [pickup, setPickup] = useState('')
    const [destination, setDestination] = useState('')
    const [activeField, setActiveField] = useState(null) // 'pickup' | 'destination' | null
    const [suggestions, setSuggestions] = useState([])

    const [panel, setPanel] = useState('search')
    const [fare, setFare] = useState(null)
    const [distanceTime, setDistanceTime] = useState(null)
    const [vehicleType, setVehicleType] = useState(null)
    const [ride, setRide] = useState(null)
    const [bookingLoading, setBookingLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    const debounceRef = useRef(null)

    const { socket, receiveMessage, sendMessage } = useContext(SocketContext)
    const { user } = useContext(UserDataContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (user?._id) {
            sendMessage('join', { userId: user._id, userType: 'user' })
        }
    }, [user])

    useEffect(() => {
        const unsubscribe = receiveMessage('ride-confirmed', (data) => {
            setRide(data)
            setPanel('waiting')
        })
        return unsubscribe
    }, [socket])

    useEffect(() => {
        const unsubscribe = receiveMessage('ride-started', () => {
            navigate('/riding', { state: { ride } })
        })
        return unsubscribe
    }, [socket, ride])

    const fetchSuggestions = (value) => {
        if (debounceRef.current) clearTimeout(debounceRef.current)
        if (!value || value.length < 3) {
            setSuggestions([])
            return
        }
        debounceRef.current = setTimeout(async () => {
            try {
                const response = await api.get('/maps/get-suggestions', { params: { input: value } })
                setSuggestions(response.data)
            } catch {
                setSuggestions([])
            }
        }, 400)
    }

    const handlePickupChange = (e) => {
        setPickup(e.target.value)
        setActiveField('pickup')
        fetchSuggestions(e.target.value)
    }

    const handleDestinationChange = (e) => {
        setDestination(e.target.value)
        setActiveField('destination')
        fetchSuggestions(e.target.value)
    }

    const handleSuggestionSelect = (value) => {
        if (activeField === 'pickup') setPickup(value)
        else setDestination(value)
        setSuggestions([])
        setActiveField(null)
    }

    const findTrip = async () => {
        setErrorMsg('')
        if (!pickup || !destination) {
            setErrorMsg('Please enter both pickup and destination')
            return
        }
        try {
            const response = await api.get('/rides/get-fare', { params: { pickup, destination } })
            setFare(response.data.fare)
            setDistanceTime(response.data.distanceTime)
            setPanel('vehicles')
        } catch (err) {
            setErrorMsg(err.response?.data?.message || 'Could not calculate fare for this route')
        }
    }

    const selectVehicle = (type) => {
        setVehicleType(type)
        setPanel('confirm')
    }

    const confirmRide = async () => {
        setBookingLoading(true)
        setErrorMsg('')
        try {
            const response = await api.post('/rides/create', { pickup, destination, vehicleType })
            setRide(response.data)
            setPanel('looking')
        } catch (err) {
            setErrorMsg(err.response?.data?.message || 'Could not create ride')
        } finally {
            setBookingLoading(false)
        }
    }

    const resetFlow = () => {
        setPanel('search')
        setPickup('')
        setDestination('')
        setFare(null)
        setDistanceTime(null)
        setVehicleType(null)
        setRide(null)
    }

    return (
        <div className='h-screen relative overflow-hidden'>
            <img className='w-16 absolute left-5 top-5 z-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber" />

            <div className='h-1/2 w-full'>
                <LiveTracking />
            </div>

            <div className='h-1/2 p-6 bg-white relative overflow-y-auto'>
                {panel === 'search' && (
                    <>
                        <h4 className='text-2xl font-semibold'>Find a trip</h4>
                        <form onSubmit={(e) => e.preventDefault()} className='relative py-3'>
                            <div className='line absolute h-14 w-1 top-[38px] left-5 bg-gray-700 rounded-full'></div>
                            <input
                                value={pickup}
                                onChange={handlePickupChange}
                                onFocus={() => setActiveField('pickup')}
                                className='bg-[#eee] px-10 py-2 text-base rounded-lg w-full mb-3'
                                placeholder='Add a pick-up location'
                            />
                            <input
                                value={destination}
                                onChange={handleDestinationChange}
                                onFocus={() => setActiveField('destination')}
                                className='bg-[#eee] px-10 py-2 text-base rounded-lg w-full'
                                placeholder='Enter your destination'
                            />
                        </form>

                        {errorMsg && <p className='text-red-600 text-sm mb-2'>{errorMsg}</p>}

                        {activeField && suggestions.length > 0 ? (
                            <div className='max-h-40 overflow-y-auto'>
                                <LocationSearchPanel suggestions={suggestions} onSelect={handleSuggestionSelect} />
                            </div>
                        ) : (
                            <button
                                onClick={findTrip}
                                className='bg-black text-white px-4 py-2 rounded-lg mt-4 w-full'
                            >
                                Find Trip
                            </button>
                        )}
                    </>
                )}

                {panel === 'vehicles' && (
                    <VehiclePanel
                        fare={fare}
                        distanceTime={distanceTime}
                        onSelect={selectVehicle}
                        onBack={() => setPanel('search')}
                    />
                )}

                {panel === 'confirm' && (
                    <ConfirmRide
                        pickup={pickup}
                        destination={destination}
                        vehicleType={vehicleType}
                        fare={fare?.[vehicleType]}
                        onConfirm={confirmRide}
                        onBack={() => setPanel('vehicles')}
                        loading={bookingLoading}
                    />
                )}

                {panel === 'looking' && (
                    <LookingForDriver
                        pickup={pickup}
                        destination={destination}
                        fare={fare?.[vehicleType]}
                        onCancel={resetFlow}
                    />
                )}

                {panel === 'waiting' && (
                    <WaitingForDriver ride={ride} />
                )}

                {errorMsg && panel !== 'search' && <p className='text-red-600 text-sm mt-2'>{errorMsg}</p>}
            </div>
        </div>
    )
}

export default Home
