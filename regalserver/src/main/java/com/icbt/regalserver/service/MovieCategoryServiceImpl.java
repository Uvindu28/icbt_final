package com.icbt.regalserver.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.icbt.regalserver.entity.MoiveCategory;
import com.icbt.regalserver.repository.MovieCategoryRepository;

@Service
public class MovieCategoryServiceImpl implements MovieCategoryService{

    @Autowired
    private MovieCategoryRepository movieCategoryRepository;

    @Override
    public List<MoiveCategory> getAllCategory() {
        return movieCategoryRepository.findAll();
    }

    @Override
    public MoiveCategory getCategoryById(Long id) {
        return movieCategoryRepository.findById(id).orElse(null);
    }

    @Override
    public MoiveCategory createCategory(MoiveCategory moiveCategory) {
        return movieCategoryRepository.save(moiveCategory);
    }
    
    
}
