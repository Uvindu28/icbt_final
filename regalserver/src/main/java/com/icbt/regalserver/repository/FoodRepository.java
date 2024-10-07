package com.icbt.regalserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.icbt.regalserver.entity.Foods;

@Repository
public interface FoodRepository extends JpaRepository<Foods, Long>{

    
} 