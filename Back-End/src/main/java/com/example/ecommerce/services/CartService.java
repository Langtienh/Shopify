package com.example.ecommerce.services;

import com.example.ecommerce.dtos.CartDTO;
import com.example.ecommerce.dtos.CartUpdateDTO;
import com.example.ecommerce.responses.CartResponse;

import java.util.List;

public interface CartService {
    CartResponse createCart(CartDTO cartDTO);
    CartResponse updateCart(long id, CartUpdateDTO cartUpdateDTO);
    CartResponse getCartByUser(long userId);
    void deleteCart(List<Long> ids);
    void deleteCartByUser(long userId);

}
