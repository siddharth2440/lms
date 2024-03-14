import {Router} from "express"
import isLoggedIN from "../middlewares/auth.middleware.js";
import {getAllCourses,getLecturesByCourseId,createTheCourse,removeCourse,updateCourse,addLectureToCourseById,removeTheLecture} from "../controllers/course.controller.js"
import upload from "../middlewares/multer.middleware.js";
const router = Router();

router.route('/')
    .get(getAllCourses)
    .post(upload.single('thumbnail'),createTheCourse)


router.route('/:id')
    .get(getLecturesByCourseId)
    .put(updateCourse)
    .delete(removeCourse)
    .post(upload.single('lecture'),addLectureToCourseById)

router.route('/:courseId/:lectureId').delete(removeTheLecture)
export default router;