package com.example.ecommerce.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterDTO {

    @NotBlank(message = "Full name must be not blank")
    private String fullName;

    @NotBlank(message = "Phone must be not blank")
    private String phone;

    @NotBlank(message = "Password must be not blank")
    private String password;

    @NotBlank(message = "Email must be not blank")
    private String email;

    @NotBlank(message = "Address must be not blank")
    private String address;
}
