package com.example.ecommerce.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartItemDTO {
    @NotNull(message = "{cart.valid.productId}")
    private Long productId;

    @NotNull(message = "{cart.valid.quantity}")
    private Long quantity;
}
