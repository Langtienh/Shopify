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
public class ChangePasswordDTO {

    @NotBlank(message = "{changePassword.valid.oldPassword}")
    private String oldPassword;

    @NotBlank(message = "{changePassword.valid.newPassword}")
    private String newPassword;
}
