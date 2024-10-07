import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { MdCloudUpload } from "react-icons/md";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import UploadImg from '../helpers/UploadImg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadMovies = ({onClose}) => {
    const [movieName, setMovieName] = useState("");
    const [moviePrice, setMoviePrice] = useState("");
    const [movieType, setMovieType] = useState("");
    const [moviedates, setDate] = useState("");
    const [time, setTime] = useState("");
    const [movieImg, setMovieImg] = useState("");
    const [movieTrailerUrl, setMovieTrailerUrl] = useState("");
    const [qualityType, setQualityType] = useState("");
    const [movieLauguage, setMovieLauguage] = useState("");
    const [selectedMovieDates, setSelectedMovieDates] = useState("");
    const [selectedSecondMovieDates, setSelectedSecondMovieDates] = useState("");
    const [selectedThirdMovieDates, setSelectedThirdMovieDates] = useState("");
    const [message, setMessage] = useState("");
    const [uploadmovieimageinput, setuploadmovieimageinput] = useState('');
    const [fullScreenImage, setFullScreenImage] = useState("");
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
    
    useEffect(() => {
        axios.get('http://localhost:8080/auth/mdates')
          .then(response => {
            setDate(response.data);
          })
          .catch(error => {
            console.error('Error fetching categories:', error);
          });
      }, []);
  

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            movieName,
            moviePrice,
            movieType,
            movieDates: selectedMovieDates,
            movieSecondDate: selectedSecondMovieDates,
            movieThirdDate: selectedThirdMovieDates,
            time,
            qualityType,
            movieImgUrl: movieImg, 
            movieTrailerUrl,
            movieLauguage,
        };
        axios.post("http://localhost:8080/auth/movies", data)
            .then(response => {
                console.log(response.data);
                toast.success("Product created successfully!");
                setMovieName("");
                setMoviePrice("");
                setMovieType("");
                setSelectedMovieDates("");
                setSelectedSecondMovieDates("");
                setSelectedThirdMovieDates("");
                setTime("");
                setQualityType("");
                setMovieImg([]);
                setMovieTrailerUrl("");
                setMovieLauguage("");
                onClose();

            })
                .catch(error => {
                    console.error(error);
                    toast.error("Failed to create product.")
                });
    };


    const UploadMovies = async (e) => {
        const file = e.target.files[0];
        setuploadmovieimageinput(file.name);
        console.log("file", file);
      
        const uploadImageCloudinary = await UploadImg(file);
        const newMovieImage = [...movieImg, uploadImageCloudinary.url]; // Create a new array with the new image URL
        setMovieImg(newMovieImage);
        console.log("upload image", uploadImageCloudinary.url);
        
      };

      const handleDeleteMovieImage = (index) => {
        const newMovieImage = [...movieImg];
        newMovieImage.splice(index, 1);
        setMovieImg(newMovieImage);
      };


  return (
    <div className='fixed bg-black bg-opacity-50 w-full top-0 left-0 right-0 bottom-0 flex  justify-center items-center'>
        <div className='border-2 border-red bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
            <div className='felx justify-between items-center pb-3'>
                <h2 className='font-bold text-lg ml-3'>Upload Movies</h2>
                <div className='w-fit ml-auto text-2xl  ' onClick={onClose}>
                    <RxCross2 />
                </div>
            </div>
            <form className=' grid p-4 gap-2 overflow-scroll h-full' onSubmit={handleSubmit}>
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
                    <input type='file' id='uploadImg' name='movieImg' required onChange={UploadMovies}/>
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
                    <option>Action</option>
                    <option>Horror</option>
                    <option>Animation</option>
                    <option>Drama</option>
                    <option>Documentry</option>

                </select>
                <label htmlFor='movieLauguage' className='mt-3'>Movie Language</label>
                <select
                id='movieLauguage'
                onChange={(e) => setMovieLauguage(e.target.value)}
                className='p-2 bg-slate-100 border rounded'
                required
                >
                    <option>Select Language</option>
                    <option>Sinhala</option>
                    <option>English</option>
                    <option>Tamil</option>
                    <option>Hindi</option>
                    <option>Thelingu</option>

                </select>
                <label htmlFor='movieDates' className='mt-3'>Date:</label>
                <select
                    id='movieDates'
                    value={selectedMovieDates}
                    onChange={(e) => setSelectedMovieDates(e.target.value)}
                    className='p-2 bg-slate-100 border rounded'
                    required
                >
                    <option value=''>Select Date</option>
                    {Array.isArray(moviedates) && moviedates.length > 0 ? (
                        moviedates.map((movieDate) => (
                            <option key={movieDate.mdate_id} value={movieDate.movieDates}>
                                {movieDate.movieDates}
                            </option>
                        ))
                    ) : (
                        <option disabled>No dates available</option>
                    )}
                </select>
                <label htmlFor='movieSecondDate' className='mt-3'>Second Date:</label>
                <select
                    id='movieSecondDate'
                    value={selectedSecondMovieDates}
                    onChange={(e) => setSelectedSecondMovieDates(e.target.value)}
                    className='p-2 bg-slate-100 border rounded'
                    required
                >
                    <option value=''>Select Second Date</option>
                    {Array.isArray(moviedates) && moviedates.length > 0 ? (
                        moviedates.map((movieDate) => (
                            <option key={movieDate.mdate_id} value={movieDate.movieDates}>
                                {movieDate.movieDates}
                            </option>
                        ))
                    ) : (
                        <option disabled>No dates available</option>
                    )}
                </select>
                <label htmlFor='movieThirdDate' className='mt-3'>Third Date:</label>
                <select
                    id='movieThirdDate'
                    value={selectedThirdMovieDates}
                    onChange={(e) => setSelectedThirdMovieDates(e.target.value)}
                    className='p-2 bg-slate-100 border rounded'
                    required
                >
                    <option value=''>Select Third Date</option>
                    {Array.isArray(moviedates) && moviedates.length > 0 ? (
                        moviedates.map((movieDate) => (
                            <option key={movieDate.mdate_id} value={movieDate.movieDates}>
                                {movieDate.movieDates}
                            </option>
                        ))
                    ) : (
                        <option disabled>No dates available</option>
                    )}
                </select>

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
                <label htmlFor='movieTrailerUrl' className='mt-3 '>Movie Trailer:</label>
                <input
                type='text'
                id='movieTrailerUrl'
                placeholder='Movie Trailer'
                name='movieTrailerUrl'
                onChange={(e) => setMovieTrailerUrl(e.target.value)}
                className='p-2 bg-slate-100 border rounded'
                required
                />
                <button className='flex bg-redee_light text-white text-sm leading-6 font-medium py-2 px-3 rounded-md  mb-8 mt-3 justify-center'>Upload</button>
            </form>
        </div>
    </div>
  )
}

export default UploadMovies;