package com.example.ecommerce.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {

    @NotBlank(message = "Product name must be not blank")
    private String name;

    @NotNull(message = "Price must be not null")
    @Min(value = 1, message="Price must be greater than or equal to 1")
    private Double price;

    @NotNull(message = "Discount must be not null")
    @Min(value = 0, message="Discount must be greater than or equal to 0")
    private Long discount;

    @NotNull(message = "Stock must be not null")
    @Min(value = 1, message="Stock must be greater than or equal to 1")
    private Long stock;

    @NotBlank(message = "Description must be not blank")
    private String description;

    @NotBlank(message = "Image must be not blank")
    private String image;

    @NotNull(message = "DiscountForMember must be not null")
    @Min(value = 1, message="DiscountForMember must be greater than or equal to 1")
    @JsonProperty("discount_for_member")
    private Double discountForMember;

    private boolean active;

    @NotNull(message = "Brand id must be not null")
    @JsonProperty("brand_id")
    private Long brandId;

    private Map<String, String> attributes;
}
