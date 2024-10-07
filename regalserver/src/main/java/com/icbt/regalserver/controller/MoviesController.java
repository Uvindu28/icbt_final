package com.icbt.regalserver.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.icbt.regalserver.entity.Movies;
import com.icbt.regalserver.service.MoviesService;




@RestController
@CrossOrigin(origins = "*")
public class MoviesController {
    @Autowired
    private MoviesService moviesService;

    @GetMapping("/auth/movies")
    public List<Movies> getAllMovies(){
        return moviesService.getAllMovies();
    }

    @GetMapping("/auth/d{id}")
    public ResponseEntity<Movies> getMovieById(@PathVariable Long id){
        Movies movies = moviesService.getMovieById(id);
        if(movies == null){
            return ResponseEntity.status(404).build();
        }else{
            return ResponseEntity.status(200).body(movies);
        }

    }

    @PostMapping("/auth/movies")
    public ResponseEntity<Movies> createMovies(@RequestBody Movies movies){
        Movies createMovies = moviesService.createMovies(movies);
            return ResponseEntity.status(201).body(createMovies);

    }

    @DeleteMapping("/auth/movies/{id}")
    public void deleteMovies(@PathVariable Long id){
        moviesService.deleteMovies(id);
    }
    
    
    
}
