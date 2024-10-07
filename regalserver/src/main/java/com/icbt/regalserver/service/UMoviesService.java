package com.icbt.regalserver.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.icbt.regalserver.entity.UMovies;

@Service
public interface UMoviesService {
    List<UMovies>getAllUMovies();
    UMovies getUMovieById(Long id);
    UMovies createUMovies(UMovies umovies);
    void deleteUMovies(Long id);


    
}
