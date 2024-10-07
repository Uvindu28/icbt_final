package com.icbt.regalserver.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.icbt.regalserver.entity.User;
import com.icbt.regalserver.repository.UserRepository;


@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long id){
        return userRepository.findById(id).orElse(null);
    }
    
    @Override
    public User createUser(User user){
        return userRepository.save(user);
    }

    @Override
    public User updatUser(Long id, User user){
        User existUser = userRepository.findById(id).orElse(null);
        if(existUser != null){
            existUser.setUsername(user.getUsername());
            existUser.setEmail(user.getEmail());
            existUser.setPassword(user.getPassword());
            existUser.setFirstName(user.getFirstName());
            existUser.setLastName(user.getLastName());
            existUser.setN_i_c(user.getN_i_c());
            existUser.setPhoneNumber(user.getPhoneNumber());
            return userRepository.save(existUser);
        }else{
            return null;
        }
    }

    @Override
    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }
}
