package com.example.ecommerce.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {

    @NotBlank(message = "Nội dung không được để trống")
    private String content;

    @NotNull(message = "Số sao không được rỗng")
    private Long rate;

    @NotNull(message = "ID người dùng không được rỗng")
    private Long userId;

    @NotNull(message = "ID sản phẩm không được rỗng")
    private Long productId;

    private List<MultipartFile> images;
}
