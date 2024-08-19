package com.example.ecommerce.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LogoutDTO {

    @NotBlank(message = "{logout.valid.token}")
    private String token;
}