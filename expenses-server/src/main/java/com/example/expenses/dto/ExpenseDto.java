package com.example.expenses.dto;

import com.example.expenses.model.ExpenseStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;


@Data
public class ExpenseDto {
    private UUID id;
    private LocalDateTime createdAt;
    private String category;
    private String description; // ✅ este campo faltaba
    private ExpenseStatus status;
    private BigDecimal balance;
}