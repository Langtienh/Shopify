package com.example.ecommerce.services.impl;

import com.example.ecommerce.dtos.PaymentMethodDTO;
import com.example.ecommerce.exceptions.ResourceNotFoundException;
import com.example.ecommerce.models.PaymentMethod;
import com.example.ecommerce.repositories.PaymentMethodRepository;
import com.example.ecommerce.services.PaymentMethodService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentMethodServiceImpl implements PaymentMethodService {
    private final PaymentMethodRepository paymentMethodRepository;
    @Override
    @Transactional
    public PaymentMethod createPaymentMethod(PaymentMethodDTO paymentMethodDTO) {
        PaymentMethod paymentMethod = PaymentMethod.builder()
                .name(paymentMethodDTO.getName())
                .description(paymentMethodDTO.getDescription())
                .image(paymentMethodDTO.getImage())
                .status(true)
                .build();
        paymentMethodRepository.save(paymentMethod);
        return paymentMethod;
    }

    @Override
    public PaymentMethod getPaymentMethodById(long id) {
        return paymentMethodRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Payment Method not found with id = " + id));
    }

    @Override
    public List<PaymentMethod> getAllPaymentMethods() {
        return paymentMethodRepository.findAll();
    }

    @Override
    @Transactional
    public PaymentMethod updatePaymentMethod(long id, PaymentMethodDTO paymentMethodDTO) {
        PaymentMethod paymentMethod = getPaymentMethodById(id);
        paymentMethod.setName(paymentMethodDTO.getName());
        paymentMethod.setDescription(paymentMethodDTO.getDescription());
        paymentMethod.setImage(paymentMethodDTO.getImage());
        return paymentMethodRepository.save(paymentMethod);
    }

    @Override
    @Transactional
    public PaymentMethod updatePaymentMethodStatus(long id, boolean status) {
        PaymentMethod paymentMethod = getPaymentMethodById(id);
        paymentMethod.setStatus(status);
        return paymentMethodRepository.save(paymentMethod);
    }
}
