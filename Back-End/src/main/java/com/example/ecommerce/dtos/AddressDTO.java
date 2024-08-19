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
public class AddressDTO {

    @NotBlank(message = "{address.valid.name}")
    private String name;

    @NotBlank(message = "{address.valid.detail}")
    private String detail;

    @NotBlank(message = "{address.valid.code}")
    private String code;

    private boolean isDefault;

    @NotNull(message = "{address.valid.userId}")
    private Long userId;
}
