import React, { useEffect } from 'react'
import HomeLayout from '../Layouts/HomeLayout'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMyProfile } from '../Redux/Slices/AuthSlice'
import toast from 'react-hot-toast'

const Profile = () => {
    // const dispatch = useDispatch()
    const navigate = useNavigate()
    const {data} = useSelector((state)=>state.auth)
 return (  
    <HomeLayout>
        <div className='w-[30%] rounded-lg m-auto h-[30%] border py-4 px-2 flex flex-col items-start justify-start gap-2 shadow-[0_0_1rem_rgba(0,0,0,0.3)] bg-purple-400'>
            <img src={data.avatar.secure_url} alt="" className='self-center rounded-full'/>
            <h2 className='capitalize font-[600] text-[1.4rem] text-white'>{data.fullName}</h2>
            <div className="email flex items-center justify-between gap-3">
                <p className='text-white'>Email :</p>
                <span className='text-[0.9rem] font-[600]'>{data.email}</span>
            </div>
            <div className="role flex items-center justify-between gap-3">
                <p className='text-white'>Role :</p>
                <h3 className='text-[0.9rem] font-[600]'>{data.role}</h3>
            </div>
            <div className="email flex justify-between gap-3 self-center">
                <button className='px-3 py-1 rounded-lg font-[600] shadow-lg bg-red-200'>Change Password</button>
                <button className='px-3 py-1 rounded-lg font-[600] shadow-lg bg-red-200' onClick={()=>navigate('/edit-profile')}>Edit Profile</button>
            </div>
        </div>
    </HomeLayout>
  )
}

export default Profile