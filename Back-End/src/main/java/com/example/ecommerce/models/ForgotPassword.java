package com.example.ecommerce.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "forgot_passwords")
public class ForgotPassword {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "otp")
    private String otp;

    @Column(name = "otp_expiration_date")
    private LocalDateTime otpExpirationDate;

    @Column(name = "otp_token")
    private String otpToken;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
