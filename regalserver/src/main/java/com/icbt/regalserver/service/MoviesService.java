package com.icbt.regalserver.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.icbt.regalserver.entity.Movies;

@Service
public interface MoviesService {
    List<Movies>getAllMovies();
    Movies getMovieById(Long id);
    Movies createMovies(Movies movies);
    void deleteMovies(Long id);
    
}
