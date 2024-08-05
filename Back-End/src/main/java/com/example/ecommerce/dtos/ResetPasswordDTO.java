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

    @NotBlank(message = "OtpToken không được để trống")
    private String otpToken;

    @NotBlank(message = "Mật khẩu mới không được để trống")
    private String newPassword;
}
