package com.example.ecommerce.services;

import com.example.ecommerce.dtos.OrderDTO;
import com.example.ecommerce.enums.OrderStatus;
import com.example.ecommerce.models.Order;
import com.example.ecommerce.responses.OrderResponse;
import com.example.ecommerce.responses.PageResponse;
import com.example.ecommerce.responses.QuantityStatistic;
import com.example.ecommerce.responses.RevenueStatistic;
import org.springframework.data.domain.Page;

import java.util.List;

public interface OrderService {
    OrderResponse createOrder(OrderDTO orderDTO);
    PageResponse getAllOrders(int page, int limit);
    OrderResponse getOrderById(long id);
    Order findById(long id);
    PageResponse getOrderByUser(long uid, int page, int limit);
    OrderResponse updateOrderStatus(long id, OrderStatus orderStatus);
    void deleteOrder(long id);
    Order save(Order order);
    long countOrderByStatus(OrderStatus orderStatus);
    double totalPriceOrder();
    List<RevenueStatistic> getOrderByMonthInYear(int year);
    List<RevenueStatistic> getOrderByDayInMonth(int month, int year);
    List<QuantityStatistic> findMonthlyProductQuantityByCategory(int year);
    List<QuantityStatistic> findDailyProductQuantityByCategory(int month, int year);
}
