package com.icbt.regalserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.icbt.regalserver.entity.UMovies;

@Repository
public interface UMoviesRepo extends JpaRepository<UMovies, Long>{
    
}
