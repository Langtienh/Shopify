package com.example.ecommerce.repositories;

import com.example.ecommerce.models.ForgotPassword;
import com.example.ecommerce.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ForgotPasswordRepository extends JpaRepository<ForgotPassword, Long> {
    Optional<ForgotPassword> findByUser(User user);
}
