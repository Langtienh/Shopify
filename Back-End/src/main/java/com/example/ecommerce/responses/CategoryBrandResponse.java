package com.example.ecommerce.responses;

import com.example.ecommerce.models.Brand;
import com.example.ecommerce.models.Category;
import com.example.ecommerce.models.CategoryBrand;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryBrandResponse {

    private Long id;
    private String brand;
    private String category;

    public static CategoryBrandResponse fromCategoryBrand(CategoryBrand categoryBrand){
        return CategoryBrandResponse.builder()
                .id(categoryBrand.getId())
                .brand(categoryBrand.getBrand().getName())
                .category(categoryBrand.getCategory().getName())
                .build();
    }
}
