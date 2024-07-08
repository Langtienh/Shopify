package com.example.ecommerce.controllers;

import com.example.ecommerce.dtos.*;
import com.example.ecommerce.models.User;
import com.example.ecommerce.responses.ResponseSuccess;
import com.example.ecommerce.responses.UserResponse;
import com.example.ecommerce.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/users")
@RequiredArgsConstructor
public class UserController{
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<ResponseSuccess> createUser(@Valid @RequestBody RegisterDTO registerDTO){
        userService.createUser(registerDTO);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Create user successfully")
                .status(HttpStatus.CREATED.value())
                .build());
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseSuccess> login(@Valid @RequestBody LoginDTO loginDTO,
                                                 HttpServletRequest request){
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Login successfully")
                .status(HttpStatus.OK.value())
                .data(userService.login(loginDTO, request))
                .build());
    }

    @PostMapping("/login-with-google")
    public ResponseEntity<ResponseSuccess> loginWithGoogle(
            @Valid @RequestBody LoginWithGoogle loginWithGoogle,
            HttpServletRequest request){
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Login successfully")
                .status(HttpStatus.OK.value())
                .data(userService.loginWithGoogle(loginWithGoogle, request))
                .build());
    }

    @GetMapping("/login-with-google/{id}")
    public ResponseEntity<ResponseSuccess> checkLoginWithGoogle(
            @PathVariable String id,
            HttpServletRequest request){
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Login successfully")
                .status(HttpStatus.OK.value())
                .data(userService.checkLoginWithGoogle(id, request))
                .build());
    }

    @PostMapping("/refreshToken")
    public ResponseEntity<ResponseSuccess> refreshToken(@Valid @RequestBody RefreshTokenDTO refreshTokenDTO){
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("RefreshToken successfully")
                .status(HttpStatus.OK.value())
                .data(userService.refreshToken(refreshTokenDTO))
                .build());
    }
    @PostMapping("/logout")
    public ResponseEntity<ResponseSuccess> logout(@Valid @RequestBody LogoutDTO logoutDTO){
        userService.logout(logoutDTO);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Logout successfully")
                .status(HttpStatus.OK.value())
                .build());
    }
    @GetMapping("/my-info")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponseSuccess> getMyInfo(){
        UserResponse userResponse = UserResponse.fromUser(
                (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Get my info successfully")
                .status(HttpStatus.OK.value())
                .data(userResponse)
                .build());
    }

    @GetMapping("/{id}")
//    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @PreAuthorize("#id == authentication.principal.id or hasRole('ROLE_ADMIN')")
    // Chỉ cho user get thông tin của chính mình or Admin có thể lấy
    public ResponseEntity<ResponseSuccess> getUserById(@PathVariable("id") long id){
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Get user information successfully")
                .status(HttpStatus.OK.value())
                .data(userService.getUserById(id))
                .build());
    }

    @GetMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponseSuccess> getAllUsers(@RequestParam(defaultValue = "1") int page,
                                                       @RequestParam(defaultValue = "10") int limit){
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Get all user information successfully")
                .status(HttpStatus.OK.value())
                .data(userService.getAllUsers(page, limit))
                .build());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponseSuccess> updateUser(@PathVariable("id") long id,
                                                      @Valid @RequestBody UserDTO userDTO){
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Update user successfully")
                .status(HttpStatus.ACCEPTED.value())
                .data(userService.updateUser(id, userDTO))
                .build());
    }
}
