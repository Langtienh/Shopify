package com.example.ecommerce.services;



import com.example.ecommerce.dtos.ProviderDTO;
import com.example.ecommerce.models.Provider;

import java.util.List;

public interface ProviderService {
    Provider createProvider(ProviderDTO providerDTO);
    Provider getProviderById(long id);
    List<Provider> getAllProviders();
    Provider updateProvider(long id, ProviderDTO providerDTO);
}
