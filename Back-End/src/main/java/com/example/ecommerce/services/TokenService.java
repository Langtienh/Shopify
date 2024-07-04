package com.example.ecommerce.services;

import com.example.ecommerce.models.Token;
import com.example.ecommerce.models.User;

public interface TokenService {
    Token addToken(User user, String token, boolean isMobile);
    void deleteToken(String token);
    Token getTokenByRefreshToken(String refreshToken);
    Token updateToken(Token token);
}
