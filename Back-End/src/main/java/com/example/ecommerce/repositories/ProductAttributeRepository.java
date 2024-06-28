package com.example.ecommerce.repositories;

import com.example.ecommerce.models.Product;
import com.example.ecommerce.models.ProductAttribute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductAttributeRepository extends JpaRepository<ProductAttribute, Long> {
    List<ProductAttribute> findAllByProduct(Product product);
}
