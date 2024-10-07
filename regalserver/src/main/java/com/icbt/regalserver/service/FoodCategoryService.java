package com.icbt.regalserver.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.icbt.regalserver.entity.FoodCategory;

@Service
public interface FoodCategoryService {
    List<FoodCategory> getAllFoodCategories();
    FoodCategory getFoodCategoryById(Long id);
    FoodCategory createFoodCategory(FoodCategory foodCategory);
    void deleteFoodCategory(Long id);
}
