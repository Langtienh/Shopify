package com.example.ecommerce.repositories;

import com.example.ecommerce.models.User;
import com.example.ecommerce.models.WishList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WishListRepository extends JpaRepository<WishList, Long> {
    List<WishList> findAllByUser(User user);
}
