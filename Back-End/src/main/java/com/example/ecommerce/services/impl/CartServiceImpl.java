package com.example.ecommerce.services.impl;

import com.example.ecommerce.dtos.CartDTO;
import com.example.ecommerce.dtos.CartItemDTO;
import com.example.ecommerce.dtos.CartUpdateDTO;
import com.example.ecommerce.exceptions.ResourceNotFoundException;
import com.example.ecommerce.models.Cart;
import com.example.ecommerce.models.CartItem;
import com.example.ecommerce.models.Product;
import com.example.ecommerce.models.User;
import com.example.ecommerce.repositories.CartItemRepository;
import com.example.ecommerce.repositories.CartRepository;
import com.example.ecommerce.repositories.ProductRepository;
import com.example.ecommerce.repositories.UserRepository;
import com.example.ecommerce.responses.CartItemResponse;
import com.example.ecommerce.responses.CartResponse;
import com.example.ecommerce.responses.PageResponse;
import com.example.ecommerce.services.CartService;
import com.example.ecommerce.services.ProductService;
import com.example.ecommerce.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserService userService;
    private final ProductService productService;
    @Override
    @Transactional
    public CartResponse createCart(CartDTO cartDTO) {
        User user = userService.findById(cartDTO.getUserId());
        Optional<Cart> existsCart = cartRepository.findByUser(user);

        // User chưa có giỏ hàng => Tạo mới
        Cart cart = existsCart.orElseGet(() -> cartRepository.save(Cart.builder()
                .user(user)
                .build()));
        List<CartItemResponse> cartItemResponses = new ArrayList<>();
        for(CartItemDTO cartItemDTO : cartDTO.getCartItemDTOS()){
            Product product = productService.findById(cartItemDTO.getProductId());
            Optional<CartItem> cartItem = cartItemRepository.findByProductAndCart(product, cart);
            CartItem newCartItem = new CartItem();
            newCartItem.setProduct(product);
            newCartItem.setCart(cart);
            if(cartItem.isEmpty()){ // Chưa có => Tạo mới
                newCartItem.setQuantity(cartItemDTO.getQuantity());
            }
            else{ // Đã tồn tại => Tăng quantity
                newCartItem.setId(cartItem.get().getId());
                newCartItem.setQuantity(cartItemDTO.getQuantity() + cartItem.get().getQuantity());
            }
            cartItemResponses.add(CartItemResponse.fromCartItem(cartItemRepository.save(newCartItem)));
        }
        return CartResponse.fromCart(cart, cartItemResponses);
    }



    @Override
    public CartResponse getCartByUser(long userId) {
        User user = userService.findById(userId);
        Cart cart = cartRepository.findByUser(user).get();
        List<CartItemResponse> cartItems = cartItemRepository.findAllByCart(cart)
                .stream()
                .map(CartItemResponse::fromCartItem)
                .toList();
        return CartResponse.fromCart(cart, cartItems);
    }

    @Override
    @Transactional
    public CartResponse updateCart(long id, CartUpdateDTO cartUpdateDTO) {
        Cart cart = cartRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));
        List<CartItemResponse> cartItemResponses = new ArrayList<>();
        for(CartItemDTO cartItemDTO : cartUpdateDTO.getCartItemDTOS()){
            Product product = productService.findById(cartItemDTO.getProductId());
            CartItem cartItem = cartItemRepository.findByProductAndCart(product, cart).get();
            cartItem.setQuantity(cartItemDTO.getQuantity());
            cartItemResponses.add(CartItemResponse.fromCartItem(cartItemRepository.save(cartItem)));
        }
        return CartResponse.fromCart(cart, cartItemResponses);
    }

    @Override
    @Transactional
    public void deleteCart(long id) {
        Cart cart = cartRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found with id = " + id));
        List<CartItem> cartItems = cartItemRepository.findAllByCart(cart);
        cartItemRepository.deleteAll(cartItems);
    }

    @Override
    @Transactional
    public void deleteCartItem(long cartItemId) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("CartItem not found"));
        cartItemRepository.delete(cartItem);
    }
}
