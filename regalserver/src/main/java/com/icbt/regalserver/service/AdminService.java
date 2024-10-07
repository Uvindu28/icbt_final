package com.icbt.regalserver.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.icbt.regalserver.entity.Admin;

@Service
public interface AdminService {
    List<Admin> getAllAdmins();
    Admin getAdminById(Long id);
    Admin createAdmins(Admin admin);

    
}
