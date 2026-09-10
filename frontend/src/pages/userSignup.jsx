import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext'; 

const UserSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userData, setUserData] = useState('');

    const navigate = useNavigate();

    const { user, setUser } = useContext(UserDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();

        const newUser = {
            fullname: {
                firstname: firstName,
                lastname: lastName
            },
            email: email,
            password: password
        };

        try {
           
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, newUser);

            if (response.status === 201) {
                const data = response.data;
                setUser(data.user);
                localStorage.setItem('token', data.token);
                navigate('/home');
            }
        }  catch (error) {
    console.log('Full Error Response:', error.response?.data);
}

        setEmail('');
        setFirstName('');
        setLastName('');
        setPassword('');
    };

    return (
        <div className='h-screen p-7 flex flex-col justify-between'>
            <div>
                <img className='w-16 ml-8 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber" />
                <form onSubmit={submitHandler}>
                    <h3 className='text-lg font-medium mb-2'>What's your name?</h3>
                    <div className='flex gap-3 mb-6'>
                        <input
                            required
                            className='w-1/2 bg-[#eeeeee] rounded px-4 py-2 text-base placeholder:text-base'
                            type="text"
                            placeholder='First Name'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            required
                            className='w-1/2 bg-[#eeeeee] rounded px-4 py-2 text-base placeholder:text-base'
                            type="text"
                            placeholder='Last Name'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <h3 className='text-lg font-medium mb-6'>What's your email?</h3>
                    <input
                        required
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-base placeholder:text-base'
                        type="email"
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <h3 className='text-lg font-medium mb-6'>What's your password?</h3>
                    <input
                        required
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-base placeholder:text-base'
                        type="password"
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg'>
                        Create New Account
                    </button>
                </form>

                <p className='text-center mb-10'>
                    Already have an account? <Link to='/login' className='text-blue-600'>login here</Link>
                </p>
            </div>

            <p className='text-[10px] leading-tight text-gray-500'>
                By proceeding, you consent to get calls, WhatsApp, or SMS messages, including by automated means, from Uber and its affiliates to the number provided.
            </p>
        </div>
    );
};

export default UserSignup;