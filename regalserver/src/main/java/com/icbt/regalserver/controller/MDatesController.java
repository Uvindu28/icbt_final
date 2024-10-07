package com.icbt.regalserver.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.icbt.regalserver.entity.MDates;
import com.icbt.regalserver.service.MDatesService;

@RestController
@CrossOrigin(origins = "*")
public class MDatesController {


    @Autowired
    private MDatesService mdatesService;

     @GetMapping("/auth/mdates")
    public List<MDates> getAllMDates(){
        return mdatesService.getAllMDates();
    }

    @GetMapping("/auth/mdates/{id}")
    public MDates getMDatesById(@PathVariable Long mdate_id){
        return mdatesService.getMDatesById(mdate_id);
    }

    @PostMapping("/auth/mdates")
    public ResponseEntity<MDates> createMDates(@RequestBody MDates mdates){
        MDates createMDates = mdatesService.createMDates(mdates);
            return ResponseEntity.status(201).body(createMDates);
    }



    
}
