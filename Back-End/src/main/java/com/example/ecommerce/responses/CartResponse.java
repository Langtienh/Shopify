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
    private Double total;
    @JsonProperty("total_product")
    private Long totalProduct;
    @JsonProperty("total_quantity")
    private Long totalQuantity;
    private List<CartItemResponse> cartItems;

    public static CartResponse fromCart(Cart cart, List<CartItemResponse> cartItemResponses){
        return CartResponse.builder()
                .id(cart.getId())
                .total(cartItemResponses.stream()
                        .mapToDouble(cartItem -> cartItem.getPrice() * cartItem.getQuantity()).sum())
                .totalProduct((long)cartItemResponses.size())
                .totalQuantity(cartItemResponses.stream().mapToLong(CartItemResponse::getQuantity).sum())
                .cartItems(cartItemResponses)
                .build();
    }
}
