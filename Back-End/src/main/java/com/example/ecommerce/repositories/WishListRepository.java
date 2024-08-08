package com.example.ecommerce.repositories;

import com.example.ecommerce.models.Product;
import com.example.ecommerce.models.User;
import com.example.ecommerce.models.WishList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WishListRepository extends JpaRepository<WishList, Long> {
    List<WishList> findAllByUser(User user);
    boolean existsByProductAndUser(Product product, User user);
    Optional<WishList> findByProductAndUser(Product product, User user);
}
