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
    private List<String> values;

    public static AttributeResponse fromAttribute(Attribute attribute, List<ProductAttribute> productAttributes){
        return AttributeResponse.builder()
                .name(attribute.getName())
                .values(productAttributes.stream()
                        .map(ProductAttribute::getValue)
                        .distinct()
                        .toList())
                .build();
    }
}
