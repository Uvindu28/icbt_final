package com.icbt.regalserver.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Movies {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String movieName;
    @Column
    private Integer moviePrice;
    private String movieType;
    private String movieDates;
    private String movieSecondDate;
    private String movieThirdDate;
    private String time;
    private String qualityType;
    private String movieLauguage;
    private String movieTrailerUrl;

    @ElementCollection
    private List<String> movieImgUrl;
}
