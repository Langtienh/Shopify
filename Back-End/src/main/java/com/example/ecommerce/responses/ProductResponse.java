package com.example.ecommerce.responses;

import com.example.ecommerce.models.Product;
import com.example.ecommerce.models.ProductAttribute;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import lombok.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductResponse {
    private Long id;
    private String name;
    private Double price;
    private Long discount;
    private Long stock;
    private Long viewCount;
    private double avgRate;
    private String description;
    private String image;
    private Double discountForMember;
    private boolean active;
    private String brand;
    private String category;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Map<String, String> attributes;

    public static ProductResponse fromProduct(Product p, double avgRate,
                                              List<ProductAttribute> productAttributes){
        ProductResponse productResponse = ProductResponse.builder()
                .id(p.getId())
                .name(p.getName())
                .price(p.getPrice())
                .discount(p.getDiscount())
                .stock(p.getStock())
                .viewCount(p.getViewCount())
                .avgRate(avgRate)
                .description(p.getDescription())
                .image(p.getImage())
                .discountForMember(p.getDiscountForMember())
                .active(p.isActive())
                .brand(p.getBrand().getName())
                .category(p.getCategory().getName())
                .build();
        if(productAttributes != null){
            Map<String,String> attributes = new LinkedHashMap<>();
            for(ProductAttribute pa : productAttributes){
                attributes.put(pa.getAttribute().getName(), pa.getValue());
            }
            productResponse.setAttributes(attributes);
        }
        return productResponse;
    }
}
