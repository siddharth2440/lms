import React, { useEffect, useRef, useState } from 'react'
import HomeLayout from '../Layouts/HomeLayout'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { deleteLectureSlice, getLecturesByCourseId } from '../Redux/Slices/LectureSlice';
import { space } from '@chakra-ui/react';
import toast from 'react-hot-toast';

const GetAllLectures = () => {
    const {state} = useLocation();
    const dispatch = useDispatch();
    const [image,setimage] = useState(0)
    const [tit,setTit] = useState(0)
    const navigate = useNavigate()
    const [desc,setDes]= useState(0)
    console.log(state);
    const {role} = useSelector((state)=>state.auth)
    const {lectures} = useSelector((state)=>state.lecture.lectures)   //returns the array of the Lectures of that particular course

    const setId = (idx)=>{
        setimage(idx)
        setTit(idx)
        setDes(idx)
    }
    const deleteHandler =async (courseId,lectureId)=>{
        const ids = {courseId,lectureId}
        const res =await dispatch(deleteLectureSlice(ids))
        if(!res){
            toast.error("Deletion operation is not successfull");
            return
        }
        await dispatch(getLecturesByCourseId(courseId))
        toast.success("Deleted Succcessfully")
    }
    useEffect(()=>{
        dispatch(getLecturesByCourseId(state._id))
    },[state])
  return (
    <HomeLayout>
        <div className='flex flex-col items center justify-center'>
            <div>
                <h1>Course Name :{state.title}</h1>
            </div>
            <div className='grid grid-cols-2 gap-3'>
                <div>  
                {/* state.thumbnail.secure_url */}
                    <img src={lectures && lectures[image]?.lecture?.secure_url} alt="image instead of Video" />
                    <h2>{lectures && lectures[tit].title}</h2>
                    <p>Description : {lectures && lectures[tit].description}</p>
                </div>

                <div className='flex flex-col items-between justify-between border-4 w-full'>
                    <div className='flex items-center justify-between gap-2 w-[80%] m-auto overflow-hidden'>
                        <h1 className='inline-block'>Lectures List</h1>
                        {
                            role==="ADMIN"?
                            <button className='bg-blue-800 px-1 py-1 rounded-md text-white'>Add new Lecture</button>:
                            <span></span>
                        }
                    </div>
                    <div className='flex flex-col items-start justify-between gap-3 w-[90%] m-auto'>
                        {
                            lectures?.map((ele,idx)=>{
                                return(
                                    <div className='flex items-center justify-between px-4 py-1 gap-4  w-full rounded-md border-4 cursor-pointer' key={idx+1} >
                                        <div className='flex gap-5 rounded-md px-3 py-1 items-start justify-between' onClick={()=>setId(idx)}>
                                            <span>{`${idx+1}`}.</span>
                                            <h1>{ele?.description}</h1>
                                        </div>
                                        {
                                            role=="ADMIN"?<button className='bg-red-400 px-3 py-1 rounded-md text-white' onClick={()=>deleteHandler(state._id,ele?._id)}>Delete Lecture</button>:<span></span>
                                        }
                                    </div>

                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    </HomeLayout>
  )
}

export default GetAllLectures;