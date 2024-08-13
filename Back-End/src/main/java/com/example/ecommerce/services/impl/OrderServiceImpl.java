package com.example.ecommerce.services.impl;

import com.example.ecommerce.dtos.OrderDTO;
import com.example.ecommerce.enums.OrderStatus;
import com.example.ecommerce.exceptions.InvalidParamException;
import com.example.ecommerce.exceptions.ResourceNotFoundException;
import com.example.ecommerce.models.*;
import com.example.ecommerce.repositories.*;
import com.example.ecommerce.responses.*;
import com.example.ecommerce.services.*;
import com.example.ecommerce.utils.EmailTemplate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.*;
import java.util.stream.Collectors;

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
    private final ProductRepository productRepository;
    private final CategoryService categoryService;

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

            // Giảm số lượng tồn kho
            Product p = cartItem.getProduct();
            long newStock = p.getStock() - cartItem.getQuantity();
            if(newStock < 0)
                throw new InvalidParamException("Số lượng tồn phải lớn hơn 0");
            p.setStock(newStock);
            productRepository.save(p);
        }
        cartItemRepository.deleteAll(cartItems);

        // Send mail
        String toMail = order.getEmail();
        String subject = "Cellphones Thông báo xác nhận quý khách đã đặt hàng thành công #" + order.getId();
        EmailTemplate emailTemplate = new EmailTemplate(order, orderDetails);
        String body = emailTemplate.body();
