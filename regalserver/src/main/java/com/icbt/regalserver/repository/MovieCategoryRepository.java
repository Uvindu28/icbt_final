package com.icbt.regalserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.icbt.regalserver.entity.MoiveCategory;

@Repository
public interface MovieCategoryRepository extends JpaRepository<MoiveCategory, Long>{
    
}
