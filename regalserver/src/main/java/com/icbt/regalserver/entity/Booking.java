package com.icbt.regalserver.entity;

import java.util.*;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long booking_id;

    private String movie_id;
    private String movieName;
    private String showTime;
    private String date;
    private String email;
    private String total;

    @ElementCollection
    private List<Seat> seatNumbers;

    @ElementCollection
    private List<Food> foodItems;
    
    @Embeddable
    @Getter
    @Setter
    private static class Seat{
        private String sn;
    }

    @Embeddable
    @Getter
    @Setter
    private static class Food{
        private String fd;
        private String qu;
    }
    
}
