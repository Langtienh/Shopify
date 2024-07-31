package com.example.ecommerce.services.impl;

import com.example.ecommerce.dtos.OrderDTO;
import com.example.ecommerce.enums.OrderStatus;
import com.example.ecommerce.exceptions.ResourceNotFoundException;
import com.example.ecommerce.models.*;
import com.example.ecommerce.repositories.*;
import com.example.ecommerce.responses.OrderResponse;
import com.example.ecommerce.responses.PageResponse;
import com.example.ecommerce.services.*;
import com.example.ecommerce.utils.EmailTemplate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final UserService userService;
    private final OrderDetailRepository orderDetailRepository;
    private final CartItemRepository cartItemRepository;
    private final EmailService emailService;
    private final PaymentMethodService paymentMethodService;
    private final AuthService authService;

    @Override
    @Transactional
    public OrderResponse createOrder(OrderDTO orderDTO) {
        authService.checkAuth(orderDTO.getUserId());
        User user = userService.findById(orderDTO.getUserId());
        PaymentMethod paymentMethod =
                paymentMethodService.getPaymentMethodById(orderDTO.getPaymentMethodId());
        List<CartItem> cartItems = new ArrayList<>();
        for(Long cartItemId : orderDTO.getCartItemIds()){
            CartItem cartItem = cartItemRepository.findById(cartItemId)
                    .orElseThrow(() ->
                            new ResourceNotFoundException("CartItem not found with id = " + cartItemId));
            cartItems.add(cartItem);
        }
        Double totalPrice = cartItems.stream()
                .mapToDouble(item -> {
                    Product p = item.getProduct();
                    return item.getQuantity() * p.getPrice() * (1 - (double) p.getDiscount() /100);
                }).sum();
        Order order = Order.builder()
                .fullName(orderDTO.getFullName())
                .phone(orderDTO.getPhone())
                .email(orderDTO.getEmail())
                .address(orderDTO.getAddress())
                .orderDate(LocalDateTime.now())
                .totalPrice(totalPrice)
                .orderStatus(OrderStatus.PENDING)
                .active(true)
                .user(user)
                .paymentMethod(paymentMethod)
                .build();
        orderRepository.save(order);
        List<OrderDetail> orderDetails = new ArrayList<>();
        for(CartItem cartItem : cartItems){
            OrderDetail orderDetail = OrderDetail.builder()
                    .quantity(cartItem.getQuantity())
                    .product(cartItem.getProduct())
                    .order(order)
                    .price(cartItem.getQuantity() * cartItem.getProduct().getPrice()
                            * (1 - (double)cartItem.getProduct().getDiscount()/100))
                    .build();
            orderDetails.add(orderDetailRepository.save(orderDetail));
        }
        cartItemRepository.deleteAll(cartItems);

        // Send mail
        String toMail = order.getEmail();
        String subject = "Cellphones Thông báo xác nhận quý khách đã đặt hàng thành công #" + order.getId();
        EmailTemplate emailTemplate = new EmailTemplate(order, orderDetails);
        String body = emailTemplate.body();
        emailService.sendEmail(toMail,subject,body);
        return OrderResponse.fromOrder(order);
    }

    @Override
    public PageResponse getAllOrders(int page, int limit) {
        page = page > 0 ? page - 1 : page;
        Pageable pageable = PageRequest.of(page, limit);
        Page<Order> orderPage = orderRepository.findAll(pageable);
        return PageResponse.builder()
                .page(page + 1)
                .limit(limit)
                .totalPage(orderPage.getTotalPages())
                .totalItem((int)orderPage.getTotalElements())
                .result(orderPage.stream().map(OrderResponse::fromOrder).toList())
                .build();
    }

    @Override
    public OrderResponse getOrderById(long id) {
        Order order = findById(id);
        return OrderResponse.fromOrder(order);
    }

    @Override
    public Order findById(long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id = " + id));
    }

    @Override
    public PageResponse getOrderByUser(long uid, int page, int limit) {
        User user = userService.findById(uid);
        page = page > 0 ? page - 1 : page;
        Pageable pageable = PageRequest.of(page, limit);
        Page<Order> orderPage = orderRepository.findAllByUser(user, pageable);
        return PageResponse.builder()
                .page(page + 1)
                .limit(limit)
                .totalPage(orderPage.getTotalPages())
                .totalItem((int)orderPage.getTotalElements())
                .result(orderPage.stream().map(OrderResponse::fromOrder).toList())
                .build();
    }

    @Override
    @Transactional
    public OrderResponse updateOrderStatus(long id, OrderStatus orderStatus) {
        Order order = findById(id);
        order.setOrderStatus(orderStatus);
        orderRepository.save(order);
        return OrderResponse.fromOrder(order);
    }

    @Override
    @Transactional
    public void deleteOrder(long id) {
        Order order = findById(id);
        order.setActive(false);
        orderRepository.save(order);
    }

    @Override
    @Transactional
    public Order save(Order order) {
        return orderRepository.save(order);
    }
}
