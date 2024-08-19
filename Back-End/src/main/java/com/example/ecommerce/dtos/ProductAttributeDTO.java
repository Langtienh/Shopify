package com.example.ecommerce.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductAttributeDTO {

    @NotBlank(message = "{productAttribute.valid.attribute}")
    private String attribute;

    @NotBlank(message = "{productAttribute.valid.value}")
    private String value;
    private String label;
}
