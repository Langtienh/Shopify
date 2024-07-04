package com.example.ecommerce.services.impl;

import com.example.ecommerce.exceptions.ResourceNotFoundException;
import com.example.ecommerce.exceptions.UnauthorizedException;
import com.example.ecommerce.models.Token;
import com.example.ecommerce.models.User;
import com.example.ecommerce.repositories.TokenRepository;
import com.example.ecommerce.services.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TokenServiceImpl implements TokenService {
    private final TokenRepository tokenRepository;
    @Value("${jwt.refreshExpiration}")
    private int refreshExpiration;
    // Giới hạn tối đa 3 thiết bị
    private static final int MAX_TOKENS = 3;
    @Override
    @Transactional
    public Token addToken(User user, String token, boolean isMobile) {
        List<Token> userTokens = tokenRepository.findAllByUser(user);
        int tokenCount = userTokens.size();
        if(tokenCount >= MAX_TOKENS){
            // Ưu tiên xóa thiết bị k phải mobile
            // Nếu tất cả thiết bị đều là mobible thì xóa token của thiết bị đầu tiên
            Token tokenIsNotMobile = userTokens.stream()
                    .filter(t -> !t.isMobileDevice())
                    .findFirst()
                    .orElse(null);

            if(tokenIsNotMobile != null){ // Đã tìm thấy 1 token không phải thiết bị di động
                tokenRepository.delete(tokenIsNotMobile);
            }
            else{ // Tất cả token đều là mobible -> xóa token đầu danh sách
                tokenRepository.delete(userTokens.get(0));
            }
        }
        String refreshToken = UUID.randomUUID().toString();
        Token newToken = Token.builder()
                .token(token)
                .refreshToken(refreshToken)
                .refreshExpirationDate(LocalDateTime.now().plusSeconds(refreshExpiration/1000))
                .user(user)
                .isMobileDevice(isMobile)
                .build();
        return tokenRepository.save(newToken);
    }

    @Override
    @Transactional
    public void deleteToken(String token) {
        Optional<Token> tokenExist = tokenRepository.findByToken(token);
        if(tokenExist.isEmpty()){
            throw new ResourceNotFoundException("Token not found");
        }
        tokenRepository.delete(tokenExist.get());
    }

    @Override
    public Token getTokenByRefreshToken(String refreshToken) {
        return tokenRepository.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new UnauthorizedException("Unauthenticated"));
    }

    @Override
    @Transactional
    public Token updateToken(Token token) {
        return tokenRepository.save(token);
    }
}
