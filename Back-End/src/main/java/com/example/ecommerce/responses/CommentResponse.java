package com.example.ecommerce.responses;


import com.example.ecommerce.models.Comment;
import lombok.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentResponse {
    private Long id;
    private String content;
    private Long rate;
    private boolean isPurchased;
    private UserResponse user;
    private ProductResponse product;
    private List<String> images;

    public static CommentResponse fromComment(Comment comment,
                                              ProductResponse productResponse, UserResponse userResponse){
        List<String> result = comment.getImage() == null ? new ArrayList<>() :
                Arrays.stream(comment.getImage().split(";")).toList();
        return CommentResponse.builder()
                .id(comment.getId())
                .content(comment.getContent())
                .rate(comment.getRate())
                .isPurchased(comment.isPurchased())
                .user(userResponse)
                .product(productResponse)
                .images(result)
                .build();
    }
}
