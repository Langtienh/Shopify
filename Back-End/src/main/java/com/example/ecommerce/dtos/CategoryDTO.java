package com.example.ecommerce.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {

    @NotBlank(message = "Tên danh mục không được để trống")
    private String name;
    @NotBlank(message = "Label không được để trống")
    private String label;
}
