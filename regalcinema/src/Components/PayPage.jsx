import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../utility/AuthContext';
import Header from './Header';


function PayPage() {
  const location = useLocation();
  const { id } = useParams();
  const { isAuthenticated , jwtToken } = useAuth();
  const [movie, setMovie] = useState(null);
  const [movieName, setMovieName] = useState("");
  const [showTime, setShowTime] = useState("");
  const [date, setDate] = useState("");
  const [seatNumbers, setSeatNumbers] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [total, setTotal] = useState("");
  const [hName, sethNAme] = useState("");
  const [pc, setpc] = useState("");
  const [cn, setcn] = useState("");
  const [exp, setexp] = useState("");
  const [cvv, setcvv] = useState("");
  const [allfoods, setAllFoods] = useState([]);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { totalPrice, seats = [], foodItems = [], selectedMovieDate } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState('card');




  const config = {
    headers: {
      'Authorization': `Bearer ${jwtToken}`, 
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
  
    const data = {
      movie_id: movie.id,
      movieName: movie.movieName,
      showTime: movie.time,
      date: selectedMovieDate, 
      email,
      total: totalPrice,
      seatNumbers: seats.map(seat => ({
        sn: seat 
      })),
      foodItems: foodItems.map(food => ({
        fd: food.foodName,
        qu: food.quantity
      }))
    };
    
    console.log("Submitting data:", data); 
  
    try {
      const response = await axios.post("http://localhost:8080/auth/createbooking", data, config);
      console.log(response.data);
      toast.success("Payment successful!");
      
      setMovieName("");
      setShowTime("");
      setDate("");
      setTotal("");
      setEmail("");
      setSeatNumbers([]);
      setFoodItem([]);

      navigate(`/`, {
      });
      
    } catch (error) {
      console.error("Error during payment:", error); 
      toast.error("Payment unsuccessful!");
    }
  };

  const handleSendEmail = async () => {
    if (!email) {
      alert('Please enter a valid email address.');
      return;
    }

    const response = await fetch('http://localhost:8080/auth/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ to: email }),
    });

    if (response.ok) {
      alert('Email sent successfully!');
      setEmail(''); // Clear the input field after sending
    } else {
      alert('Failed to send email.');
    }
  };
  
  

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


  useEffect(() => {
    const fetchAllFood = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/auth/foods`);
        setAllFoods(response.data);
      } catch (error) {
        console.error('Error fetching all foods:', error);
      }
    };
    fetchAllFood();
  }, []);


  if (!movie) {
    return <div>Loading movie...</div>;
  }

  if (!allfoods) {
    return <div>Loading food options...</div>;
  }

  return (
    <div>
      <Header/>
    <div className="font-[sans-serif] bg-gradient-to-r from-[#2f1313] via-[#631313] to-[#a10707] animate-gradient lg:flex lg:items-center lg:justify-center lg:h-screen max-lg:py-4">
      <div className="bg-gray-300 p-8 w-full max-w-5xl max-lg:max-w-xl mx-auto rounded-md">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center">Checkout</h2>

        <div className="grid lg:grid-cols-3 gap-6 max-lg:gap-8 mt-16">
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold text-gray-800">Choose your payment method</h3>

            <div className="grid gap-4 sm:grid-cols-2 mt-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  className="w-5 h-5 cursor-pointer"
                  id="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                />
                <label htmlFor="card" className="ml-4 flex gap-2 cursor-pointer">
                  <img src="https://readymadeui.com/images/visa.webp" className="w-12" alt="card1" />
                  <img src="https://readymadeui.com/images/american-express.webp" className="w-12" alt="card2" />
                  <img src="https://readymadeui.com/images/master.webp" className="w-12" alt="card3" />
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  className="w-5 h-5 cursor-pointer"
                  id="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={() => setPaymentMethod('paypal')}
                />
                <label htmlFor="paypal" className="ml-4 flex gap-2 cursor-pointer">
                  <img src="https://readymadeui.com/images/paypal.webp" className="w-20" alt="paypalCard" />
                </label>
              </div>
            </div>

            <form className="mt-8" onSubmit={handleSubmit}>
              <div className="grid sm:col-span-2 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Name of card holder"
                    name='name'
                    onChange={(e) => sethNAme(e.target.value)}
                    className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Postal code"
                    name='postalCode'
                    onChange={(e) => setpc(e.target.value)}
                    className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Card number"
                    name='cardNumber'
                    onChange={(e) => setcn(e.target.value)}
                    className="col-span-full px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="EXP."
                    name='EXP'
                    onChange={(e) => setexp(e.target.value)}
                    className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="CVV"
                    name='CVV'
                    onChange={(e) => setcvv(e.target.value)}
                    className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    name='email'
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none"
                  />
                </div>
              </div>
                <button type="submit" className="px-7 py-3.5 text-sm tracking-wide bg-blue-600 text-white rounded-md hover:bg-blue-700 flex flex-wrap gap-4 mt-8" onClick={handleSendEmail}>
                  Pay
                </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-md max-lg:-order-1">
            <h3 className="text-lg font-bold text-gray-800">Receipt</h3>
            <ul className="text-gray-800 mt-6 space-y-3">
              <li className="flex flex-wrap gap-4 text-sm">Movie name <span className="ml-auto font-bold">{movie.movieName}</span></li>
              <li className="flex flex-wrap gap-4 text-sm">Show time <span className="ml-auto font-bold">{movie.time}</span></li>
              <li className="flex flex-wrap gap-4 text-sm">Date <span className="ml-auto font-bold">{selectedMovieDate}</span></li>
              <li className="flex flex-wrap gap-4 text-sm">Seat number <span className="ml-auto font-bold">{Array.isArray(seats) ? seats.join(', ') : seats}</span></li>
              <hr />

              <h2 className="flex flex-wrap gap-4 text-sm">Your Food Items:</h2>
              {foodItems && foodItems.length > 0 ? (
                foodItems.map((food, index) => (
                  <li key={index} className="flex flex-wrap gap-4 text-sm bg-white p-4 rounded-lg shadow-md mb-2">
                    <span>{food.foodName} x {food.quantity}</span>
                  </li>
                ))
              ) : (
                <li className="flex flex-wrap gap-4 text-sm">No food items selected</li>
              )}

              <li className="flex relative top-4 flex-wrap gap-4 text-base font-bold">Total <span className="ml-auto">Rs. {totalPrice}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default PayPage;
