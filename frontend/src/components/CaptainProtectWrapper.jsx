import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('captain-token')
    const navigate = useNavigate()
    const { setCaptain } = useContext(CaptainDataContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!token) {
            navigate('/captain-login')
            return
        }

        api.get('/captain/profile', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                setCaptain(response.data.captain)
                setIsLoading(false)
            })
            .catch(() => {
                localStorage.removeItem('captain-token')
                navigate('/captain-login')
            })
    }, [token])

    if (isLoading) {
        return <div className='h-screen flex items-center justify-center'>Loading...</div>
    }

    return <>{children}</>
}

export default CaptainProtectWrapper
