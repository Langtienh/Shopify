package com.example.ecommerce.repositories.custom;

import com.example.ecommerce.models.Brand;
import com.example.ecommerce.models.Category;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductCustom {
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
}
