import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { UserDataContext } from '../context/UserContext'

const UserProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { setUser } = useContext(UserDataContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!token) {
            navigate('/login')
            return
        }

        api.get('/user/profile')
            .then((response) => {
                setUser(response.data.user)
                setIsLoading(false)
            })
            .catch(() => {
                localStorage.removeItem('token')
                navigate('/login')
            })
    }, [token])

    if (isLoading) {
        return <div className='h-screen flex items-center justify-center'>Loading...</div>
    }

    return <>{children}</>
}

export default UserProtectWrapper
