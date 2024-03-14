import React, { useState } from 'react'
import HomeLayout from '../Layouts/HomeLayout'
import toast from 'react-hot-toast';
import { validate } from 'email-validator';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAccount } from '../Redux/Slices/AuthSlice';

const Signin = () => {
    
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("")

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginHandler = async (e)=>{
        e.preventDefault();

        if(!email || !password){
            toast.error("Fill all the fields");
            return
        }

        if(!validate(email)){
            toast.error("Invalid Email")
            return
        }

        if(password.length <8 ){
            toast.error("Invalid Password")
            return
        }
        
        const data = {email,password};

        // console.log(data)
        const loginData = await dispatch(loginAccount(data));
        if(loginData){
            navigate('/');  
        }


    }


  return (
    <HomeLayout>

        <div className='form w-[100%] min-h-[80vh] '>
            <form noValidate onSubmit={loginHandler} className='h-[60%] w-[30%] m-auto pt-[3rem] flex flex-col items-center justify-center gap-3 py-5 mt-[1.5rem] shadow-lg'>
                <h1 className='text-center font-[500] text-[1.9rem]'>Login Page</h1>
                <div className='email flex items-center justify-between gap-5 px-3'>
                    <label htmlFor="email" className='self-start text-[1.1rem] font-[600]'>Email</label>
                    <input 
                        className='bg-transparent outline-none shadow-[0_0_1rem_blue] border rounded-md px-3 py-1'
                        type="email"
                        required
                        name='email'   
                        onChange={(e)=>setEmail(e.target.value)}                 
                    />
                </div>

                <div className='password flex items-center justify-between gap-5 px-3 mt-[1rem]'>
                    <label htmlFor="email" className='self-start text-[1.1rem] font-[600]'>Password</label>
                    <input 
                        type="password"
                        className='bg-transparent outline-none shadow-[0_0_1rem_blue] border rounded-md px-3 py-1'
                        required
                        name='email'  
                        onChange={(e)=>setPassword(e.target.value)}                  
                    />
                </div>

                <button type='submit' className='border w-[20%] py-1 rounded-md shadow-sm bg-blue-600 text-white mt-[2rem]'>Login</button>
            </form>
        </div>
    </HomeLayout>
  )
}

export default Signin