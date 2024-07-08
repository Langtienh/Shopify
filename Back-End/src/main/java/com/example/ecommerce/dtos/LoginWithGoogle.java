package com.example.ecommerce.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginWithGoogle {
    @NotBlank(message = "FullName must be not blank")
    private String fullName;

    @NotBlank(message = "Phone must be not blank")
    private String phone;

    @NotBlank(message = "Email must be not blank")
    private String email;

    @NotBlank(message = "Avatar must be not blank")
    private String avatar;

    @NotBlank(message = "ProviderID must be not blank")
    private String providerId;
}
