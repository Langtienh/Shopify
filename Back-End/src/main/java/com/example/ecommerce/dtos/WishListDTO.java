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

    @NotNull(message = "{wishList.valid.userId}")
    private Long userId;

    @NotNull(message = "{wishList.valid.productId}")
    private Long productId;
}
