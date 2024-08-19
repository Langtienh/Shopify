package com.example.ecommerce.controllers;

import com.example.ecommerce.models.Attribute;
import com.example.ecommerce.responses.CategoryBrandResponse;
import com.example.ecommerce.responses.ResponseSuccess;
import com.example.ecommerce.services.CategoryBrandService;
import com.example.ecommerce.utils.Translator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/category-brands")
@RequiredArgsConstructor
public class CategoryBrandController {
    private final CategoryBrandService categoryBrandService;

    @GetMapping("")
    public ResponseEntity<ResponseSuccess> getAllCategoryBrands(){
        List<CategoryBrandResponse> categoryBrandResponses = categoryBrandService.getAllCategoryBrands();
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message(Translator.toLocale("category_brand.get_all.success"))
                .status(HttpStatus.OK.value())
                .data(categoryBrandResponses)
                .build());
    }
}
