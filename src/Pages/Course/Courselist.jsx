import React, { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import HomeLayout from '../../Layouts/HomeLayout'
import { fetchingAllCourses } from '../../Redux/Slices/CourseSlice'
import Course from '../../Components/Course'
const Courselist = () => {
    
    const dispatch = useDispatch()
    const {courses} = useSelector((state)=>state.course)   // jo hmm initial state pe define kiye the

    const fetchData = async () =>{
        await dispatch(fetchingAllCourses())
    }

    useEffect(()=>{
        fetchData();
    },[])
  return (
    <HomeLayout>
        <div className='w-[90%] m-auto'>
            <h1 className='text-center font-[500] text-[1.6rem] text-accent link'>Our Courses</h1>
            <div className='grid grid-cols-3 gap-3 px-5 py-3'>
                {
                    courses.map((element,idx)=>{
                        return(
                            <Course key={idx} data={element}/>
                        )
                    })
                }
            </div>
        </div>
    </HomeLayout>
  )
}

export default Courselist