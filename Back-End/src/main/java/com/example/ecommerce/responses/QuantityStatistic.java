package com.example.ecommerce.responses;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class QuantityStatistic {
    private int date;
    private long total;
    private List<QuantityCategory> list;
}
