package com.example.ecommerce.responses;

import com.example.ecommerce.models.CartItem;
import com.example.ecommerce.models.Product;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartItemResponse {
    private Long id;
    private Long productId;
    private String name;
    private String image;
    private Double price;
    private Long discount;
    private Double discountForMember;
    private Long quantity;

    public static CartItemResponse fromCartItem(CartItem cartItem){
        Product product = cartItem.getProduct();
        return CartItemResponse.builder()
                .id(cartItem.getId())
                .productId(product.getId())
                .name(product.getName())
                .image(product.getImage())
                .price(product.getPrice())
                .discount(product.getDiscount())
                .discountForMember(product.getDiscountForMember())
                .quantity(cartItem.getQuantity())
                .build();
    }
}
