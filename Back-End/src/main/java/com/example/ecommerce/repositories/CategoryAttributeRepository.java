package com.example.ecommerce.repositories;

import com.example.ecommerce.models.Category;
import com.example.ecommerce.models.CategoryAttribute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryAttributeRepository extends JpaRepository<CategoryAttribute, Long> {
    List<CategoryAttribute> findAllByCategory(Category category);
}
