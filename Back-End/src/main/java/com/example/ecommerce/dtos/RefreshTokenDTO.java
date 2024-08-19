package com.example.ecommerce.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RefreshTokenDTO {

    @NotBlank(message = "{refreshToken.valid.refreshToken}")
    private String refreshToken;
}
