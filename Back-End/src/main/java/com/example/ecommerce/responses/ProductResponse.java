package com.example.ecommerce.responses;

import com.example.ecommerce.models.Product;
import com.example.ecommerce.models.ProductAttribute;
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
    @JsonProperty("view_count")
    private Long viewCount;
    private String description;
    private String image;
    @JsonProperty("discount_for_member")
    private Double discountForMember;
    private boolean active;
    private String brand;
    private Map<String, String> attributes;

    public static ProductResponse fromProduct(Product p, List<ProductAttribute> productAttributes){
        ProductResponse productResponse = ProductResponse.builder()
                .id(p.getId())
                .name(p.getName())
                .price(p.getPrice())
                .discount(p.getDiscount())
                .stock(p.getStock())
                .viewCount(p.getViewCount())
                .description(p.getDescription())
                .image(p.getImage())
                .discountForMember(p.getDiscountForMember())
                .active(p.isActive())
                .brand(p.getBrand().getName())
                .build();
        Map<String,String> attributes = new LinkedHashMap<>();
        for(ProductAttribute pa : productAttributes){
            attributes.put(pa.getAttribute().getName(), pa.getValue());
        }
        productResponse.setAttributes(attributes);
        return productResponse;
    }
}
