package com.icbt.regalserver.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.icbt.regalserver.entity.Movies;
import com.icbt.regalserver.repository.MoviesRepository;

@Service
public class MoviesServiceImpl implements MoviesService{

    @Autowired
    private MoviesRepository moviesRepository;

    @Override
    public List<Movies> getAllMovies() {
       return moviesRepository.findAll();
    }

    @Override
    public Movies getMovieById(Long id) {
        return moviesRepository.findById(id).orElse(null);
    }

    @Override
    public Movies createMovies(Movies movies){
        return moviesRepository.save(movies);
    }

    @Override
    public void deleteMovies(Long id){
        moviesRepository.deleteById(id);
    }

    

    
}
