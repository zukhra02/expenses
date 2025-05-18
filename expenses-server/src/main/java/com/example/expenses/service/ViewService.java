package com.example.expenses.service;

import com.example.expenses.dto.TotalDto;
import com.example.expenses.model.Expense;
import com.example.expenses.model.ExpenseStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ViewService {
    private final ExpenseService expenseService;

    public TotalDto getTotal() {
        List<Expense> allExpenses = expenseService.findAll();

        // 2. Calcular el total de ingresos (Income)
        BigDecimal income = allExpenses.stream()
                .filter(e -> e.getStatus() == ExpenseStatus.INCOME) // solo los ingresos
                .map(Expense::getBalance)                           // extraer el balance
                .reduce(BigDecimal.ZERO, BigDecimal::add);          // sumarlos

        // 3. Calcular el total de gastos (Outcome)
        BigDecimal outcome = allExpenses.stream()
                .filter(e -> e.getStatus() == ExpenseStatus.OUTCOME)
                .map(Expense::getBalance)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // 4. Calcular el balance final
        BigDecimal balance = income.subtract(outcome);

        Map<String, BigDecimal> byCategory = new HashMap<>();
        Map<Month, BigDecimal> byMonth = new HashMap<>();

        for (Expense expense : allExpenses) {
            if (expense.getStatus() == ExpenseStatus.INCOME) {
                BigDecimal value = byCategory.computeIfAbsent(expense.getCategory(), s -> BigDecimal.ZERO);
                value = value.add(expense.getBalance());
                byCategory.put(expense.getCategory(), value);

                Month month = expense.getCreatedAt().getMonth();
                BigDecimal value2 = byMonth.computeIfAbsent(month, s -> BigDecimal.ZERO);
                value2 = value2.add(expense.getBalance());
                byMonth.put(month, value2);
            } else {
                BigDecimal value = byCategory.computeIfAbsent(expense.getCategory(), s -> BigDecimal.ZERO);
                value = value.subtract(expense.getBalance());
                byCategory.put(expense.getCategory(), value);

                Month month = expense.getCreatedAt().getMonth();
                BigDecimal value2 = byMonth.computeIfAbsent(month, s -> BigDecimal.ZERO);
                value2 = value2.subtract(expense.getBalance());
                byMonth.put(month, value2);
            }
        }

        for (Month month : Month.values()) {
            if (!byMonth.containsKey(month)) {
                byMonth.put(month, BigDecimal.ZERO);
            }
        }

        // 5. Devolver el DTO con todos los totales
        return new TotalDto(income, outcome, balance, byCategory, byMonth);

    }
}
