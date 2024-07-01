package com.example.ecommerce.responses;

import com.example.ecommerce.models.OrderDetail;
import com.example.ecommerce.models.Product;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDetailResponse {
    private Long id;
    private Long orderId;
    private Long productId;
    private String name;
    private String image;
    private Double price;
    private Long quantity;

    public static OrderDetailResponse fromOrderDetail(OrderDetail orderDetail){
        Product product = orderDetail.getProduct();
        return OrderDetailResponse.builder()
                .id(orderDetail.getId())
                .orderId(orderDetail.getOrder().getId())
                .productId(product.getId())
                .name(product.getName())
                .image(product.getImage())
                .price(product.getPrice() * (1 - (double)product.getDiscount()/100))
                .quantity(orderDetail.getQuantity())
                .build();
    }
}
