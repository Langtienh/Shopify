package com.example.ecommerce.controllers;

import com.example.ecommerce.responses.PaymentResponse;
import com.example.ecommerce.responses.ResponseSuccess;
import com.example.ecommerce.services.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("${api.prefix}/payments")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;

    @PostMapping("/create-payment")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    public ResponseEntity<?> createPayment(HttpServletRequest request,
                                           @RequestParam("amount") Long amount,
                                           @RequestParam("bankCode") String bankCode){
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                        .status(HttpStatus.OK.value())
                        .message("Create payment success")
                        .data(paymentService.createVnPayPayment(amount, bankCode,request))
                        .build());

    }

    @GetMapping("/vn-pay-callback")
    public ResponseEntity<?> payCallbackHandler(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String status = request.getParameter("vnp_ResponseCode");

//        response.sendRedirect("http://localhost:3000/checkout?vnp_ResponseCode="+status);
        if (status.equals("00")) {
            return ResponseEntity.ok(ResponseSuccess.builder()
                    .status(HttpStatus.OK.value())
                    .message("Success")
                    .data(new PaymentResponse(status))
                    .build());
        } else {
            return ResponseEntity.ok(ResponseSuccess.builder()
                    .status(HttpStatus.BAD_REQUEST.value())
                    .message("Failed")
                    .data(new PaymentResponse(status))
                    .build());
        }
    }
}
