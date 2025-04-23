package com.example.expenses.repository;

import com.example.expenses.model.Expense;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface ExpenseRepository extends CrudRepository<Expense, UUID> {
}
