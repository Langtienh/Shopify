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

    @NotBlank(message = "Họ và tên không được để trống")
    private String fullName;

    @NotBlank(message = "Số điện thoại không được để trống")
    private String phone;

    @NotBlank(message = "Email không được để trống")
    private String email;

    @NotBlank(message = "Địa chỉ không được để trống")
    private String address;

    @NotNull(message = "ID người dùng không được để trống")
    private Long userId;

    @NotNull(message = "Danh sách ID sản phẩm không được rỗng")
    private List<Long> cartItemIds;

    @NotNull(message = "ID phương thức thanh toán không được rỗng")
    private Long paymentMethodId;
}
