package com.example.expenses.controller;

import com.example.expenses.dto.ExpenseDto;
import com.example.expenses.mapper.ExpenseMapper;
import com.example.expenses.model.Expense;
import com.example.expenses.service.ExpenseService;
import jakarta.validation.constraints.NotNull;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/expense")
@CrossOrigin(origins = "http://localhost:3000")
public class ExpenseController {
    private final ExpenseService expenseService;
    private final ExpenseMapper expenseMapper;

    @PostMapping
    public ExpenseDto create(@NotNull @RequestBody ExpenseDto dto) {
        Expense model = expenseMapper.toModel(dto);
        return expenseMapper.toDto(expenseService.create(model));
    }

    @PutMapping("/{id}")
    public ExpenseDto update(@PathVariable @NonNull UUID id, @RequestBody @NonNull ExpenseDto model) {
        model.setId(id);
        Expense account = expenseMapper.toModel(model);
        return expenseMapper.toDto(expenseService.update(account));
    }

    @GetMapping
    public List<ExpenseDto> findAll() {
        return expenseService.findAll().stream().map(expenseMapper::toDto).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ExpenseDto findById(@PathVariable @NonNull UUID id) {
        return expenseMapper.toDto(expenseService.findById(id));
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable @NonNull UUID id) {
        expenseService.deleteById(id);
    }
}
