package com.example.ecommerce.services.impl;

import com.example.ecommerce.dtos.CommentDTO;
import com.example.ecommerce.exceptions.ResourceNotFoundException;
import com.example.ecommerce.models.Comment;
import com.example.ecommerce.models.Product;
import com.example.ecommerce.models.User;
import com.example.ecommerce.repositories.CommentRepository;
import com.example.ecommerce.repositories.ProductRepository;
import com.example.ecommerce.repositories.UserRepository;
import com.example.ecommerce.responses.CommentResponse;
import com.example.ecommerce.responses.PageResponse;
import com.example.ecommerce.services.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    @Override
    @Transactional
    public CommentResponse createComment(CommentDTO commentDTO) {
        Product product = productRepository.findById(commentDTO.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        User user = userRepository.findById(commentDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Comment comment = Comment.builder()
                .content(commentDTO.getContent())
                .rate(commentDTO.getRate())
                .user(user)
                .product(product)
                .date(LocalDateTime.now())
                .build();
        return CommentResponse.fromComment(commentRepository.save(comment));
    }

    @Override
    public PageResponse getAllCommentsByProduct(Long pid, int page, int limit) {
        Product product = productRepository.findById(pid)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        page = page > 0 ? page - 1 : page;
        Pageable pageable = PageRequest.of(page, limit);
        Page<Comment> commentPage = commentRepository.findAllByProduct(product, pageable);
        return PageResponse.builder()
                .page(page + 1)
                .limit(limit)
                .totalPage(commentPage.getTotalPages())
                .result(commentPage.stream().map(CommentResponse::fromComment).toList())
                .build();
    }

    @Override
    public CommentResponse getCommentById(long id) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found"));
        return CommentResponse.fromComment(comment);
    }
}
