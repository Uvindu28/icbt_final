import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoMdClose } from "react-icons/io";
import { FaCloudUploadAlt } from "react-icons/fa";
import UploadImg from '../helpers/UploadImg';
import { MdDelete } from "react-icons/md";
import DisplayImg from './DisplayImg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UploadFoods = ({ onClose, onUploadSuccess }) => {
    const [uploadproductimageinput, setuploadproductimageinput] = useState('');
    const [fullScreenImage, setFullScreenImage] = useState("");
    const [selectedfoodcategory, setSelectedFoodCategory] = useState("");
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
    const [foodcategory, setCategory] = useState([]);
    const [foodName, setProductName] = useState("");
    const [foodPrice, setPrice] = useState("");
    const [productImage, setProductImage] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:8080/auth/foodCategory')
        .then(response => {
          setCategory(response.data);
        })
        .catch(error => {
          console.error('Error fetching categories:', error);
        });
    }, []);

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      foodName,
      foodImgUrl: productImage,
      foodCategory: selectedfoodcategory,
      foodPrice


    };

    axios.post("http://localhost:8080/auth/foods", data)
      .then(response => {
        console.log(response.data);
        toast.success("Product created successfully!");
        setProductName("");
        setPrice("");
        setSelectedFoodCategory("");
        setProductImage([]);
        onUploadSuccess(); // Call the callback to fetch products again
        onClose(); // Close the modal
      })
      .catch(error => {
        console.error(error);
        toast.error("Failed to create product.");
      });

      
  };

  const UploadFoods = async (e) => {
    const file = e.target.files[0];
    setuploadproductimageinput(file.name);
    console.log("file", file);
  
    const uploadImageCloudinary = await UploadImg(file);
    const newProductImage = [...productImage, uploadImageCloudinary.url]; // Create a new array with the new image URL
    setProductImage(newProductImage);
    console.log("upload image", uploadImageCloudinary.url);
    
  };

  const handleDeleteProductImage = (index) => {
    const newProductImage = [...productImage];
    newProductImage.splice(index, 1);
    setProductImage(newProductImage);
  };

  return (
    <div className='fixed bg-gray_black bg-opacity-50 w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
      <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
        <div className='flex justify-between items-center pb-3'>
          <h2 className='font-bold text-lg ml-3'>Upload Product</h2>
          <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
            <IoMdClose />
          </div>
        </div>
        <form className='grid p-4 gap-2 overflow-scroll h-full' onSubmit={handleSubmit}>
          <label htmlFor='foodName'>Food Name:</label>
          <input
            type='text'
            id='foodName'
            placeholder='Enter Food Name'
            name='foodName'
            value={foodName}
            onChange={(e) => setProductName(e.target.value)}
            className='p-2 bg-slate-100 border rounded'
            required
          />
          <label htmlFor='foodCategory' className='mt-3'>Category:</label>
          <select
            id='foodCategory'
            value={selectedfoodcategory}
            onChange={(e) => setSelectedFoodCategory(e.target.value)}
            className='p-2 bg-slate-100 border rounded'
            required
          >
            <option value=''>Select Category</option>
            {foodcategory.map((foodCategory) => (
              <option key={foodCategory.id} value={foodCategory.foodCategory}>
                {foodCategory.foodCategory}
              </option>
            ))}
          </select>
          
          

          <label htmlFor='foodImage' className='mt-3'>Food Image:</label>
          <label htmlFor='UploadImg'>
            <div className='p-2 bg-slate-100 border rounded h-48 w-full flex justify-center text-center cursor-pointer'>
              <div className='text-slate-500 flex justify-center items-center flex-col'>
                <span className='text-5xl'><FaCloudUploadAlt /></span>
                <p>Upload food image</p>
                <input type='file' id='UploadImg'  onChange={UploadFoods} />
              </div>
            </div>
          </label>
          <div>
            {productImage.length > 0 ? (
              <div className='flex items-center gap-2'>
                {productImage.map((el, index) => (
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
                      onClick={() => handleDeleteProductImage(index)}
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
          <label htmlFor='foodPrice' className='mt-3'>Price:</label>
          <input
            type='number'
            id='foodPrice'
            placeholder='Enter price'
            name='foodPrice'
            value={foodPrice}
            onChange={(e) => setPrice(e.target.value)}
            className='p-2 bg-slate-100 border rounded'
            required
          />
          <button type='submit' className='px-3 py-2 bg-red text-white mb-10 hover:bg-red mt-6'>
            Upload Product
          </button>
        </form>
      </div>

      {openFullScreenImage && (
        <DisplayImg onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
      )}
    </div>
  );
}

export default UploadFoods;
