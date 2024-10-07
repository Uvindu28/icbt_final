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
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique =  true)
    private String username;
    private String password;
    @Column(unique =  true)
    private String email;
    private Integer phoneNumber;
    private String n_i_c;
    @Column
    private String firstName;
    private String LastName;

    
}
