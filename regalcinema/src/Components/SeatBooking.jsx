import { useEffect, useState } from 'react';
import { MdOutlineChair, MdArrowForward } from 'react-icons/md';
import { CgHomeScreen } from "react-icons/cg";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

function SeatBooking({ seatNumber, isSelected, isBooked, onClick }) {
  return (
    <MdOutlineChair
      className={`text-3xl -rotate-90 cursor-pointer relative bottom-16 transition-transform duration-300 ease-in-out 
      ${isSelected ? 'text-indigo-600' : isBooked ? 'text-red-600' : 'text-gray-700 hover:text-indigo-500'}`}
      onClick={onClick}
    />
  );
}

const MovieSeatLayout = () => {
  const totalSeat = 80;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]); // Add a state to store booked seats
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const { selectedMovieDate } = location.state || {};

  
  const totalPrice = selectedSeats.length * (movie ? movie.moviePrice : 0); // Correct total price calculation
  
  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/auth/i${id}`);
        const bookedSeats = response.data.seatNumbers.map((seat) => seat.sn);
        setBookedSeats(bookedSeats);
      } catch (error) {
        console.error('Error fetching booked seats:', error);
      }
    };
    fetchBookedSeats();
  }, [id]);

  useEffect(() => { const fetchMovie = async () => { 
    try { 
      const response = await axios.get(`http://localhost:8080/auth/d${id}`); 
          setMovie(response.data); 
        } catch (error) { 
          console.error('Error fetching movie details:', error); 
        } }; 
        fetchMovie(); 
        }, [id]);

  const navigate = useNavigate();
  const handelViewDetails = () => {
    navigate(`/shop/${id}`, {
      state: {
        totalPrice,
        selectedSeats,
        selectedMovieDate
      }
    });
  };
 
  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      if (selectedSeats.length < 10) {
        setSelectedSeats([...selectedSeats, seatNumber]);
      } else {
        alert("You can only select a maximum of 10 seats.");
      }
    }
  };

  const renderSeats = () => {
    let seats = [];
    for (let i = 1; i <= totalSeat; i++) {
      const isBooked = bookedSeats.includes(i.toString()); // Check if the seat is booked
      seats.push(
        <SeatBooking
          key={i}
          seatNumber={i}
          isSelected={selectedSeats.includes(i)}
          isBooked={isBooked} // Pass the booked status to the SeatBooking component
          onClick={() => handleSeatClick(i)}
        />
      );
    }
    return seats;
  };


  if (!movie) {
    return <div>Loading...</div>;
  }

  if (!selectedSeats) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header/>
    <div className='min-h-screen bg-gradient-to-r from-purple-100 to-red-200 p-12'>
      <h2 className='text-5xl font-bold text-red-700 text-center mb-10 relative right-[490px] bottom-5'>
        Choose Your Seat
      </h2>
      <div className='flex justify-center gap-6 mb-8 relative bottom-24 left-[440px]'>
        <span className='text-2xl font-bold text-gray-700'>{movie.movieName}</span>
        <div className='border border-black -rotate-180 '/>
        <span className='text-2xl font-bold text-gray-700'>{movie.time}</span>
        <div className='border border-black -rotate-180 '/>
        <span className='text-2xl font-bold text-gray-700'>{selectedMovieDate}</span>
      </div>

      <div className='flex justify-between items-start space-x-10'>
        {/* Seat Layout */}
        <div className='flex-1 flex justify-center'>
          <div className='flex gap-6'>
            <div className='w-16 relative  bottom-14 h-full border-r-2 border-dashed border-gray-900 flex justify-center items-center'>
              <CgHomeScreen className='text-5xl text-yellow-500' />
            </div>
            <div className='grid grid-cols-8 gap-4'>
              {renderSeats()}
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div className='space-y-6'>
          <div className='flex items-center gap-x-2'>
            <MdOutlineChair className='text-3xl text-gray-700 -rotate-90' />
            <p className='text-sm text-gray-600'>Available</p>
          </div>
          <div className='flex items-center gap-x-2'>
            <MdOutlineChair className='text-3xl text-red-600 -rotate-90' />
            <p className='text-sm text-white bg-red-600 rounded px-2'>Booked</p>
          </div>
          <div className='flex items-center gap-x-2'>
            <MdOutlineChair className='text-3xl text-indigo-600 -rotate-90' />
            <p className='text-sm text-white bg-indigo-600 rounded px-2'>Selected</p>
          </div>
          <div className='flex items-center gap-x-2'>
            <RiMoneyDollarCircleFill className='text-3xl text-gray-600' />
            <p className='text-sm text-gray-600'>Rs.{movie.moviePrice}</p>
          </div>
        </div>

        {/* Selected Seats & Price */}
        {selectedSeats.length > 0 && (
          <div className='bg-white shadow-lg rounded-lg p-6 w-[430px] relative'>
            <h3 className='text-2xl font-semibold text-gray-800'>Selected Seats:</h3>
            <div className='flex flex-wrap mt-4'>
              {selectedSeats.map((seat) => (
                <div
                  key={seat}
                  className='w-10 h-10 rounded-md m-2 text-lg font-medium bg-red-600 text-white flex items-center justify-center border border-white shadow-md'>
                  {seat}
                </div>
              ))}
            </div>
            <h3 className='text-xl font-semibold text-gray-800 mt-6'>Total Price</h3>
            <p className='text-3xl font-bold text-indigo-600'>
              Rs. {selectedSeats.length * movie.moviePrice}
            </p>
            <span className='text-sm text-gray-500'>(Includes all taxes)</span>

          <button onClick={() => handelViewDetails(movie.id)} className="flex items-center justify-center gap-2 relative top-3 bg-red-700 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-red-900 transition duration-300 ease-in-out" >
             Continue <MdArrowForward className="text-2xl" /></button>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default MovieSeatLayout;
   