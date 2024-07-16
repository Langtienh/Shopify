package com.example.ecommerce.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WishListDTO {

    @NotNull(message = "User ID must be not null")
    private Long userId;

    @NotNull(message = "Product ID must be not null")
    private Long productId;
}
