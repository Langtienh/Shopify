package com.example.ecommerce.services;

import com.example.ecommerce.dtos.AttributeDTO;
import com.example.ecommerce.models.Attribute;

import java.util.List;

public interface AttributeService {
    Attribute createAttribute(AttributeDTO attributeDTO);
    Attribute getAttributeById(long id);
    List<Attribute> getAllAttributes();
    Attribute updateAttribute(long id, AttributeDTO attributeDTO);
}
