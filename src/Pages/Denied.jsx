import React from 'react'
import { useNavigate } from 'react-router-dom'

const Denied = () => {
    const navigate = useNavigate()
    const clickhandler = (e)=>{
        e.preventDefault();
        navigate(-1);
    }
  return (
    <div className='bg-purple-900 flex items-center justify-center flex-col h-screen w-screen'>
        <h1 className=' text-[3.9rem] text-white tracking-wider'>403</h1>
        <p className='bg-black text-white px-1 rotate-[-10deg]'>Access Denied</p>
        <button onClick={clickhandler} className='bg-purple-800 rounded-md py-2 px-3 text-white'>Go Back</button>
    </div>
  )
}

export default Denied;