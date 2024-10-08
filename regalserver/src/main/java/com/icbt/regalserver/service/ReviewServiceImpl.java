package com.icbt.regalserver.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import com.icbt.regalserver.entity.Review;
import com.icbt.regalserver.repository.ReviewRepository;

@Service
public class ReviewServiceImpl implements ReviewService{
     @Autowired
    private ReviewRepository reviewRepository;

    @Override
    public List<Review> getAllReviews() {
       return reviewRepository.findAll();
    }

    @Override
    public Review getReviewsById(Long review_id) {
        return reviewRepository.findById(review_id).orElse(null);
    }

    @Override
    public Review createReviews(Review review){
        return reviewRepository.save(review);
    }

    @Override
    public void deleteReview(Long review_id){
        reviewRepository.deleteById(review_id);
    }


    
}
