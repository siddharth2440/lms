import React, { useState } from 'react'
import HomeLayout from '../Layouts/HomeLayout'
import { PresenceContext } from 'framer-motion';
import { BsPersonCircle } from 'react-icons/bs';
import {Link, useNavigate} from "react-router-dom"
import {toast} from "react-hot-toast"
import { useDispatch } from 'react-redux';
import {validate} from "email-validator"
import { createAccount } from '../Redux/Slices/AuthSlice.js';
const SignUp = () => {
    const [previewImage,setpreviewImage] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [email,setemail] = useState("");
    const [password,setPassword] = useState("");
    const [fullName,setFullname] = useState("");
    const [avatar,setAvatar] = useState("");

    const getImage = (e) =>{
        e.preventDefault();

        const uploadedImage = e.target.files[0];
        console.log(uploadedImage);
        if(uploadedImage){
            setAvatar(uploadedImage)
        }

        console.log(avatar);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadedImage)
        fileReader.addEventListener("load",function(){
            // console.log(this.result);
            // setAvatar(this.result)
            setpreviewImage(this.result);
        })

    }

    const createNewAccount =async (e) =>{
        e.preventDefault();

        if(!fullName || !password || !email || !avatar){
            toast.error("Please fill all the details")
            return
        }


        //checking name field length

        if(fullName.length <5){
            toast.error("Name Should be atleast 5 characters")
            return
        }

        if(!validate(email)){
            toast.error("Please Enter a Valid Email")
            return
        }

        if(password.length < 9){
            toast.error("Password must be of the 6 characters")
            return
        }

        const formdata = {email,fullName,password,avatar}

        // console.log(formdata);
        // dispatch

        const response =await dispatch(createAccount(formdata));
        if(response?.payload?.success){
        //    console.log("action dispatched");
           navigate('/')
           setAvatar("")
           setFullname("")
           setPassword("")
           setemail("")
        }

        console.log("Error in dispatching the action");
    }
  return (
    <HomeLayout>
        <div className='min-h-[70vh] m-auto px-4 py-3'>
            <form noValidate onSubmit={createNewAccount} className='flex flex-col items-center justify-center gap-4 w-[40%] border m-auto py-[2rem] shadow-lg rounded-md'>
                <h1 className='text-2xl font-[500] text-blue-900 pt-3'>Registration Page</h1>
                
                <label htmlFor="image_upload" className='pt-3'>
                    {
                        previewImage?(
                            <img src={previewImage} alt="" className='h-[4rem] cursor-pointer rounded-full'/>
                        ):
                        <BsPersonCircle className='text-[4rem] opacity-90 cursor-pointer'/>
                    }
                </label>
                <input type="file"
                    name='image_upload'
                    className='hidden'
                    id='image_upload'
                    // accept='.jpg .png .jpeg .svg'
                    onChange={getImage}
                />

                <div id='email' className='flex items-center justify-start gap-4'>
                    <label htmlFor="email" className='text-[1rem] font-[500]'>Email</label>
                    <input type="email" 
                        id='email'
                        required
                        name='email'
                        placeholder='Enter your email...'
                        value={email}
                        onChange={(e)=>setemail(e.target.value)}
                        className='bg-transparent border-2 px-2 py-1 rounded-md outline-none'
                    />

                </div>

                <div id='password' className='flex items-center justify-between gap-4'>
                    <label htmlFor="password" className='text-[1rem] font-[500]'>Password</label>
                    <input type="password" 
                        id='password'
                        required
                        name='password'
                        placeholder='Enter your password...'
                        onChange={(e)=>setPassword(e.target.value)}
                        className='bg-transparent border-2 px-2 py-1 rounded-md outline-none'                        
                    />
                </div>

                <div id='fullName' className='flex items-center justify-between gap-4'>
                    <label htmlFor="username" className='text-[1rem] font-[500]'>Username</label>
                    <input type="text" 
                        id='username'   
                        required
                        name='username'
                        placeholder='Enter your Username...'
                        className='bg-transparent border-2 px-2 py-1 rounded-md outline-none'
                        onChange={(e)=>setFullname(e.target.value)}
                    />
                </div>

                <button type='submit' className='w-[50%] rounded-2xl bg-blue-800 text-white py-1 mt-7 border'>Submit</button>
                <p>
                    Already have an account ? <Link to="/login" className='link text-accent cursor-pointer text-blue-900'> Login </Link>
                </p>
            </form>
        </div>
    </HomeLayout>
  )
}

export default SignUp