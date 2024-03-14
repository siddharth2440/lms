import React from 'react'
import { useNavigate } from 'react-router-dom'

const Course = ({data}) => {
  const navigate = useNavigate()
  const handler = () =>{
    navigate('/course/description',{state:{...data}})
  }
  return (
    <div onClick={handler} className="Course_Card flex flex-col items-start justify-between gap-1 px-3 py-2 cursor-pointer bg-purple-400 rounded-md">
        <img src={data?.thumbnail?.secure_url} className='rounded-lg h-[50%] m-auto shadow-md ' alt="course-image" />
        <h1 className='text-2xl text-white font-[700]'>{data?.title}</h1>
        <p className='text-[1rem] font-[400]'>{data?.description}</p>
        <p className='text-white font-[500]'>Category : <span className='text-blue-900 font-[400]' >{data?.category}</span></p>
        <p className='text-white font-[500]'>Total Lectures : <span className='text-blue-900 font-[400]'>{data?.numberOfLectures}</span></p>
    </div>
  )
}

export default Course