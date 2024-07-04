package com.example.ecommerce.controllers;

import com.example.ecommerce.dtos.CategoryDTO;
import com.example.ecommerce.models.Category;
import com.example.ecommerce.responses.ResponseSuccess;
import com.example.ecommerce.services.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponseSuccess> createCategory(
            @Valid @RequestBody CategoryDTO categoryDTO) {
        Category category = categoryService.createCategory(categoryDTO);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Create category successfully")
                .status(HttpStatus.CREATED.value())
                .data(category)
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseSuccess> getCategoryById(@PathVariable("id") long id){
        Category category = categoryService.getCategoryById(id);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Get category information successfully")
                .status(HttpStatus.OK.value())
                .data(category)
                .build());
    }

    @GetMapping("")
    public ResponseEntity<ResponseSuccess> getAllCategories(){
        List<Category> categories = categoryService.getAllCategories();
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Get all categories information successfully")
                .status(HttpStatus.OK.value())
                .data(categories)
                .build());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponseSuccess> updateCategory(@PathVariable long id,
                                                          @Valid @RequestBody CategoryDTO categoryDTO){
        Category category = categoryService.updateCategory(id, categoryDTO);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Update category successfully")
                .status(HttpStatus.OK.value())
                .data(category)
                .build());
    }

}
