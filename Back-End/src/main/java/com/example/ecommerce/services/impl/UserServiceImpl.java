package com.example.ecommerce.services.impl;

import com.example.ecommerce.dtos.*;
import com.example.ecommerce.exceptions.ResourceNotFoundException;
import com.example.ecommerce.models.*;
import com.example.ecommerce.repositories.RoleRepository;
import com.example.ecommerce.repositories.UserRepository;
import com.example.ecommerce.repositories.UserRoleRepository;
import com.example.ecommerce.responses.LoginResponse;
import com.example.ecommerce.responses.OrderResponse;
import com.example.ecommerce.responses.PageResponse;
import com.example.ecommerce.responses.UserResponse;
import com.example.ecommerce.services.JwtService;
import com.example.ecommerce.services.TokenService;
import com.example.ecommerce.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final TokenService tokenService;
    @Value("${jwt.refreshExpiration}")
    private int refreshExpiration;
    @Override
    @Transactional
    public void createUser(RegisterDTO registerDTO) {
        Role role = roleRepository.findByName("user");
        User user = User.builder()
                .fullName(registerDTO.getFullName())
                .phone(registerDTO.getPhone())
                .password(passwordEncoder.encode(registerDTO.getPassword()))
                .email(registerDTO.getEmail())
                .address(registerDTO.getAddress())
                .avatar(registerDTO.getAvatar())
                .active(true)
                .build();
        userRepository.save(user);
        UserRole userRole = UserRole.builder()
                .user(user)
                .role(role)
                .build();
        userRoleRepository.save(userRole);
    }

    @Override
    public UserResponse getUserById(long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return UserResponse.fromUser(user);
    }

    @Override
    public PageResponse getAllUsers(int page, int limit) {
        page = page > 0 ? page - 1 : page;
        Pageable pageable = PageRequest.of(page, limit);
        Page<User> userPage = userRepository.findAll(pageable);
        return PageResponse.builder()
                .page(page + 1)
                .limit(limit)
                .totalPage(userPage.getTotalPages())
                .totalItem((int)userPage.getTotalElements())
                .result(userPage.stream().map(UserResponse::fromUser).toList())
                .build();
    }

    @Override
    @Transactional
    public UserResponse updateUser(long id, UserDTO userDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setFullName(userDTO.getFullName());
        user.setPhone(userDTO.getPhone());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setEmail(userDTO.getEmail());
        user.setAddress(userDTO.getAddress());
        user.setAvatar(userDTO.getAvatar());
        userRepository.save(user);
        return UserResponse.fromUser(user);
    }

    @Override
    @Transactional
    public LoginResponse login(LoginDTO loginDTO, HttpServletRequest request) {
        User user = userRepository.findByPhone(loginDTO.getPhone())
                .orElseThrow(() -> new BadCredentialsException("Invalid Username or Password"));
        if(!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword()))
            throw new BadCredentialsException("Invalid Username or Password");
        String token = jwtService.generateToken(user);
        boolean isMobile = request.getHeader("User-Agent").equals("mobile");
        Token newToken =tokenService.addToken(user, token, isMobile);
        return LoginResponse.builder()
                .token(newToken.getToken())
                .refreshToken(newToken.getRefreshToken())
                .user(UserResponse.fromUser(user))
                .build();
    }

    @Override
    @Transactional
    public void logout(LogoutDTO logoutDTO) {
        tokenService.deleteToken(logoutDTO.getToken());
    }

    @Override
    @Transactional
    public LoginResponse refreshToken(RefreshTokenDTO refreshTokenDTO) {
        Token token = tokenService.getTokenByRefreshToken(refreshTokenDTO.getRefreshToken());
        if(token.getRefreshExpirationDate().isBefore(LocalDateTime.now()))
            throw new ResourceNotFoundException("RefreshToken expired");
        User user = token.getUser();
        Token newToken = tokenService.updateToken(Token.builder()
                .id(token.getId())
                .token(jwtService.generateToken(user))
                .refreshToken(UUID.randomUUID().toString())
                .refreshExpirationDate(LocalDateTime.now().plusSeconds(refreshExpiration/1000))
                .user(user)
                .isMobileDevice(token.isMobileDevice())
                .build());
        return LoginResponse.builder()
                .token(newToken.getToken())
                .refreshToken(newToken.getRefreshToken())
                .user(UserResponse.fromUser(user))
                .build();
    }
}
