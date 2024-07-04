package com.example.ecommerce.repositories;

import com.example.ecommerce.models.Token;
import com.example.ecommerce.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {
    List<Token> findAllByUser(User user);
    Optional<Token> findByToken(String token);
    boolean existsByToken(String token);
    Optional<Token> findByRefreshToken(String refreshToken);
}
