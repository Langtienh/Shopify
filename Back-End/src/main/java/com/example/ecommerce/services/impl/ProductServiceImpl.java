package com.example.ecommerce.services.impl;

import com.example.ecommerce.dtos.ProductDTO;
import com.example.ecommerce.exceptions.ResourceNotFoundException;
import com.example.ecommerce.models.Attribute;
import com.example.ecommerce.models.Brand;
import com.example.ecommerce.models.Product;
import com.example.ecommerce.models.ProductAttribute;
import com.example.ecommerce.repositories.AttributeRepository;
import com.example.ecommerce.repositories.BrandRepository;
import com.example.ecommerce.repositories.ProductAttributeRepository;
import com.example.ecommerce.repositories.ProductRepository;
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
    @Override
    public List<ProductResponse> getAllProducts() {
        List<Product> products = productRepository.findAll();

        return products.stream()
                .map(p -> ProductResponse.fromProduct(p, productAttributeRepository.findAllByProduct(p)))
                .collect(Collectors.toList());
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
}
