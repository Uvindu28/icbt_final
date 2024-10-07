import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';

const Booking = () => {
  const [bookings, setBooking] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/auth/booking');
        setBooking(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);

  const deletebookings = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:8080/auth/d${bookingId}`);
      setBooking((prevBookings) => prevBookings.filter(booking => booking.bookingId !== bookingId));
      toast.success("Category deleted successfully!");
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error("Failed to delete category.");
    }
  };

  return (
    <div>
      <div className='bg-light_yellow py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>Booking List</h2>
      </div>

      <table className='w-full bg-light_yellow border-2  categoryTabletwo mt-2 text-center'>
        <thead>
          <tr className='bg-black text-white'>
            <th>ID</th>
            <th>Name</th>
            <th>Show Time</th>
            <th>Date</th>
            <th>Email</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings && bookings.map((booking) => (
            <tr key={booking.booking_id}>
              <td>{booking.booking_id}</td>
              <td>{booking.movieName}</td>
              <td>{booking.showTime}</td>
              <td>{booking.date}</td>
              <td>{booking.email}</td>
              <td>{booking.total}</td>
              <td className='bookingAction'>
                <button
                  className=' p-2 rounded-full text-red '
                  onClick={() => deletebookings(booking.bookingId)}
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Booking;
