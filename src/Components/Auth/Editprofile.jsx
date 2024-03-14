import React, { useState } from 'react'
import HomeLayout from '../../Layouts/HomeLayout'
import { useDispatch, useSelector } from 'react-redux'
import { BsBack, BsPerson } from 'react-icons/bs'
import { BiSkipPrevious } from 'react-icons/bi'
import toast from 'react-hot-toast'
import { getMyProfile, updateProfile } from '../../Redux/Slices/AuthSlice'
import { useNavigate } from 'react-router-dom'

const Editprofile = () => {
    const {isLoggedIn,data} = useSelector((state)=>state.auth)
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const [previewImage,setpreviewImage] = useState(null)
    const [avatar,setAvatar] = useState("")
    const [fullName,setfullName] = useState("")
    // const temp = JSON.parse(data)
    const getImage = (e)=>{
        
        const uploadedImage = e.target.files[0]
        if(uploadedImage){
            setAvatar(uploadedImage);
        }
        const reader = new FileReader();
        reader.readAsDataURL(uploadedImage);
        reader.addEventListener("load",function(){
            setpreviewImage(this.result);
        })

        console.log("Preview Image Sets");
    }

    const submitHandler = async(e)=>{
        e.preventDefault()
        if(!fullName || !previewImage){
            toast.error("Fill all the fields")
            return
        }

        if(fullName.length < 5){
            toast.error("Invalid Name")
        }
        const Uid = {userId:data._id}
        const id = data?._id
        const sendData = {avatar,fullName,id:data?._id}
        console.log("userId :"+data._id);
        const res = await dispatch(updateProfile([id,sendData]))
        if (res) {
            await dispatch(getMyProfile(Uid))
            toast.success("Dispatched")
            navigate('/profile')   
            return
        }

        toast.error("Error in dispatching the action")
        return

    }
  return (
    <HomeLayout>
        <div className='w-[100%] h-[100%] border px-4 py-2'>
            <form onSubmit={submitHandler} className='flex flex-col items-start justify-start py-1 bg-violet-500 shadow-xl rounded-lg gap-2 border px-5 w-[40%] m-auto'>
                <h1 className='self-center text-[1.5rem] font-[600]'>Edit Profile</h1>
                <div className="image self-center cursor-pointer">
                    <label htmlFor="image_upload" className='cursor-pointer'>
                        {
                            previewImage?
                            <img src={previewImage} className='text-[5.3rem] rounded-full' alt="" />:
                            <BsPerson className='text-[5.3rem] rounded-full'/>
                        }
                    </label>
                    <input type="file"
                        name='upload_image'
                        className='hidden'
                        onChange={getImage}
                        id='image_upload'
                    />
                </div>
                <div className="name flex items-center justify-between gap-4 self-center mt-3">
                    <label htmlFor="name" className='text-white text-[1rem]'>Fullname</label>
                    <input type="text" className='px-3 py-1 rounded-md outline' onChange={(e)=>setfullName(e.target.value)}/>
                </div>

                <button type='submit' className='self-center mt-4 bg-blue-400 px-1 rounded-md text-white'>Update Profile</button>
                <div className="extras cursor-pointer">
                    <p><BsBack className=' inline-block text-[1.2rem]' /><span className='ml-4'>Go back to profile</span></p>
                </div>
            </form>
        </div>
    </HomeLayout>
  )
}

export default Editprofile