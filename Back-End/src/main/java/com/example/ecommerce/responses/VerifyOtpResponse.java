package com.example.ecommerce.responses;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VerifyOtpResponse {
    private Long userId;
    private String otpToken;
}
