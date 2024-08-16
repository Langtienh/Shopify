package com.example.ecommerce.controllers;

import com.example.ecommerce.dtos.AddressDTO;
import com.example.ecommerce.dtos.AddressUpdateDTO;
import com.example.ecommerce.responses.ResponseSuccess;
import com.example.ecommerce.services.AddressService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/address")
@RequiredArgsConstructor
public class AddressController {
    private final AddressService addressService;

    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    public ResponseEntity<ResponseSuccess> createAddress(@Valid @RequestBody AddressDTO addressDTO){
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Create address successfully")
                .status(HttpStatus.CREATED.value())
                .data(addressService.createAddress(addressDTO))
                .build());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponseSuccess> updateAddress(@PathVariable long id,
                                                         @Valid @RequestBody AddressUpdateDTO addressUpdateDTO){
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Update address successfully")
                .status(HttpStatus.OK.value())
                .data(addressService.updateAddress(id, addressUpdateDTO))
                .build());
    }

    @GetMapping("/user/{uid}")
    @PreAuthorize("#uid == authentication.principal.id")
    public ResponseEntity<ResponseSuccess> getAllAddressesByUser(@PathVariable long uid){
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Get all address by user information successfully")
                .status(HttpStatus.OK.value())
                .data(addressService.getAllAddressesByUser(uid))
                .build());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponseSuccess> getAddressById(@PathVariable long id){
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Get address information successfully")
                .status(HttpStatus.OK.value())
                .data(addressService.getAddressById(id))
                .build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public ResponseEntity<ResponseSuccess> deleteAddress(@PathVariable long id){
        addressService.deleteAddress(id);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Delete address successfully")
                .status(HttpStatus.NO_CONTENT.value())
                .build());
    }


}
