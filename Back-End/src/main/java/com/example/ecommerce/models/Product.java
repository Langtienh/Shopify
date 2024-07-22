package com.example.ecommerce.models;

import com.example.ecommerce.repositories.custom.ProductCustom;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private Double price;

    @Column(name = "discount")
    private Long discount;

    @Column(name = "stock")
    private Long stock;

    @Column(name = "view_count")
    private Long viewCount;

    @Column(name = "description")
    private String description;

    @Column(name = "image")
    private String image;

    @Column(name = "discount_for_member")
    private Double discountForMember;

    @Column(name = "active")
    private boolean active;

    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ProductAttribute> productAttributes;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Comment> comments;

    public static Product fromProductCustom(ProductCustom productCustom){
        return Product.builder()
                .id(productCustom.getId())
                .name(productCustom.getName())
                .price(productCustom.getPrice())
                .discount(productCustom.getDiscount())
                .stock(productCustom.getStock())
                .viewCount(productCustom.getViewCount())
                .description(productCustom.getDescription())
                .image(productCustom.getImage())
                .discountForMember(productCustom.getDiscountForMember())
                .active(productCustom.isActive())
                .brand(productCustom.getBrand())
                .category(productCustom.getCategory())
                .build();
    }
}
