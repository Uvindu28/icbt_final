package com.icbt.regalserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.icbt.regalserver.entity.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long>{

    
}
