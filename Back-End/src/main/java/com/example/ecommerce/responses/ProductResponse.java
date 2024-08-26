package com.example.ecommerce.responses;

import com.example.ecommerce.dtos.ProductAttributeDTO;
import com.example.ecommerce.models.Brand;
import com.example.ecommerce.models.Category;
import com.example.ecommerce.models.Product;
import com.example.ecommerce.models.ProductAttribute;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import lombok.*;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
    private Brand brand;
    private Category category;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<ProductAttributeDTO> attributes;

    public static ProductResponse fromProduct(Product p, double avgRate,
                                              List<ProductAttribute> productAttributes){
        List<ProductAttributeDTO> list = new ArrayList<>();
        if(productAttributes != null){
            list = productAttributes.stream()
                    .map(pa -> ProductAttributeDTO.builder()
                            .attribute(pa.getAttribute().getName())
                            .value(pa.getValue())
                            .label(pa.getAttribute().getLabel())
                            .build())
                    .toList();
        }
        return ProductResponse.builder()
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
                .brand(p.getBrand())
                .category(p.getCategory())
                .attributes(list)
                .build();
    }
}
