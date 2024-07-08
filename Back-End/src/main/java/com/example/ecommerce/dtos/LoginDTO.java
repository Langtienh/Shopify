package com.example.ecommerce.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginDTO {

    @NotBlank(message = "Phone must be not blank")
    private String phone;

    @NotBlank(message = "Password must be not blank")
    private String password;
}