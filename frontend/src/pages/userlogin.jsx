import React from 'react';

const UserLogin = () => {  
  return (
    <div className='p-7'>
      <form>
        <h3 className='text-xl mb-2'>What's your email?</h3>
        <input required className='bg-white rounded px-4 py-2 border w-full text-lg placeholder:text-xm' type="email" placeholder='Enter your email' />
        <h3>What's your password?</h3>
        <input required type="password" placeholder='Enter your password' />
        <button type="submit">Login</button>
      </form>
    </div>
  ); 
}

export default UserLogin;   