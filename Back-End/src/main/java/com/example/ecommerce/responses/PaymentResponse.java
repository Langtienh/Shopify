package com.example.ecommerce.responses;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentResponse {
    public String code;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public String paymentUrl;

    public PaymentResponse(String code){
        this.code = code;
    }
}
