import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IoMdClose } from "react-icons/io";

const UploadMDates = ({ onClose }) => {
    const [MDates, setMovieDates] = useState("");


    const handleMDates = (event) => {
        setMovieDates(event.target.value);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            movieDates: MDates,
        };

        axios.post("http://localhost:8080/auth/mdates", data)
            .then(function (response) {
                toast.success('Dates added successfully!');
                setMovieDates("");
            })
            .catch(function (error) {
                console.error('Error adding dates:', error);
                toast.error('Failed to add dates.');
            })
    }

    return (
        <div className='fixed bg-black bg-opacity-50 w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[50%]'>
                <div className='flex justify-between items-center'>
                    <h2 className='font-bold text-lg'>Add Dates</h2>
                    <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                        <IoMdClose />
                    </div>
                </div>
                <form onSubmit={handleSubmit} className='grid p-4 gap-2'>
                    <label htmlFor='movieDates'>Movie Date:</label>
                    <input
                        type='text'
                        id='movieDates'
                        placeholder='Enter Date'
                        value={MDates}
                        onChange={handleMDates}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />
                    <button type='submit' className='bg-red text-white px-6 py-2  w-full max-w-[150px] rounded-full  mx-auto block mt-6'>
                        Add
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UploadMDates;
