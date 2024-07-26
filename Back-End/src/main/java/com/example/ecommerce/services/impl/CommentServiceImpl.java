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
import com.example.ecommerce.responses.ProductResponse;
import com.example.ecommerce.responses.UserResponse;
import com.example.ecommerce.services.AuthService;
import com.example.ecommerce.services.CommentService;
import com.example.ecommerce.services.ProductService;
import com.example.ecommerce.services.UserService;
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
    private final UserService userService;
    private final ProductService productService;
    private final AuthService authService;
    @Override
    @Transactional
    public CommentResponse createComment(CommentDTO commentDTO) {
        authService.checkAuth(commentDTO.getUserId());
        Product product = productService.findById(commentDTO.getProductId());
        User user = userService.findById(commentDTO.getUserId());
        Comment comment = Comment.builder()
                .content(commentDTO.getContent())
                .rate(commentDTO.getRate())
                .user(user)
                .product(product)
                .date(LocalDateTime.now())
                .build();
        return CommentResponse.fromComment(commentRepository.save(comment),
                ProductResponse.fromProduct(product,0, null),
                UserResponse.fromUser(user));
    }

    @Override
    public PageResponse getAllCommentsByProduct(Long pid,Long rate, int page, int limit) {
        Product product = productService.findById(pid);
        page = page > 0 ? page - 1 : page;
        Pageable pageable = PageRequest.of(page, limit);
        Page<Comment> commentPage = commentRepository.findAllByProductAndRate(product,rate, pageable);
        return PageResponse.builder()
                .page(page + 1)
                .limit(limit)
                .totalPage(commentPage.getTotalPages())
                .totalItem((int)commentPage.getTotalElements())
                .result(commentPage.stream().map(comment ->
                     CommentResponse.fromComment(comment,
                            ProductResponse.fromProduct(comment.getProduct(), 0,null),
                            UserResponse.fromUser(comment.getUser()))
                ).toList())
                .build();
    }

    @Override
    public CommentResponse getCommentById(long id) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id = " + id));
        return CommentResponse.fromComment(comment,
                ProductResponse.fromProduct(comment.getProduct(), 0,null),
                UserResponse.fromUser(comment.getUser()));
    }
}
