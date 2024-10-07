import React, { useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { MdCloudUpload } from "react-icons/md";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import UploadImg from '../helpers/UploadImg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadMovies = ({onClose}) => {
    const [umovieName, setumovieName] = useState("");
    const [ucomingDate, setucomingDate] = useState("");
    const [umovieImg, setumovieImg] = useState("");
    const [umovieTrailerUrl, setumovieTrailerUrl] = useState("");
    const [message, setMessage] = useState("");
    const [uploadmovieimageinput, setuploadmovieimageinput] = useState('');
    const [fullScreenImage, setFullScreenImage] = useState("");
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            umovieName,
            ucomingDate,
            umovieImgUrl: umovieImg, 
            umovieTrailerUrl
        };
        axios.post("http://localhost:8080/auth/umovies", data)
            .then(response => {
                console.log(response.data);
                toast.success("Movie Added successfully!");
                setumovieName("");
                setucomingDate("");
                setumovieImg([]);
                setumovieTrailerUrl("");
                onClose();

            })
                .catch(error => {
                    console.error(error);
                    toast.error("Failed to Add movie.")
                });
    };


    const UploadMovies = async (e) => {
        const file = e.target.files[0];
        setuploadmovieimageinput(file.name);
        console.log("file", file);
      
        const uploadImageCloudinary = await UploadImg(file);
        const newMovieImage = [...umovieImg, uploadImageCloudinary.url]; // Create a new array with the new image URL
        setumovieImg(newMovieImage);
        console.log("upload image", uploadImageCloudinary.url);
        
      };

      const handleDeleteMovieImage = (index) => {
        const newMovieImage = [...umovieImg];
        newMovieImage.splice(index, 1);
        setumovieImg(newMovieImage);
      };


  return (
    <div className='fixed bg-black bg-opacity-50 w-full top-0 left-0 right-0 bottom-0 flex  justify-center items-center'>
        <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
            <div className='felx justify-between items-center pb-3'>
                <h2 className='font-bold text-lg ml-3'>Upload Movies</h2>
                <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                    <RxCross2 />
                </div>
            </div>
            <form className='grid p-4 gap-2 overflow-scroll h-full' onSubmit={handleSubmit}>
                <label htmlFor='umovieName'>Movie Name:</label>
                <input
                type='text'
                id='umovieName'
                placeholder='Enter Movie Name'
                name='umovieName'
                onChange={(e) => setumovieName(e.target.value)}
                className='p-2 bg-slate-100 border rounded'
                required
                />
                <label htmlFor='ucomingDate'>Upcoming Date:</label>
                <input
                type='text'
                id='ucomingDate'
                placeholder='Enter Upcoming Date'
                name='ucomingDate'
                onChange={(e) => setucomingDate(e.target.value)}
                className='p-2 bg-slate-100 border rounded'
                required
                />
                <label htmlFor='umovieImg' className='mt-3'>Image:</label>
                <div className='p-2 bg-slate-100 border rounded h-48 w-full flex justify-center text-center cursor-pointer'>
                    <div className='text-slate-500 flex justify-center items-center flex-col'>
                    <span className='text-5xl'><MdCloudUpload /></span>
                    <p>Upload Movie Image</p>
                    <input type='file' id='uploadImg' name='umovieImg' required onChange={UploadMovies}/>
                    </div>
                </div>
                <div>
                        {umovieImg.length > 0 ? (
                        <div className='flex items-center gap-2'>
                            {umovieImg.map((el, index) => (
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
                <label htmlFor='umovieTrailerUrl' className='mt-3'>Movie Trailer:</label>
                <input
                type='text'
                id='umovieTrailerUrl'
                placeholder='Movie Trailer'
                name='umovieTrailerUrl'
                onChange={(e) => setumovieTrailerUrl(e.target.value)}
                className='p-2 bg-slate-100 border rounded'
                required
                />
                <button className='flex bg-red text-white text-sm leading-6 font-medium py-2 px-3 rounded-md hover:bg-red-500 mb-8 mt-3 justify-center'>Upload</button>
            </form>
        </div>
    </div>
  )
}

export default UploadMovies;