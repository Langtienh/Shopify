package com.example.ecommerce.repositories;

import com.example.ecommerce.models.Brand;
import com.example.ecommerce.models.Category;
import com.example.ecommerce.models.CategoryBrand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryBrandRepository extends JpaRepository<CategoryBrand, Long> {
    List<CategoryBrand> findAllByCategory(Category category);
}
