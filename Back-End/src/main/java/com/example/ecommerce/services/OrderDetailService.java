package com.example.ecommerce.services;

import com.example.ecommerce.responses.OrderDetailResponse;

import java.util.List;

public interface OrderDetailService {
    List<OrderDetailResponse> getOrderDetailByOrder(long oid);
}
