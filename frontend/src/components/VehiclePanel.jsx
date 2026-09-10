import React from 'react'

const vehicleInfo = {
    car: { label: 'UberGo', capacity: 4, desc: 'Affordable, compact rides', emoji: '🚗' },
    motorcycle: { label: 'Moto', capacity: 1, desc: 'Quick bike rides', emoji: '🏍️' },
    auto: { label: 'Auto', capacity: 3, desc: 'Affordable auto rides', emoji: '🛺' }
}

const VehiclePanel = ({ fare, distanceTime, onSelect, onBack }) => {
    return (
        <div>
            <h5 onClick={onBack} className='p-1 text-center w-[93%] absolute top-0 cursor-pointer'>
                <span className='text-2xl'>⌄</span>
            </h5>
            <h3 className='text-2xl font-semibold mb-5'>Choose a ride</h3>
            {distanceTime && (
                <p className='text-sm text-gray-500 mb-4'>
                    {distanceTime.distance?.text} &middot; {distanceTime.duration?.text}
                </p>
            )}
            <div className='flex flex-col gap-2'>
                {Object.keys(vehicleInfo).map((type) => (
                    <div
                        key={type}
                        onClick={() => onSelect(type)}
                        className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between cursor-pointer'
                    >
                        <span className='text-4xl'>{vehicleInfo[type].emoji}</span>
                        <div className='ml-2 w-1/2'>
                            <h4 className='font-medium text-base'>{vehicleInfo[type].label} <span className='text-xs'>👤{vehicleInfo[type].capacity}</span></h4>
                            <h5 className='font-medium text-sm text-gray-600'>{vehicleInfo[type].desc}</h5>
                        </div>
                        <h2 className='text-lg font-semibold'>₹{fare?.[type] ?? '--'}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default VehiclePanel
