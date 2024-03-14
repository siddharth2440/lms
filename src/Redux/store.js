import {configureStore} from "@reduxjs/toolkit"
import AuthSlice from "./Slices/AuthSlice.js";
import courseSliceReducer from "./Slices/CourseSlice.js";
import mailSliceReducer from "./Slices/ContactSlice.js";
import lectureSliceReducer from "./Slices/LectureSlice.js"
const store = configureStore({
    reducer:{
        auth:AuthSlice,
        course:courseSliceReducer,
        mail:mailSliceReducer,
        lecture:lectureSliceReducer
    },
    devTools:true
})


export default store;