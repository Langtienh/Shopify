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
public class AddressUpdateDTO {

    @NotBlank(message = "Tên gợi nhớ không được để trống")
    private String name;

    @NotBlank(message = "Số nhà, tên đường không được để trống")
    private String detail;

    @NotBlank(message = "Code không được để trống")
    private String code;

    private boolean isDefault;
}
