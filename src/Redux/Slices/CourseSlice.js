import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";
import axios from "axios";

const initialState = {
    courses:[]
}

export const fetchingAllCourses = createAsyncThunk('/course/get',async ()=>{
    try {
        const res = axiosInstance.get('/courses');
        // console.log(res.data.allCourses);
        toast.promise(res,{
            loading:"Getting All the courses",
            success:"Courses Loaded Successfully",
            error:"Courses Not Found"
        })
        return (await res).data.allCourses
    } catch (error) {
        toast.error(error.message);
    }
    console.log("helloWorld");
    console.log(res.data.allCourses);
})

export const createCourse = createAsyncThunk('/create/course',async (data)=>{
    try {
        console.log(data);
        const res = axiosInstance.post('/courses',data,
        {
            headers:{"Content-Type": "multipart/form-data"}
        })

        toast.promise(res,{
            loading:"Creating your Course",
            success:"Course created",
            error:"Error Occured"
        })

        return (await res).data;
    } catch (error) {
        console.log(error.message);
    }
})


const courseSlice = createSlice({
    name:"courseSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchingAllCourses.fulfilled,(state,action)=>{
            // console.log("Hello World again");
            // console.log(action.payload);
            state.courses = [...action.payload]
        })
        builder.addCase(createCourse.fulfilled,(state,action)=>{
            console.log("Action Payload" +action.payload);
        })
    }
})


export default courseSlice.reducer