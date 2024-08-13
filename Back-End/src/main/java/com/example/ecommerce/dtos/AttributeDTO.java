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

    @NotBlank(message = "Tên thuộc tính không được để trống")
    private String name;
    @NotBlank(message = "Label không được để trống")
    private String label;
    @NotBlank(message = "Slug không được để trống")
    private String slug;
}
