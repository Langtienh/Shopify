package com.example.ecommerce.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {

    @NotBlank(message = "{category.valid.name}")
    private String name;
    @NotBlank(message = "{category.valid.label}")
    private String label;
}
