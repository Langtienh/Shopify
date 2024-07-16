package com.example.ecommerce.responses;

import com.example.ecommerce.models.Product;
import com.example.ecommerce.models.WishList;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WishListResponse {
    private Long id;
    private Long userId;
    private Long productId;
    private String name;
    private String image;
    private Double price;
    private Long discount;
    private Double discountForMember;

    public static WishListResponse fromWishList(WishList wishList){
        Product product = wishList.getProduct();
        return WishListResponse.builder()
                .id(wishList.getId())
                .userId(wishList.getUser().getId())
                .productId(product.getId())
                .name(product.getName())
                .image(product.getImage())
                .price(product.getPrice())
                .discount(product.getDiscount())
                .discountForMember(product.getDiscountForMember())
                .build();
    }
}
