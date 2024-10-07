package com.icbt.regalserver.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.icbt.regalserver.entity.Admin;
import com.icbt.regalserver.repository.AdminRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{
        @Autowired
        private AdminRepository adminRepository;

        @Override
        public UserDetails loadUserByUsername(String username) {

        Admin admin = adminRepository.findByUsername(username).orElse(null);

        if (admin == null) {

            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return org.springframework.security.core.userdetails.User.builder()
               .username(admin.getUsername())
               .password(admin.getPassword())
               .build();

    }
    
}