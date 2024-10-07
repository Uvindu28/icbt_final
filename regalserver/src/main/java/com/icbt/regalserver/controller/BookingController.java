package com.icbt.regalserver.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.icbt.regalserver.entity.Booking;
import com.icbt.regalserver.service.BookingService;

@RestController
@CrossOrigin(origins = "*")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @GetMapping("/auth/booking") //Static routing path
    public List<Booking> getAllBookings(){
        return bookingService.getAllBookings();
    }

    @GetMapping("/auth/booking/{id}") //Dynamic routing path
    public Booking getBookingById(@PathVariable Long booking_id) {
        return bookingService.getBookingById(booking_id);
    }

    @PostMapping("/auth/createbooking")
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingService.createBooking(booking);
    }


    @DeleteMapping("/auth/booking/{id}")
    public void deleteBooking(@PathVariable Long booking_id){
        bookingService.deleteBookings(booking_id);
    }
    
}
