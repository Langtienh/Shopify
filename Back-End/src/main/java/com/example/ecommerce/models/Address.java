package com.example.ecommerce.models;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "address")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "detail")
    private String detail;

    @Column(name = "code")
    private String code;

    @Column(name = "is_default")
    private boolean isDefault;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
