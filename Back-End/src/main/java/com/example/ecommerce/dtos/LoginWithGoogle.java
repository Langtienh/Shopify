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
    @NotBlank(message = "{loginWithGoogle.valid.fullName}")
    private String fullName;

    @NotBlank(message = "{loginWithGoogle.valid.phone}")
    private String phone;

    @NotBlank(message = "{loginWithGoogle.valid.email}")
    private String email;

    @NotBlank(message = "{loginWithGoogle.valid.avatar}")
    private String avatar;

    @NotBlank(message = "{loginWithGoogle.valid.providerId}")
    private String providerId;
}
