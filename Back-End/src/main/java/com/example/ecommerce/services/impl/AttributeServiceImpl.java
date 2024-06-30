package com.example.ecommerce.services.impl;

import com.example.ecommerce.dtos.AttributeDTO;
import com.example.ecommerce.exceptions.ResourceNotFoundException;
import com.example.ecommerce.models.Attribute;
import com.example.ecommerce.repositories.AttributeRepository;
import com.example.ecommerce.services.AttributeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AttributeServiceImpl implements AttributeService {
    private final AttributeRepository attributeRepository;
    @Override
    public Attribute createAttribute(AttributeDTO attributeDTO) {
        Attribute attribute = Attribute.builder()
                .name(attributeDTO.getName())
                .build();
        return attributeRepository.save(attribute);
    }

    @Override
    public Attribute getAttributeById(long id) {
        return attributeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Attribute not found"));
    }

    @Override
    public List<Attribute> getAllAttributes() {
        return attributeRepository.findAll();
    }

    @Override
    public Attribute updateAttribute(long id, AttributeDTO attributeDTO) {
        Attribute attribute = getAttributeById(id);
        attribute.setName(attributeDTO.getName());
        return attributeRepository.save(attribute);
    }
}
