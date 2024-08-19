package com.example.ecommerce.controllers;

import com.example.ecommerce.dtos.PaymentMethodDTO;
import com.example.ecommerce.responses.ResponseSuccess;
import com.example.ecommerce.services.PaymentMethodService;
import com.example.ecommerce.utils.Translator;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/payment_methods")
@RequiredArgsConstructor
public class PaymentMethodController {
    private final PaymentMethodService paymentMethodService;

    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponseSuccess> createPaymentMethod(
            @Valid @RequestBody PaymentMethodDTO paymentMethodDTO){
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message(Translator.toLocale("payment_method.create.success"))
                .status(HttpStatus.CREATED.value())
                .data(paymentMethodService.createPaymentMethod(paymentMethodDTO))
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseSuccess> getPaymentMethodById(@PathVariable long id){
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message(Translator.toLocale("payment_method.get_by_id.success"))
                .status(HttpStatus.OK.value())
                .data(paymentMethodService.getPaymentMethodById(id))
                .build());
    }

    @GetMapping("")
    public ResponseEntity<ResponseSuccess> getAllPaymentMethods(){
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message(Translator.toLocale("payment_method.get_all.success"))
                .status(HttpStatus.OK.value())
                .data(paymentMethodService.getAllPaymentMethods())
                .build());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponseSuccess> updatePaymentMethod(@PathVariable long id,
                                                               @Valid @RequestBody PaymentMethodDTO paymentMethodDTO){
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message(Translator.toLocale("payment_method.update.success"))
                .status(HttpStatus.OK.value())
                .data(paymentMethodService.updatePaymentMethod(id, paymentMethodDTO))
                .build());
    }

    @PutMapping("/update-status/{id}/{status}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponseSuccess> updatePaymentMethodStatus(@PathVariable("id") long id,
                                                               @PathVariable("status") boolean status){
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message(Translator.toLocale("payment_method.update_status.success"))
                .status(HttpStatus.OK.value())
                .data(paymentMethodService.updatePaymentMethodStatus(id, status))
                .build());
    }
}
