package com.example.ecommerce.controllers;

import com.example.ecommerce.dtos.RegisterDTO;
import com.example.ecommerce.responses.ResponseSuccess;
import com.example.ecommerce.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/users")
@RequiredArgsConstructor
public class UserController{
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<ResponseSuccess> createUser(@Valid @RequestBody RegisterDTO registerDTO){
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Create user successfully")
                .status(HttpStatus.CREATED.value())
                .data(userService.createUser(registerDTO))
                .build());
    }
}
