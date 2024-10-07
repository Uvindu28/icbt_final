import React, { useState, useEffect } from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdEdit, MdDelete } from "react-icons/md";
import UploadFood from "../components/UploadFoods";
import axios from 'axios';

const Food = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [Foods, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/auth/foods');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDeleteClick = async (FoodId) => {
    try {
      await axios.delete(`http://localhost:8080/auth/foods/${FoodId}`);
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className='h-[100vh] overflow-y-scroll py-4 px-2'>
      <div className='bg-gradient-to-tr from-roseee to-red py-2 text-black px-4 flex justify-between   font-Poppins items-center '>
        <h2 className='font-semibold text-white text-lg'>Stock Inventory</h2>
        <button
          className='border-2 py-1 px-3  rounded-full flex items-center bg-red font-semibold text-white '
          onClick={() => setOpenUploadProduct(true)}
        >
          <IoIosAddCircleOutline className='mr-2' /> Add New Product
        </button>
      </div>
      {openUploadProduct && (
        <UploadFood onClose={() => setOpenUploadProduct(false)} onUploadSuccess={fetchProducts} />
      )}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4'>
        {Foods.map(food => (
          <div key={food.id} className='bg-white border-2 border-brown p-4 rounded text-center shadow-lg'>
            <h3 className='font-bold text-lg'>{food.foodName}</h3>
            <p className='text-sm text-gray_black'>Category: {food.foodCategory}</p>
            <p className='text-sm text-gray_black'>Price: Rs. {food.foodPrice}</p>
            <div className='flex justify-center mt-2'>
              {food.foodImgUrl && food.foodImgUrl.map((url, index) => (
                <img key={index} src={url} alt={`Product ${index}`} className='w-24 h-24 object-cover rounded-lg' />
              ))}
            </div>
            <div className='text-center mt-3 space-x-4'>
              <button className='bg-blue p-2 rounded-full cursor-pointer text-white'>
                <MdEdit />
              </button>
              <button
                className='bg-red p-2 rounded-full cursor-pointer text-white'
                onClick={() => handleDeleteClick(food.id)}
              >
                <MdDelete />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Food;
