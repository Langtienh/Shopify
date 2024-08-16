package com.example.ecommerce.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductAttributeDTO {
    @NotBlank(message = "Attribute không được để trống")
    private String attribute;
    @NotBlank(message = "Value không được để trống")
    private String value;
    private String label;
}
