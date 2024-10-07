package com.icbt.regalserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.icbt.regalserver.entity.MDates;

@Repository
public interface MDatesRepo extends JpaRepository<MDates, Long>{
    
}
