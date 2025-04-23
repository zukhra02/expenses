package com.example.expenses.model;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.domain.Persistable;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;


@Data
@Table("expenses")
public class Expense implements Persistable<UUID> {

    @Column("id")
    @Id
    @NotNull
    private UUID id;

    @NotNull
    @Column("created_at")
    private LocalDateTime createdAt;

    @Column("category")
    private String category;

    @Column("description") // ✅ campo añadido
    private String description;

    @Column("status")
    private ExpenseStatus status;

    @NotNull
    @Column("balance")
    private BigDecimal balance;

    @Transient
    private boolean isNew;

    @Override
    public boolean isNew() {
        return isNew;
    }
}



