package com.example.ecommerce.controllers;

import com.example.ecommerce.dtos.CommentDTO;
import com.example.ecommerce.models.Comment;
import com.example.ecommerce.responses.CommentResponse;
import com.example.ecommerce.responses.PageResponse;
import com.example.ecommerce.responses.ResponseSuccess;
import com.example.ecommerce.services.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/comments")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponseSuccess> createComment(@Valid @RequestBody CommentDTO commentDTO){
        CommentResponse commentResponse = commentService.createComment(commentDTO);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Create comment successfully")
                .status(HttpStatus.CREATED.value())
                .data(commentResponse)
                .build());
    }

    @GetMapping("/product/{pid}")
    public ResponseEntity<ResponseSuccess> getAllCommentsByProduct(@PathVariable long pid,
                                                                   @RequestParam(value = "rate", required = false) Long rate,
                                                                   @RequestParam(defaultValue = "1") int page,
                                                                   @RequestParam(defaultValue = "5") int limit){
        PageResponse pageResponse = commentService.getAllCommentsByProduct(pid,rate, page, limit);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Get all comments by product information successfully")
                .status(HttpStatus.OK.value())
                .data(pageResponse)
                .build());
    }
    @GetMapping("/{id}")
    public ResponseEntity<ResponseSuccess> getCommentById(@PathVariable long id){
        CommentResponse commentResponse = commentService.getCommentById(id);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Get comment information successfully")
                .status(HttpStatus.OK.value())
                .data(commentResponse)
                .build());
    }
}
