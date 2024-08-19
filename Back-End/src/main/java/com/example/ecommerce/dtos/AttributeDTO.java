package com.example.ecommerce.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AttributeDTO {

    @NotBlank(message = "{attribute.valid.name}")
    private String name;
    @NotBlank(message = "{attribute.valid.label}")
    private String label;
}
