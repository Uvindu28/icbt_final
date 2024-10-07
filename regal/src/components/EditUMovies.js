import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoMdClose } from "react-icons/io";
import { MdCloudUpload } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DisplayImg from './DisplayImg';
import UploadImg from '../helpers/UploadImg';

const EditMovies = ({ movieID, onClose, onUpdateMovie }) => {
    const [movieName, setMovieName] = useState("");
    const [moviePrice, setMoviePrice] = useState("");
    const [movieType, setMovieType] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [movieImg, setMovieImg] = useState("");
    const [movieTrailerUrl, setMovieTrailerUrl] = useState("");
    const [qualityType, setQualityType] = useState("");
    const [movieLauguage, setMovieLauguage] = useState("");
  const [fullScreenImage, setFullScreenImage] = useState('');
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);

  useEffect(() => {

    // Fetch product details if editing an existing product
    if (movieID) {
      axios.get(`http://localhost:8080/auth/movies/${movieID}`)
        .then(response => {
          const movie = response.data;
          setMovieName(movie.movieName);
          setMoviePrice(movie.moviePrice);
          setMovieType(movie.movieType);
          setDate(movie.date);
          setTime(movie.time);
          setMovieImg(movie.movieImgUrl || []);
          setMovieTrailerUrl(movie.movieTrailerUrl);
          setQualityType(movie.qualityType);
          setMovieLauguage(movie.movieLauguage);
        })
        .catch(error => {
          console.error('Error fetching movie data:', error);
        });
    }
  }, [movieID]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      movieName,
      moviePrice,
      movieType,
      date,
      time,
      movieImgUrl: movieImg,
      movieTrailerUrl,
      qualityType,
      movieLauguage
    };

    axios.put(`http://localhost:8080/movies/${movieID}`, data)
      .then(response => {
        toast.success("Movie updated successfully!");
        onUpdateMovie(response.data); // Trigger any update logic in the parent component
        onClose();
      })
      .catch(error => {
        console.error(error);
        toast.error("Failed to update movie.");
      });
  };

  const handleUploadMovies = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await UploadImg(file);
    const newMovieImage = [...movieImg, uploadImageCloudinary.url];
    setMovieImg(newMovieImage);
  };

  const handleDeleteMovieImage = (index) => {
    const newMovieImage = [...movieImg];
    newMovieImage.splice(index, 1);
    setMovieImg(newMovieImage);
  };

  return (
    <div className='fixed bg-slate-200 bg-opacity-50 w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
      <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
        <div className='flex justify-between items-center pb-3'>
          <h2 className='font-bold text-lg ml-3'>Edit Movie</h2>
          <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
            <IoMdClose />
          </div>
        </div>
        <form className='grid p-4 gap-2 overflow-scroll h-full' onSubmit={handleSubmit}>
                <label htmlFor='movieName'>Movie Name:</label>
                <input
                type='text'
                id='movieName'
                placeholder='Enter Movie Name'
                name='movieName'
                onChange={(e) => setMovieName(e.target.value)}
                className='p-2 bg-slate-100 border rounded'
                required
                />
                <label htmlFor='moviePrice' className='mt-3'>Movie Price:</label>
                <input
                type='text'
                id='moviePrice'
                placeholder='Enter Movie Price'
                name='moviePrice'
                onChange={(e) => setMoviePrice(e.target.value)}
                className='p-2 bg-slate-100 border rounded'
                required
                />
                <label htmlFor='movieImg' className='mt-3'>Image:</label>
                <div className='p-2 bg-slate-100 border rounded h-48 w-full flex justify-center text-center cursor-pointer'>
                    <div className='text-slate-500 flex justify-center items-center flex-col'>
                    <span className='text-5xl'><MdCloudUpload /></span>
                    <p>Upload Movie Image</p>
                    <input type='file' id='uploadImg' name='movieImg' required onChange={handleUploadMovies}/>
                    </div>
                </div>
                <div>
                        {movieImg.length > 0 ? (
                        <div className='flex items-center gap-2'>
                            {movieImg.map((el, index) => (
                            <div className='relative group' key={index}>
                                <img
                                src={el}
                                alt={el}
                                width={80}
                                height={80}
                                className='bg-slate-100 border cursor-pointer'
                                onClick={() => {
                                    setOpenFullScreenImage(true);
                                    setFullScreenImage(el);
                                }}
                                />
                                <div
                                className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer'
                                onClick={() => handleDeleteMovieImage(index)}
                                >
                                <MdDelete />
                                </div>
                            </div>
                            ))}
                        </div>
                        ) : (
                        <p className='text-red-600 text-xs'>*Please upload product image</p>
                        )}
                </div>
                <label htmlFor='movieType' className='mt-3'>Movie Type:</label>
                <select
                id='movieType'
                onChange={(e) => setMovieType(e.target.value)}
                className='p-2 bg-slate-100 border rounded'
                required
                >   <option>Select Movie Type</option>
                    <option>Sci-Fi</option>
                    <option>Horror</option>
                    <option>Drama</option>
                    <option>Documentry</option>

                </select>
                <label htmlFor='movieLauguage' className='mt-3'>Movie Type:</label>
                <select
                id='movieLauguage'
                onChange={(e) => setMovieLauguage(e.target.value)}
                className='p-2 bg-slate-100 border rounded'
                required
                >
                  <option>Select Movie Lauguage</option>
                  <option>Sinhala</option>
                  <option>English</option>
                  <option>Tamil</option>
                  <option>Thelingu</option>

                </select>
                <label htmlFor='date' className='mt-3'>Date:</label>
                <input
                type='date'
                id='date'
                placeholder='Enter Movie Date'
                name='date'
                onChange={(e) => setDate(e.target.value)}
                className='p-2 bg-slate-100 border rounded'
                required
                />
                <label htmlFor='time' className='mt-3'>Time:</label>
                <input
                type='time'
                id='time'
                placeholder='Enter Movie Time'
                name='time'
                onChange={(e) => setTime(e.target.value)}
                className='p-2 bg-slate-100 border rounded'
                required
                />
                
                <label htmlFor='qualityType' className='mt-3'>Quality Type:</label>
                    <div className='flex mt-3 p-2 border rounded justify-center'>
                        <input type='radio' name='quality' value="2D" onChange={e=>setQualityType(e.target.value)}/>2D
                        <input type='radio' name='quality' value="3D" onChange={e=>setQualityType(e.target.value)}className='ml-10'/>3D
                        <input type='radio' name='quality' value="IMAX" onChange={e=>setQualityType(e.target.value)}className='ml-10'/>IMAX
                    </div>
                <label htmlFor='movieTrailerUrl' className='mt-3'>Movie Trailer:</label>
                <input
                type='text'
                id='movieTrailerUrl'
                placeholder='Movie Trailer'
                name='movieTrailerUrl'
                onChange={(e) => setMovieTrailerUrl(e.target.value)}
                className='p-2 bg-slate-100 border rounded'
                required
                />
                <button className='flex bg-indigo-600 text-white text-sm leading-6 font-medium py-2 px-3 rounded-md hover:bg-red-500 mb-8 mt-3 justify-center'>Upload</button>
            </form>
      </div>

      {openFullScreenImage && (
        <DisplayImg onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
      )}
    </div>
  );
}

export default EditMovies;
