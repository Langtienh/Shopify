package com.example.ecommerce.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {

    @NotBlank(message = "Content must be not blank")
    private String content;

    @NotNull(message = "Rate must be not null")
    private Long rate;

    @NotNull(message = "User ID must be not null")
    private Long userId;

    @NotNull(message = "Product ID must be not null")
    private Long productId;
}
