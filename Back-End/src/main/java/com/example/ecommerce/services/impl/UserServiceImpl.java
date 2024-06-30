package com.example.ecommerce.services.impl;

import com.example.ecommerce.dtos.RegisterDTO;
import com.example.ecommerce.models.User;
import com.example.ecommerce.repositories.UserRepository;
import com.example.ecommerce.responses.UserResponse;
import com.example.ecommerce.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    @Override
    public UserResponse createUser(RegisterDTO registerDTO) {
        User user = User.builder()
                .fullName(registerDTO.getFullName())
                .phone(registerDTO.getPhone())
                .password(registerDTO.getPassword())
                .email(registerDTO.getEmail())
                .address(registerDTO.getAddress())
                .active(registerDTO.isActive())
                .build();
        return UserResponse.fromUser(userRepository.save(user));
    }
}
