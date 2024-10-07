import React, { useEffect, useState } from 'react'
import { MdEdit, MdDelete } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import axios from 'axios';
import EditMovies from '../components/EditMovies';
import UploadMovies from '../components/UploadMovies';

const Movies = () => {
  const [openUploadMovies, setOpenUploadMovies] = useState(false)
  const [movies, setMovies] = useState([]);
  const [editmovieId, setEditMovieId] = useState(null);
  const [editmovieOpen, setEditMovieOpen] = useState(false);


  useEffect(() => {
    fetchMovies();
  }, []);


  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:8080/auth/movies');
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching Movies', error);
    }
  };


  const handleEditClick = (movieID) => {
    setEditMovieId(movieID);
    setEditMovieOpen(true);
  };


  const handleDeleteClick = async (movieID) => {
    try {
      await axios.delete(`http://localhost:8080/auth/movies/${movieID}`);
      fetchMovies(); // Refresh the product list
    } catch (error) {
      console.error('Error deleting Movies:', error);
    }
  };


  return (
    <div>
      <div className='bg-gradient-to-tr from-roseee to-red py-2 text-black px-4 flex justify-between   font-Poppins items-center rounded-l'>
      <h2 className='font-semibold text-white text-lg'>Movies</h2>
      <button className='border-2 py-1 px-3  rounded-full flex items-center bg-red font-semibold text-white' onClick={() => setOpenUploadMovies(true)}>
      <IoIosAddCircleOutline className='mr-2' /> Add New Movie</button>
      </div>
      {openUploadMovies && (
        <UploadMovies onClose={() => setOpenUploadMovies(false)}/>
      )}
      {editmovieOpen && (
        <EditMovies movieID={editmovieId} onClose={() => setEditMovieOpen(false)} onUpdateMovie={fetchMovies} />
      )}
      <div className='  grid-cols-1 md:grid-cols-2 p-24 lg:grid-cols-6 flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-50px)] overflow-y-scroll'>
        {movies.map(movie => (
          <div key={movie.id} className=' border-2 border-red w-[300px]  bg-white p-4 rounded text-center'>
            <h3 className='font-bold text-lg'>{movie.movieName}</h3>
            <p className='text-sm text-gray'>{movie.movieType}</p>
            <p className='text-sm font-semibold text-gray_black'>Price: Rs.{movie.moviePrice}</p>
            <p className='text-sm font-semibold text-gray_black'>Date: {movie.movieDates}</p>
            <p className='text-sm font-semibold text-gray_black'>Date: {movie.movieSecondDate}</p>
            <p className='text-sm font-semibold text-gray_black'>Date: {movie.movieThirdDate}</p>
            <p className='text-sm font-semibold text-gray_black'>Time: {movie.time}</p>
            <p className='text-sm font-semibold text-gray_black'>Quality: {movie.qualityType}</p>
            <p className='text-sm font-semibold text-gray_black'>Lauguage: {movie.movieLauguage}</p>
            <div className='flex flex-wrap gap-2 mt-2 justify-center'>
              {movie.movieImgUrl && movie.movieImgUrl.map((url, index) => (
                <img key={index} src={url} alt={`Product ${index}`} className='w-24 h-24 object-cover' />
              ))}
            </div>
            <div className='text-center mt-3 space-x-4'>
              <button
                className='bg-green-200 p-2 rounded-full cursor-pointer bg-blue text-white'
                onClick={() => handleEditClick(movie.id)}
              >
                <MdEdit />
              </button>
              <button
                className='bg-red-200 p-2 rounded-full cursor-pointer text-white bg-red'
                onClick={() => handleDeleteClick(movie.id)}
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
