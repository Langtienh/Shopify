package com.example.ecommerce.responses;

import com.example.ecommerce.models.Address;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddressResponse {
    private long id;
    private String name;
    private String detail;
    private String code;
    private boolean isDefault;

    public static AddressResponse fromAddress(Address address){
        return AddressResponse.builder()
                .id(address.getId())
                .name(address.getName())
                .detail(address.getDetail())
                .code(address.getCode())
                .isDefault(address.isDefault())
                .build();
    }
}
