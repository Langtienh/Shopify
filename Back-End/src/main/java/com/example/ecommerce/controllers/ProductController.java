package com.example.ecommerce.controllers;

import com.example.ecommerce.dtos.ProductDTO;
import com.example.ecommerce.responses.PageResponse;
import com.example.ecommerce.responses.ProductResponse;
import com.example.ecommerce.responses.ResponseSuccess;
import com.example.ecommerce.services.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping("")
    public ResponseEntity<ResponseSuccess> getAllProducts(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String[] search,
            @RequestParam(required = false) String... sort
    ){
        PageResponse pageResponse
                = productService.getAllProducts(page, limit, brand, search, sort);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Get all product information successfully")
                .status(HttpStatus.OK.value())
                .data(pageResponse)
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseSuccess> getProductById(@PathVariable("id") long id){
        ProductResponse productResponse = productService.getProductById(id);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Get product information successfully")
                .status(HttpStatus.OK.value())
                .data(productResponse)
                .build());
    }

    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponseSuccess> createProduct(@RequestBody @Valid ProductDTO productDTO){
        ProductResponse productResponse = productService.createProduct(productDTO);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Create product successfully")
                .status(HttpStatus.CREATED.value())
                .data(productResponse)
                .build());
    }
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponseSuccess> updateProduct(@PathVariable("id") long id,
                                                         @RequestBody @Valid ProductDTO productDTO){
        ProductResponse productResponse = productService.updateProduct(id,productDTO);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Update product successfully")
                .status(HttpStatus.OK.value())
                .data(productResponse)
                .build());
    }
}
