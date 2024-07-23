package com.example.ecommerce.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LogoutDTO {

    @NotBlank(message = "Token không được để trống")
    private String token;
}