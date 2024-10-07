package com.icbt.regalserver.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.icbt.regalserver.entity.Admin;
import com.icbt.regalserver.repository.AdminRepository;

@Service
public class AdminServiceImpl implements AdminService{
    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<Admin> getAllAdmins(){
        return adminRepository.findAll();
    }

    @Override
    public Admin getAdminById(Long id) {
       return adminRepository.findById(id).orElse(null);
    }

    @Override
    public Admin createAdmins(Admin admin) {
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminRepository.save(admin);
    }
    
}
