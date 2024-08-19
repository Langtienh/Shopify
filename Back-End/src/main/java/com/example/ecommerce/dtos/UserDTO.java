package com.example.ecommerce.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    @NotBlank(message = "{user.valid.fullName}")
    private String fullName;

    @NotBlank(message = "{user.valid.phone}")
    private String phone;

    @NotBlank(message = "{user.valid.email}")
    private String email;

    private MultipartFile avatar;
}
