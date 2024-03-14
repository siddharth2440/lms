import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import HomeLayout from '../Layouts/HomeLayout';
import { useSelector } from 'react-redux';

const Description = () => {
    const {role} = useSelector((state)=>state.auth)
    const {state} = useLocation();
    const navigate = useNavigate()
    // console.log(state);
  return (
    <HomeLayout>
        <div className='grid grid-cols-2 gap-3 w-[100%] py-4 px-2'>
            <div>
                <img src={state.thumbnail.secure_url} alt="" className='rounded-md shadow-[0_1rem_1rem_rgba(0,0,0,0.2)]' />
                <p className='mt-[2rem] text-white'>Total Lectures :<span className='text-black'>{state.numberOfLectures}</span></p>
                <p className='text-white'>Instructor :<span className='text-black'>{state.createdBy}</span></p>
            {
                role==="ADMIN"?(
                    <button className='mt-[1rem] bg-purple-600 px-2 py-1 rounded-md text-white' onClick={()=>navigate('/course/lectures',{state:{...state}})}>Watch Lectures</button>
                ):(
                    <button className='mt-[1rem] bg-purple-600 px-2 py-1 rounded-md text-white shadow-lg'>Subscribe</button>
                )
            }
            </div>
            <div className='pl-[2rem]'>
                <h1 className='text-violet-500 font-[500] text-[1.9rem]'>{state.title}</h1>
                <p className='flex flex-col items-start justify-start gap-2 text-[2rem] mt-9 text-white'>Course Description : <span className='text-black text-[1rem] w-[80%] font-[500]'>{state.description}</span></p>
            </div>
        </div>
    </HomeLayout>
  )
}

export default Description