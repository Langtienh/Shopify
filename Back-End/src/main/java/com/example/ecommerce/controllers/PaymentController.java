package com.example.ecommerce.controllers;

import com.example.ecommerce.dtos.OrderDTO;
import com.example.ecommerce.responses.OrderResponse;
import com.example.ecommerce.responses.PaymentResponse;
import com.example.ecommerce.responses.ResponseSuccess;
import com.example.ecommerce.services.PaymentService;
import com.example.ecommerce.utils.Translator;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("${api.prefix}/payments")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;

    @PostMapping("/create-payment")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    public ResponseEntity<?> createPayment(HttpServletRequest request,
                                           @RequestParam("amount") Long amount,
                                           @RequestParam("bankCode") String bankCode,
                                           @Valid @RequestBody OrderDTO orderDTO){
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                        .status(HttpStatus.OK.value())
                        .message(Translator.toLocale("payment.create.success"))
                        .data(paymentService.createVnPayPayment(amount, bankCode,request, orderDTO))
                        .build());

    }

    @GetMapping("/vn-pay-callback")
    public ResponseEntity<?> payCallbackHandler(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String status = request.getParameter("vnp_ResponseCode");
        long orderId = Long.parseLong(request.getParameter("orderId"));
        if (status.equals("00")) {
            response.sendRedirect(String.format("http://localhost:3000" +
                    "/cart/checkout?vnp_ResponseCode=%s&orderId=%d",status,orderId));
            return ResponseEntity.ok(ResponseSuccess.builder()
                    .status(HttpStatus.OK.value())
                    .message(Translator.toLocale("payment.call_back.success"))
                    .data(new PaymentResponse(status))
                    .build());
        } else {
            paymentService.handlePaymentFailed(request);
            response.sendRedirect(String.format("http://localhost:3000" +
                    "/cart/checkout?vnp_ResponseCode=%s&orderId=%d",status,orderId));
            return ResponseEntity.ok(ResponseSuccess.builder()
                    .status(HttpStatus.BAD_REQUEST.value())
                    .message(Translator.toLocale("payment.call_back.failed"))
                    .data(new PaymentResponse(status))
                    .build());
        }
    }
}
