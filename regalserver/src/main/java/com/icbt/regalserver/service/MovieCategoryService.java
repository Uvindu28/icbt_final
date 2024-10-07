package com.icbt.regalserver.service;

import java.util.List;
import org.springframework.stereotype.Service;

import com.icbt.regalserver.entity.MoiveCategory;

@Service
public interface MovieCategoryService {
    List<MoiveCategory> getAllCategory();
    MoiveCategory getCategoryById(Long id);
    MoiveCategory createCategory(MoiveCategory category);
    
}
