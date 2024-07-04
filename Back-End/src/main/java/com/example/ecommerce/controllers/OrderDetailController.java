package com.example.ecommerce.controllers;

import com.example.ecommerce.responses.OrderDetailResponse;
import com.example.ecommerce.responses.ResponseSuccess;
import com.example.ecommerce.services.OrderDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/order-details")
@RequiredArgsConstructor
public class OrderDetailController {
    private final OrderDetailService orderDetailService;
    
    @GetMapping("/order/{oid}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponseSuccess> getOrderDetailByOrder(@PathVariable long oid){
        List<OrderDetailResponse> orderDetailResponses = orderDetailService.getOrderDetailByOrder(oid);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Get all orderDetail by order information successfully")
                .status(HttpStatus.OK.value())
                .data(orderDetailResponses)
                .build());
    }
}
