package com.example.ecommerce.services;

import com.example.ecommerce.dtos.OrderDTO;
import com.example.ecommerce.enums.OrderStatus;
import com.example.ecommerce.responses.OrderResponse;
import com.example.ecommerce.responses.PageResponse;
import org.springframework.data.domain.Page;

public interface OrderService {
    OrderResponse createOrder(OrderDTO orderDTO);
    PageResponse getAllOrders(int page, int limit);
    OrderResponse getOrderById(long id);
    PageResponse getOrderByUser(long uid, int page, int limit);
    OrderResponse updateOrderStatus(long id, OrderStatus orderStatus);
    void deleteOrder(long id);
}
