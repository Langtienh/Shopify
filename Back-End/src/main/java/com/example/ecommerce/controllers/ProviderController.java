package com.example.ecommerce.controllers;

import com.example.ecommerce.dtos.ProviderDTO;
import com.example.ecommerce.models.Provider;
import com.example.ecommerce.responses.ResponseSuccess;
import com.example.ecommerce.services.ProviderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/providers")
@RequiredArgsConstructor
public class ProviderController {
    private final ProviderService providerService;

    @PostMapping("")
    public ResponseEntity<ResponseSuccess> createProvider(
            @Valid @RequestBody ProviderDTO providerDTO) {
        Provider provider = providerService.createProvider(providerDTO);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Create provider successfully")
                .status(HttpStatus.CREATED.value())
                .data(provider)
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseSuccess> getCategoryById(@PathVariable("id") long id){
        Provider provider = providerService.getProviderById(id);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Get provider information successfully")
                .status(HttpStatus.OK.value())
                .data(provider)
                .build());
    }

    @GetMapping("")
    public ResponseEntity<ResponseSuccess> getAllCategories(){
        List<Provider> providers = providerService.getAllProviders();
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Get all providers information successfully")
                .status(HttpStatus.OK.value())
                .data(providers)
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseSuccess> updateCategory(@PathVariable long id,
                                                          @Valid @RequestBody ProviderDTO providerDTO){
        Provider provider = providerService.updateProvider(id, providerDTO);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Update provider successfully")
                .status(HttpStatus.OK.value())
                .data(provider)
                .build());
    }
}
