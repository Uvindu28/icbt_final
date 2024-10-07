package com.icbt.regalserver.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.icbt.regalserver.dto.LoginDto;
import com.icbt.regalserver.security.jwt.JwtUtils;

@RestController
@CrossOrigin(origins = "*")
public class AuthController {
     @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/auth/login") 
    public String login(@RequestBody LoginDto loginDto) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getUsername(),
        loginDto.getPassword( )));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwtToken = jwtUtils.generateJwtToken(authentication);

        return jwtToken;
    }
    
}
