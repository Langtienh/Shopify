package com.example.ecommerce.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {

    @NotBlank(message = "Full name must be not blank")
    private String fullName;

    @NotBlank(message = "Phone must be not blank")
    private String phone;

    @NotBlank(message = "Email must be not blank")
    private String email;

    @NotBlank(message = "Address must be not blank")
    private String address;

    @NotNull(message = "User ID must be not null")
    private Long userId;
}
