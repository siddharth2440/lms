import Course from "../models/course.model.js"
import cloudinary from "cloudinary"
import fs from "fs/promises"
import { stringify } from "querystring"
import upload from "../middlewares/multer.middleware.js"

const createTheCourse = async (req,res)=>{
    const {title,description,category,createdBy} = req.body
    console.log("Title is"+title);

    if(!title || !description || !category  || !createdBy){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        })
    }

    const course = new Course({
        title,description,category,createdBy,
        thumbnail:{
            public_id:"dummy_public_id",
            secure_url:"dummy secure_url"
        }
    })

    try {
        if(req.file){
            const result = await cloudinary.v2.uploader.upload(req.file.path,{
                folder:'lms',
                crop:"fill"
            })
            if(result){
                course.thumbnail.public_id = result.public_id,
                course.thumbnail.secure_url = result.secure_url
            }

            //remove file from the server
            await fs.rm(`uploads/${req.file.filename}`)
        }
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Please Enter your profile Photo"
        })
    }

    await course.save();

    return res.status(200).json({
        success:true,
        message:"Course Created Successfully",
        course

    })
}

const getAllCourses = async(req,res)=>{
    const allCourses = await Course.find({}).select('-lectures');
    if(!allCourses){
        return res.status(400).json({
            success:false,
            message:"Unable to get All the Courses",
        })
    }

    // console.log("Got The Course");
    // console.log(allCourses);
    return res.status(200).json({
        success:true,
        message:"All Courses are feteched Successfully",
        allCourses
    })
}

const getLecturesByCourseId = async (req,res)=>{
    const courseId = req.params.id;
    console.log(courseId);
    const findTheCourse = await Course.findById(courseId)

    if(!findTheCourse){
        return res.status(400).json({
            success:false,
            message:"Unable to get The course"
        })
    }
    return res.status(200).json({
        success:true,
        message:"Course lectures are fetched Successfully",
        lectures:findTheCourse.lectures
    })
}
const updateCourse =async(req,res)=>{
    const {id} = req.params;
    const updateCourse = await Course.findByIdAndUpdate(id,{$set:req.body},{new:true})
    res.status(400).json({
        status:true,
        message:"Course Updated Successfully",
        updateCourse
    })
}
const removeCourse = async(req,res)=>{
    const {id} = req.params;
    const {deleteId}=req.query;
    console.log("From the Backened Side");
    console.log(id);
    console.log(deleteId);
    const deleteCourse = await Course.deleteOne({_id:id})
    if(!deleteCourse){
        return res.status(400).json({
            success:false,
            message:"Unable to delete the course"
        })
    }
    return res.status(200).json({
        success:true,
        message:"Successfully removed the Course"
    })
}


const addLectureToCourseById =async (req,res)=>{
    const {title,description} = req.body
    const {id} = req.params;
    if(!title || !description){
        return res.status(400).json({
            success:false,
            message:"Fill All the Fields"
        })
    }
    const findTheCourse = await Course.findOne({_id:id});
    if(!findTheCourse){
        return res.status(400).json({
            success:false,
            message:"Unable to find the Course, Please Try Again"
        })
    }
    const lectureData = {
        title,description,
        lecture:{
            public_id:"aksjd",
            secure_url:"skjdhsjvn"
        }
    }

    // console.log("Hii Monday");
    // console.log(req.file.filename);
    if(req.file){
        console.log(req.file);
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path,{
                folder:"lms"
            })
            // console.log(JSON.stringify(result));
            if(result){
                lectureData.lecture.public_id= result.public_id
                lectureData.lecture.secure_url= result.secure_url
                // console.log("Result is there");
            }
            else{
                console.log("Error in uploading the image");
            }
            // remove the file from the server
            fs.rm(`uploads/${req.file.filename}`);
        } catch (error) {
            return res.status(400).json({
                success:false,
                message:"Image is required"
            })
        }
    }
    // console.log(lectureData);
    const addLecture = await Course.updateOne({_id:id},{$push:{lectures:lectureData}})

    // increase the LectureNumber by One
    await Course.updateOne({_id:id},{$inc:{numberOfLectures:1}});
    if(!addLecture){
        return res.status(400).json({
            success:false,
            message:"Not Updated"
        })    
    }
    return res.status(200).json({
        success:true,
        message:"Course id there to add Lectures to it"
    })
}
const removeTheLecture = async (req,res)=>{
    console.log("ApI caleed");
    const {courseId,lectureId} = req.params
    console.log(courseId,lectureId);

    const findTheCourse = await Course.findOne({_id:courseId})
    if(!findTheCourse){
        console.log("course is not there");
        return res.status(400).json({
            success:false,
            message:"Course is not there"
        })
    }
    const findLectures = findTheCourse.lectures

    const lec = findLectures.filter(ele=>ele._id == lectureId)
    // const deleteLecture = await Course.findOne({$and:[{_id:courseId},{"lectures.$._id":lectureId}]});
    const deleteLecture = await Course.updateOne({_id:courseId},{$pull:{"lectures":{"_id":lectureId}}})
    // console.log(deleteLecture);
    await Course.updateOne({_id:courseId},{$inc:{numberOfLectures:-1}})

    return res.status(200).json({
        success:true,
        message:"Lecture deleted successfully"
    }) 
}
export {
    getAllCourses,getLecturesByCourseId,createTheCourse,updateCourse,removeCourse,addLectureToCourseById,removeTheLecture
}   