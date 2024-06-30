package com.example.ecommerce.responses;

import com.example.ecommerce.models.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {

    private Long id;
    @JsonProperty("full_name")
    private String fullName;
    private String phone;
    private String email;
    private String address;
    private boolean active;

    public static UserResponse fromUser(User user){
        return UserResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .phone(user.getPhone())
                .email(user.getEmail())
                .address(user.getAddress())
                .active(user.isActive())
                .build();
    }
}
