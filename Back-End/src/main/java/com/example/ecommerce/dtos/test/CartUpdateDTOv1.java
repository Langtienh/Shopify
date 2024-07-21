package com.example.ecommerce.dtos.test;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartUpdateDTOv1 {

    @NotNull(message = "Quantity must be not null")
    private Long quantity;
}
