package com.example.ecommerce.responses;

import com.example.ecommerce.models.Cart;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartResponse {
    private Long id;
    private Long userId;
    private Double total;
    private Long totalProduct;
    private Long totalQuantity;
    private List<CartItemResponse> cartItems;

    public static CartResponse fromCart(Cart cart, List<CartItemResponse> cartItemResponses){
        return CartResponse.builder()
                .id(cart.getId())
                .userId(cart.getUser().getId())
                .total(cartItemResponses.stream()
                        .mapToDouble(cartItem -> cartItem.getPrice() * cartItem.getQuantity()).sum())
                .totalProduct((long)cartItemResponses.size())
                .totalQuantity(cartItemResponses.stream().mapToLong(CartItemResponse::getQuantity).sum())
                .cartItems(cartItemResponses)
                .build();
    }
}
