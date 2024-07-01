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
    private Long userId;
    private Long productId;

    public static CommentResponse fromComment(Comment comment){
        return CommentResponse.builder()
                .id(comment.getId())
                .content(comment.getContent())
                .rate(comment.getRate())
                .userId(comment.getUser().getId())
                .productId(comment.getProduct().getId())
                .build();
    }
}
