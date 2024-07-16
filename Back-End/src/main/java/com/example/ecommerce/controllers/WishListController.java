package com.example.ecommerce.controllers;

import com.example.ecommerce.dtos.WishListDTO;
import com.example.ecommerce.responses.ResponseSuccess;
import com.example.ecommerce.services.WishListService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/wish-lists")
@RequiredArgsConstructor
public class WishListController {
    private final WishListService wishListService;

    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<ResponseSuccess> createWishList(@Valid @RequestBody WishListDTO wishListDTO){
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Create wish-list successfully")
                .status(HttpStatus.CREATED.value())
                .data(wishListService.createWishList(wishListDTO))
                .build());
    }

    @GetMapping("/user/{uid}")
    @PreAuthorize("#uid == authentication.principal.id")
    public ResponseEntity<ResponseSuccess> getAllWishListsByUser(@PathVariable long uid){
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Get all wish-list by user information successfully")
                .status(HttpStatus.OK.value())
                .data(wishListService.getAllWishListsByUser(uid))
                .build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<ResponseSuccess> deleteOne(@PathVariable long id){
        wishListService.deleteOne(id);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Delete wish-list successfully")
                .status(HttpStatus.NO_CONTENT.value())
                .build());
    }

    @DeleteMapping("/user/{uid}")
    @PreAuthorize("#uid == authentication.principal.id")
    public ResponseEntity<ResponseSuccess> deleteAllByUser(@PathVariable long uid){
        wishListService.deleteAll(uid);
        return ResponseEntity.ok().body(ResponseSuccess.builder()
                .message("Delete all wish-list by user successfully")
                .status(HttpStatus.NO_CONTENT.value())
                .build());
    }
}
