package com.ensolvers.notes_app_backend.service;

import com.ensolvers.notes_app_backend.application.dto.LoginRequestDTO;

public interface AuthService {
    boolean login(LoginRequestDTO loginRequest);
}
