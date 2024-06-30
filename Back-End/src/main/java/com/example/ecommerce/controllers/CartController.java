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
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/carts")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    @PostMapping("")
    public ResponseEntity<ResponseSuccess> createCart(@Valid @RequestBody CartDTO cartDTO){
        CartResponse cartResponse = cartService.createCart(cartDTO);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Create cart successfully")
                .status(HttpStatus.CREATED.value())
                .data(cartResponse)
                .build());
    }

    @GetMapping("")
    public ResponseEntity<ResponseSuccess> getAllCarts(@RequestParam(defaultValue = "1") int page,
                                                       @RequestParam(defaultValue = "5") int limit){
        PageResponse pageResponse = cartService.getAllCarts(page, limit);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Get all carts information successfully")
                .status(HttpStatus.OK.value())
                .data(pageResponse)
                .build());
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<ResponseSuccess> getCartByUser(@PathVariable long id){
        CartResponse cartResponse = cartService.getCartByUser(id);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Get cart by user information successfully")
                .status(HttpStatus.OK.value())
                .data(cartResponse)
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseSuccess> getCartById(@PathVariable long id){
        CartResponse cartResponse = cartService.getCartById(id);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Get cart information successfully")
                .status(HttpStatus.OK.value())
                .data(cartResponse)
                .build());
    }

    @PutMapping("/{id}")
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
    public ResponseEntity<ResponseSuccess> deleteCartItem(@PathVariable long id){
        cartService.deleteCartItem(id);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Delete cartItem successfully")
                .status(HttpStatus.NO_CONTENT.value())
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseSuccess> deleteCart(@PathVariable long id){
        cartService.deleteCart(id);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Delete cart successfully")
                .status(HttpStatus.NO_CONTENT.value())
                .build());
    }
}
