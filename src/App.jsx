import './App.css'
import {Routes,Route} from "react-router-dom"
import Footer from './Components/Footer'
import HomeLayout from './Layouts/HomeLayout'
import HomePage from './Pages/HomePage'
import AboutUs from './Pages/AboutUs'
import NotFound from './Pages/NotFound'
import SignUp from './Pages/SignUp'
import Signin from './Pages/Signin'
import Courselist from './Pages/Course/Courselist'
import Contact from './Pages/Contact'
import Denied from './Pages/Denied'
import Description from './Pages/Description'
import RequireAuth from './Components/Auth/RequireAuth'
import CreateCourse from './Pages/CreateCourse'
import Profile from './Pages/Profile'
import Editprofile from './Components/Auth/Editprofile'
import GetAllLectures from './Dashboard/GetAllLectures'
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/aboutUs" element={<AboutUs/>} />
      <Route path="/signUp" element={<SignUp/>} />
      <Route path='/login' element={<Signin/>}/>
      <Route path='/courses' element={<Courselist/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/deny' element={<Denied/>} />
      <Route path='*' element={<NotFound/>} />
      <Route path='/course/description' element={<Description/>} />
      <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}>
        <Route path='/course/create' element={<CreateCourse/>}/>
      </Route>

      <Route element={<RequireAuth allowedRoles={["ADMIN","USER"]}/>}>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/change-password'></Route>
        <Route path='/edit-profile' element={<Editprofile/>}></Route>
        <Route path='/course/lectures' element={<GetAllLectures/>}></Route>
      </Route>
    </Routes>
    </>
  ) 
}

export default App