package com.example.ecommerce.services;

import com.example.ecommerce.dtos.PaymentMethodDTO;
import com.example.ecommerce.models.PaymentMethod;

import java.util.List;

public interface PaymentMethodService {
    PaymentMethod createPaymentMethod(PaymentMethodDTO paymentMethodDTO);
    PaymentMethod getPaymentMethodById(long id);
    List<PaymentMethod> getAllPaymentMethods();
    PaymentMethod updatePaymentMethod(long id, PaymentMethodDTO paymentMethodDTO);
    PaymentMethod updatePaymentMethodStatus(long id, boolean status);
}
