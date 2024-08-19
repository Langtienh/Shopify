package com.example.ecommerce.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
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
public class RegisterDTO {

    @NotBlank(message = "{register.valid.fullName}")
    private String fullName;

    @NotBlank(message = "{register.valid.phone}")
    private String phone;

    @NotBlank(message = "{register.valid.password}")
    private String password;

    @NotBlank(message = "{register.valid.email}")
    private String email;

}
