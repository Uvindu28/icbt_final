package com.icbt.regalserver.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.icbt.regalserver.entity.User;
import com.icbt.regalserver.service.UserService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;





@RestController
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/users") //Static routing path
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }
    
    @GetMapping("/users/{id}") //Dynamic routing path
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PostMapping("/users")
    public User creatUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @PutMapping("/users/{id}")
    public User updatUser(@PathVariable Long id, @RequestBody User user){
        return userService.updatUser(id, user);
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
    }
    
}
