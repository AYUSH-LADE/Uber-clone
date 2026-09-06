import React from 'react';
import {Link} from 'react-router-dom';

const Home = () => {
  return (
    <div>
        <div className="bg-cover bg-center bg-[url(https://www.slashgear.com/img/gallery/what-are-those-little-cameras-above-traffic-lights-actually-for/intro-1757927181.jpg)]   h-screen pt-8  flex justify-between flex-col  w-full bg-red-700" >
          <img className='w-16 ml-8 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber" />
          <div className='text-3xl font-bold pb-7 bg-white py-4 px-4'>
            <h2>Get Started with Uber</h2>
            <Link to="/login" className='flex items-center justify-center w-full bg-black text-white py-3 mt-4 rounded '>Continue</Link>
          </div> 
        </div>
    </div>
  );
} 

export default Home;