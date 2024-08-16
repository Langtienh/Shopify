package com.example.ecommerce.responses;

import com.example.ecommerce.models.Address;
import com.example.ecommerce.models.User;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {

    private Long id;
    private String fullName;
    private String phone;
    private String email;
    private String avatar;
    private boolean active;
    private List<AddressResponse> address;
    private List<String> roles;

    public static UserResponse fromUser(User user){
        Address result = null;
        if(!user.getAddresses().isEmpty()){
            Address address = user.getAddresses().stream()
                    .filter(Address::isDefault)
                    .findFirst()
                    .orElse(null);
            if(address != null){
                result = address;
            }
            else{
                result = user.getAddresses().get(0);
            }
        }

        return UserResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .phone(user.getPhone())
                .email(user.getEmail())
                .avatar(user.getAvatar())
                .active(user.isActive())
                .address(user.getAddresses().stream().map(AddressResponse::fromAddress).toList())
                .roles(user.getUserRoles().isEmpty() ? null : user.getUserRoles().stream()
                        .map(userRole -> userRole.getRole().getName())
                        .toList())
                .build();
    }
}
