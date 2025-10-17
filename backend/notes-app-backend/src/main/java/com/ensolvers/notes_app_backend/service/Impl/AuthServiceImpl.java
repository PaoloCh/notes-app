package com.ensolvers.notes_app_backend.service.Impl;

import com.ensolvers.notes_app_backend.application.dto.LoginRequestDTO;
import com.ensolvers.notes_app_backend.domain.model.User;
import com.ensolvers.notes_app_backend.domain.repository.UserRepository;
import com.ensolvers.notes_app_backend.service.AuthService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    public AuthServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public boolean login(LoginRequestDTO loginRequest) {
        Optional<User> userOptional = userRepository.findByUsername(loginRequest.getUsername());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return user.getPassword().equals(loginRequest.getPassword());
        }
        return false;
    }
}
