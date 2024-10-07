import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ImCalendar } from "react-icons/im";
import { FcNext } from "react-icons/fc";
import icn from "../assets/images/td.png";
import icn2 from "../assets/images/dolby.png";
import icn3 from "../assets/images/imx.png";
import axios from 'axios';
import Header from './Header';

function BuyTickets() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [selectedMovieDate, setSelectedMovieDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/auth/d${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };
    fetchMovie();
  }, [id]);

  const handelViewDetails = (id) => {
    navigate(`/seatbooking/${id}`, {
      state: {
        selectedMovieDate
      }
    });
    
  };


  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header/>
    <section className="min-h-screen bg-gradient-to-r from-[#fbfbfb] via-[#770e0e58] to-[#a10707] animate-gradient flex items-center justify-between px-12 py-6">
      <div className="flex flex-col space-y-6 w-1/2 relative bottom-20">
        <h1 className="text-5xl font-bold text-gray-800">{movie.movieName}</h1>

        <hr className="border-gray-500 border-t-2 w-full" />
        <div className="flex gap-4">
          <ImCalendar className="text-[24px] mt-6" />
          <div className='flex mt-3 p-2 border-2 border-red-500 rounded justify-center font-semibold font-poppins'>
            <input type='radio' name='date' value={movie.movieDates} onChange={e=>setSelectedMovieDate(e.target.value)} required/>{movie.movieDates}
            <input type='radio' name='date' value={movie.movieSecondDate} onChange={e=>setSelectedMovieDate(e.target.value)}className='ml-10' required/>{movie.movieSecondDate}
            <input type='radio' name='date' value={movie.movieThirdDate} onChange={e=>setSelectedMovieDate(e.target.value)}className='ml-10' required/>{movie.movieThirdDate}
          </div>
        </div>

        <hr className="border-gray-500 border-t-2 w-full" />

        <h2 className="text-2xl text-gray-600">{movie.time}</h2>

        <hr className="border-gray-500 border-t-2 w-full" />

        <div className="flex gap-12">
          <img className="w-20 h-20" src={icn} alt="" />
          <img className="w-32 h-32 relative bottom-5" src={icn2} alt="" />
          <img className="w-32 h-32 relative bottom-5" src={icn3} alt="" />
        </div>

        <div
          className="flex gap-3 items-center px-4 py-2 text-red-800 relative cursor-pointer group ml-auto"
          onClick={() => handelViewDetails(movie.id)}
        >
          {/* <span className="font-semibold text-2xl">
            Continue
            <FcNext className="text-2xl transform transition-transform duration-300 group-hover:scale-125 group-hover:translate-x-2" />
          </span> */}
          <button className="flex items-center justify-center gap-2 relative top-3 bg-red-700 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-red-900 transition duration-300 ease-in-out" >Continue</button>
        </div>
      </div>

      {movie.movieImgUrl && (
        <div className="w-1/2 flex justify-end">
          <img
            className="w-[460px] h-[560px] object-cover rounded-xl shadow-lg"
            src={movie.movieImgUrl}
            alt={`${movie.movieName} background`}
          />
        </div>
      )}
    </section>
    </div>
  );
}

export default BuyTickets;
