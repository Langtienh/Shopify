package com.example.ecommerce.responses;

import lombok.*;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginResponse {

    private String token;

    private String refreshToken;

    private final String tokenType = "Bearer";

    private Long id;

    private String username;

    private List<String> roles;

}