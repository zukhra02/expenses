package com.example.expenses.service;

import com.example.expenses.model.Expense;
import com.example.expenses.repository.ExpenseRepository;
import com.example.util.CrudUtils;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class ExpenseService {
    private final ExpenseRepository expenseRepository;

    public Expense findById(@NonNull UUID id) {
        return expenseRepository.findById(id).orElseThrow();
    }

    public List<Expense> findAll() {
        return CrudUtils.findAll(expenseRepository);
    }

    public Expense create(@NonNull Expense model) {
        model.setId(UUID.randomUUID());
        model.setCreatedAt(LocalDateTime.now());
        model.setNew(true);
        log.info("Creando: {}", model); // Opcional: log para debug

        return expenseRepository.save(model);
    }

    public Expense update(@NonNull Expense model) {
        return expenseRepository.save(model);
    }

    public void deleteById(@NonNull UUID id) {
        expenseRepository.deleteById(id);
    }
}
