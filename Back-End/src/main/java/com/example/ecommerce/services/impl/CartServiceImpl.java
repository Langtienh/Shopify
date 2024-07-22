package com.example.ecommerce.services.impl;

import com.example.ecommerce.dtos.CartDTO;
import com.example.ecommerce.dtos.CartUpdateDTO;
import com.example.ecommerce.exceptions.ResourceNotFoundException;
import com.example.ecommerce.models.Cart;
import com.example.ecommerce.models.CartItem;
import com.example.ecommerce.models.Product;
import com.example.ecommerce.models.User;
import com.example.ecommerce.repositories.CartItemRepository;
import com.example.ecommerce.repositories.CartRepository;
import com.example.ecommerce.responses.CartItemResponse;
import com.example.ecommerce.responses.CartResponse;
import com.example.ecommerce.services.CartService;
import com.example.ecommerce.services.ProductService;
import com.example.ecommerce.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public CartResponse createCart(CartDTO cartDTO) {
        User user = userService.findById(cartDTO.getUserId());
        Optional<Cart> existsCart = cartRepository.findByUser(user);

        // User chưa có giỏ hàng => Tạo mới
        Cart cart = existsCart.orElseGet(() -> cartRepository.save(Cart.builder()
                .user(user)
                .build()));

        Product product = productService.findById(cartDTO.getProductId());
        Optional<CartItem> cartItem = cartItemRepository.findByProductAndCart(product, cart);
        CartItem newCartItem = new CartItem();
        newCartItem.setProduct(product);
        newCartItem.setCart(cart);
        if(cartItem.isEmpty()){ // Chưa có => Tạo mới
            newCartItem.setQuantity(1L);
        }
        else{ // Đã tồn tại => Tăng quantity
            newCartItem.setId(cartItem.get().getId());
            newCartItem.setQuantity(cartItem.get().getQuantity() + 1);
        }
        CartItemResponse cartItemResponse =
                CartItemResponse.fromCartItem(cartItemRepository.save(newCartItem));
        return CartResponse.fromCart(cart, List.of(cartItemResponse));
    }
    @Override
    @Transactional
    public CartResponse updateCart(long id, CartUpdateDTO cartUpdateDTO) {
        CartItem cartItem = cartItemRepository.findById(id)
                        .orElseThrow(()
                                -> new ResourceNotFoundException("CartItem not found with id = " + id));
        cartItem.setQuantity(cartUpdateDTO.getQuantity());
        CartItemResponse cartItemResponse =
                CartItemResponse.fromCartItem(cartItemRepository.save(cartItem));
        return CartResponse.fromCart(cartItem.getCart(), List.of(cartItemResponse));
    }
    @Override
    @Transactional
    public void deleteCart(List<Long> ids) {
        for(long id: ids){
            CartItem cartItem = cartItemRepository.findById(id)
                    .orElseThrow(()
                            -> new ResourceNotFoundException("CartItem not found with id = " + id));
            cartItemRepository.delete(cartItem);
        }
    }
    @Override
    @Transactional
    public void deleteCartByUser(long userId) {
        User user = userService.findById(userId);
        Cart cart = cartRepository.findByUser(user).get();
        List<CartItem> cartItems = cartItemRepository.findAllByCart(cart);
        cartItemRepository.deleteAll(cartItems);
    }
}
