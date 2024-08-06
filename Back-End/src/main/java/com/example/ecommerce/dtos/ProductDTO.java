package com.example.ecommerce.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {

    @NotBlank(message = "Tên sản phẩm không được để trống")
    private String name;

    @NotNull(message = "Giá không được rỗng")
    @Min(value = 1, message="Giá phải lớn hơn hoặc bằng 1")
    private Double price;

    @NotNull(message = "Giảm giá không được rỗng")
    @Min(value = 0, message="Mức giảm giá phải lớn hơn hoặc bằng 0")
    private Long discount;

    @NotNull(message = "Số lượng tồn kho không được rỗng")
    @Min(value = 1, message="Số lượng tồn kho phải lớn hơn hoặc bằng 1")
    private Long stock;

    @NotBlank(message = "Mô tả không được để trống")
    private String description;

    private MultipartFile image;

    @NotNull(message = "Giảm giá cho học sinh/sinh viên không được rỗng")
    @Min(value = 1, message="Giảm giá cho học sinh/sinh viên phải lớn hơn hoặc bằng 1")
    private Double discountForMember;

    private boolean active;

    @NotNull(message = "ID thương hiệu không được rỗng")
    private Long brandId;

    @NotNull(message = "ID danh mục không được rỗng")
    private Long categoryId;

    private Map<String, String> attributes;
}
