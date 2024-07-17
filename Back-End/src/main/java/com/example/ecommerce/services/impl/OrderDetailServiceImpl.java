package com.example.ecommerce.services.impl;

import com.example.ecommerce.exceptions.ResourceNotFoundException;
import com.example.ecommerce.models.Order;
import com.example.ecommerce.models.OrderDetail;
import com.example.ecommerce.repositories.OrderDetailRepository;
import com.example.ecommerce.repositories.OrderRepository;
import com.example.ecommerce.responses.OrderDetailResponse;
import com.example.ecommerce.services.OrderDetailService;
import com.example.ecommerce.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderDetailServiceImpl implements OrderDetailService {
    private final OrderDetailRepository orderDetailRepository;
    private final OrderService orderService;
    @Override
    public List<OrderDetailResponse> getOrderDetailByOrder(long oid) {
        Order order = orderService.findById(oid);
        List<OrderDetail> orderDetails = orderDetailRepository.findAllByOrder(order);
        return orderDetails.stream()
                .map(OrderDetailResponse::fromOrderDetail)
                .toList();
    }
}
