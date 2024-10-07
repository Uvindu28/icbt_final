package com.icbt.regalserver.service;


import java.util.List;

import org.springframework.stereotype.Service;

import com.icbt.regalserver.entity.User;

@Service
public interface UserService {
    List<User> getAllUsers();
    User getUserById(Long id);
    User createUser(User user);
    User updatUser(Long id, User user);
    void deleteUser(Long id);
    
}
