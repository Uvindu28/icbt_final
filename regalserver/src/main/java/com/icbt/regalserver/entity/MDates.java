package com.icbt.regalserver.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class MDates {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mdate_id;

    @Column
    private String movieDates;
    
}
