import React, { useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { MdEdit, MdDelete } from "react-icons/md";
import axios from 'axios';
import EditUMovies from '../components/EditUMovies';
import UploadUMovies from '../components/UploadUMovies';

const Movies = () => {
  const [openUploadMovies, setOpenUploadMovies] = useState(false)
  const [umovies, setumovies] = useState([]);
  const [editUMovieId, setEditUMovieId] = useState(null);
  const [editUMovieOpen, setEditUMovieOpen] = useState(false);


  useEffect(() => {
    fetchumovies();
  }, []);


  const fetchumovies = async () => {
    try {
      const response = await axios.get('http://localhost:8080/auth/umovies');
      setumovies(response.data);
    } catch (error) {
      console.error('Error fetching Movies', error);
    }
  };


  const handleEditClick = (umovieID) => {
    setEditUMovieId(umovieID);
    setEditUMovieOpen(true);
  };


  const handleDeleteClick = async (umovieID) => {
    try {
      await axios.delete(`http://localhost:8080/umovies/${umovieID}`);
      fetchumovies(); // Refresh the product list
    } catch (error) {
      console.error('Error deleting Movies:', error);
    }
  };


  return (
    <div>
      <button className='flex bg-red text-white text-sm leading-6 font-medium py-2 px-3 rounded-xl  ' onClick={() => setOpenUploadMovies(true)}>
        <FaPlus className='text-white mt-1 mr-1'/>New</button>
      {openUploadMovies && (
        <UploadUMovies onClose={() => setOpenUploadMovies(false)}/>
      )}
      {editUMovieOpen && (
        <EditUMovies uMovieID={editUMovieId} onClose={() => setEditUMovieOpen(false)} onUpdateMovie={fetchumovies} />
      )}
      <div className=' grid-cols-1  md:grid-cols-2 lg:grid-cols-6 flex items-center flex-wrap gap-10 py-2 p-5  h-[calc(100vh-50px)] overflow-y-scroll'>
        {umovies.map(umovie => (
          <div key={umovie.id} className='bg-white p-2 gap-2 border-2 border-brown rounded text-center w-[250px] h-[250px]'>
            <h3 className='font-semibold font-Poppins uppercase text-lg'>{umovie.umovieName}</h3>
            <div className='flex flex-wrap  gap-2 mt-2 justify-center'>
              {umovie.umovieImgUrl && umovie.umovieImgUrl.map((url, index) => (
                <img key={index} src={url} alt={`Product ${index}`} className='w-24 h-24 object-cover' />
              ))}
            </div>
            <div className='text-center mt-3 space-x-4'>
              <button
                className='bg-blue p-2 rounded-full text-white'
                onClick={() => handleEditClick(umovie.id)}
              >
                <MdEdit />
              </button>
              <button
                className='bg-red p-2 rounded-full text-white '
                onClick={() => handleDeleteClick(umovie.id)}
              >
                <MdDelete />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Movies
