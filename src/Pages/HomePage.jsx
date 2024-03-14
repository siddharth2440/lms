import React from 'react'
import HomeLayout from '../Layouts/HomeLayout';
import image from "../assets/2312023.jpg"

const HomePage = () => {
  return (
    <HomeLayout>
        <div className='grid grid-cols-2 my-auto px-4 py-[5rem]'>
            <div className='flex flex-col items-start justify-center pl-3 gap-2'>
              <h1 className='text-white text-[2rem] font-[500] mt-8'> Find Out the Best
                <span className='text-purple-800 shadow-2xl'> Online Courses</span>
              </h1>

              <p className='w-[70%] mt-4 leading-loose'>We have a large library of courses taught by highly skilled and qualified faculties at a very affordable course</p>

              <div className='btns flex items-start justify-start gap-2 self-auto'>
                <button className='py-1 px-2 rounded-lg bg-yellow-300 border-2 border-white self-start'>Explore Courses</button>
                <button className='py-1 px-2 border rounded-lg border-yellow-400'>Contact us</button>
              </div>
            </div>
            <div className='w-[50%] mx-0'>
              <img src={image} alt="" className='rounded-lg shadow-[0_0_1rem_purple]'/>
            </div>
        </div>


    </HomeLayout>
  )
}

export default HomePage;