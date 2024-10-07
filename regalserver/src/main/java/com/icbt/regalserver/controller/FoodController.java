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

import com.icbt.regalserver.entity.Foods;
import com.icbt.regalserver.service.FoodService;

@RestController
@CrossOrigin(origins = "*")
public class FoodController {
     @Autowired
    private FoodService foodService;

    @GetMapping("/auth/foods") //Static routing path
    public List<Foods> getAllFoods(){
        return foodService.getAllFoods();
    }
    
    @GetMapping("/auth/foods/{id}") //Dynamic routing path
    public Foods getFoodById(@PathVariable Long id) {
        return foodService.getFoodById(id);
    }

    @PostMapping("/auth/foods")
    public Foods creatFood(@RequestBody Foods foods) {
        return foodService.createFood(foods);
    }


    @DeleteMapping("/auth/foods/{id}")
    public void deleteFood(@PathVariable Long id){
        foodService.deleteFood(id);
    }
    
}
