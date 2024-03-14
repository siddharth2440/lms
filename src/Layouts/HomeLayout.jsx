import React from 'react'
import {FiMenu} from "react-icons/fi"
import {Drawer,DrawerBody,DrawerContent,DrawerCloseButton,DrawerHeader,DrawerOverlay, useDisclosure} from "@chakra-ui/react"
import {BiMenuAltLeft} from "react-icons/bi"
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../Components/Footer'
import children from "../Pages/HomePage"
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../Redux/Slices/AuthSlice'
const HomeLayout = ({children}) => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // dispatch()
    //for cecking user is loggedIn or not
    const isLoggedIn = useSelector((state)=>state?.auth?.isLoggedIn)

    //for displaying the options according to the role
    const userRole = useSelector((state)=>state?.auth?.role) 

    const {isOpen,onOpen,onClose} = useDisclosure();

    const handleLogout = (e) =>{

        e.preventDefault();
        dispatch(logout());
        // dispatch(logout());
        // if(res?.payload?.success)
        navigate('/');
    }
  return(
    <div className='relative top-0'>
        <button className='fixed z-[99] top-2 left-4 bg-purple-600 p-2 rounded-md' onClick={onOpen}><BiMenuAltLeft/></button>
        <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent> 
                <DrawerCloseButton className="bg-purple-700 text-white"/>
                <DrawerHeader className="bg-purple-900 text-white">LMS</DrawerHeader>
                <DrawerBody>
                    <div className='flex flex-col items-center justify-between gap-4 pt-9'>
                        <ul className='flex flex-col items-center justify-center gap-4'>
                            <li onClick={onClose}><Link to="/">Home</Link></li>
                            {
                                isLoggedIn && userRole=="ADMIN" &&
                                (
                                    <li onClick={onClose}><Link to="/dashboard">Dashboard</Link></li>
                                )
                            }
                            {
                                isLoggedIn && userRole=="ADMIN"&&
                                (
                                    <li onClick={onClose}><Link to="/course/create">Create Course</Link></li>
                                )
                            }
                            <li onClick={onClose}><Link to="/courses">Courses</Link></li>
                            <li onClick={onClose}><Link to="/contact">Contact Us</Link></li>
                            <li onClick={onClose}><Link to="/aboutUs">About Us</Link></li>
                            {
                                isLoggedIn?(
                                    <>
                                        <button  className='px-2 py-1 rounded-lg bg-purple-300' onClick={handleLogout}><Link to="/logout">Logout</Link></button>
                                        <button className='px-2 py-1 rounded-lg bg-purple-300'><Link to="/profile">Profile</Link></button>
                                    </>
                                ):(
                                    <div className='flex items-center justify-center gap-4'>
                                        <button className='px-2 py-1 rounded-lg bg-purple-300'><Link to="/login">Login</Link></button>
                                        <button className='px-2 py-1 rounded-lg bg-purple-300'><Link to="/signUp">Register</Link></button>
                                    </div>
                                )
                            }
                        </ul>
                    </div>
                </DrawerBody>
            </DrawerContent>
        </Drawer>



        <div className=' pt-[3.3rem] px-3 w-auto min-h-[90vh] bg-purple-300'>
            {/* <h1>Hello world</h???1> */}
            {children}   
        </div>
        {/* {children} */}
        <Footer/>

    </div>
  )
}

export default HomeLayout