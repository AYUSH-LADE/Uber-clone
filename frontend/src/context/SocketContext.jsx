import React, { createContext, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'

export const SocketContext = createContext()

const socket = io(import.meta.env.VITE_BASE_URL)

const SocketProvider = ({ children }) => {
    const sendMessage = (eventName, data) => {
        socket.emit(eventName, data)
    }

    const receiveMessage = (eventName, callback) => {
        socket.on(eventName, callback)
        // return an unsubscribe function for cleanup in useEffect
        return () => socket.off(eventName, callback)
    }

    return (
        <SocketContext.Provider value={{ socket, sendMessage, receiveMessage }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider
