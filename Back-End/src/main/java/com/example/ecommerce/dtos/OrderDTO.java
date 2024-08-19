package com.example.ecommerce.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {

    @NotBlank(message = "{order.valid.fullName}")
    private String fullName;

    @NotBlank(message = "{order.valid.phone}")
    private String phone;

    @NotBlank(message = "{order.valid.email}")
    private String email;

    @NotBlank(message = "{order.valid.address}")
    private String address;

    @NotNull(message = "{order.valid.userId}")
    private Long userId;

    @NotNull(message = "{order.valid.paymentMethodId}")
    private Long paymentMethodId;

    @NotNull(message = "{order.valid.cartItemIds}")
    private List<Long> cartItemIds;


}
