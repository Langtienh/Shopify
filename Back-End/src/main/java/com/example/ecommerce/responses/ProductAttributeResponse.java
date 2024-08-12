package com.example.ecommerce.responses;

import com.example.ecommerce.models.ProductAttribute;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductAttributeResponse {
    private String value;
    private String slug;

    public static ProductAttributeResponse fromProductAttribute(ProductAttribute productAttribute){
        return ProductAttributeResponse.builder()
                .value(productAttribute.getValue())
                .slug(productAttribute.getSlug())
                .build();
    }
}
