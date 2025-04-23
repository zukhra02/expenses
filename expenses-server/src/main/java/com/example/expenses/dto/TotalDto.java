package com.example.expenses.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.Month;
import java.util.Map;

@Data
@AllArgsConstructor
public class TotalDto {
    private BigDecimal income;
    private BigDecimal outcome;
    private BigDecimal balance;
    private Map<String, BigDecimal> totalByCategory;
    private Map<Month, BigDecimal> totalByMonth;
}
