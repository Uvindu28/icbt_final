package com.icbt.regalserver.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.icbt.regalserver.entity.Foods;
import com.icbt.regalserver.repository.FoodRepository;


@Service
public class FoodServiceImpl implements FoodService {
    @Autowired
    private FoodRepository foodRepository;

    @Override
    public List<Foods> getAllFoods(){
        return foodRepository.findAll();
    }

    @Override
    public Foods getFoodById(Long id) {
       return foodRepository.findById(id).orElse(null);
    }

    @Override
    public Foods createFood(Foods foods) {
        return foodRepository.save(foods);
    }

    @Override
    public void deleteFood(Long id){
        foodRepository.deleteById(id);
    }
}
