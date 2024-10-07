import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaYoutube } from "react-icons/fa";
import { BsTicketPerforatedFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa6";
import axios from 'axios';
import Header from './Header';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
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
    navigate(`/buytickets/${id}`);
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <section className="relative top-[-1] bg-cover bg-center min-h-[100vh]">
        <Header/>
            {movie.movieImgUrl && Array.isArray(movie.movieImgUrl) ? (
                movie.movieImgUrl.map((url, index) => (
                    <div key={index} className="relative top-[-1] bg-cover bg-center min-h-[100vh]" 
                         style={{ backgroundImage: `url(${url})` }}>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#000000fd] via-[#3c0a0a54] to-[#2b0000ea] animate-gradient"></div>
                        <div className="relative container mx-auto p-6 min-h-screen flex items-center text-white">
                            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 pl-44 pt-32">
                                <div className="flex flex-col items-center text-center gap-5 lg:items-start lg:text-left lg:max-w-[450px]">
                                    <span className="text-[18px] font-bold">Now Showing</span>
                                    <h1 className="text-5xl lg:text-7xl font-bold">
                                        {movie.movieName}
                                    </h1>
                                    <div className="flex items-center gap-2">
                                        <p className="text-lg text-gray-300 max-w-2xl">
                                            {movie.watchH}
                                        </p>
                                        <span className="pl-4">IMDB ratings</span>
                                        <span className="text-yellow-400"><FaStar /></span>
                                        <p> {movie.Rating}</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex items-center gap-10">
                                            <div className="group relative">
                                                <span className="flex justify-center items-center text-5xl hover:text-yellow-400 transition-all duration-300 group-hover:scale-110 ease-in-out cursor-pointer">
                                                <a href={movie.movieTrailerUrl}><FaYoutube /></a>
                                                </span>
                                                <span className="mt-2 text-[16px] flex group-hover:text-white transition-all duration-300"> Watch Trailer</span>
                                                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                                            </div>
                                            <div className="group relative">
                                                <span className="flex justify-center items-center text-5xl hover:text-yellow-400 transition-all duration-300 group-hover:scale-110 ease-in-out cursor-pointer" >
                                                    <BsTicketPerforatedFill onClick={() => handelViewDetails(movie.id)}/>
                                                </span>
                                                <span className="mt-2 text-[16px] flex group-hover:text-white transition-all duration-300">Buy Tickets</span>
                                                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="relative top-[-1] bg-cover bg-center min-h-[100vh]" 
                     style={{ backgroundImage: `url(${movie.backgroundImage})` }}>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#000000fd] via-[#3c0a0a54] to-[#2b0000ea] animate-gradient"></div>
                    <div className="relative container mx-auto p-6 min-h-screen flex items-center text-white">
                        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 pl-44 pt-32">
                            <div className="flex flex-col items-center text-center gap-5 lg:items-start lg:text-left lg:max-w-[450px]">
                                <span className="text-[18px] font-bold">Now Showing</span>
                                <h1 className="text-5xl lg:text-7xl font-bold">
                                    {movie.title}
                                </h1>
                                <div className="flex items-center gap-2">
                                    <p className="text-lg text-gray-300 max-w-2xl">
                                        {movie.watchH}
                                    </p>
                                    <span className="pl-4">IMDB ratings</span>
                                    <span className="text-yellow-400"><FaStar /></span>
                                    <p> {movie.Rating}</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-10">
                                        <div className="group relative">
                                            <span className="flex justify-center items-center text-5xl hover:text-yellow-400 transition-all duration-300 group-hover:scale-110 ease-in-out cursor-pointer">
                                                <FaYoutube />
                                            </span>
                                            <span className="mt-2 text-[16px] flex group-hover:text-white transition-all duration-300"> Watch Trailer</span>
                                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                                        </div>
                                        <div className="group relative">
                                            <span className="flex justify-center items-center text-5xl hover:text-yellow-400 transition-all duration-300 group-hover:scale-110 ease-in-out cursor-pointer">
                                                <BsTicketPerforatedFill onClick={() => handelViewDetails(movie.id)}/>
                                            </span>
                                            <span className="mt-2 text-[16px] flex group-hover:text-white transition-all duration-300">Buy Tickets</span>
                                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
  );
}

export default MovieDetail;
