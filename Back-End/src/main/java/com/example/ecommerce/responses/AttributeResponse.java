package com.example.ecommerce.responses;

import com.example.ecommerce.models.Attribute;
import com.example.ecommerce.models.ProductAttribute;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AttributeResponse {
    private String name;
    private String label;
    private String slug;
    private List<ProductAttributeResponse> values;

    public static AttributeResponse fromAttribute(Attribute attribute, List<ProductAttribute> productAttributes){
        return AttributeResponse.builder()
                .name(attribute.getName())
                .label(attribute.getLabel())
                .slug(attribute.getSlug())
                .values(productAttributes.stream()
                        .map(ProductAttributeResponse::fromProductAttribute)
                        .distinct()
                        .toList())
                .build();
    }
}
