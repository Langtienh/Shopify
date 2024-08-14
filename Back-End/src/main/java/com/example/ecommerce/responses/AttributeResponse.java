package com.example.ecommerce.responses;

import com.example.ecommerce.models.Attribute;
import com.example.ecommerce.models.ProductAttribute;
import lombok.*;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AttributeResponse {
    private String name;
    private String label;
    private List<ProductAttributeResponse> values;

    public static AttributeResponse fromAttribute(Attribute attribute, List<ProductAttribute> productAttributes){
        return AttributeResponse.builder()
                .name(attribute.getName())
                .label(attribute.getLabel())
                .values(productAttributes.stream()
                        .map(ProductAttributeResponse::fromProductAttribute)
                        .collect(Collectors.toMap(
                                ProductAttributeResponse::getValue, // Sử dụng trường value làm khóa
                                Function.identity(), // Sử dụng chính đối tượng là giá trị
                                (existing, replacement) -> existing // Giữ lại phần tử đầu tiên nếu có trùng lặp
                        ))
                        .values()
                        .stream()
                        .toList())
                .build();
    }
}
