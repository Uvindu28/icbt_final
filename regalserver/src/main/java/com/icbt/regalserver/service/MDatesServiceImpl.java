package com.icbt.regalserver.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.icbt.regalserver.entity.MDates;
import com.icbt.regalserver.repository.MDatesRepo;

@Service
public class MDatesServiceImpl implements MDatesService{
    @Autowired
    private MDatesRepo mdatesRepo;

    @Override
    public List<MDates> getAllMDates() {
        return mdatesRepo.findAll();
    }

    @Override
    public MDates getMDatesById(Long mdate_id) {
        return mdatesRepo.findById(mdate_id).orElse(null);
    }

    @Override
    public MDates createMDates(MDates mdates) {
        return mdatesRepo.save(mdates);
    }

    
}
