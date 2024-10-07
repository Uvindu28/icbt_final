package com.icbt.regalserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.icbt.regalserver.entity.FoodCategory;

@Repository
public interface FoodCategoryRepo extends JpaRepository<FoodCategory, Long> {
    
}
