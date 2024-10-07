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

import com.icbt.regalserver.entity.UMovies;
import com.icbt.regalserver.service.UMoviesService;

@RestController
@CrossOrigin(origins = "*")
public class UMoviesController {
    @Autowired
    private UMoviesService umoviesService;

    @GetMapping("/auth/umovies")
    public List<UMovies> getAllUMovies(){
        return umoviesService.getAllUMovies();
    }

    @GetMapping("/auth/umovies/{id}")
    public ResponseEntity<UMovies> getUMovieById(@PathVariable Long id){
        UMovies umovies = umoviesService.getUMovieById(id);
        if(umovies == null){
            return ResponseEntity.status(404).build();
        }else{
            return ResponseEntity.status(200).body(umovies);
        }

    }

    @PostMapping("/auth/umovies")
    public ResponseEntity<UMovies> createMovies(@RequestBody UMovies umovies){
        UMovies createUMovies = umoviesService.createUMovies(umovies);
            return ResponseEntity.status(201).body(createUMovies);

    }

    @DeleteMapping("/auth/umovies/{id}")
    public void deleteUMovies(@PathVariable Long id){
        umoviesService.deleteUMovies(id);
    }
    
}
