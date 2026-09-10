import React from 'react'

const LocationSearchPanel = ({ suggestions, onSelect }) => {
    if (!suggestions || suggestions.length === 0) {
        return null
    }

    return (
        <div className='px-2'>
            {suggestions.map((suggestion, idx) => (
                <div
                    key={idx}
                    onClick={() => onSelect(suggestion)}
                    className='flex gap-4 border-2 p-3 border-gray-100 rounded-xl items-center my-2 justify-start cursor-pointer hover:bg-gray-50 active:bg-gray-100'
                >
                    <div className='bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full shrink-0 text-lg'>
                        📍
                    </div>
                    <h4 className='font-medium text-sm truncate'>{suggestion}</h4>
                </div>
            ))}
        </div>
    )
}

export default LocationSearchPanel
