package com.icbt.regalserver.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.icbt.regalserver.entity.MoiveCategory;
import com.icbt.regalserver.service.MovieCategoryService;




@RestController
@CrossOrigin(origins = "*")
public class MovieCategoryControlller {
    @Autowired
    private MovieCategoryService categoryService;

    @GetMapping("/auth/category")
    public List<MoiveCategory> getAllCategories(){
        return categoryService.getAllCategory();
    }

    @GetMapping("/auth/category/{id}")
    public MoiveCategory getCategoryById(@PathVariable Long id){
        return categoryService.getCategoryById(id);
    }

    @PostMapping("/auth/category")
    public ResponseEntity<MoiveCategory> createCategory(@RequestBody MoiveCategory category){
        MoiveCategory createCategory = categoryService.createCategory(category);
            return ResponseEntity.status(201).body(createCategory);
    }
    
    
    
    
    
    
}
