package com.example.ecommerce.services.impl;

import com.example.ecommerce.dtos.BrandDTO;
import com.example.ecommerce.dtos.CategoryDTO;
import com.example.ecommerce.exceptions.ResourceNotFoundException;
import com.example.ecommerce.models.Brand;
import com.example.ecommerce.models.Category;
import com.example.ecommerce.models.CategoryBrand;
import com.example.ecommerce.repositories.BrandRepository;
import com.example.ecommerce.repositories.CategoryBrandRepository;
import com.example.ecommerce.repositories.CategoryRepository;
import com.example.ecommerce.services.BrandService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BrandServiceImpl implements BrandService {
    private final BrandRepository brandRepository;
    private final CategoryBrandRepository categoryBrandRepository;
    private final CategoryRepository categoryRepository;
    @Override
    @Transactional
    public Brand createBrand(BrandDTO brandDTO) {
        Brand brand = Brand.builder()
                .name(brandDTO.getName())
                .build();
        return brandRepository.save(brand);
    }

    @Override
    public Brand getBrandById(long id) {
        return brandRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Brand not found"));
    }

    @Override
    public List<Brand> getAllBrands() {
        return brandRepository.findAll();
    }

    @Override
    public List<Brand> getBrandByCategory(long cid) {
        Category category = categoryRepository.findById(cid)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        return categoryBrandRepository.findAllByCategory(category)
                .stream()
                .map(CategoryBrand::getBrand)
                .toList();
    }

    @Override
    @Transactional
    public Brand updateBrand(long id, BrandDTO brandDTO) {
        Brand brand = getBrandById(id);
        brand.setName(brandDTO.getName());
        return brandRepository.save(brand);
    }
}
