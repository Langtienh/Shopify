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

    @NotBlank(message = "{comment.valid.content}")
    private String content;

    @NotNull(message = "{comment.valid.rate}")
    private Long rate;

    @NotNull(message = "{comment.valid.userId}")
    private Long userId;

    @NotNull(message = "{comment.valid.productId}")
    private Long productId;

    private List<MultipartFile> images;
}
