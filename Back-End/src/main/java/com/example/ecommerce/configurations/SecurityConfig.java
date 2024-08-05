package com.example.ecommerce.configurations;

import com.example.ecommerce.filters.JwtAuthenticationFilter;
import com.example.ecommerce.utils.CustomAccessDeniedHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true) // Thêm để sử dụng @PreAuthorize
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final CustomAccessDeniedHandler customAccessDeniedHandler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http.csrf(AbstractHttpConfigurer::disable) // Tắt giao diện form login
                // Request đi qua bộ lọc này trước
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(requests -> {
                    requests
                            .requestMatchers(HttpMethod.POST, "/api/v1/users/register").permitAll()
                            .requestMatchers(HttpMethod.POST, "/api/v1/users/login").permitAll()
                            .requestMatchers(HttpMethod.POST, "/api/v1/users/login-with-google/**").permitAll()
                            .requestMatchers(HttpMethod.GET, "/api/v1/users/login-with-google/**").permitAll()
                            .requestMatchers(HttpMethod.POST, "/api/v1/users/logout").permitAll()
                            .requestMatchers(HttpMethod.POST, "/api/v1/users/refreshToken").permitAll()
                            .requestMatchers(HttpMethod.GET, "/api/v1/categories/**").permitAll()
                            .requestMatchers(HttpMethod.GET, "/api/v1/products/**").permitAll()
                            .requestMatchers(HttpMethod.GET, "/api/v1/attributes/**").permitAll()
                            .requestMatchers(HttpMethod.GET, "/api/v1/brands/**").permitAll()
                            .requestMatchers(HttpMethod.GET, "/api/v1/comments/**").permitAll()
                            .requestMatchers(HttpMethod.GET, "/api/v1/category-brands/**").permitAll()
                            .requestMatchers(HttpMethod.GET, "/api/v1/payment_methods/**").permitAll()
                            .requestMatchers(HttpMethod.GET, "/api/v1/payments/vn-pay-callback").permitAll()
                            .requestMatchers(HttpMethod.POST, "/api/v1/users/verify-mail/**").permitAll()
                            .requestMatchers(HttpMethod.POST, "/api/v1/users/verify-otp/**").permitAll()
                            .requestMatchers(HttpMethod.PUT, "/api/v1/users/reset-password/**").permitAll()
                            .anyRequest().authenticated(); // Các api khác chỉ cần đăng nhập là call được
                })
                // Không lưu token ở session phía server
                .sessionManagement(manager -> manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // Custom message khi gặp lỗi 403
                .exceptionHandling(config -> config.accessDeniedHandler(customAccessDeniedHandler)); // Nếu dùng @PreAuthorize thì k dùng được cái này
        return http.build();
    }
}