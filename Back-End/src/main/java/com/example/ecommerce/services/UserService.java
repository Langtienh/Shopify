package com.example.ecommerce.services;

import com.example.ecommerce.dtos.RegisterDTO;
import com.example.ecommerce.responses.UserResponse;

public interface UserService {
    UserResponse createUser(RegisterDTO registerDTO);
}
