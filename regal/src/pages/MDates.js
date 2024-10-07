import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import { IoIosAddCircleOutline } from "react-icons/io";
import UploadMDates from '../components/UploadMDates';

const MDates = () => {
  const [movieDates, setMovieDates] = useState([]);
  const [openUploadDates,setOpenUploadDates] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/auth/mdates');
        setMovieDates(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);

  const deleteDates = async (mdatesID) => {
    try {
      await axios.delete(`http://localhost:8080/auth/mdates/${mdatesID}`);
      setMovieDates((prevMDates) => prevMDates.filter(mdates => mdates.mdatesID !== mdatesID));
      toast.success("Date deleted successfully!");
    } catch (error) {
      console.error('Error deleting date:', error);
      toast.error("Failed to delete date.");
    }
  };

  return (
    <div>
      <div className='bg-light_yellow py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>Date List</h2>
        <button className='border-2 py-1 px-3 rounded-full flex items-center  border-red font-bold text-white bg-red' onClick={()=>setOpenUploadDates(true)}>
          <IoIosAddCircleOutline className='mr-2' /> Add New Date</button>
      </div>
      {
       openUploadDates && (

        <UploadMDates onClose={() => setOpenUploadDates(false)}/>

        )
      }

      <table className='w-full bg-light_yellow  border-2 categoryTabletwo mt-2 text-center'>
        <thead>
          <tr className='bg-black text-white'>
            <th>ID</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {movieDates && movieDates.map((movieDate) => (
            <tr key={movieDate.mdate_id}>
              <td>{movieDate.mdate_id}</td>
              <td>{movieDate.movieDates}</td>
              <td className='categoryAction'>
                <button
                  className=' p-2 rounded-full cursor-pointer  text-red'
                  onClick={() => deleteDates(movieDate.mdate_id)}
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

export default MDates;
