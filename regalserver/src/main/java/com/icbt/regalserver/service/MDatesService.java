package com.icbt.regalserver.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.icbt.regalserver.entity.MDates;

@Service
public interface MDatesService {
    List<MDates> getAllMDates();
    MDates getMDatesById(Long mdate_id);
    MDates createMDates(MDates mdates);

    
}
