package com.example.ecommerce.controllers;

import com.example.ecommerce.dtos.BrandDTO;
import com.example.ecommerce.models.Brand;
import com.example.ecommerce.responses.ResponseSuccess;
import com.example.ecommerce.services.BrandService;
import com.example.ecommerce.utils.Translator;
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
                .message(Translator.toLocale("brand.create.success"))
                .status(HttpStatus.CREATED.value())
                .data(brand)
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseSuccess> getBrandById(@PathVariable("id") long id){
        Brand brand = brandService.getBrandById(id);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message(Translator.toLocale("brand.get_by_id.success"))
                .status(HttpStatus.OK.value())
                .data(brand)
                .build());
    }

    @GetMapping("")
    public ResponseEntity<ResponseSuccess> getAllBrands(){
        List<Brand> brands = brandService.getAllBrands();
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message(Translator.toLocale("brand.get_all.success"))
                .status(HttpStatus.OK.value())
                .data(brands)
                .build());
    }
    @GetMapping("/category/{cname}")
    public ResponseEntity<ResponseSuccess> getBrandByCategory(@PathVariable("cname") String cname){
        List<Brand> brands = brandService.getBrandByCategory(cname);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message(Translator.toLocale("brand.get_all_by_category.success"))
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
                .message(Translator.toLocale("brand.update.success"))
                .status(HttpStatus.OK.value())
                .data(brand)
                .build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponseSuccess> deleteBrand(@PathVariable long id){
        brandService.deleteBrand(id);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message(Translator.toLocale("brand.delete.success"))
                .status(HttpStatus.NO_CONTENT.value())
                .build());
    }
}
