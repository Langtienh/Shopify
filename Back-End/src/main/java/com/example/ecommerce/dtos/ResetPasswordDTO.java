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
public class ResetPasswordDTO {

    @NotBlank(message = "{resetPassword.valid.otpToken}")
    private String otpToken;

    @NotBlank(message = "{resetPassword.valid.newPassword}")
    private String newPassword;
}
