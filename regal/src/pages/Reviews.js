import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';

const Reviews = () => {
  const [review, setReview] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/auth/review');
        setReview(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);

  const deleteReview = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:8080/auth/review/${reviewId}`);
      setReview((prevReview) => prevReview.filter(review => review.reviewId !== reviewId));
      toast.success("Category deleted successfully!");
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error("Failed to delete category.");
    }
  };

  return (
    <div>
      <div className='bg-light_yellow py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>Review List</h2>
      </div>

      <table className='w-full bg-light_yellow border-2  categoryTabletwo mt-2 text-center'>
        <thead>
          <tr className='bg-black text-white'>
            <th>ID</th>
            <th>Email</th>
            <th>Movie Name</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {review && review.map((reviews) => (
            <tr key={reviews.review_id}>
              <td>{reviews.review_id}</td>
              <td>{reviews.email}</td>
              <td>{reviews.movieName}</td>
              <td>{reviews.message}</td>
              <td className='reviewAction'>
                <button
                  className=' p-2 rounded-full text-red '
                  onClick={() => deleteReview(reviews.reviewId)}
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

export default Reviews;
