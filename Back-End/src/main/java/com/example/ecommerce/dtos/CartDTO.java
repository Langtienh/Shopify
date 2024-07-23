package com.example.ecommerce.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
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
public class CartDTO {
    @NotNull(message = "ID người dùng không được rỗng")
    private Long userId;

    @NotNull(message = "ID sản phẩm không được rỗng")
    private Long productId;

}
