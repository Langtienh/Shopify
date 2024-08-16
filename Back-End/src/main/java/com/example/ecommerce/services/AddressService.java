package com.example.ecommerce.services;

import com.example.ecommerce.dtos.AddressDTO;
import com.example.ecommerce.dtos.AddressUpdateDTO;
import com.example.ecommerce.responses.AddressResponse;

import java.util.List;

public interface AddressService {
    AddressResponse createAddress(AddressDTO addressDTO);
    AddressResponse updateAddress(long id, AddressUpdateDTO addressUpdateDTO);
    List<AddressResponse> getAllAddressesByUser(long userId);
    AddressResponse getAddressById(long id);
    void deleteAddress(long id);
}
