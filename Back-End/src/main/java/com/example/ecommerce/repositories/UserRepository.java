package com.example.ecommerce.repositories;

import com.example.ecommerce.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByPhone(String phone);
    Optional<User> findByProviderId(String providerId);
    Optional<User> findByEmail(String email);
    @Query("select u from User u where :name is null or u.fullName like %:name%")
    Page<User> findAllByFullName(@Param("name") String name, Pageable pageable);

}
