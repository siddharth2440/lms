import React from 'react'
import {BsFacebook,BsInstagram,BsLinkedin,BsTwitterX} from 'react-icons/bs'
const Footer = () => {

    const currDate = new Date();
    const currYear = currDate.getFullYear()
    // console.log(currYear);
  return (
    <div className='navbar_container w-auto h-[10vh] bg-purple-900 text-white flex items-center justify-between px-6'>
      <h1 className='text-[1.4rem] font-[500]'> Copyright {currYear} | All rights reserved </h1>
      <ul className='flex items-center justify-evenly gap-4 text-[1rem]'>
        <li><a href="" className='text-[1.5rem]'><BsFacebook/></a></li>
        <li><a href="" className='text-[1.5rem]'><BsInstagram/></a></li>
        <li><a href="" className='text-[1.5rem]'><BsLinkedin/></a></li>
        <li><a href="" className='text-[1.5rem]'></a><BsTwitterX/></li>
      </ul>

    </div>
  )
}

export default Footer;