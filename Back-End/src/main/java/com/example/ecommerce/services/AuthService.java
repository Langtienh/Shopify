package com.example.ecommerce.services;

import com.example.ecommerce.models.User;
import com.example.ecommerce.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;

    public void checkAuth(long uid){
        // VN-PAY call
        if(SecurityContextHolder.getContext().getAuthentication().getPrincipal().equals("anonymousUser"))
            return;
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        Optional<User> user = userRepository.findByPhone(userDetails.getUsername());
        if(user.isPresent()){
            if(user.get().getId() != uid){
                throw new AccessDeniedException("Access denied. You don't have the required role.");
            }
        }
    }
}
