import React, { useEffect, useState } from 'react'
import { FaYoutube } from "react-icons/fa";
import {Slide, Fade} from "react-awesome-reveal";
import axios from 'axios';

function CommingMovie() {
    const [umovies, setumovies] = useState([]);

    useEffect(() => {
        fetchumovies();
      }, []);
  
  
      const fetchumovies = async () => {
        try {
          const response = await axios.get("http://localhost:8080/auth/umovies");
          setumovies(response.data);
        } catch (error) {
          console.error('Error fetching Movies', error);
        }
      };

  return (
    <section className='min-h-screen bg-white place-items-center'>

    <div className='container mx-auto'>
    <h2 data-aos="fade-up" data-aos-delay="100" className="text-5xl font-bold font-lato  flex items-center justify-center text-gray-800 relative top-12">Comming Soon</h2>

        <div data-aos="fade-up" data-aos-delay="200" className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 place-items-center gap-6'>
            {umovies.map(umovie => {
                return(
                    <div key={umovie.id} className='text-white shadow-md rounded-lg overflow-hidden top-32 relative group'> 
                    {umovie.umovieImgUrl && umovie.umovieImgUrl.map((url, index) => (
                       <img  key={index} src={url} alt={`Product ${index}`} className="w-[250px] h-[335px] rounded-lg  object-cover"/>
                    ))}
                        <div className='absolute left-0 top-[-100%] opacity-0 group-hover:opacity-100 group-hover:top-[0] p-4 w-full h-full bg-black/60 group-hover:backdrop-blur-sm duration-500'>
                            <div>
                                <Slide cascade>
                                <h1 className=' text-3xl font-bold flex justify-center items-center relative top-28'>{umovie.umovieName}</h1>
                                <Fade cascade damping={0.05}>
                                    <h6 className=' flex justify-center items-center relative top-28'>{umovie.ucomingDate}</h6>
                                </Fade>
                                <div className="flex flex-col items-center relative top-32 group">
                                <a href={umovie.umovieTrailerUrl}><FaYoutube className='flex justify-center items-center text-4xl
                                 hover:text-red-700 transition-all duration-300 group-hover:scale-110  ease-in-out cursor-pointer'/></a>
                                <span className='mt-2 text-[16px] group-hover:text-white transition-all duration-300'>Watch Trailer</span></div>
                                </Slide>
                                
                            </div>
                            </div>
                        </div>
                );
            })}

        </div>
    </div>

    </section>
  )
}

export default CommingMovie;