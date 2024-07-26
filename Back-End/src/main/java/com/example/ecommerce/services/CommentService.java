package com.example.ecommerce.services;

import com.example.ecommerce.dtos.CommentDTO;
import com.example.ecommerce.responses.CommentResponse;
import com.example.ecommerce.responses.PageResponse;

public interface CommentService {
    CommentResponse createComment(CommentDTO commentDTO);
    PageResponse getAllCommentsByProduct(Long pid,Long rate, int page, int limit);
    CommentResponse getCommentById(long id);
}
