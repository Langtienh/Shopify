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

    @NotNull(message = "ID người dùng không được rỗng")
    private Long userId;

    @NotNull(message = "ID sản phẩm không được rỗng")
    private Long productId;
}
