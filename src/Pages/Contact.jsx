import React, { useState } from 'react'
import HomeLayout from '../Layouts/HomeLayout'
import { useDispatch } from 'react-redux';
import { sendMail } from '../Redux/Slices/ContactSlice';
import toast from 'react-hot-toast';
import {validate} from "email-validator"
import { useNavigate } from 'react-router-dom';

const Contact = () => {

  const [email,setMail] = useState("");
  const [message,setMessage] = useState("")
  const [username,setName] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const contactHandler = async(e)=>{
    e.preventDefault();
    const data = {email,message,username}
    if(!email || !message || !username){
      toast.error("Fill all the details")
      return
    }

    if(!validate(email)){
      toast.error("Enter a valid Mail")
      return
    }

    if(message.length <8){
      toast.error('Message atleast of 8 characters')
      return
    }
    if(username.length <5){
      toast.error('Username atleast of 5 characters')
      return
    }
    const res = await dispatch(sendMail(data));

    if(!res){
      toast.error("Error in dispatching the action")
    }
    // toast.success("")
    navigate('/')
    return
  }

  return (
    <HomeLayout>
        <div className='w-[100%] px-3 py-6'>
          <form noValidate onSubmit={contactHandler} className='border rounded-md shadow-[0_1rem_1rem_rgba(0,0,0,0.5)] w-[50%] m-auto flex items-center justify-center flex-col gap-4 py-6'>
            <h1 className='mt-4 text-center text-2xl font-[500] text-blue-900'>Contact Form</h1>

            <div className="name w-[100%] px-3 flex items-center justify-center gap-4 py-1">
              <label htmlFor="name" className='text-[1rem] font-[600]'>Name :</label>
              <input type="text" required name='email' id='name' className='w-[60%] shadow-lg py-1 px-3 outline-none rounded-md' onChange={(e)=>setName(e.target.value)}/>
            </div>

            <div className="name w-[100%] px-3 flex items-center justify-center gap-4 py-1">
              <label htmlFor="email" className='text-[1rem] font-[600]'>Email :</label>
              <input type="email" required name='email' id='name' className='w-[60%] py-1 px-3 outline-none rounded-md shadow-lg'onChange={(e)=>setMail(e.target.value)}/>
            </div>

            <div className="name w-[100%] px-3 flex items-start justify-center gap-4 py-1">
              <label htmlFor="email" className='text-[1rem] font-[600]'>Message :</label>
              {/* <input type="email" required name='email' id='name' className='w-[60%] py-1 px-3 outline-none rounded-md shadow-lg'/> */}
              <textarea name="message" id="" cols="30" rows="10" className='w-[60%] py-1 px-3 outline-none rounded-md shadow-lg ' onChange={(e)=>setMessage(e.target.value)}></textarea>
            </div>

            <button className='w-[40%] py-1 px-3 outline-none rounded-md shadow-lg bg-purple-500 text-white'>Submit</button>
          </form>

        </div>
    </HomeLayout>
  )
}

export default Contact