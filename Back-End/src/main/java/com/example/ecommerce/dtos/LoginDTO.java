package com.example.ecommerce.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginDTO {

    @NotBlank(message = "{login.valid.phone}")
    private String phone;

    @NotBlank(message = "{login.valid.password}")
    private String password;
}