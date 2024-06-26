package com.example.ecommerce.responses;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Getter
@Builder
public class ResponseSuccess {
    private int status;
    private String message;
    @JsonInclude(JsonInclude.Include.NON_NULL)// Nếu TH data null sẽ k in ra trường data
    private Object data;
}