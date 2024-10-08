package com.icbt.regalserver.service;

import com.icbt.regalserver.entity.Review;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public interface ReviewService {
    List<Review> getAllReviews();
    Review getReviewsById(Long review_id);
    Review createReviews(Review review);
    void deleteReview(Long review_id);
}
