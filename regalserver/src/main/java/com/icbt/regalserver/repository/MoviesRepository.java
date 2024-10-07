package com.icbt.regalserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.icbt.regalserver.entity.Movies;

@Repository
public interface MoviesRepository extends JpaRepository<Movies, Long>{

    
}
