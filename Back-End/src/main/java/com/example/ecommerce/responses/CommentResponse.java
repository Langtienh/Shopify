package com.example.ecommerce.responses;


import com.example.ecommerce.models.Comment;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentResponse {
    private Long id;
    private String content;
    private Long rate;
    private UserResponse user;
    private ProductResponse product;

    public static CommentResponse fromComment(Comment comment,
                                              ProductResponse productResponse, UserResponse userResponse){
        return CommentResponse.builder()
                .id(comment.getId())
                .content(comment.getContent())
                .rate(comment.getRate())
                .user(userResponse)
                .product(productResponse)
                .build();
    }
}
