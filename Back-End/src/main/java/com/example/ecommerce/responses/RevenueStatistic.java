package com.example.ecommerce.responses;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RevenueStatistic {
    private int date;
    private double total;
}
