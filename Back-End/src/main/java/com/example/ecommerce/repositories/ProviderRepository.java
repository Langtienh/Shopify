package com.example.ecommerce.repositories;

import com.example.ecommerce.models.Provider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProviderRepository extends JpaRepository<Provider, Long> {
    boolean existsByName(String name);
}
