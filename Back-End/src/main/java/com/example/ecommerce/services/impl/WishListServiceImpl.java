package com.example.ecommerce.services.impl;

import com.example.ecommerce.dtos.WishListDTO;
import com.example.ecommerce.exceptions.ResourceNotFoundException;
import com.example.ecommerce.models.Product;
import com.example.ecommerce.models.User;
import com.example.ecommerce.models.WishList;
import com.example.ecommerce.repositories.ProductRepository;
import com.example.ecommerce.repositories.UserRepository;
import com.example.ecommerce.repositories.WishListRepository;
import com.example.ecommerce.responses.WishListResponse;
import com.example.ecommerce.services.WishListService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WishListServiceImpl implements WishListService {
    private final WishListRepository wishListRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Override
    @Transactional
    public WishListResponse createWishList(WishListDTO wishListDTO) {
        User user = userRepository.findById(wishListDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Product product = productRepository.findById(wishListDTO.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        WishList wishList = WishList.builder()
                .user(user)
                .product(product)
                .build();
        return WishListResponse.fromWishList(wishListRepository.save(wishList));
    }

    @Override
    public List<WishListResponse> getAllWishListsByUser(long uid) {
        User user = userRepository.findById(uid)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return wishListRepository.findAllByUser(user)
                .stream()
                .map(WishListResponse::fromWishList)
                .toList();
    }

    @Override
    @Transactional
    public void deleteOne(long id) {
        WishList wishList = wishListRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("WishList not found"));
        wishListRepository.delete(wishList);
    }

    @Override
    @Transactional
    public void deleteAll(long uid) {
        User user = userRepository.findById(uid)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        List<WishList> wishLists = wishListRepository.findAllByUser(user);
        wishListRepository.deleteAll(wishLists);
    }
}
