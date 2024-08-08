package com.example.ecommerce.services;

import com.example.ecommerce.dtos.WishListDTO;
import com.example.ecommerce.responses.WishListResponse;

import java.util.List;

public interface WishListService {
    WishListResponse createWishList(WishListDTO wishListDTO);
    List<WishListResponse> getAllWishListsByUser(long uid);
    void deleteOne(long productId);
    void deleteAll(long uid);
}
