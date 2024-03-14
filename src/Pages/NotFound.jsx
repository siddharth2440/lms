import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate();
  const handleBack = ()=>{
    navigate(-1);
  }
  return (
    <div className='h-screen bg-purple-300 w-full flex flex-col gap-4 items-center justify-center'>
        <h1 className='text-[5rem] font-[600]'>404</h1>
        <span className='bg-black px-2 py-1 text-white rotate-3 inline-block relative bottom-[3rem]'>page not found</span>
        <button className='py-2 px-3 border border-3 border-red-800 rounded-full' onClick={handleBack}>Go Back</button>
    </div>
  )
}

export default NotFound;