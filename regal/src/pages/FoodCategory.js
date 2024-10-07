import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import { IoIosAddCircleOutline } from "react-icons/io";
import UploadFoodCategory from '../components/UploadFoodCategory';

const FoodCategory = () => {
  const [foodCategories, setFoodCategories] = useState([]);
  const [openUploadCategory,setOpenUploadCategory] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/auth/foodCategory');
        setFoodCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);

  const deleteFoodCategory = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:8080/auth/foodCategory/${categoryId}`);
      setFoodCategories((prevCategories) => prevCategories.filter(category => category.categoryId !== categoryId));
      toast.success("Category deleted successfully!");
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error("Failed to delete category.");
    }
  };

  return (
    <div>
      <div className='bg-light_yellow py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>Food Category List</h2>
        <button className='border-2 py-1 px-3 rounded-full flex items-center bg-red border-red font-semibold text-white  ' onClick={()=>setOpenUploadCategory(true)}>
          <IoIosAddCircleOutline className='mr-2' /> Add New Category</button>
      </div>
      {
       openUploadCategory && (

        <UploadFoodCategory onClose={() => setOpenUploadCategory(false)}/>

        )
      }

      <table className='w-full bg-light_yellow border-2  categoryTabletwo mt-2 text-center'>
        <thead>
          <tr className='bg-black text-white'>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {foodCategories && foodCategories.map((foodCategory) => (
            <tr key={foodCategory.id}>
              <td>{foodCategory.id}</td>
              <td>{foodCategory.foodCategory}</td>
              <td className='categoryAction'>
                <button
                  className=' p-2 rounded-full text-red '
                  onClick={() => deleteFoodCategory(foodCategory.categoryId)}
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodCategory;
