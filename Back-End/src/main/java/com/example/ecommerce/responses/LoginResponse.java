package com.example.ecommerce.responses;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginResponse {

    private String token;

    private String refreshToken;

    private final String tokenType = "Bearer";

    private UserResponse user;

}