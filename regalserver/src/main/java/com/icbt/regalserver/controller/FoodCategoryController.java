package com.icbt.regalserver.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.icbt.regalserver.entity.FoodCategory;
import com.icbt.regalserver.service.FoodCategoryService;

@RestController
@CrossOrigin(origins = "*")
public class FoodCategoryController {

    @Autowired
    private FoodCategoryService foodCategoryService;

    @GetMapping("/auth/foodCategory") //Static routing path
    public List<FoodCategory> getAllFoodCategories(){
        return foodCategoryService.getAllFoodCategories();
    }
    
    @GetMapping("/auth/foodCategory/{id}") //Dynamic routing path
    public FoodCategory getFoodCategoryById(@PathVariable Long id) {
        return foodCategoryService.getFoodCategoryById(id);
    }

    @PostMapping("/auth/foodCategory")
    public FoodCategory creatFoodCategory(@RequestBody FoodCategory foodCategory) {
        return foodCategoryService.createFoodCategory(foodCategory);
    }


    @DeleteMapping("/auth/d{id}")
    public void deleteFoodCategory(@PathVariable Long id){
        foodCategoryService.deleteFoodCategory(id);
    }
    
}
