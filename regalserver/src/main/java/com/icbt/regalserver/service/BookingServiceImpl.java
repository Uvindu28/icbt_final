package com.icbt.regalserver.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.icbt.regalserver.entity.Booking;
import com.icbt.regalserver.repository.BookingRepository;

@Service
public class BookingServiceImpl implements BookingService{
    @Autowired
    private BookingRepository bookingRepository;

    @Override
    public List<Booking> getAllBookings(){
        return bookingRepository.findAll();
    }

    @Override
    public Booking getBookingById(Long booking_id) {
       return bookingRepository.findById(booking_id).orElse(null);
    }

    @Override
    public Booking createBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    @Override
    public void deleteBookings(Long booking_id){
        bookingRepository.deleteById(booking_id);
    }
    
}
