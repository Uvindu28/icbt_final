package com.icbt.regalserver.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.icbt.regalserver.entity.UMovies;
import com.icbt.regalserver.repository.UMoviesRepo;

@Service
public class UMoviesServiceImpl implements UMoviesService{
    @Autowired
    private UMoviesRepo umoviesRepo;

    @Override
    public List<UMovies> getAllUMovies() {
       return umoviesRepo.findAll();
    }

    @Override
    public UMovies getUMovieById(Long id) {
        return umoviesRepo.findById(id).orElse(null);
    }

    @Override
    public UMovies createUMovies(UMovies umovies){
        return umoviesRepo.save(umovies);
    }

    @Override
    public void deleteUMovies(Long id){
        umoviesRepo.deleteById(id);
    }

    
}
