import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance"
import toast from "react-hot-toast";
const initialState = {
    isLoggedIn:localStorage.getItem("isLoggedIn")  || false,
    role:localStorage.getItem("role") || "",
    data:localStorage.getItem("data") || {}
}

const BASE_URI= "http://localhost:4002/api/v1"

export const createAccount = createAsyncThunk('/auth/signup',async (data)=>{
    try {
        console.log(data);
        const res = axiosInstance.post('/users/register',data,{
            headers:{"Content-Type": "multipart/form-data"}
        });
        console.log(res.data);
        toast.promise(res,{
            loading:"Wait ! creating your Account",
            success:(data)=>{
                return data?.data?.message
            },
            error:"Failed to create an account"
        })
        console.log(res);
        return (await res).data;
    } catch (error) {
        console.log(error);
    }
})


export const loginAccount = createAsyncThunk('/auth/login',async (data)=>{
    try {
        console.log(data);
        const res = axiosInstance.post('/users/login',data
        );
        toast.promise(res,{
            loading:"Logging In",
            success:(data)=>{
                return data.data.message
            },
            error:"Failed to Login"
        })

        return (await res).data
    } catch (error) {
        console.log(error);
    }
})

export const logout = createAsyncThunk('/auth/logout',async ()=>{
    try {
        // console.log(data);
        const res = axiosInstance.get('/users/logout');
        toast.promise(res,{
            loading:"Logout",
            success:"Logout Successfully",
            error:"Failed to Logout"
        })

        // return (await res).data
    } catch (error) {
        console.log(error);
    }
})

export const getMyProfile = createAsyncThunk('/auth/me',async (data)=>{
    try {
        console.log(data);
        console.log(`Okay jaanauana ${data.userId}`);
        const res = axiosInstance.get(`/users/me/${data.userId}`);
        toast.promise(res,{
            loading:"Loading Profile",
            success:"Profile",
            error:"Failed to get your profile"
        })
        return (await res).data
    } catch (error) {
        console.log(error);
    }
})

export const updateProfile = createAsyncThunk('/auth/me',async (data)=>{
    console.log(data);
    try {
        console.log(data);
        // console.log(data[0]);
        // console.log(data[1]);
        const res = axiosInstance.put(`/users/update-profile/${data[0]}`,data[1]);
        toast.promise(res,{
            loading:"Loading Profile",
            success:"Profile",
            error:"Failed to get your profile"
        })

        // console.log(res);
        return (await res).data
    } catch (error) {
        console.log(error);
    }
})

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(createAccount.fulfilled,(state,action)=>{
            localStorage.setItem("data",JSON.stringify(action.payload.user))
            localStorage.setItem("role",action.payload.user.role)
            localStorage.setItem("isLoggedIn",true)
            state.isLoggedIn = true
            state.role = action.payload.user.role
            state.data = action.payload.user
        });

        builder.addCase(loginAccount.fulfilled,(state,action)=>{
            // console.log(action.payload);
            localStorage.setItem("data",JSON.stringify(action?.payload.isFound))
            localStorage.setItem("role",action?.payload.isFound.role)
            localStorage.setItem("isLoggedIn",true)
            state.isLoggedIn = true
            state.role = action.payload?.isFound?.role
            state.data = action.payload.isFound
            // console.log("Login state is");
            // console.log(action.payload.isFound);
        })
        
        builder.addCase(logout.fulfilled,(state,action)=>{
            localStorage.clear()
            state.isLoggedIn = false
            state.role = ""
        })

        builder.addCase(getMyProfile.fulfilled,(state,action)=>{
            localStorage.clear()
            localStorage.setItem("data",JSON.stringify(action?.payload.userDetails))
            localStorage.setItem("role",action?.payload?.userDetails?.role || "USER")
            localStorage.setItem("isLoggedIn",true)
            state.data = action.payload.userDetails
        })
    }
})


// export const {} = authSlice.actions;
export default authSlice.reducer;