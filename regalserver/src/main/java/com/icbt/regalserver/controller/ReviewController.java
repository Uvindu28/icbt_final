package com.icbt.regalserver.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.icbt.regalserver.entity.Review;
import com.icbt.regalserver.service.ReviewService;

@RestController
@CrossOrigin(origins = "*")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @GetMapping("/auth/review")
    public List<Review> getAllReviews(){
        return reviewService.getAllReviews();
    }

    @GetMapping("/auth/e{id}")
    public ResponseEntity<Review> getReviewById(@PathVariable Long review_id){
        Review review = reviewService.getReviewsById(review_id);
        if(review == null){
            return ResponseEntity.status(404).build();
        }else{
            return ResponseEntity.status(200).body(review);
        }

    }

    @PostMapping("/auth/review")
    public ResponseEntity<Review> createReviews(@RequestBody Review review){
        Review createReview = reviewService.createReviews(review);
            return ResponseEntity.status(201).body(createReview);

    }

    @DeleteMapping("/auth/review/{id}")
    public void deleteReview(@PathVariable Long reviw_id){
        reviewService.deleteReview(reviw_id);
    }
    
}
