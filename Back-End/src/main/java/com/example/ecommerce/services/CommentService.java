package com.example.ecommerce.services;

import com.example.ecommerce.dtos.CommentDTO;
import com.example.ecommerce.models.Comment;
import com.example.ecommerce.responses.CommentResponse;
import com.example.ecommerce.responses.PageResponse;
import org.springframework.data.domain.Page;

public interface CommentService {
    CommentResponse createComment(CommentDTO commentDTO);
    PageResponse getAllCommentsByProduct(Long pid,Long rate, int page, int limit);
    CommentResponse getCommentById(long id);
    Comment findById(long id);
    PageResponse getAllComments(int page, int limit);
    void deleteComment(long id);
}
