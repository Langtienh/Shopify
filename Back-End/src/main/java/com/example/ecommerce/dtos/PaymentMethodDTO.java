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
public class PaymentMethodDTO {

    @NotBlank(message = "{paymentMethod.valid.name}")
    private String name;

    @NotBlank(message = "{paymentMethod.valid.description}")
    private String description;

    @NotBlank(message = "{paymentMethod.valid.image}")
    private String image;

}
