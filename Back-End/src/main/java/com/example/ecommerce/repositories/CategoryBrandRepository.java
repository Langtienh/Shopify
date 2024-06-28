package com.example.ecommerce.repositories;

import com.example.ecommerce.models.CategoryBrand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryBrandRepository extends JpaRepository<CategoryBrand, Long> {
}
