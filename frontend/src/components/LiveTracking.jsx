import React, { useEffect, useState, useCallback } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '100%'
}

const defaultCenter = {
    lat: 28.6139,
    lng: 77.2090
}

const LiveTracking = ({ secondaryMarker }) => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    })

    const [currentPosition, setCurrentPosition] = useState(defaultCenter)

    useEffect(() => {
        if (!navigator.geolocation) return

        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords
                setCurrentPosition({ lat: latitude, lng: longitude })
            },
            (err) => console.log('Geolocation error:', err.message),
            { enableHighAccuracy: true }
        )

        return () => navigator.geolocation.clearWatch(watchId)
    }, [])

    const onLoad = useCallback(() => {}, [])
    const onUnmount = useCallback(() => {}, [])

    if (!isLoaded) {
        return <div className='h-full w-full flex items-center justify-center bg-gray-200'>Loading map...</div>
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentPosition}
            zoom={16}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{ disableDefaultUI: true, zoomControl: true }}
        >
            <Marker position={currentPosition} />
            {secondaryMarker && <Marker position={secondaryMarker} />}
        </GoogleMap>
    )
}

export default LiveTracking
