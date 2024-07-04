package com.example.ecommerce.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PageResponse {
    private int page;
    private int limit;
    private int totalPage;
    private int totalItem;
    private Object result;
}