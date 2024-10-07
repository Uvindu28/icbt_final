import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

function Shop() {
  const [cartItems, setCartItems] = useState({
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0,
  });

  const addtoCart = (id) => {
    setCartItems(cartItems => ({ ...cartItems, [id]: cartItems[id] + 1 }));
  };

  const subFromCart = (id) => {
    setCartItems(cartItems => ({ ...cartItems, [id]: Math.max(cartItems[id] - 1, 0) }));
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems => ({ ...cartItems, [id]: 0 }));
  };

  const totalAmount = () => {
    let amount = 0;
    for (const key in cartItems) {
      if (cartItems[key] > 0) {
        let foodInfo = allfoods.find(food => food.id === Number(key));
        if (foodInfo) {
          amount += Math.floor(cartItems[key] * foodInfo.foodPrice);
        }
      }
    }
    return amount;
  };

  const location = useLocation();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [foods, setFoods] = useState([]);
  const [allfoods, setAllFoods] = useState([]);
  const navigate = useNavigate();
  const { totalPrice, selectedSeats, selectedMovieDate } = location.state || {};

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
    const fetchFood = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/auth/d${id}`);
        setFoods(response.data);
      } catch (error) {
        console.error('Error fetching all foods:', error);
      }
    };
    fetchFood();
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

  const handlePay = () => {
    navigate(`/login/${id}`, {
      state: {
        totalPrice: totalPrice + totalAmount(),
        seats: selectedSeats,
        seatprice: totalPrice,
        selectedMovieDate,
        foodItems: Object.keys(cartItems)
          .filter((key) => cartItems[key] > 0)
          .map((key) => {
            const foodInfo = allfoods.find((food) => food.id === Number(key));
            return {
              foodName: foodInfo.foodName,
              quantity: cartItems[key],
              price: foodInfo.foodPrice,
            };
          }),
      },
    });
  };

  if (!movie) {
    return <div>Loading movie...</div>;
  }

  if (!allfoods) {
    return <div>Loading food options...</div>;
  }

  return (
    <div>
    <Header/>
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-gray-800 my-8 relative top-4 right-[494px]">{movie.movieName} | {movie.time}</h1>

        {/* Food items list */}
        <div className="flex flex-col gap-4 w-full px-4">
          {allfoods.map(food => (
            <div key={food.id} className="flex items-center justify-between w-[650px] relative top-8 bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">
              <div className="flex items-center">
                <img className="w-16 h-16 object-cover rounded-lg" src={food.foodImgUrl} alt={food.foodName} />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">{food.foodName}</h3>
                  <p className="text-md text-gray-600">Rs. {food.foodPrice}</p>
                </div>
              </div>
              <button 
                onClick={() => addtoCart(food.id)} 
                className="bg-red-600 text-white py-1 px-4 rounded-lg hover:bg-red-800 transition duration-300 ease-in-out">
                Add to Cart
              </button>
            </div>
          ))}

          {/* Cart */}
          <div className="fixed p-4 right-0 top-0 bg-gradient-to-r from-[#fbfbfb] via-[#770e0e58] to-[#a10707] animate-gradient text-white h-full w-[790px] shadow-xl rounded-l-lg overflow-y-auto">
  <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
 
  {allfoods.map(food => {
    if (cartItems[food.id] > 0) {
      return (
        <div key={food.id} className="flex justify-between items-center w-96 top-12 relative bg-white text-black p-2 mb-2 rounded-lg shadow-md">
          <div className="flex items-center">
            <img className="w-12 h-12 object-cover rounded-lg" src={food.foodImgUrl} alt={food.foodName} />
            <div className="ml-4">
              <p className="font-bold">{food.foodName}</p>
              <p className="text-md">Rs. {food.foodPrice}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={() => subFromCart(food.id)} className="text-xl text-blue-700">-</button>
            <span className="text-lg font-bold">{cartItems[food.id]}</span>
            <button onClick={() => addtoCart(food.id)} className="text-xl text-blue-700">+</button>
            <button onClick={() => removeFromCart(food.id)} className='text-white bg-red-600 p-2 rounded'>Remove</button>
          </div>
        </div>
      );
    }
    return null;
  })}
</div>
        </div>
      </div>
      {/* Booked Seat, total seat price name, time box */}
       <div className="fixed top-20 right-3 m-1 bg-white rounded-lg shadow-lg p-6 w-80">
        <h1 className="text-2xl font-bold text-gray-800">{movie.movieName}</h1>
        <p className="text-md text-gray-600 mb-4">{movie.time}</p>
        <p className="text-md text-gray-600 mb-4">{selectedMovieDate}</p>
        <h2 className="text-lg font-semibold mb-2">Your Seats are:</h2>
        <div className="flex flex-wrap gap-2">
          {selectedSeats && selectedSeats.length > 0 ? (
            selectedSeats.map((seat, index) => (
              <div
                key={index}
                className="w-10 h-10 rounded-md m-1 text-lg font-medium bg-red-600 text-white flex items-center justify-center border border-white shadow-md transform transition duration-200 hover:scale-105"
              >
                {seat}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No seats selected.</p>
          )}
        </div>
        <p>
        <h2 className="text-lg font-bold  mt-6">Your Foods:</h2>
         {Object.keys(cartItems).map((key) => {
         if (cartItems[key] > 0) {
        const foodInfo = allfoods.find((food) => food.id === Number(key));
        return (
        <span className='font-semibold' key={key}>
          {foodInfo.foodName} ({cartItems[key]})<br />
        </span>
      );
      }
       return null;
       })}
       </p>

        {totalPrice ? (
         <div className="mt-4 border-t pt-4">
       
         <h1 className="text-xl font-extrabold text-gray-800 mb-4">Total Price</h1>
         <h1 className="text-3xl font-bold text-red-600 mb-2">{totalPrice + totalAmount()}</h1> {/* Added margin-bottom */}
         
         <span className="text-sm text-gray-500">(Includes all taxes)</span>
         <button className="flex items-center justify-center gap-2 relative top-3 bg-red-700 text-white text-lg font-semibold py-3 px-6
          rounded-lg shadow-lg hover:bg-red-900 transition duration-300 ease-in-out" onClick={() => handlePay(movie.id)}>Pay Now</button>
       </div>
        ) : (
          <p className="text-gray-500 mt-4">No price available.</p>
        )}
      </div> 
    </div>
    </div>
      
  );
}

export default Shop;
