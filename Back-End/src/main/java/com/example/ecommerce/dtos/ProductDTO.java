package com.example.ecommerce.dtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {

    @NotBlank(message = "{product.valid.name}")
    private String name;

    @NotNull(message = "{product.valid.price}")
    @Min(value = 1, message="{product.valid.price.min}")
    private Double price;

    @NotNull(message = "{product.valid.discount}")
    @Min(value = 0, message="{product.valid.discount.min}")
    private Long discount;

    @NotNull(message = "{product.valid.stock}")
    @Min(value = 1, message="{product.valid.stock.min}")
    private Long stock;

    @NotBlank(message = "{product.valid.description}")
    private String description;

    @NotNull(message = "{product.valid.discountForMember}")
    @Min(value = 1, message="{product.valid.discountForMember.min}")
    private Double discountForMember;

    private boolean active;

    @NotNull(message = "{product.valid.brandId}")
    private Long brandId;

    @NotNull(message = "{product.valid.categoryId}")
    private Long categoryId;

    private List<ProductAttributeDTO> attributes;
}
