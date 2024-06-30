package com.example.ecommerce.services;

import com.example.ecommerce.dtos.CartDTO;
import com.example.ecommerce.dtos.CartUpdateDTO;
import com.example.ecommerce.responses.CartResponse;
import com.example.ecommerce.responses.PageResponse;

import java.util.List;

public interface CartService {
    CartResponse createCart(CartDTO cartDTO);
    PageResponse getAllCarts(int page, int limit);
    CartResponse getCartById(long id);
    CartResponse getCartByUser(long userId);
    CartResponse updateCart(long id, CartUpdateDTO cartUpdateDTO);
    void deleteCart(long id);
    void deleteCartItem(long cartItemId);
}