//        emailService.sendEmail(toMail,subject,body);
        return OrderResponse.fromOrder(order);
    }

    @Override
    public PageResponse getAllOrders(int page, int limit) {
        page = page > 0 ? page - 1 : page;
        Pageable pageable = PageRequest.of(page, limit, Sort.by("id").descending());
        Page<Order> orderPage = orderRepository.findAll(pageable);
        return PageResponse.builder()
                .page(page + 1)
                .limit(limit)
                .totalPage(orderPage.getTotalPages())
                .totalItem((int)orderPage.getTotalElements())
                .result(orderPage.stream().map(OrderResponse::fromOrder)
                        .toList())
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
        Pageable pageable = PageRequest.of(page, limit, Sort.by("id").descending());
        Page<Order> orderPage = orderRepository.findAllByUser(user, pageable);
        return PageResponse.builder()
                .page(page + 1)
                .limit(limit)
                .totalPage(orderPage.getTotalPages())
                .totalItem((int)orderPage.getTotalElements())
                .result(orderPage.stream().map(OrderResponse::fromOrder)
                        .toList())
                .build();
    }

    @Override
    @Transactional
    public OrderResponse updateOrderStatus(long id, OrderStatus orderStatus) {
        Order order = findById(id);
        order.setOrderStatus(orderStatus);
        orderRepository.save(order);
        // Nếu hủy => trả lại số lượng tồn kho
        if(orderStatus.equals(OrderStatus.CANCELLED)){
            List<OrderDetail> orderDetails = orderDetailRepository.findAllByOrder(order);
            for(OrderDetail od : orderDetails){
                Product p = od.getProduct();
                p.setStock(p.getStock() + od.getQuantity());
                productRepository.save(p);
            }
        }
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

    @Override
    public long countOrderByStatus(OrderStatus orderStatus) {
        return orderRepository.countAllByOrderStatus(orderStatus);
    }

    @Override
    public double totalPriceOrder() {
        return orderRepository.totalPriceOrder();
    }

    @Override
    public List<RevenueStatistic> getOrderByMonthInYear(int year) {
        List<Object[]> results = orderRepository.getOrderByMonthInYear(year);
        Map<Integer, Double> map = new HashMap<>();
        for (Object[] result : results) {
            Integer month = (Integer) result[0];
            Double totalPrice = (Double) result[1];
            map.put(month, totalPrice);
        }
        List<RevenueStatistic> list = new ArrayList<>();
        for(int month = 1 ; month <= 12 ; month++){
            Double totalPrice = map.getOrDefault(month, 0.0);
            list.add(new RevenueStatistic(month, totalPrice));
        }
        return list;
    }

    @Override
    public List<RevenueStatistic> getOrderByDayInMonth(int month, int year) {
        List<Object[]> results = orderRepository.getOrderByDayInMonth(month, year);
        YearMonth yearMonth = YearMonth.of(year, month);
        int dayInMonth = yearMonth.lengthOfMonth();
        Map<Integer, Double> map = new HashMap<>();
        for (Object[] result : results) {
            Integer day = (Integer) result[0];
            Double totalPrice = (Double) result[1];
            map.put(day, totalPrice);
        }
        List<RevenueStatistic> list = new ArrayList<>();
        for(int day = 1 ; day <= dayInMonth ; day++){
            Double totalPrice = map.getOrDefault(day, 0.0);
            list.add(new RevenueStatistic(day, totalPrice));
        }
        return list;
    }

    @Override
    public List<QuantityStatistic> findMonthlyProductQuantityByCategory(int year) {
        List<Object[]> result = orderRepository.findMonthlyProductQuantityByCategory(year);
        List<Category> categories = categoryService.getAllCategories();
        Map<Integer, List<QuantityCategory>> map = new HashMap<>();
        for(Object[] ob : result){
            Integer month = (Integer) ob[0];
            Long value = (Long) ob[1];
            String key = (String) ob[2];
            if (map.containsKey(month)) {
                List<QuantityCategory> quantityCategories = map.get(month);
                quantityCategories.add(new QuantityCategory(key, value));
            } else {
                List<QuantityCategory> newList = new ArrayList<>();
                newList.add(new QuantityCategory(key, value));
                map.put(month, newList);
            }
        }

        map.forEach((key, value) -> {
            List<QuantityCategory> quantityCategories = map.get(key);
            for(Category category : categories){
                if(!quantityCategories
                        .stream()
                        .map(QuantityCategory::getKey)
                        .toList()
                        .contains(category.getName())){
                    quantityCategories.add(new QuantityCategory(category.getName(), 0L));
                }
            }
            map.put(key, quantityCategories);
        });


        for(int month = 1 ; month <= 12 ; month++){
            if(!map.containsKey(month)){
                List<QuantityCategory> quantityCategories = new ArrayList<>();
                for(Category category : categories){
                    quantityCategories.add(new QuantityCategory(category.getName(), 0L));
                }
                map.put(month, quantityCategories);
            }
        }

        List<QuantityStatistic> quantityStatistics = new ArrayList<>();
        map.forEach((key, value) -> {
            List<QuantityCategory> quantityCategories = map.get(key);
            quantityCategories = quantityCategories.stream()
                    .sorted(Comparator.comparing(QuantityCategory::getKey))
                    .toList();
            long total = quantityCategories.stream().mapToLong(QuantityCategory::getValue).sum();
            quantityStatistics.add(QuantityStatistic.builder()
                            .date(key)
                            .total(total)
                            .list(quantityCategories)
                    .build());
        });
        return quantityStatistics;
    }

    @Override
    public List<QuantityStatistic> findDailyProductQuantityByCategory(int month, int year) {
        List<Object[]> result = orderRepository.findDailyProductQuantityByCategory(month, year);
        List<Category> categories = categoryService.getAllCategories();
        Map<Integer, List<QuantityCategory>> map = new HashMap<>();
        YearMonth yearMonth = YearMonth.of(year, month);
        int dayInMonth = yearMonth.lengthOfMonth();

        for(Object[] ob : result){
            Integer day = (Integer) ob[0];
            Long value = (Long) ob[1];
            String key = (String) ob[2];
            if (map.containsKey(day)) {
                List<QuantityCategory> quantityCategories = map.get(day);
                quantityCategories.add(new QuantityCategory(key, value));
            } else {
                List<QuantityCategory> newList = new ArrayList<>();
                newList.add(new QuantityCategory(key, value));
                map.put(day, newList);
            }
        }

        map.forEach((key, value) -> {
            List<QuantityCategory> quantityCategories = map.get(key);
            for(Category category : categories){
                if(!quantityCategories
                        .stream()
                        .map(QuantityCategory::getKey)
                        .toList()
                        .contains(category.getName())){
                    quantityCategories.add(new QuantityCategory(category.getName(), 0L));
                }
            }
            map.put(key, quantityCategories);
        });

        for(int day = 1 ; day <= dayInMonth ; day++){
            if(!map.containsKey(day)){
                List<QuantityCategory> quantityCategories = new ArrayList<>();
                for(Category category : categories){
                    quantityCategories.add(new QuantityCategory(category.getName(), 0L));
                }
                map.put(day, quantityCategories);
            }
        }

        List<QuantityStatistic> quantityStatistics = new ArrayList<>();
        map.forEach((key, value) -> {
            List<QuantityCategory> quantityCategories = map.get(key);
            quantityCategories = quantityCategories.stream()
                    .sorted(Comparator.comparing(QuantityCategory::getKey))
                    .toList();
            long total = quantityCategories.stream().mapToLong(QuantityCategory::getValue).sum();
            quantityStatistics.add(QuantityStatistic.builder()
                    .date(key)
                    .total(total)
                    .list(quantityCategories)
                    .build());
        });
        return quantityStatistics;
    }
}
