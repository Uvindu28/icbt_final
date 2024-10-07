package com.icbt.regalserver.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.icbt.regalserver.entity.FoodCategory;
import com.icbt.regalserver.repository.FoodCategoryRepo;

@Service
public class FoodCategoryServiceImpl implements FoodCategoryService{
    @Autowired
    private FoodCategoryRepo foodCategoryRepo;

    @Override
    public List<FoodCategory> getAllFoodCategories(){
        return foodCategoryRepo.findAll();
    }

    @Override
    public FoodCategory getFoodCategoryById(Long id) {
       return foodCategoryRepo.findById(id).orElse(null);
    }

    @Override
    public FoodCategory createFoodCategory(FoodCategory foodCategory) {
        return foodCategoryRepo.save(foodCategory);
    }

    @Override
    public void deleteFoodCategory(Long id){
        foodCategoryRepo.deleteById(id);
    }
    
}
