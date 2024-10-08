import React from 'react'
import { FaHome } from 'react-icons/fa';
import { FaFilm } from "react-icons/fa6";
import { FaBowlFood } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { FaCalendarDays } from "react-icons/fa6";
import { MdOutlineRateReview } from "react-icons/md";
import { Link, Outlet } from 'react-router-dom';

function Sidebar() {
  return (

    <div>
    <div className='min-h-[calc(117vh-123px)] lg:flex font-Poppins '>
      <aside className='bg-gray_black min-h-full w-full max-w-[18rem]  customShadow text-lg font-bold'>
        <div className='p-8 '>
        <div className='mb-8'>
            <h2 className='text-2xl text-white font-semibold text-center border-b border-white pb-4'>Admin Panel</h2>
          </div>
          <nav className='flex flex-col space-y-3'>
          <Link to="home" className='flex items-center text-white justify-start hover:bg-red p-3 rounded-md '>
              <FaHome className='mr-2 text-lg' />
              Home
            </Link>
            <Link to="movies" className='flex items-center font-medium text-white justify-start  hover:bg-red p-3 rounded-md'>
              <FaFilm className='mr-2 text-lg' />
              Movies
            </Link>
            <Link to="umovies" className='flex items-center text-lg font-medium text-white justify-start  hover:bg-red p-3 rounded-md'>
              <FaFilm className='mr-2 text-lg' />
              Upcoming Movies
            </Link>
            <Link to="movieDates" className='flex items-center font-medium text-white justify-start  hover:bg-red p-3 rounded-md'>
              <FaCalendarDays className='mr-2 text-lg' />
              Movie Dates
            </Link>
            <Link to="food" className='flex items-center font-medium justify-start text-white  hover:bg-red p-3 rounded-md'>
              <FaBowlFood className='mr-2 text-lg' />
              Food
            </Link>
            <Link to="foodCategories" className='flex items-center font-medium justify-start text-white  hover:bg-red p-3 rounded-md'>
              <BiSolidCategory className='mr-2 text-lg' />
              Food Category
            </Link>
            <Link to="review" className='flex items-center font-medium justify-start text-white  hover:bg-red p-3 rounded-md'>
              <MdOutlineRateReview className='mr-2 text-lg' />
              Reviews
            </Link>
            <Link to="booking" className='flex items-center font-medium justify-start text-white  hover:bg-red p-3 rounded-md'>
              <FaBookmark className='mr-2 text-lg' />
              Bookings
            </Link>
          </nav>
        </div>
      </aside>
      <main className='w-full h-full p-2'>
        <Outlet />
      </main>
    </div>
  </div>
  )
}

export default Sidebar
