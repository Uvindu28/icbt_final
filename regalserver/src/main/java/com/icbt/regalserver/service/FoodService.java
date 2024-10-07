package com.icbt.regalserver.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.icbt.regalserver.entity.Foods;

@Service
public interface FoodService {
    List<Foods> getAllFoods();
    Foods getFoodById(Long id);
    Foods createFood(Foods foods);
    void deleteFood(Long id);

    
} 
