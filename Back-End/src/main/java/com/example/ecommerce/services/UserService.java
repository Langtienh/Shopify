package com.example.ecommerce.services;

import com.example.ecommerce.dtos.*;
import com.example.ecommerce.responses.LoginResponse;
import com.example.ecommerce.responses.PageResponse;
import com.example.ecommerce.responses.UserResponse;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface UserService {
    void createUser(RegisterDTO registerDTO);
    UserResponse getUserById(long id);
    PageResponse getAllUsers(int page, int limit);
    UserResponse updateUser(long id, UserDTO userDTO);
    LoginResponse login(LoginDTO loginDTO, HttpServletRequest request);
    void logout(LogoutDTO logoutDTO);
    LoginResponse refreshToken(RefreshTokenDTO refreshTokenDTO);

    LoginResponse loginWithGoogle(LoginWithGoogle loginWithGoogle, HttpServletRequest request);
    LoginResponse checkLoginWithGoogle(String providerId, HttpServletRequest request);
}
