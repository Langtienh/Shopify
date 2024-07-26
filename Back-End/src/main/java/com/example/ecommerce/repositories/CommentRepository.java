package com.example.ecommerce.repositories;

import com.example.ecommerce.models.Comment;
import com.example.ecommerce.models.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query("SELECT c FROM Comment c WHERE c.product = :product AND (:rate IS NULL OR c.rate = :rate) " +
            "ORDER BY c.id DESC")
    Page<Comment> findAllByProductAndRate(@Param("product") Product product, @Param("rate") Long rate, Pageable pageable);
    List<Comment> findAllByProduct(Product product);
}
