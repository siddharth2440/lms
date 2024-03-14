import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance.js";
import toast from "react-hot-toast";
const initialState = {
    message:undefined,
    email:undefined,
    message:undefined
}

export const sendMail = createAsyncThunk('/contactUs',async(data)=>{
    try {
        const res = axiosInstance.post("/contact",data);
        toast.promise(res,{
            loading:"Submitting",
            success:"Sent Successfully",
            error:"Error occured in sending the message"
        })

        return (await res).data
    } catch (error) {
        console.log(error);
    }
})

const mailSlice = createSlice({
    name:"mail",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{}
})


export default mailSlice.reducer;