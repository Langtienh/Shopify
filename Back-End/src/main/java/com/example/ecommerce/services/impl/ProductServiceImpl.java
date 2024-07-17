package com.example.ecommerce.services.impl;

import com.example.ecommerce.dtos.ProductDTO;
import com.example.ecommerce.exceptions.ResourceNotFoundException;
import com.example.ecommerce.models.*;
import com.example.ecommerce.repositories.*;
import com.example.ecommerce.responses.PageResponse;
import com.example.ecommerce.responses.ProductResponse;
import com.example.ecommerce.services.BrandService;
import com.example.ecommerce.services.CategoryService;
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
    private final BrandService brandService;
    private final SearchRepository searchRepository;
    private final CategoryService categoryService;
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
    public Product findById(long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id = " + id));
    }

    @Override
    public ProductResponse getProductById(Long id) {
        Product p = findById(id);
        return ProductResponse.fromProduct(p, productAttributeRepository.findAllByProduct(p));
    }

    @Override
    @Transactional
    public ProductResponse createProduct(ProductDTO productDTO) {
        Brand brand = brandService.getBrandById(productDTO.getBrandId());
        Category category = categoryService.getCategoryById(productDTO.getCategoryId());
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
        Product product = findById(id);
        Brand brand = brandService.getBrandById(productDTO.getBrandId());
        Category category = categoryService.getCategoryById(productDTO.getCategoryId());
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
