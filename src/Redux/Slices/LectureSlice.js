import {ReducerType, createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance"
import toast from "react-hot-toast"

const initialState = {
    lectures : []
}

export const getLecturesByCourseId = createAsyncThunk('/courses/lectures',async (id)=>{
    try {
        console.log("ALL lectures");
        console.log(id);
        const getLectures = axiosInstance.get(`/courses/${id}`)
        toast.promise(getLectures,{
            success:"Lectures Loaded Successfully",
            loading:"Getting the Data",
            error:"Unable to get the Data"
        })

        return (await getLectures).data
    } catch (error) {
        console.log(error.message);
    }
})

export const deleteLectureSlice = createAsyncThunk('/course/deleteSlice',async (data)=>{
    console.log("data coming in the Delete Lecture slice is");
    console.log(data);

    try {
        const res = axiosInstance.delete(`/courses/${data.courseId}/${data.lectureId}`)
        toast.promise(res,{
            success:"Deleted Successfully",
            loading:"deleting",
            error:"Error occured"
        })

        return (await res).data
    } catch (error) {
        toast.error("Error in axiosCalling");
    }
})
const lectureSlice = createSlice({
    name:"lecture",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getLecturesByCourseId.fulfilled,(state,action)=>{
            // console.log(action.payload);
            state.lectures = action.payload
        })
    }
})


export default lectureSlice.reducer