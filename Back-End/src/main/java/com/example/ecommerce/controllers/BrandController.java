package com.example.ecommerce.controllers;

import com.example.ecommerce.dtos.BrandDTO;
import com.example.ecommerce.models.Brand;
import com.example.ecommerce.responses.ResponseSuccess;
import com.example.ecommerce.services.BrandService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/brands")
@RequiredArgsConstructor
public class BrandController {
    private final BrandService brandService;

    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponseSuccess> createBrand(
            @Valid @RequestBody BrandDTO brandDTO){
        Brand brand = brandService.createBrand(brandDTO);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Create brand successfully")
                .status(HttpStatus.CREATED.value())
                .data(brand)
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseSuccess> getBrandById(@PathVariable("id") long id){
        Brand brand = brandService.getBrandById(id);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Get brand information successfully")
                .status(HttpStatus.OK.value())
                .data(brand)
                .build());
    }

    @GetMapping("")
    public ResponseEntity<ResponseSuccess> getAllBrands(){
        List<Brand> brands = brandService.getAllBrands();
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Get all brands information successfully")
                .status(HttpStatus.OK.value())
                .data(brands)
                .build());
    }
    @GetMapping("/category/{cid}")
    public ResponseEntity<ResponseSuccess> getBrandByCategory(@PathVariable("cid") long cid){
        List<Brand> brands = brandService.getBrandByCategory(cid);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Get all brands by category information successfully")
                .status(HttpStatus.OK.value())
                .data(brands)
                .build());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponseSuccess> updateBrand(@PathVariable long id,
                                                          @Valid @RequestBody BrandDTO brandDTO){
        Brand brand = brandService.updateBrand(id, brandDTO);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Update brand successfully")
                .status(HttpStatus.OK.value())
                .data(brand)
                .build());
    }
}
