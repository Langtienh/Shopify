package com.example.ecommerce.services.impl;

import com.example.ecommerce.dtos.ProductDTO;
import com.example.ecommerce.exceptions.ResourceNotFoundException;
import com.example.ecommerce.models.*;
import com.example.ecommerce.repositories.*;
import com.example.ecommerce.responses.PageResponse;
import com.example.ecommerce.responses.ProductResponse;
import com.example.ecommerce.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final ProductAttributeRepository productAttributeRepository;
    private final AttributeRepository attributeRepository;
    private final BrandRepository brandRepository;
    private final SearchRepository searchRepository;
    private final CategoryRepository categoryRepository;
    @Override
    public PageResponse searchProduct(
            int page, int limit, String brand,String category, String[] search, String... sort) {
        return searchRepository.searchProduct(page, limit, brand,category, search, sort);
    }

    @Override
    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(p -> ProductResponse.fromProduct(p, null))
                .toList();
    }

    @Override
    public ProductResponse getProductById(Long id) {
        Product p = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        return ProductResponse.fromProduct(p, productAttributeRepository.findAllByProduct(p));
    }

    @Override
    @Transactional
    public ProductResponse createProduct(ProductDTO productDTO) {
        Brand brand = brandRepository.findById(productDTO.getBrandId())
                .orElseThrow(() -> new ResourceNotFoundException("Brand not found"));
        Category category = categoryRepository.findById(productDTO.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        Product product = productRepository.save(Product.builder()
                .name(productDTO.getName())
                .price(productDTO.getPrice())
                .discount(productDTO.getDiscount())
                .stock(productDTO.getStock())
                .viewCount(0L)
                .description(productDTO.getDescription())
                .image(productDTO.getImage())
                .discountForMember(productDTO.getDiscountForMember())
                .active(productDTO.isActive())
                .brand(brand)
                .category(category)
                .build());
        List<ProductAttribute> productAttributes = new ArrayList<>();
        productDTO.getAttributes().forEach((key, value) -> {
            Attribute attribute = attributeRepository.findByName(key);
            ProductAttribute productAttribute = ProductAttribute.builder()
                    .attribute(attribute)
                    .product(product)
                    .value(value)
                    .build();
            productAttributes.add(productAttributeRepository.save(productAttribute));
        });
        return ProductResponse.fromProduct(product, productAttributes);
    }

    @Override
    @Transactional
    public ProductResponse updateProduct(long id, ProductDTO productDTO) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        Brand brand = brandRepository.findById(productDTO.getBrandId())
                .orElseThrow(() -> new ResourceNotFoundException("Brand not found"));
        Category category = categoryRepository.findById(productDTO.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        product.setName(productDTO.getName());
        product.setPrice(productDTO.getPrice());
        product.setDiscount(productDTO.getDiscount());
        product.setStock(productDTO.getStock());
        product.setDescription(productDTO.getDescription());
        product.setImage(productDTO.getImage());
        product.setDiscountForMember(productDTO.getDiscountForMember());
        product.setActive(productDTO.isActive());
        product.setBrand(brand);
        product.setCategory(category);
        return ProductResponse.fromProduct(productRepository.save(product), null);
    }
}
