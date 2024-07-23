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
    @NotNull(message = "ID sản phẩm không được rỗng")
    private Long productId;

    @NotNull(message = "Số lượng không được rỗng")
    private Long quantity;
}
