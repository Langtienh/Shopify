package com.example.ecommerce.controllers;

import com.example.ecommerce.dtos.CartDTO;
import com.example.ecommerce.dtos.CartUpdateDTO;
import com.example.ecommerce.dtos.test.CartDTOv1;
import com.example.ecommerce.dtos.test.CartUpdateDTOv1;
import com.example.ecommerce.responses.CartResponse;
import com.example.ecommerce.responses.ResponseSuccess;
import com.example.ecommerce.services.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/carts2")
@RequiredArgsConstructor
public class Cartv1Controller {
    private final CartService cartService;

    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<ResponseSuccess> createCart(@Valid @RequestBody CartDTOv1 cartDTOv1){
        CartResponse cartResponse = cartService.createCartv1(cartDTOv1);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Create cart successfully")
                .status(HttpStatus.CREATED.value())
                .data(cartResponse)
                .build());
    }


    @GetMapping("/user/{id}")
    @PreAuthorize("#id == authentication.principal.id")
    public ResponseEntity<ResponseSuccess> getCartByUser(@PathVariable long id){
        CartResponse cartResponse = cartService.getCartByUser(id);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Get cart by user information successfully")
                .status(HttpStatus.OK.value())
                .data(cartResponse)
                .build());
    }


    @PutMapping("/cart-item/{id}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<ResponseSuccess> updateCart(@PathVariable long id,
                                                      @Valid @RequestBody CartUpdateDTOv1 cartUpdateDTOv1){
        CartResponse cartResponse = cartService.updateCartv1(id, cartUpdateDTOv1);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Update cart successfully")
                .status(HttpStatus.OK.value())
                .data(cartResponse)
                .build());
    }

    @DeleteMapping("/user/{userId}")
    @PreAuthorize("#userId == authentication.principal.id")
    public ResponseEntity<ResponseSuccess> deleteCartByUser(@PathVariable long userId){
        cartService.deleteCartByUser(userId);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Delete cart by user successfully")
                .status(HttpStatus.NO_CONTENT.value())
                .build());
    }

    @DeleteMapping("/cart-item/{ids}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<ResponseSuccess> deleteCart(@PathVariable List<Long> ids){
        cartService.deleteCart(ids);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Delete cart successfully")
                .status(HttpStatus.NO_CONTENT.value())
                .build());
    }
}
