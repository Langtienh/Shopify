package com.example.ecommerce.controllers;

import com.example.ecommerce.dtos.CartDTO;
import com.example.ecommerce.dtos.CartUpdateDTO;
import com.example.ecommerce.responses.CartResponse;
import com.example.ecommerce.responses.PageResponse;
import com.example.ecommerce.responses.ResponseSuccess;
import com.example.ecommerce.services.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/carts")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<ResponseSuccess> createCart(@Valid @RequestBody CartDTO cartDTO){
        CartResponse cartResponse = cartService.createCart(cartDTO);
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


    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<ResponseSuccess> updateCart(@PathVariable long id,
                                                      @Valid @RequestBody CartUpdateDTO cartUpdateDTO){
        CartResponse cartResponse = cartService.updateCart(id, cartUpdateDTO);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Update cart successfully")
                .status(HttpStatus.OK.value())
                .data(cartResponse)
                .build());
    }

    @DeleteMapping("/cart-item/{id}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<ResponseSuccess> deleteCartItem(@PathVariable long id){
        cartService.deleteCartItem(id);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Delete cartItem successfully")
                .status(HttpStatus.NO_CONTENT.value())
                .build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<ResponseSuccess> deleteCart(@PathVariable long id){
        cartService.deleteCart(id);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Delete cart successfully")
                .status(HttpStatus.NO_CONTENT.value())
                .build());
    }
}
