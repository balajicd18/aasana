import React, { useState } from 'react'
import { RiDashboardFill } from "react-icons/ri";
import { FaAddressBook } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import  profile from '../assests/images/logo.png'
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {


  const location = useLocation();
  const pathSegments = location.pathname.split('/'); // ['', 'dashboard']
  const currentPage = pathSegments[1]; // 'dashboard'

  const navigate = useNavigate()

  return (
    <div >
        <div className='p-6 flex flex-col gap-y-12'>
            <div className='w-full bg-[] flex items-center gap-x-4'>
                <div className='h-13 w-13 rounded-full bg-[white]'>
                    <img src={profile} alt='profile' className='h-full w-full rounded-full' />
                </div>
                <div>
                    <h1 className='text-lg font-bold'>Appointment</h1>
                    <h3 className='text-base'>appoint@gmail.com</h3>
                </div>
            </div>
            {/* List */}
            <div >
               <ul className='text-lg  bg-[] flex flex-col  gap-y-8 text-white'>
                <Link to='/dashboard'><li className={currentPage==='dashboard'? 'bg-[] text-black text-base px-4 p-2 flex items-center gap-x-3 rounded-lg border-l-4 border-l-black bg-[white]':'bg-[] text-base px-4 p-2 flex items-center gap-x-3 rounded-lg hover:text-black hover:bg-[white]'}><RiDashboardFill className='inline-block text-2xl'/>Dashboard</li></Link>
                <Link to='/appointment'> <li className={currentPage==='appointment' || currentPage==='action'? 'bg-[] text-black text-base px-4 p-2 flex items-center gap-x-3 rounded-lg border-l-4 border-l-black bg-[white]':'bg-[] text-base px-4 p-2 flex items-center gap-x-3 rounded-lg hover:text-black  hover:bg-[white]'}><FaAddressBook className='inline-block text-2xl'/>Appointments</li></Link>
                <Link to='/'> <li onClick={() => {localStorage.removeItem('token'); navigate('/', { replace: true });}}  className='bg-[] text-base px-4 p-2 flex items-center gap-x-3 rounded-lg  hover:bg-[white] hover:text-black'><RiLogoutBoxRLine className='inline-block text-2xl'/>Logout</li></Link>
               </ul>
            </div>
        </div>
    </div>
  )
}

export default Sidebar