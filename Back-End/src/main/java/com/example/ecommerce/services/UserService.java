package com.example.ecommerce.services;

import com.example.ecommerce.dtos.*;
import com.example.ecommerce.models.User;
import com.example.ecommerce.repositories.UserRepository;
import com.example.ecommerce.responses.LoginResponse;
import com.example.ecommerce.responses.PageResponse;
import com.example.ecommerce.responses.UserResponse;
import com.example.ecommerce.responses.VerifyOtpResponse;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface UserService {
    void createUser(RegisterDTO registerDTO);
    UserResponse getUserById(long id);
    PageResponse getAllUsers(int page, int limit, String name);
    UserResponse updateUser(long id, UserDTO userDTO);
    LoginResponse login(LoginDTO loginDTO, HttpServletRequest request);
    void logout(LogoutDTO logoutDTO);
    LoginResponse refreshToken(RefreshTokenDTO refreshTokenDTO);

    LoginResponse loginWithGoogle(LoginWithGoogle loginWithGoogle, HttpServletRequest request);
    LoginResponse checkLoginWithGoogle(String providerId, HttpServletRequest request);
    User findById(long id);
    UserResponse updateUserStatus(long id, boolean active);
    UserResponse changePassword(long id, ChangePasswordDTO changePasswordDTO);
    void sendMailForgotPassword(String email);
    VerifyOtpResponse verifyOtp(String otp, String email);
    void resetPassword(long id, ResetPasswordDTO resetPasswordDTO);
}
