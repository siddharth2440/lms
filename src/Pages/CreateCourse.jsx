import React, { useState } from 'react'
import HomeLayout from '../Layouts/HomeLayout'
import { Navigate, useNavigate } from 'react-router-dom';
import {AiFillBackward} from "react-icons/ai"
import {BiLogoPeriscope} from "react-icons/bi"
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { createCourse } from '../Redux/Slices/CourseSlice.js';
const CreateCourse = () => {
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [category,setCategory] = useState("");
    const [createdBy,setCreatedBy] = useState("");
    const [thumbnail,setThumbnail] = useState(null);
    const [previewImage,setPreviewImage] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const getImage = (e)=>{
        e.preventDefault()

        const uploadedImage = e.target.files[0];
        // console.log(uploadedImage);  
        if(uploadedImage){
            setThumbnail(uploadedImage)
        }

        const reader = new FileReader();
        reader.readAsDataURL(uploadedImage)
        reader.addEventListener("load",function(){
            setPreviewImage(this.result)
        })
    }
    const submitHandler = async(e) =>{
        e.preventDefault()

        if(!thumbnail || !title || !description || !category || !createdBy){
            toast.error("Fill All the fields")
            return
        }

        if(title.length <8 && title.length>60){
            toast.error("Title must be from 8 to 60 characters")
            return
        }
        if(description.length < 8 ){
            toast.error("Description must be atleast 8 characters")
            return
        }

        if(createdBy.length <5 ){
            toast.error("Invalid Name")
            return
        }

        if(category.length<5){
            toast.error("Invalid Category")
        }
        const data = {description,category,createdBy,title,thumbnail}
        // dispatchTheAction and then navigate to the Home page
        const res = await dispatch(createCourse(data)) 
        if(!res){
            toast.error("error in dispatching the course slice")
            return
        }
        toast.success(" course slice dispatched")
        navigate('/courses')
    }
  return (
    <HomeLayout>    
        <div className=' w-[100%] px-2 py-2   '>
            <form noValidate onSubmit={submitHandler} className='flex flex-col items-start justify-start gap-2  w-[80%] px-4 py-3 m-auto bg-blue-300'>
                <div className='flex items-center justify-between gap-4 '>
                    <span onClick={()=>navigate(-1)} className=' p-2 rounded-full bg-violet-900 cursor-pointer'><AiFillBackward className='text-white'/></span>
                    <h1 className='text-center text-[1.6rem] font-[500]'>Create New Course</h1>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <div className="image flex flex-col items-center gap-3 justify-start">
                        <div className="file cursor-pointer">
                            <label htmlFor="image_upload" className='self-start cursor-pointer'>
                                {
                                    previewImage?(
                                        <img src={previewImage} alt="" className='h-[12rem] w-[20rem] mt-4 rounded-lg'/>
                                    ):<BiLogoPeriscope className='h-[8rem] w-[8rem]'/>
                                }
                            </label>
                            <input type="file"
                                name='image_upload'
                                className='hidden'
                                id='image_upload'
                                onChange={getImage}
                            />
                        </div>

                        <div className='title flex items-start justify-start gap-3'>
                            <label htmlFor="title" className='text-black'>Title</label>
                            <input 
                                type="text" 
                                required
                                className='outline-none px-3 py-1 rounded-md'
                                name='course_title'
                                onChange={(e)=>setTitle(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="otherDetails px-5 py-3 w-[100%] flex items-center justify-center flex-col gap-3 ">
                        <div className='category flex items-center justify-between  px-2 py-1 w-[100%]'>
                            <label htmlFor="category self-start" className='font-[500]'>Created By </label>
                            <input type="text" 
                                required    
                                name='instructor'
                                className='w-[70%] py-1 px-2 outline-none rounded-md'
                                onChange={(e)=>setCategory(e.target.value)}
                            />
                        </div>
                        <div className='instructor flex items-center justify-between gap-3 px-2 py-1 w-[100%]'>
                            <label htmlFor="instructor" className='font-[500]'>Instructor </label>
                            <input type="text" 
                                required
                                name='instructor'
                                className='w-[70%] py-1 px-2 outline-none rounded-md'
                                onChange={(e)=>setCreatedBy(e.target.value)}
                            />
                        </div>
                        <div className='description flex items-start justify-between gap-3 px-2 py-1 w-[100%]'>
                            <label htmlFor="description" className='font-[500]'>Description</label>
                            <textarea name="course_description" id="description" cols="30" rows="10" className='w-[70%] py-1 px-2 outline-none rounded-md h-[70%]' onChange={(e)=>setDescription(e.target.value)}></textarea>
                        </div>  
                    </div>
                </div>
                <button className=' mt-[3rem] bg-purple-400 px-3 py-1 rounded-md self-center w-[50%] text-white'>Submit</button>
            </form>

        </div>
    </HomeLayout>
  )
}

export default CreateCourse 