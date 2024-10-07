package com.icbt.regalserver.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.icbt.regalserver.security.jwt.AuthEntryPoint;
import com.icbt.regalserver.security.jwt.AuthTokenFilter;

@Configuration
@EnableMethodSecurity
public class WebSecurityConfig {

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private AuthEntryPoint unauthorizedHandler;

    @Bean
    public UserDetailsService userDetailsService() {

        return userDetailsService;
    }

    @Bean
    public AuthTokenFilter authenticAuthTokenFilter(){

        return new AuthTokenFilter();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {

        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception{

         return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{ 

        http
            .csrf(csrf -> csrf.disable())
            .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler)) //Auth entry point
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) //Session management - stateless
            .authorizeHttpRequests(auth ->
                auth.requestMatchers("/auth/***").permitAll() //Allow these parts to without authentication
                .anyRequest().authenticated() // other path is authenticated
                
                );

                http.authenticationProvider(authenticationProvider()); // set the authentication provider

                http.addFilterBefore(authenticAuthTokenFilter(), UsernamePasswordAuthenticationFilter.class); //security filter AuthTokenFilter.java

                return http.build();


    }

    
}
