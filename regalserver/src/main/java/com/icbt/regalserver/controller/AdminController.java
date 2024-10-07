package com.icbt.regalserver.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.icbt.regalserver.entity.Admin;
import com.icbt.regalserver.service.AdminService;



@RestController
@CrossOrigin(origins = "*")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @GetMapping("/admins")
    public List<Admin> getAllAdmins(){
        return adminService.getAllAdmins();
    }

    @GetMapping("/admins/{id}")
    public Admin getAdminById(@PathVariable Long id){
        return adminService.getAdminById(id);
    }

    @PostMapping("/auth/admins")
    public ResponseEntity<Admin> createAdmins(@RequestBody Admin admin){
        Admin createAdmins = adminService.createAdmins(admin);
            return ResponseEntity.status(201).body(createAdmins);

    }
    
    
    
}
