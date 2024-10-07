package com.icbt.regalserver.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.icbt.regalserver.entity.Booking;

@Service
public interface BookingService {
    List<Booking> getAllBookings();
    Booking getBookingById(Long booking_id);
    Booking createBooking(Booking booking);
    void deleteBookings(Long booking_id);
    
}
