package com.example.ecommerce.services;

import com.example.ecommerce.dtos.LoginDTO;
import com.example.ecommerce.dtos.LogoutDTO;
import com.example.ecommerce.dtos.RefreshTokenDTO;
import com.example.ecommerce.dtos.RegisterDTO;
import com.example.ecommerce.responses.LoginResponse;
import com.example.ecommerce.responses.PageResponse;
import com.example.ecommerce.responses.UserResponse;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface UserService {
    UserResponse createUser(RegisterDTO registerDTO);
    UserResponse getUserById(long id);
    PageResponse getAllUsers(int page, int limit);
    UserResponse updateUser(long id, RegisterDTO registerDTO);
    LoginResponse login(LoginDTO loginDTO, HttpServletRequest request);
    void logout(LogoutDTO logoutDTO);
    LoginResponse refreshToken(RefreshTokenDTO refreshTokenDTO);
}
