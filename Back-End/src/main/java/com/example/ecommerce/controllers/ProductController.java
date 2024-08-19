package com.example.ecommerce.controllers;

import com.example.ecommerce.dtos.ProductDTO;
import com.example.ecommerce.responses.PageResponse;
import com.example.ecommerce.responses.ProductResponse;
import com.example.ecommerce.responses.ResponseSuccess;
import com.example.ecommerce.services.ProductService;
import com.example.ecommerce.utils.Translator;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("${api.prefix}/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping("/search-product")
    public ResponseEntity<ResponseSuccess> searchProduct(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String[] search,
            @RequestParam(defaultValue = "true") boolean active,
            @RequestParam(required = false) String... sort

    ){
        PageResponse pageResponse
                = productService.searchProduct(page, limit, brand,category, search, active, sort);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message(Translator.toLocale("product.search_product.success"))
                .status(HttpStatus.OK.value())
                .data(pageResponse)
                .build());
    }

    @GetMapping("")
    public ResponseEntity<ResponseSuccess> getAllProducts(){
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message(Translator.toLocale("product.get_all.success"))
                .status(HttpStatus.OK.value())
                .data(productService.getAllProducts())
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseSuccess> getProductById(@PathVariable("id") long id){
        ProductResponse productResponse = productService.getProductById(id);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message(Translator.toLocale("product.get_by_id.success"))
                .status(HttpStatus.OK.value())
                .data(productResponse)
                .build());
    }

    @PostMapping(value = "")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponseSuccess> createProduct(@RequestBody @Valid ProductDTO productDTO){

        ProductResponse productResponse = productService.createProduct(productDTO);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message(Translator.toLocale("product.create.success"))
                .status(HttpStatus.CREATED.value())
                .data(productResponse)
                .build());
    }
    @PutMapping(value = "/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponseSuccess> updateProduct(@PathVariable("id") long id,
                                                         @RequestBody @Valid ProductDTO productDTO){
        ProductResponse productResponse = productService.updateProduct(id,productDTO);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message(Translator.toLocale("product.update.success"))
                .status(HttpStatus.OK.value())
                .data(productResponse)
                .build());
    }

    @PutMapping("/update-status/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponseSuccess> updateProductStatus(@PathVariable long id,
                                                               @RequestParam("active") boolean active){
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message(Translator.toLocale("product.update_status.success"))
                .status(HttpStatus.OK.value())
                .data(productService.updateProductStatus(id, active))
                .build());
    }

    @PutMapping("/view-count/{id}")
    public ResponseEntity<ResponseSuccess> updateViewCount(@PathVariable long id){
        productService.updateViewCount(id);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message(Translator.toLocale("product.view_count.success"))
                .status(HttpStatus.OK.value())
                .build());
    }
}
