package com.example.ecommerce.services.impl;

import com.example.ecommerce.dtos.ProviderDTO;
import com.example.ecommerce.exceptions.DuplicateValueException;
import com.example.ecommerce.exceptions.ResourceNotFoundException;
import com.example.ecommerce.models.Category;
import com.example.ecommerce.models.Provider;
import com.example.ecommerce.repositories.ProviderRepository;
import com.example.ecommerce.services.ProviderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProviderServiceImpl implements ProviderService {
    private final ProviderRepository providerRepository;
    @Override
    public Provider createProvider(ProviderDTO providerDTO) {
        if(providerRepository.existsByName(providerDTO.getName()))
            throw new DuplicateValueException("Provider name already exists");
        Provider provider = Provider
                .builder()
                .name(providerDTO.getName())
                .build();
        return providerRepository.save(provider);
    }

    @Override
    public Provider getProviderById(long id) {
        return providerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Provider not found"));
    }

    @Override
    public List<Provider> getAllProviders() {
        return providerRepository.findAll();
    }

    @Override
    public Provider updateProvider(long id, ProviderDTO providerDTO) {
        Provider provider = getProviderById(id);
        if(!provider.getName().equals(providerDTO.getName())
                && providerRepository.existsByName(providerDTO.getName())){
            throw new DuplicateValueException("Provider name already exists");
        }
        provider.setName(providerDTO.getName());
        return providerRepository.save(provider);
    }
}
