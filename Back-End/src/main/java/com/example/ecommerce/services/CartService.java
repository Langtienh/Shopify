package com.example.ecommerce.services;

import com.example.ecommerce.dtos.CartDTO;
import com.example.ecommerce.dtos.CartUpdateDTO;
import com.example.ecommerce.dtos.test.CartDTOv1;
import com.example.ecommerce.dtos.test.CartUpdateDTOv1;
import com.example.ecommerce.responses.CartResponse;
import com.example.ecommerce.responses.PageResponse;

import java.util.List;

public interface CartService {
    CartResponse createCart(CartDTO cartDTO);
    CartResponse getCartByUser(long userId);
    CartResponse updateCart(long id, CartUpdateDTO cartUpdateDTO);
    void deleteCart(long id);
    void deleteCartItem(long cartItemId);

    // Test
    CartResponse createCartv1(CartDTOv1 cartDTOv1);
    CartResponse getCartByUserv1(long userId);
    CartResponse updateCartv1(long id, CartUpdateDTOv1 cartUpdateDTOv1);
    void deleteCart(List<Long> ids);
    void deleteCartByUser(long userId);

}
